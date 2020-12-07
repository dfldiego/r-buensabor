/**
 * Path: /api/address
 */

const { Router } = require("express");
const { checkToken } = require('../middlewares/authentication');
const addressController = require('../controllers/address.controller');
const router = Router();

router.get('/', addressController.list);
router.post('/', addressController.create);
router.put('/:id', addressController.update);
router.delete('/:id', addressController.remove);

module.exports = router;