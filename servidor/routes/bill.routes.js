/**
 *  path: /api/bill
 */

const express = require('express');
const billController = require('../controllers/bill.controller');
const app = express();

app.get('/', billController.list);
app.post('/', billController.create);
app.put('/:id', billController.update);
app.delete('/:id', billController.remove);

module.exports = app;