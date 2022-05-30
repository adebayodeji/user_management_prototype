const { privateMessage } = require("../models/PrivateMessageModel");
const { Citizen } = require('../models/Citizen');
const { errorResponse, successResponse } = require('../utils/helpers/responses');

// return all the messages from the database
const getMessages = async (request, response) => 
{
    let sender = request.body.sender;
    let receipient = request.body.receipient;
    let firstMsgId = sender + "_" + receipient;
    let secondMsgId = receipient + "_" + sender;
    let citizen1 = await Citizen.findOne({ username: sender });
    let citizen2 = await Citizen.findOne({ username: receipient });
    if (citizen1.accountStatus=='active' && citizen2.accountStatus=='active') {
         const messages = await privateMessage.find({ $or: [ { chatId: firstMsgId }, { chatId : secondMsgId } ] });
        //  const messages = await privateMessage.find({chatId: secondMsgId});
         return successResponse(response, 200, 'Private Messages', messages);
    }
    else if (citizen1.accountStatus=='inactive') 
    {
        // const messages = await privateMessage.find({ $or: [ { chatId: firstMsgId }, { chatId : secondMsgId } ] });
        const messages = await privateMessage.find({chatId: secondMsgId});
        return successResponse(response, 200, 'Private Messages', messages);    
    }
    else
    {
        const messages = await privateMessage.find({chatId: firstMsgId});
        return successResponse(response, 200, 'Private Messages', messages);
    }
    
}

// Save the message to MongoDB database
function saveMessage(messageId, text, sendTime, status) 
{
    privateMessage.create(
    {
        chatId: messageId,
        body: text,
        sentTime: sendTime,
        status:status
    });
}

module.exports = 
{
    saveMessage,
    getMessages
};