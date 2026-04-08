const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const { WebSocketServer } = require('ws');
const Anthropic = require('@anthropic-ai/sdk');
const app = express();
const DB = require('./database');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// WebSocket server (declared early so route handlers can reference it)
const wss = new WebSocketServer({ noServer: true });

app.use(express.static('public'));

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

// get friends
apiRouter.get('/friends', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    const friends = await DB.getFriends(user.email);
    res.send({ friends });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


apiRouter.post('/friends', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    const friend = await DB.addFriend({ email: req.body.email, user: user.email });
    res.send({ friend });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
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
    await DB.updateUserRemoveAuth(user);
    //delete user.token;
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

// Publish a goal (must be before generic /goals routes)
apiRouter.post('/goals/publish', verifyAuth, async (req, res) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (!user) return res.status(401).send({ msg: 'Unauthorized' });

    const { goalId, title, progress } = req.body;
    const published = await DB.publishGoal({
      goalId,
      title,
      progress,
      user: user.email,
    });

    // Broadcast to all connected WebSocket clients
    const event = JSON.stringify({
      from: user.email,
      type: 'goalPublished',
      value: published,
    });
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(event);
      }
    });

    res.send({ published });
  } catch (err) {
    console.error('Error publishing goal:', err);
    res.status(500).send({ msg: 'Failed to publish goal' });
  }
});

// Update progress on a published goal
apiRouter.put('/goals/publish/:id', verifyAuth, async (req, res) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (!user) return res.status(401).send({ msg: 'Unauthorized' });

    const { progress } = req.body;
    const updated = await DB.updatePublishedGoalProgress(req.params.id, progress);

    // Broadcast progress update to all WebSocket clients
    const event = JSON.stringify({
      from: user.email,
      type: 'goalProgressUpdate',
      value: { _id: req.params.id, progress },
    });
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(event);
      }
    });

    res.send({ updated });
  } catch (err) {
    console.error('Error updating published goal:', err);
    res.status(500).send({ msg: 'Failed to update published goal' });
  }
});

// Get all published goals
apiRouter.get('/goals/published', async (_req, res) => {
  try {
    const published = await DB.getPublishedGoals();
    res.send({ published });
  } catch (err) {
    console.error('Error fetching published goals:', err);
    res.status(500).send({ msg: 'Failed to fetch published goals' });
  }
});

// Restricted endpoint — requires authentication
apiRouter.get('/goals', verifyAuth, async (req, res) => {
  const personalGoals = await DB.getPersonalGoals();
  const partnerGoals = await DB.getPartnerGoals();
  res.send({ personalGoals, partnerGoals });
});

apiRouter.post('/goals', verifyAuth, async (req, res) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      const goal = await DB.addPersonalGoal({ ...req.body, user: user.email });
      res.send({ goal });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error('Error creating goal:', err);
    res.status(500).send({ msg: 'Failed to create goal' });
  }
});

apiRouter.post('/partner-goals', verifyAuth, async (req, res) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      const goal = await DB.addPartnerGoal({ ...req.body, user: user.email });
      res.send({ goal });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error('Error creating partner goal:', err);
    res.status(500).send({ msg: 'Failed to create goal' });
  }
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
  await DB.addUser(user);
  //users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
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

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

server.on('upgrade', (req, socket, head) => {
  if (req.url === '/ws') {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    // Broadcast incoming messages to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(data);
      }
    });
  });
});
