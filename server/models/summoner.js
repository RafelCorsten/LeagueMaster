'use strict';
const client = require('./index');
const db = client.db(process.env.DB_NAME);
const summoners = db.collection('summoners');

exports.getAll = async () => {
  console.log(summoners);
  const allSummoners = await summoners.find().toArray();
  return allSummoners;
};

exports.postOne = async summoner => {
  await summoners.insertOne(summoner);
};
