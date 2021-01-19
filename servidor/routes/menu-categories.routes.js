/**
 *  path: /api/menu-categories
 */

const { Router } = require('express');
const { checkAdminRole, checkToken } = require('../middlewares/authentication');
const menuCategoriesController = require('../controllers/menu-categories.controller');
const router = Router();

router.get('/', [checkToken], menuCategoriesController.list);
router.post('/', [checkToken], menuCategoriesController.create);
router.put('/:id', [checkToken], menuCategoriesController.update);
router.delete('/:id', [checkToken], menuCategoriesController.remove);
router.get('/search/:words', [checkToken], menuCategoriesController.search);

module.exports = router;