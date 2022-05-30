const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

module.exports = () => 
{
    router.post('/processLoginInfo', userController.processInfo);
    router.post('/signUp', userController.userCreation);
    router.post('/verificationStatus', userController.getUserVerificationStatus);
    router.get('/loggedIn', userController.checkLogIn);
    router.post('/logout', userController.logout);
    
    return router; 
}