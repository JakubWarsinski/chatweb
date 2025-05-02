const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userManage = require('../utils/userManage');

router.use((req, res, next) => {
    userManage.getUserFromSession(req, res);
    next();
});

router.get('/', homeController.homePage);

module.exports = router;