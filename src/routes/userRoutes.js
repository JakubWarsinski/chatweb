const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userManage = require('../utils/userManage');
const { isAuthenticated } = require('../middlewares/auth');

router.use((req, res, next) => {
    userManage.getUserFromSession(req, res);
    next();
});

router.get('/logout', isAuthenticated, userController.logout);

router.get('/', userController.loginPage);
router.get('/new', userController.registerPage);

router.post('/new', userController.registerHandle);
router.post('/', userController.loginHandle);

router.get('/forgot', userController.forgotPage);
router.post('/forgot', userController.forgotHandle);

router.get('/reset', userController.resetPage);
router.post('/reset', userController.resetHandle);

router.get('/dashboard', isAuthenticated, userController.dashboardPage);

router.get('/friends', userController.friendsHandle);

module.exports = router;