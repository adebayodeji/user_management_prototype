const mongoose = require("mongoose");

const privateChatSchema = new mongoose.Schema(
{
    chatId: 
    {
      type: String,
      required: true,
    },
    body: 
    {
      type: String,
    },
    sentTime: 
    {
      type: String,
    },
    status: 
    {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const privateMessage = mongoose.model("Private_Chats", privateChatSchema);

const privateMessageSearchResult = async (criteria, firstMsgId, secondMsgId) => {
  const criteriaRegex = new RegExp(criteria);
  //let queryResult = await privateMessage.find({ body: criteriaRegex });

  let queryResult = await privateMessage.find({ $and: [ { $or: [ { chatId: firstMsgId }, { chatId : secondMsgId } ] }, { body : criteriaRegex } ] });

  queryResult.sort((a, b) => {
    return a.sentTime - b.sentTime;
  });
  
  return queryResult;
}

module.exports = {
  privateMessage,
  privateMessageSearchResult
};