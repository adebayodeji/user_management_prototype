const express = require('express');

const router = express.Router();
const profileController = require('../controllers/ProfileController');

module.exports = () => 
{ 
    router.get('/userDetails', profileController.getUserDetails);
    router.post('/saveDetails', profileController.saveDetails);
    
    return router; 
}