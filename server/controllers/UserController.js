const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorResponse, successResponse } = require('../utils/helpers/responses');
const generateToken = require('../utils/helpers/generateToken');
const hashPassword = require('../utils/helpers/hashPassword');
const sendEmail = require("../utils/helpers/sendEmails");

const userCreation = (request, response) => {
    const email = request.body.userEmail;
    const pswd = request.body.password;
    const hashedPassword = hashPassword(pswd);
    const confirmPswd = request.body.confirmPassword;

    if (email.length === 0 || pswd.length === 0) {
        return errorResponse(response, 400, `Email or Password field cannot be empty`);
    }
    else if (pswd !== confirmPswd) {
        return errorResponse(response, 400, `Passwords do not match`);
    }
    else if (pswd.length < 8) {
        return errorResponse(response, 400, `Password should have more than 7 characters`);
    }
    else {
        let user = new User({
            "userEmail": email,
            "firstName": request.body.firstName,
            "lastName": request.body.lastName,
            "gender": request.body.gender,
            "age": request.body.age,
            "dob": request.body.dob,
            "maritalStatus": request.body.maritalStatus,
            "nationality": request.body.nationality,
            "profilePhoto": request.body.profilePhoto,
            "password": hashedPassword,
            "idNumber": "",
            "imageOfID": "",
            "accountStatus": "UNVERIFIED",
            "userStatus": "online"
        });
        user.save((err) => {
            if (err) {
                return errorResponse(response, 400, `Account creation failed`);
            }
            else {
                return successResponse(response, 404, 'User successfully created', email);
            }
        });
    }
}

const processLoginInfo = async (request, response) => {
    email = request.body.userEmail;
    pswd = request.body.password;

    if (email.length === 0 || pswd.length === 0) {
        return errorResponse(response, 400, 'Invalid Credentials!');
    }
    else {
        // checking if the user exists
        User.findOne({ userEmail: email }).then((userInfo) => {
            if (userInfo) {
                // check that the submitted password matches the saved one
                const hashedPassword = userInfo.password;
                bcrypt.compare(pswd, hashedPassword).then(async (result) => {
                    if (result) {
                        let token = generateToken(userInfo.userEmail, hashedPassword);
                        await User.updateOne({ userEmail: userInfo.userEmail }, { $set: { userStatus: 'online' } });
                        //Send the token in an HTTP-only cookie
                        response.cookie("token", token, { httpOnly: true }).send();
                    }
                    else {
                        return errorResponse(response, 400, 'Incorrect Username/Password combination!');
                    }
                });
            }
            else {
                return successResponse(response, 404, 'User does not exist', userEmail);
            }
        })
            .catch(err => {
                return errorResponse(response, 500, `Error ${err.message}`);
            });
    }
}

const setVerificationStatus = async (request, response) => {
    let email = request.body.userEmail;
    let idnum = request.body.idNumber;
    let image = request.body.imageOfID;

    User.findOne({ userEmail: email }).then(async (userInfo) => { 
        if (userInfo) {
            if (userInfo.accountStatus === "unverified") {
                await User.updateOne({ userEmail: email }, { $set: { accountStatus: 'PENDING_VERIFICATION', idNumber: idnum, imageOfID: image } });
                return successResponse(response, 404, 'Verification pending', email);
            }
            else if (userInfo.accountStatus === "PENDING_VERIFICATION") { 
                return successResponse(response, 404, 'Verification pending', email);
            } else {
                return successResponse(response, 404, 'Account verified', email);
            }
        }
    })
}

const resetPassword = async (request, response) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

const checkLogIn = (request, response) => {
    try {
        // get the cookie token
        const token = request.cookies.token;
        // If user doesnt have a cookie token return unauthorized
        if (!token) return response.json(false);
        // if token exist
        jwt.verify(token, process.env.secret);
        response.send(true);
    }
    catch (error) {
        console.log(`Error ${error.message}`);
        response.json(false);
    }
}

const logout = async (request, response) => {
    const token = request.cookies.token;
    if (token) {
        jwt.verify(token, process.env.secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                response.send(false);
            } else {
                let email = decodedToken.email;
                await User.updateOne({ userEmail: email }, { $set: { userStatus: 'offline' } });
                response.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send();
            }
        });
    } else {
        response.send(false);
    }
}

module.exports = { processLoginInfo, userCreation, logout, checkLogIn, setVerificationStatus };