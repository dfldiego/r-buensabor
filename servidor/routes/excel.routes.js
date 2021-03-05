/**
 *  path: /api/excel
 */

const express = require('express');
const excelController = require('../controllers/excel.controller');
const app = express();

app.post('/', excelController.create);

module.exports = app;