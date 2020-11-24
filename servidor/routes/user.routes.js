/**
 *  path: /api/users
 */

const { Router } = require('express');
const userController = require('../controllers/user.controller');
const router = Router();

router.get('/', userController.list);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;