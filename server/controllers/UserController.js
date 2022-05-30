const { User } = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorResponse, successResponse } = require('../utils/helpers/responses');
const generateToken = require('../utils/helpers/generateToken');
const hashPassword = require('../utils/helpers/hashPassword');

const validateCredentials = (uname, pswd) => 
{
    if (uname.length < 3 || pswd.length < 4)
    {
        return 'invalid';
    }
    else
    {
        return 'valid';
    }
};

const processInfo = async (request, response) =>
{
    uname = request.body.username;
    pswd = request.body.password;
    // validating the username and password
    const check = validateCredentials(uname, pswd);
    if (check == 'invalid')
    {
        return errorResponse(response, 400, 'Invalid Credentials!');
    }
    else
    {
        // checking if the user exists
        Citizen.findOne({ username: uname })
        .then(citizenInfo => 
        {
            if(citizenInfo)
            {
                // check if the citizen's account is not active
                if (citizenInfo.accountStatus=='inactive')
                {
                    return errorResponse(response, 400, 'Inactive Account!');
                }
                // check that the submitted password matches the saved one
                const hashedPassword = citizenInfo.password;
                bcrypt.compare(pswd, hashedPassword).then(async(result) => 
                {
                    if(result)
                    {
                        let token = generateToken(citizenInfo.username, hashedPassword);
                        await Citizen.updateOne({username: citizenInfo.username}, {$set: {userStatus: 'online'}});
                        // Send the token in an HTTP-only cookie
                        response.cookie("token", token, { httpOnly: true }).send();
                    }
                    else
                    {
                        return errorResponse(response, 400, 'Incorrect Username/Password combination!');
                    }
                });
            }
            else
            {
                return successResponse(response, 404, 'Confirm Citizen Creation', uname); 
            }  
        })
        .catch(err => 
        {
            return errorResponse(response, 500, `Error ${err.message}`);
        });
    }
}

const userCreation = (request, response) =>
{
    let pswd = request.body.password;
    let hashedPassword = hashPassword(pswd);

    let user = new User({
        "email": request.body.email,
        "firstName": request.body.firstName,
        "lastName": request.body.lastName,
        "gender": request.body.gender,
        "age": request.body.age,
        "dob": request.body.dob,
        "maritalStatus": request.body.maritalStatus,
        "nationality": request.body.nationality,
        "profilePhoto": request.body.profilePhoto,
        "password": hashedPassword,
        "idNumber": request.body.idNumber,
        "imageOfID": request.body.image,
        "accountStatus": "verified"
    });
    // adding the user to the db
    user.save((err) =>
    {
        if(err)
        {
            return errorResponse(response, 400, `Account creation failed`);
        }
        else
        {
            let token = generateToken(email, hashedPassword);
            // Send the token in an HTTP-only cookie
            response.cookie("token", token, { httpOnly: true }).send();
        }
    });
}


const logout = async (request, response) =>
{
    const token = request.cookies.token;
        if (token) {
            jwt.verify(token, process.env.secret, async (err, decodedToken) => {
              if (err) {
                console.log(err.message);
                response.send(false);
              } else {
                let uname = decodedToken.username;
                await Citizen.updateOne({username: uname}, {$set: {userStatus: 'offline'}});
                response.cookie("token", "", {httpOnly: true, expires: new Date(0)}).send();
              }
            });
          } else {
            response.send(false);
          }
    
    
}

const getUserDetails = async (request, response) =>
{
    try 
    {
        const token = request.cookies.token;
        if (token) {
            jwt.verify(token, process.env.secret, async (err, decodedToken) => {
              if (err) {
                console.log(err.message);
                response.send(false);
              } else {
                uname = decodedToken.username;
                let citizen = await Citizen.findOne({ username: uname });
                data = {username: citizen.username, status: citizen.userstatus, accountstatus: citizen.accountStatus, privilegelevel: citizen.privilegeLevel, id: citizen._id};
                response.send(data);
              }
            });
          } else {
            response.send(false);
          }
    } 
    catch (error) 
    {
        console.log(`Error ${error.message}`);
        response.send(false);
    }
}

const checkLogIn = (request, response) =>
{
    try 
    {
        // get the cookie token
        const token = request.cookies.token;
        // If user doesnt have a cookie token return unauthorized
        if (!token) return response.json(false);
        // if token exist
        jwt.verify(token, process.env.secret);
        response.send(true);
    } 
    catch (error) 
    {
        console.log(`Error ${error.message}`);
        response.json(false);
    }
}

const getUserStatus = async (request, response) => {
    let uname = request.body.username;
    let citizen = await Citizen.findOne({ username: uname });
    data = {status: citizen.userStatus};
    response.send(data);
}

module.exports = { validateCredentials, processInfo, userCreation, getAllCitizens, logout, getUserDetails, checkLogIn, getUserStatus};