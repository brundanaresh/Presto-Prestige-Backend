const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/brunda';

async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('brunda');
    return { client, db };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Failed to connect to the database');
  }
}

module.exports = {
  connectToDatabase: connectToDatabase
};
