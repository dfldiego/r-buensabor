/**
 * Path: /api/config
 */

const express = require('express');
const configController = require('../controllers/configuration.controller');
const app = express();

app.get('/', configController.list);
app.post('/', configController.create);
app.put('/:id', configController.update);

module.exports = app;