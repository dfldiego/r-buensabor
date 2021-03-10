const validateTimeTokens = async (responseToken) => {
    console.log("responseToken", responseToken);
    let momentoActual = new Date();
    console.log("momentoActual", momentoActual);
    let expirationTimeStamp = Date.parse(responseToken.dateExpiration);
    let expirationDate = new Date(expirationTimeStamp);
    console.log("expirationTimeStamp", expirationTimeStamp);
    console.log("expirationDate", expirationDate);
    if (Date.parse(momentoActual) > expirationDate) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    validateTimeTokens,
}