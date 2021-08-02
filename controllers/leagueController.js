'use strict';
const ErrorResponse = require('../utils/errorResponse');
const Summoner = require('../models/Summoner');
const Match = require('../models/Match');


exports.getSummoners = async (req, res, next) => {
  try {
    const summoners  = await Summoner.find();
    res.status(200);
    res.send(summoners);
  } catch (err) {
    return next(new Error('Error getting the Summoners.'));
  }
};

exports.postSummoner = async (req, res) => {
  try {
    await Summoner.insertOne(req.body);
    res.status(201);
  } catch (err) {
    return next(new Error('Error inserting the Summoner.'));
  }
};

exports.getMatchesByPlayerId = async (req, res, next) => {
  try {
    //receive puuid to send in query
    const puuid = req.params.puuid;
    const matches  = await Match.find({'participants.puuid': puuid}).toArray();
    res.status(200);
    res.send(matches);
  } catch (err) {
    return next(new Error('Could not find matches by playerId'));
  }
};


//getCertainAmountMatches
exports.getCertainAmountMatches = async (req, res, next) => {
  try {
    const number = req.params.number;
    
    const matches  = await Match.aggregate([
      { $sort: { gameCreation: -1 } },
      { $limit: Number(number) }
    ]);

    res.status(200);
    res.send(matches);
  } catch (err) {
    return next(new Error('Could not retreive the matches.'));
  }
};

exports.render404 = async (req, res, next) => {
  return next(new ErrorResponse('This page does not exist.', 404));
}
