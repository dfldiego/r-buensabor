const express = require('express');
const app = express();

app.use('/api/users', require('./user.routes'));
app.use(require('./login.routes'));
app.use('/api/register', require('./register.routes'));
app.use('/api/address', require('./address.routes'));
app.use('/api/menu', require('./menu.routes'));
app.use('/api/product', require('./product.routes'));
app.use('/api/generalCategory', require('./generalCategory.routes'));

module.exports = app;