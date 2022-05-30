const { Citizen } = require('../models/UserModel');
const hashPassword = require('../utils/helpers/hashPassword');
const { errorResponse, successResponse } = require('../utils/helpers/responses');

const getUserDetails = async (request, response) => {
    try {
        const uname = request.body.username;
        let citizen = await Citizen.findOne({ username: uname });
        
        data = { id: citizen._id, username: citizen.username, password: citizen.password, accountstatus: citizen.accountStatus, privilegelevel: citizen.privilegeLevel };
        return successResponse(response, 200, 'Citizen Details', data);
    }
    catch (error) {
        return errorResponse(response, 500, `Error: ${error.message}`);
    }
}

const saveDetails = async (profileDetails) => {
    let id = profileDetails.id;
    let uname = profileDetails.username;
    let pswd = profileDetails.password;
    let acctstatus = profileDetails.accountstatus;
    let plevel = profileDetails.privilegelevel;
    let passwordChanged = profileDetails.passwordChanged;
    if (passwordChanged == 'true') {
        pswd = hashPassword(pswd);
    }
    await Citizen.updateOne({ _id: id }, { $set: { username: uname, password: pswd, accountStatus: acctstatus, privilegeLevel: plevel } });
    //return successResponse(response, 200, 'Updating Citizen Profile', 'Updated Successfully');
}

const checkAccountStatus = async (socket) => {
    socket.on("updateProfile", (details) => {
        if (details.text !== "init") {
            saveDetails(details);
            if (details.userstatus == 'online' && details.accountstatus == 'inactive') {
                profileDetails = { ...details, logUserOut: "true" }
                socket.broadcast.emit("profileUpdatedMsg", profileDetails);
            }
            else {
                profileDetails = { ...details, logUserOut: "false" }
                socket.broadcast.emit("profileUpdatedMsg", profileDetails);
            }
        }
    });
}

module.exports = { getUserDetails, saveDetails, checkAccountStatus }