const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
    username: 
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
    citizenStatus: 
    {
      type: String,
    },
    filename: 
    {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", textSchema);

const publicMessageSearchResult = async (criteria) => {
  const criteriaRegex = new RegExp(criteria);
  let queryResult = await Message.find({ body: criteriaRegex });

  queryResult.sort((a, b) => {
    return a.sentTime - b.sentTime;
  });
  
  return queryResult
}

module.exports = {
  Message,
  publicMessageSearchResult
};