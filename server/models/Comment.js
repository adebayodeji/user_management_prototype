const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reply_schema = new Schema(
    {
      body:{
           type: String
       },
       replier_id:{
        type: String
        },
        time: {
          type: String,
      },
    },{
      versionKey: false,
      timestamps: true
    }
  );
const comment_schema = new Schema(
    {
        announcement_id:{
            type: String
            },
        body:{
            type: String
        },
        commenter_id:{
            type: String
        },
        time: {
          type: String,
      },
        replies:[reply_schema]

    },{
      versionKey: false,
      timestamps: true
    }
  );

export const Comment = mongoose.model("Comment", comment_schema);