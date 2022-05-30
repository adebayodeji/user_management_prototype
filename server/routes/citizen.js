const express = require('express');

const router = express.Router();

const citizenController = require('../controllers/CitizenController');

module.exports = () => 
{
    router.post('/processInfo', citizenController.processInfo);
    router.post('/register', citizenController.citizenCreation);
    router.get('/allCitizens', citizenController.getAllCitizens);
    router.post('/userStatus', citizenController.getUserStatus);
    router.get('/userDetails', citizenController.getUserDetails);
    router.get('/loggedIn', citizenController.checkLogIn);
    router.post('/logout', citizenController.logout);
    
    return router; 
}