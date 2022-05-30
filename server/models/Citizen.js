const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citizenSchema = new Schema(
    {
        "username" : { type: String },
        "password" : { type: String },
        "userStatus"   : { type: String},
        "accountStatus" : { type: String },
        "privilegeLevel"   : { type: String}
    });

const Citizen = mongoose.model('Citizen', citizenSchema);

const citizenSearchResult = async (criteria) => {
    const criteriaRegex = new RegExp(criteria);
    const sort = { userStatus: -1, username: 1 };   //Sorting in terms of user status ie. online or offline
    let queryResult = await Citizen.find({ username: criteriaRegex }).sort(sort);

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
    Citizen,
    citizenSearchResult
};

