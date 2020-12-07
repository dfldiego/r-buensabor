/**
 *  path: /api/users
 */

const { Router } = require('express');
const { checkAdminRole, checkToken } = require('../middlewares/authentication');
const userController = require('../controllers/user.controller');
const router = Router();

router.get('/', [checkToken], userController.list);
router.post('/', userController.create);
router.put('/:id', [checkToken], userController.update);
router.delete('/:id', [checkToken], userController.remove);

module.exports = router;