/**
 * path: /api/personas
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const personaController = require('../controllers/persona.controller');
const router = Router();

router.get('/', personaController.obtenerPersona);
router.post('/', [
    check('nombre_persona', 'El nombre de la persona es obligatoria').not().isEmpty(),
    check('apellido_persona', 'La apellido de la persona es obligatoria').not().isEmpty(),
    check('telefono_persona', 'El telefono de la persona es obligatoria').not().isEmpty(),
    check('email_persona', 'El email es obligatoria').isEmail(),
    check('contrasena_persona', 'La contraseña de la persona es obligatoria').not().isEmpty(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    validarCampos
], personaController.crearPersona);
router.put('/:id', [
    check('nombre_persona', 'El nombre de la persona es obligatoria').not().isEmpty(),
    check('apellido_persona', 'La apellido de la persona es obligatoria').not().isEmpty(),
    check('telefono_persona', 'El telefono de la persona es obligatoria').not().isEmpty(),
    check('email_persona', 'El email es obligatoria').isEmail(),
    check('contrasena_persona', 'La contraseña de la persona es obligatoria').not().isEmpty(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    validarCampos
], personaController.actualizarPersona);
router.delete('/:id', personaController.eliminarPersona);

module.exports = router;