const validateTimeTokens = async (responseToken) => {
    console.log(responseToken);
    let momentoActual = new Date();

    let expirationTimeStamp = Date.parse(responseToken.dateExpiration);
    let expirationDate = new Date(expirationTimeStamp);

    if (Date.parse(momentoActual) > expirationDate) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    validateTimeTokens,
}