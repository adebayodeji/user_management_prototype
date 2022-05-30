const { Message } = require("../models/MessageModel");
// const Status = require("../models/StatusModel");
// const { Citizen } = require("../models/Citizen");
const { errorResponse, successResponse } = require('../utils/helpers/responses');

// return all the messages from the database
const getMessages = async (request, response) => {
  const messages = await Message.find();
  return successResponse(response, 200, 'All Messages', messages);
}

// return all the messages plus citizen status from the database
const getAllMessages = async (request, response) => {
  const messages = await Message.aggregate([
    {
      $lookup:
      {
        from: "citizens",
        localField: 'username',
        foreignField: 'username',
        pipeline:
        [
          {
            $match: 
              {
                $expr: { "$eq": ["$accountStatus", "active"] }
              }
          }
        ],
        as: "citizenInfo"
      }
    }
  ]);
  return successResponse(response, 200, 'Getting Messages from active citizens only', messages);
}

function checkFileType(filename) {
  if (filename.includes(".jpg")) {
    return true
  }
  else return false;
}

// Save the message to MongoDB database
function saveMessage(sender, text, sendTime, userStatus, uploadedFile) {
  if (checkFileType) {
    Message.create(
      {
        username: sender,
        body: text,
        sentTime: sendTime,
        citizenStatus: userStatus,
        filename: uploadedFile
      });
  }
}

module.exports =
{
  saveMessage,
  getAllMessages,
  getMessages,
  checkFileType
};