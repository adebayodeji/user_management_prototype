const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');
const privateChatController = require('../controllers/PrivateChatController');

module.exports = () => 
{
    router.get('/allMessages', chatController.getAllMessages);
    // router.get('/testing', privateChatController.getMessages);
    router.get('/privateMessages', privateChatController.getMessages);
    router.post('/privateMessages', privateChatController.getMessages);

    return router; 
}