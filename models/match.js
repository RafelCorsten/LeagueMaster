'use strict';
const mongoose = require('mongoose');


const matchSchema = new mongoose.Schema({
  gameCreation: {
    type: Number,
    required: true,
  }
});


const Match = mongoose.model('matches', matchSchema);
module.exports = Match;