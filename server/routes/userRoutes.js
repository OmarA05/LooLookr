const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register new user
router.post('/user/register', userController.register); // tested


// Login for existing user
router.post('/user/login', userController.login); //tested

module.exports = router;
