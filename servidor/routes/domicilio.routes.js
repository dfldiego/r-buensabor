/**
 * path:  /api/domicilios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const domicilioController = require('../controllers/domicilio.controller');
const router = Router();

router.post('/', [
    check('calle_domicilio', 'La calle del domicilio es obligatorio').not().isEmpty(),
    check('numero_domicilio', 'La numero del domicilio es obligatorio').not().isEmpty(),
    check('id_departamento', 'Debe indicar el departamento donde se ubica el domicilio').not().isEmpty(),
    validarCampos
], domicilioController.CrearDomicilio);

router.get('/', domicilioController.obtenerDomicilio);

router.put('/:id', [
    check('calle_domicilio', 'La calle del domicilio es obligatorio').not().isEmpty(),
    check('numero_domicilio', 'La numero del domicilio es obligatorio').not().isEmpty(),
    check('id_departamento', 'Debe indicar el departamento donde se ubica el domicilio').not().isEmpty(),
    validarCampos
], domicilioController.actualizarDomicilio);

router.delete('/:id', domicilioController.eliminarDomicilio);

module.exports = router;