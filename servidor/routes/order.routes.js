/**
 *  path: /api/order
 */

const express = require('express');
const { checkToken } = require('../middlewares/authentication');
const orderController = require('../controllers/order.controller');
const app = express();

app.get('/:status?', [checkToken], orderController.list);

app.get('/search/:words', [checkToken], orderController.search);

app.post('/', [checkToken], orderController.create);

app.put('/:id', [checkToken], orderController.update);

app.delete('/:id', [checkToken], orderController.remove);

module.exports = app;