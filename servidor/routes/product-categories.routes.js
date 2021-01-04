/**
 *  path: /api/product-categories
 */

const Router = require('express');
const { checkToken } = require('../middlewares/authentication');
const productCategoriesController = require('../controllers/product-categories.controller');
const router = Router();

router.get('/', [checkToken], productCategoriesController.list);

router.post('/', [checkToken], productCategoriesController.create);

router.put('/:id', [checkToken], productCategoriesController.update);

router.delete('/:id', [checkToken], productCategoriesController.remove);

module.exports = router;