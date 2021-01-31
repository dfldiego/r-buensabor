/**
 *  path: /api/order
 */

const express = require('express');
const { checkToken } = require('../middlewares/authentication');
const orderDetailController = require('../controllers/order-detail.controller');
const app = express();

app.get('/', [checkToken], orderDetailController.list);

app.post('/', [checkToken], orderDetailController.create);

app.put('/:id', [checkToken], orderDetailController.update);

app.delete('/:id', [checkToken], orderDetailController.remove);

module.exports = app;