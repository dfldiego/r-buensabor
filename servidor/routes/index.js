const express = require('express');
const app = express();

app.use('/api/users', require('./user.routes'));
app.use(require('./login.routes'));
app.use('/api/register', require('./register.routes'));
app.use('/api/address', require('./address.routes'));

module.exports = app;