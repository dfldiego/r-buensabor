/**
 * path: /api/roles
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const rolController = require('../controllers/rol.controller');
const router = Router();

router.get('/', rolController.obtenerRol);
router.post('/', [
    check('denominacion_rol', 'La denominacion del rol es obligatoria').not().isEmpty(),
    validarCampos
], rolController.crearRol);
router.put('/:id', [
    check('denominacion_rol', 'La denominacion del rol es obligatoria').not().isEmpty(),
    validarCampos
], rolController.actualizarRol);
router.delete('/:id', rolController.eliminarRol);

module.exports = router;