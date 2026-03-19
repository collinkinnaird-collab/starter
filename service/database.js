const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const friendCollection = db.collection('friend');
const goalCollection = db.collection('goal');

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
  await goalCollection.insertOne({ ...goal, type: 'personal' });
}

async function addPartnerGoal(goal) {
  await goalCollection.insertOne({ ...goal, type: 'partner' });
}

async function getPersonalGoals() {
  return goalCollection.find({ type: 'personal' }).toArray();
}

async function getPartnerGoals() {
  return goalCollection.find({ type: 'partner' }).toArray();
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
  addFriend,
  getFriend,
  getFriends
};
