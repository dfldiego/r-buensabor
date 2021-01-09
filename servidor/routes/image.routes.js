/**
 * path: /api/image
 */

const express = require('express');
const imageController = require('../controllers/image.controller');
let app = express();

app.get('/:type/:img', imageController.getById);

module.exports = app;