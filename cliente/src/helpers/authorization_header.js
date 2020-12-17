const authorizationHeader = (token) => {
    const header = {
        headers: {
            'Authorization': `${token}`
        }
    }

    return header;
}

module.exports = {
    authorizationHeader
}