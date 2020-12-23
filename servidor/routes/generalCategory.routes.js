/**
 *  path: /api/generalCategory
 */

const { Router } = require('express');
const { checkAdminRole, checkToken } = require('../middlewares/authentication');
const generalCategoryController = require('../controllers/generalCategory.controller');
const router = Router();

router.get('/', [checkToken], generalCategoryController.list);
router.post('/', [checkToken], generalCategoryController.create);
router.put('/:id', [checkToken], generalCategoryController.update);
router.delete('/:id', [checkToken], generalCategoryController.remove);

module.exports = router;