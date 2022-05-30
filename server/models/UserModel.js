const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "username": { type: String },
    "firstName": { type: String },
    "lastName": { type: String },
    "gender": { type: String },
    "age": { type: String },
    "dob": { type: String },
    "maritalStatus": { type: String },
    "nationality": { type: String },
    "profilePhoto": { type: String },
    "password": { type: String },
    "idNumber": { type: String },
    "idImage": { type: String },
    "accountStatus": { type: String },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};

