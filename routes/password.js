const express = require('express');
const { getForgotPasswordView, sendForgotPasswordLink, getResetPasswordView, ResetThePassword } = require('../controllers/passwordController');
const router = express.Router();
// /password/forgot-password
router.route('/forgot-password')
.get(getForgotPasswordView)
.post(sendForgotPasswordLink);

// /password/forgot-password/:userId/:token
router.route('/reset-password/:userId/:token')
.get(getResetPasswordView)
.post(ResetThePassword);

module.exports = router;