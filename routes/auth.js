const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength(3),
    validarCampos
], login);

router.post('/new', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength(3),
    validarCampos
], newUser);

module.exports = router;