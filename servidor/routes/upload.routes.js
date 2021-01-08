/**
 *  path: /api/upload
 */

const { Router } = require('express');
const uploadController = require('../controllers/upload.controller');
const router = Router();

router.put('/:type/:id', uploadController.upload);

module.exports = router;