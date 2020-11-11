/**
 *  path: /api/clientes
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const clienteController = require('../controllers/cliente.controller');
const router = Router();

router.post('/', [
    check('persona', 'La persona es obligatoria').not().isEmpty(),
    validarCampos
], clienteController.crearCliente);

router.get('/', clienteController.obtenerCliente);

router.put('/:id', [
    check('persona', 'La persona es obligatoria').not().isEmpty(),
    validarCampos
], clienteController.actualizarCliente);

router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;