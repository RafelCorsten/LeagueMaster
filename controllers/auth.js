require('dotenv').config();
const crypto = require('crypto');
const Summoner = require('../models/Summoner');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');




exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //const summoner = await Summoner.getOne(username);
    //if (!summoner) {
    ///// import summoner riot API
    //}

    const user = await User.create({
      username, email, password
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }

}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error('email or password missing'));
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    const isValid = await user.comparePasswords(password);

    if (!user || !isValid) {
      return next(new Error('invalid email or password'));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
}


exports.forgotPw = async (req, res, next) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return next(new Error('Email could not be sent'));
    }

    
    const resetToken = user.getResetToken();
    await user.save();
    const resetUrl = `${process.env.HOST}/passwordreset/${resetToken}`;
    console.log('got url', resetUrl);

    const message = `
      <h1>You have requested a password reset</h1>
      <p>To reset your password, please click the link below:</p>
      <p><a href="${resetUrl} clicktracking=off">${resetUrl}</a></p>
      <p>If you did not request this, please ignore this email.</p>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        html: message
      });
      console.log('aftersendMail');
      res.status(200).json({ success: true, data: 'Email Sent.' });
    }
    catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      next(new Error('Could not send Email. ' + error));
    }
  } catch (error) {
    next(new Error('Could not send the Email. ' + error));
  }
}

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  try {
    const user = await User.findOne({ 
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
     });

    if (!user) {
      return next(new Error('resetToken is invalid'));
    }

    const { password } = req.body;
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(201).json({ success: true, data: 'Password reset succes.' });
  } catch (error) {
    next(new Error('Could not reset password. ' + error));
  }
  
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
}