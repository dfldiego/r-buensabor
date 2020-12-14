/**
 * Path: /api/address
 */

const { Router } = require("express");
const { checkToken } = require('../middlewares/authentication');
const addressController = require('../controllers/address.controller');
const router = Router();

router.get('/', checkToken, addressController.list);
router.post('/', checkToken, addressController.create);
router.put('/:id', checkToken, addressController.update);
router.delete('/:id', checkToken, addressController.remove);

module.exports = router;