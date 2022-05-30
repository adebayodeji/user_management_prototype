const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

module.exports = () => 
{
    router.post('/processInfo', userController.processInfo);
    router.post('/register', userController.userCreation);
    router.post('/userStatus', userController.getUserStatus);
    router.get('/loggedIn', userController.checkLogIn);
    router.post('/logout', userController.logout);
    
    return router; 
}