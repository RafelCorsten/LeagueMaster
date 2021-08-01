'use strict';
const client = require('./index');
const db = client.db(process.env.DB_NAME);
const summoners = db.collection('summoners');

exports.getAll = async () => {
  const allSummoners = await summoners.find().toArray();
  return allSummoners;
};

exports.getOne = async (summonerName) => {
  const summoner = await summoners.findOne();
  return summoner;
};

exports.create = async summoner => {
  await summoners.insertOne(summoner);
};
