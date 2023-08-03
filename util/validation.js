function isEmpty ( value){
    return !value || value.trim() === "";
}

function userDetailsAreValid (email, password, fullname, street, postal, city){
    return (
        email &&
        email.includes("@") &&
        password &&
        password.trim().length >= 6 &&
        !isEmpty(fullname) && 
        !isEmpty(street) && 
        !isEmpty(postal) && 
        !isEmpty(city)
    );
}

function emailIsConfirmed (email, confirmEmail) {
    return email === confirmEmail;
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed
};


 
  