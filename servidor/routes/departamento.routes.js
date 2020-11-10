/**
 * path: /api/departamentos
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const departamentoController = require('../controllers/departamento.controller');
const router = Router();

router.post('/', [
    check('nombre_departamento', 'El nombre del departamento es obligatorio').not().isEmpty(),
    validarCampos
], departamentoController.CrearDepartamento);

router.get('/', departamentoController.obtenerDepartamento);

router.put('/:id', [
    check('nombre_departamento', 'El nombre del departamento es obligatorio').not().isEmpty(),
    validarCampos
], departamentoController.actualizarDepartamento);

router.delete('/:id', departamentoController.eliminarDepartamento);

module.exports = router;