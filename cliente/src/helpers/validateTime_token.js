const validateTimeTokens = async (responseToken) => {
    console.log("responseToken", responseToken);    //exp

    let momentoActual = new Date();
    console.log("momentoActual", momentoActual);

    let expirationTimeStamp = Date.parse(responseToken.dateExpiration);
    console.log("expirationTimeStamp", expirationTimeStamp);    //1615750143153

    responseToken.exp = expirationTimeStamp;

    let expirationDate = new Date(expirationTimeStamp);
    console.log("expirationDate", expirationDate);

    console.log("responseToken.exp", responseToken.exp);

    if (Date.parse(momentoActual) > responseToken.exp) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    validateTimeTokens,
}