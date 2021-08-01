'use strict';
const client = require('./index');
const db = client.db(process.env.DB_NAME);
const matchesModel = db.collection('matches');

exports.getAll = async () => {
  const allMatches = await matchesModel.find().toArray();
  return allMatches;
};

exports.getMatchesByPlayerId = async puuid => {
  const allMatches = await matchesModel.find({ "participants.puuid": puuid }).toArray();
  return allMatches;
};


exports.getCertainAmountMatches = async number => {
  const matches = await matchesModel.aggregate([
    { $sort: { gameCreation: -1 } },
    { $limit: Number(number) }
  ]).toArray();

  return matches;
};


exports.postOne = async match => {
  await matchesModel.insertOne(match);
};
