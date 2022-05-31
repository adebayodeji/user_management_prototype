const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    idNumber: {
        type: String
    },
    imageOfID: {
        type: String
    },
    accountStatus: {
        type: String,
        required: true
    },
    userStatus: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};

