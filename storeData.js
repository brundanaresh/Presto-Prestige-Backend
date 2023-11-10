const { MongoClient } = require('mongodb');

async function storeData() {
  const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('brunda');
    const collection = database.collection('brunda');

    await collection.insertOne({
      "title": "Your Post Title",
      "content": "Your post content goes here",
    });
  } finally {
    await client.close();
  }
}

storeData();
