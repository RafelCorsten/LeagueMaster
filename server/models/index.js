const { MongoClient, Logger } = require('mongodb');

const db = {};
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function main () {
  
  await client.connect();
  Logger.setLevel("debug");
  console.log('Db connected');
}
main().catch(console.error);

module.exports = client;