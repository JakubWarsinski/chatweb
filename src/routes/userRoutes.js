// src/routes/userRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/new', userController.register);
router.post('/', userController.login);

module.exports = router;