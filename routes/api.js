const express = require('express')
const { sendOTP, verifyOTP, login } = require('../controllers/AuthController')
const router = express.Router()


router.post('/sendOTP',sendOTP);
router.post('/verifyOTP',verifyOTP);
router.post('/login',login);

module.exports = router