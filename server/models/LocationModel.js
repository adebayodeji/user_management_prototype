const mongoose = require("mongoose");

const textSchema = new mongoose.Schema(
    {
        username:
        {
            type: String,
            required: true,
        },
        longitude:
        {
            type: String,
        },
        latitude:
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
        page:
        {
            type:String,
        }
    },
    {
        timestamps: true,
    }
);

const Location = mongoose.model("Location", textSchema);

module.exports = {
    Location,
    textSchema
};