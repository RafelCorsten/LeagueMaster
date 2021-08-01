require('dotenv').config();
const mongoose = require('mongoose');

const CONNECTION = process.env.MONGODB_URI || '';

mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
