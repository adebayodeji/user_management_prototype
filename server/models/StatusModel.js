const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema(
    {
        "username" : { type: String },
        "citizenStatus" : { type: String },
        "time"   : { type: String}
    });

const Status = mongoose.model('Status', statusSchema);

const statusSearchResult = async (criteria) => {
    const criteriaRegex = new RegExp(criteria);
    let queryResult = await Status.find({ citizenStatus: criteriaRegex });
  
    let onlineUsers = [];
    let offlineUsers = [];
    let sortedQueryResult = [];

    queryResult.forEach((user) => {
        if(user.userStatus === "online"){
            onlineUsers.push(user);
        }else{
            offlineUsers.push(user);
        }
    });
  
    //Sorting online users in alphabetical order
    onlineUsers.sort((a, b) => {
        if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return -1;
        }
        if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    //Sorting offline users in alphabetical order
    offlineUsers.sort((a, b) => {
        if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return -1;
        }
        if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return 1;
        }
        return 0;
    });
    
    sortedQueryResult = onlineUsers;    //Sorted list
    
    offlineUsers.forEach((user) => {
        sortedQueryResult.push(user);
    });

    return sortedQueryResult;
    
}

module.exports = {
    Status,
    statusSearchResult
};