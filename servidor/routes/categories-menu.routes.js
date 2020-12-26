/**
 *  path: /api/categories-menu
 */

const { Router } = require('express');
const { checkAdminRole, checkToken } = require('../middlewares/authentication');
const categoriesMenuController = require('../controllers/categories-menu.controller');
const router = Router();

router.get('/', [checkToken], categoriesMenuController.list);
router.post('/', [checkToken], categoriesMenuController.create);
router.put('/:id', [checkToken], categoriesMenuController.update);
router.delete('/:id', [checkToken], categoriesMenuController.remove);

module.exports = router;