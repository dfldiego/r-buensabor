/**
 *  path: /api/send-email
 */

const express = require('express');
const { checkAdminRole, checkToken } = require('../middlewares/authentication');
const emailController = require('../controllers/email.controller');
const app = express();

app.post('/', [checkToken], emailController.send);

module.exports = app;