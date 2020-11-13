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
    check('nombre_empleado', 'El nombre de la empleado es obligatoria').not().isEmpty(),
    check('apellido_empleado', 'La apellido de la empleado es obligatoria').not().isEmpty(),
    check('telefono_empleado', 'El telefono de la empleado es obligatoria').not().isEmpty(),
    check('email_empleado', 'El email es obligatoria').isEmail(),
    check('contrasena_empleado', 'La contraseña de la empleado es obligatoria').not().isEmpty(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], empleadoController.crearEmpleado);
router.put('/:id', [
    check('nombre_empleado', 'El nombre de la empleado es obligatoria').not().isEmpty(),
    check('apellido_empleado', 'La apellido de la empleado es obligatoria').not().isEmpty(),
    check('telefono_empleado', 'El telefono de la empleado es obligatoria').not().isEmpty(),
    check('email_empleado', 'El email es obligatoria').isEmail(),
    check('contrasena_empleado', 'La contraseña de la empleado es obligatoria').not().isEmpty(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], empleadoController.actualizarEmpleado);
router.delete('/:id', empleadoController.eliminarEmpleado);

module.exports = router;