const validateTimeTokens = async (responseToken) => {
    let momentoActual = new Date();
    let expirationTimeStamp = Date.parse(responseToken.dateExpiration);
    responseToken.exp = expirationTimeStamp;

    if (Date.parse(momentoActual) > responseToken.exp) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    validateTimeTokens,
}