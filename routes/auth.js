const Router = require('express').Router;
const router = Router();
const { register, login, forgotPw, resetpassword } = require('../controllers/auth');

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotPw);

router.put('/resetpassword/:resetToken', resetpassword);

module.exports = router;