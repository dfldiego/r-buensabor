/**
 *  path: /api/order-detail
 */

const express = require('express');
const { checkToken } = require('../middlewares/authentication');
const orderDetailController = require('../controllers/order-detail.controller');
const app = express();

app.get('/', [checkToken], orderDetailController.list);

app.post('/', [checkToken], orderDetailController.create);

app.put('/:id', [checkToken], orderDetailController.update);

app.delete('/:id', [checkToken], orderDetailController.remove);

app.post('/rank', [checkToken], orderDetailController.rank);

app.get('/income-day', [checkToken], orderDetailController.incomesDay);

app.get('/income-month', [checkToken], orderDetailController.incomesMonth);

app.get('/orders-client', [checkToken], orderDetailController.sizeofOrdersByClient);

module.exports = app;