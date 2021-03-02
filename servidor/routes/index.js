const express = require('express');
const app = express();

app.use('/api/users', require('./user.routes'));
app.use(require('./login.routes'));
app.use('/api/register', require('./register.routes'));
app.use('/api/address', require('./address.routes'));
app.use('/api/menu', require('./menu.routes'));
app.use('/api/menudetail', require('./menu-details.routes'));
app.use('/api/product', require('./product.routes'));
app.use('/api/menu-categories', require('./menu-categories.routes'));
app.use('/api/product-categories', require('./product-categories.routes'));
app.use('/api/upload', require('./upload.routes'));
app.use('/api/image', require('./image.routes'));
app.use('/api/order', require('./order.routes'));
app.use('/api/order-detail', require('./order-detail.routes'));
app.use('/api/config', require('./config.routes'));
app.use('/api/send-email', require('./email.routes'));
app.use('/api/pdf', require('./pdf-generator.routes'));
app.use('/api/bill', require('./bill.routes'));
app.use('/api/excel', require('./excel.routes'));

module.exports = app;