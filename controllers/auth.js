const Summoner = require('../models/summoner');
const User = require('../models/user');


exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const summoner = await Summoner.getOne(username);
    if (!summoner) {
      ///// import summoner riot API
    }

    const user = await User.createOne({ username, email, password });
    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }

}

exports.login = (req, res, next) => {
  const user = req.user;
  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.json({
    token
  });
}


exports.forgotPw = (req, res, next) => {
  const user = req.user;
  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.json({
    token
  });
}

exports.resetPw = (req, res, next) => {
  const user = req.user;
  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.json({
    token
  });
}
