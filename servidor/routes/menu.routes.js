/**
 *  path: /api/menu
 */

const Router = require('express');
const { checkToken } = require('../middlewares/authentication');
const menuController = require('../controllers/menu.controller');
const router = Router();

router.get('/', [checkToken], menuController.list);

router.post('/', [checkToken], menuController.create);

router.get('/:id', menuController.getById);

router.put('/:id', [checkToken], menuController.update);

router.delete('/:id', [checkToken], menuController.remove);

router.get('/search/:words', [checkToken], menuController.search);

module.exports = router;