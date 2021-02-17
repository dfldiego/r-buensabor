const validateTimeTokens = async (responseToken) => {
    console.log(responseToken);

    let momentoActual = new Date();
    console.log(momentoActual);

    let expirationTimeStamp = Date.parse(responseToken.dateExpiration);
    let expirationDate = new Date(expirationTimeStamp);
    console.log(expirationDate);

    if (Date.parse(momentoActual) > expirationDate) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    validateTimeTokens,
}