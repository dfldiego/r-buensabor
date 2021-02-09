/**
 * Path: /api/config
 */

const express = require('express');
const { checkAdminRole, checkToken } = require('../middlewares/authentication');
const configController = require('../controllers/configuration.controller');
const app = express();

app.get('/', [checkToken], configController.list);
app.post('/', [checkToken], configController.create);
app.put('/:id', [checkToken], configController.update);
app.delete('/:id', [checkToken], configController.remove);

module.exports = app;