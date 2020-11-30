/**
 *  path: /api/login
 */

const { Router } = require('express');
const loginController = require('../controllers/login.controller');
const router = Router();

router.post('/login', loginController.login);
router.post('/login-google', loginController.loginGoogle);

module.exports = router;