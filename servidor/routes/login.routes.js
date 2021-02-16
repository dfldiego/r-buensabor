/**
 *  path: empty
 */

const { Router } = require('express');
const { checkToken } = require('../middlewares/authentication');
const loginController = require('../controllers/login.controller');
const router = Router();

router.post('/login', loginController.login);
router.post('/login-google', loginController.loginGoogle);
router.post('/refresh-token', [checkToken], loginController.renewToken);

module.exports = router;