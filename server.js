require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use(router);


app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});