const express = require('express');
const app = express();

app.use('/api/users', require('./user.routes'));

module.exports = app;