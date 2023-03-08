const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');

router.get('/sign-up', signUpController.getSignUp);
router.post('/sign-up', signUpController.postSignUp);

module.exports = router;

