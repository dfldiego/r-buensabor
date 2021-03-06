/**
 *  path: /api/pdf
 */

const express = require('express');
/* const { checkToken } = require('../middlewares/authentication'); */
const pdfController = require('../controllers/pdf-generator.controller');
const app = express();

app.post('/', pdfController.create);

module.exports = app;