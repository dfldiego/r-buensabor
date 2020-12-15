/**
 *  path: /api/menudetail
 */

const { Router } = require("express");
const { checkToken, checkAdminRole } = require('../middlewares/authentication');
const menuDetailController = require('../controllers/menu-details.controller');
const router = Router();

router.get('/', [checkToken], menuDetailController.list);
router.post('/', [checkToken], menuDetailController.create);
router.put('/:id', [checkToken], menuDetailController.update);
router.delete('/:id', [checkToken], menuDetailController.remove);

module.exports = router;