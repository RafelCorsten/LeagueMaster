'use strict';
const summonerModel = require('../models/summoner');
const matchesModel = require('../models/match');

exports.getSummoners = async (req, res) => {
  try {
    const summoners  = await summonerModel.getAll();
    res.status(200);
    res.send(summoners);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

exports.postSummoner = async (req, res) => {
  try {
    await summonerModel.postOne(req.body);
    res.status(201);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

exports.getMatchesByPlayerId = async (req, res) => {
  try {
    //receive puuid to send in query
    const puuid = req.params.puuid;
    const matches  = await matchesModel.getMatchesByPlayerId(puuid);
    res.status(200);
    res.send(matches);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};


//getCertainAmountMatches
exports.getCertainAmountMatches = async (req, res) => {
  try {
    //receive puuid to send in query
    const number = req.params.number;
    const matches  = await matchesModel.getCertainAmountMatches(number);
    res.status(200);
    res.send(matches);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

exports.render404 = async (req, res) => {
  res.status(404);
  res.send('This page does not exist, please try again.');
}
