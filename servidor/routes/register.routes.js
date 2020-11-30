/**
 *  path: /api/register
 */
const { Router } = require('express');
const userController = require('../controllers/user.controller');
const router = Router();

router.post('/', userController.create);

module.exports = router;