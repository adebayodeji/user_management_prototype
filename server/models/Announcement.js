const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        body: {
            type: String,
        },
        time: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

const announcementSearchResult = async (criteria) => {
    const criteriaRegex = new RegExp(criteria);
    let queryResult = await Announcement.find({ body: criteriaRegex });

    queryResult.sort((a, b) => {
        return a.time - b.time;
    });
    
    return queryResult;
}

module.exports = {
    Announcement,
    announcementSearchResult
};
