'use strict';
const mongoose = require('mongoose');


const summonerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  }
});


const Summoner = mongoose.model('summoners', summonerSchema);
module.exports = Summoner;