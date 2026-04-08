const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('goals');
const userCollection = db.collection('user');
const friendCollection = db.collection('friend');
const goalCollection = db.collection('goal');
const publishedCollection = db.collection('published');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function addPersonalGoal(goal) {
  const doc = { ...goal, type: 'personal' };
  const result = await goalCollection.insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

async function addPartnerGoal(goal) {
  const doc = { ...goal, type: 'partner' };
  const result = await goalCollection.insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

async function getPersonalGoals(userEmail) {
  return goalCollection.find({ type: 'personal', user: userEmail }).toArray();
}

async function getPartnerGoals(userEmail) {
  return goalCollection.find({ type: 'partner', user: userEmail }).toArray();
}

async function updateGoalProgress(goalId, progress) {
  const { ObjectId } = require('mongodb');
  await goalCollection.updateOne(
    { _id: new ObjectId(goalId) },
    { $set: { progress } }
  );
}

async function getRandomUsers(excludeEmail, limit = 10) {
  return userCollection.aggregate([
    { $match: { email: { $ne: excludeEmail } } },
    { $sample: { size: limit } },
    { $project: { email: 1, _id: 1 } },
  ]).toArray();
}

async function addFriend(friend) {
  await friendCollection.insertOne(friend);
}

async function getFriend(email) {
  return friendCollection.findOne({ email: email });
}

async function getFriends(userEmail) {
  return friendCollection.find({ user: userEmail }).toArray();
}

async function publishGoal(goal) {
  const doc = {
    ...goal,
    publishedAt: new Date(),
  };
  const result = await publishedCollection.insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

async function unpublishGoal(goalId) {
  await publishedCollection.deleteMany({ goalId });
}

async function getPublishedGoals() {
  return publishedCollection.find({}).sort({ publishedAt: -1 }).toArray();
}

async function updatePublishedGoalProgress(goalId, progress) {
  await publishedCollection.updateOne(
    { goalId },
    { $set: { progress } }
  );
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addPersonalGoal,
  addPartnerGoal,
  getPersonalGoals,
  getPartnerGoals,
  updateGoalProgress,
  getRandomUsers,
  addFriend,
  getFriend,
  getFriends,
  publishGoal,
  unpublishGoal,
  getPublishedGoals,
  updatePublishedGoalProgress,
};
