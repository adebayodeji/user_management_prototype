const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const passwordReset = require("./routes/passwordReset");
const users = require("./routes/users");

module.exports = () => 
{
    router.post('/login', userController.processLoginInfo);
    router.post('/signUp', userController.userCreation);
    router.post('/verificationStatus', userController.setVerificationStatus);
    router.get('/checklogin', userController.checkLogIn);
    router.post('/logout', userController.logout);
    router.post("/password-reset/:userId/:token", userController.userValidation);
    router.post("/password-reset", userController.resetPassword);

    
    return router; 
}