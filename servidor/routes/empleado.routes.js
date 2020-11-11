/**
 * path: /api/empleados
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const empleadoController = require('../controllers/empleado.controller');
const router = Router();

router.get('/', empleadoController.obtenerEmpleado);
router.post('/', [
    check('persona', 'La persona es obligatoria').not().isEmpty(),
    check('dni_empleado', 'El dni es obligatorio').not().isEmpty(),
    check('fecha_ingreso', 'La fecha de ingreso es obligatoria').not().isEmpty(),
    validarCampos
], empleadoController.crearEmpleado);
router.put('/:id', [
    check('persona', 'La persona es obligatoria').not().isEmpty(),
    check('dni_empleado', 'El dni es obligatorio').not().isEmpty(),
    check('fecha_ingreso', 'La fecha de ingreso es obligatoria').not().isEmpty(),
    validarCampos
], empleadoController.actualizarEmpleado);
router.delete('/:id', empleadoController.eliminarEmpleado);

module.exports = router;