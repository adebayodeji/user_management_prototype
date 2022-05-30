class Validator {
    
    isUsernameValid(username){
        if(username.length < 3 ){
            return false;
        } else{
            return true;
        }
    }

    isPassword(password){
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        if(strongPassword.test(password)){
            return true;
        }
    }

    isPasswordValid(password){
        if(password.length < 4 ){
            return false;
        } else{
            return true;
        }
    } 
}

module.exports = new Validator();