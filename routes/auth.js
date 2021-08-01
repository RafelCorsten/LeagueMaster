const Router = require('express').Router;
const router = Router();
const { register, login, forgotPw, resetPw } = require('../controllers/auth');

router.post('/register', register);

router.post('/login', login);

router.post('/forgotPw', forgotPw);

router.put('/resetPw/:resetToken', resetPw);

module.exports = router;