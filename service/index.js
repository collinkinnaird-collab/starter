const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const Anthropic = require('@anthropic-ai/sdk');
const app = express();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));

let users = [];

app.use(express.json());
app.use(cookieParser());

var apiRouter = express.Router();
app.use('/api', apiRouter);


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Restricted endpoint — requires authentication
apiRouter.get('/goals', verifyAuth, (req, res) => {
  res.send({ msg: 'You are authenticated!' });
});

// AI chat endpoint — requires authentication
apiRouter.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: `You are a friendly goal coach inside an app called "Goals". Your job is to help users set, refine, and achieve their goals. Give short, encouraging, actionable advice. Stay on topic — only discuss goals, motivation, habits, and productivity. If someone asks about something unrelated, gently steer them back to goals.`,
      messages,
    });
    res.send({ reply: response.content[0].text });
  } catch (err) {
    console.error('Chat error:', err.status, err.message, err.error);
    res.status(500).send({ msg: `AI request failed: ${err.message}` });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
