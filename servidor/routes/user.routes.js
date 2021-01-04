/**
 *  path: /api/users
 */

const { Router } = require('express');
const { checkAdminRole, checkToken } = require('../middlewares/authentication');
const userController = require('../controllers/user.controller');
const router = Router();

router.get('/', [checkToken], userController.list);
router.post('/', [checkToken], userController.create);
router.get('/:id', [checkToken], userController.getById);
router.put('/:id', [checkToken], userController.update);
router.delete('/:id', [checkToken], userController.remove);
router.get('/search/:words', userController.search);

module.exports = router;