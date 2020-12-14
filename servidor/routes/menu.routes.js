/**
 *  path: /api/menu
 */

const Router = require('express');
const { check } = require('express-validator');
const { checkToken } = require('../middlewares/authentication');
const { validarCampos } = require('../middlewares/validar-campos');
const menuController = require('../controllers/menu.controller');
const router = Router();

router.get('/', [checkToken], menuController.list);

router.post('/', [
    checkToken,
    check('description', 'La Denominacion es requerida').not().isEmpty(),
    check('finished_time', 'El tiempo estimado de cocina es requerido').not().isEmpty(),
    check('price', 'El precio es requerido').not().isEmpty(),
    validarCampos
], menuController.create);

router.put('/:id', [
    checkToken,
    check('description', 'La Denominacion es requerida').not().isEmpty(),
    check('finished_time', 'El tiempo estimado de cocina es requerido').not().isEmpty(),
    check('price', 'El precio es requerido').not().isEmpty(),
    validarCampos
], menuController.update);

router.delete('/:id', [checkToken], menuController.remove);

module.exports = router;