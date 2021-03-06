/**
 *  path: /api/product
 */

const { Router } = require("express");
const { checkToken, checkAdminRole } = require('../middlewares/authentication');
const productController = require('../controllers/product.controller');
const router = Router();

router.get('/scarse', [checkToken], productController.scarse);
router.get('/', [checkToken], productController.list);
router.post('/', [checkToken], productController.create);
router.put('/:id', [checkToken], productController.update);
router.delete('/:id', [checkToken], productController.remove);
router.get('/search/:words', [checkToken], productController.search);
router.get('/:id', [checkToken], productController.getById);

module.exports = router;