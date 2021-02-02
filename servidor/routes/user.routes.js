/**
 *  path: /api/users
 */
const express = require('express');
/* const { Router } = require('express'); */
const app = express();
const { checkAdminRole, checkToken } = require('../middlewares/authentication');
const userController = require('../controllers/user.controller');
/* const router = Router(); */


app.get('/', [checkToken], userController.list);
app.post('/', [checkToken], userController.create);
app.get('/:id', [checkToken], userController.getById);
app.put('/:id', [checkToken], userController.update);
app.delete('/:id', [checkToken], userController.remove);
app.get('/search/:words', userController.search);

module.exports = app;