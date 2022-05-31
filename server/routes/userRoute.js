const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

module.exports = () => 
{
    router.post('/login', userController.processLoginInfo);
    router.post('/signUp', userController.userCreation);
    router.post('/verificationStatus', userController.setVerificationStatus);
    router.get('/checklogin', userController.checkLogIn);
    router.post('/logout', userController.logout);
    
    return router; 
}