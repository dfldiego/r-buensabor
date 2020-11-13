/**
 *  path: /api/clientes
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const clienteController = require('../controllers/cliente.controller');
const router = Router();

router.get('/', clienteController.obtenerCliente);
router.post('/', [
    check('nombre_cliente', 'El nombre de la cliente es obligatoria').not().isEmpty(),
    check('apellido_cliente', 'La apellido de la cliente es obligatoria').not().isEmpty(),
    check('telefono_cliente', 'El telefono de la cliente es obligatoria').not().isEmpty(),
    check('email_cliente', 'El email es obligatoria').isEmail(),
    check('contrasena_cliente', 'La contraseña de la cliente es obligatoria').not().isEmpty(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    validarCampos
], clienteController.crearCliente);
router.put('/:id', [
    check('nombre_cliente', 'El nombre de la cliente es obligatoria').not().isEmpty(),
    check('apellido_cliente', 'La apellido de la cliente es obligatoria').not().isEmpty(),
    check('telefono_cliente', 'El telefono de la cliente es obligatoria').not().isEmpty(),
    check('email_cliente', 'El email es obligatoria').isEmail(),
    check('contrasena_cliente', 'La contraseña de la cliente es obligatoria').not().isEmpty(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    validarCampos
], clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;