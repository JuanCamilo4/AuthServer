const { Router } = require('express');
const { newUser, login } = require('../controllers/auth');

const router = new Router();

router.post('/', login);

router.post('/new', newUser);

module.exports = router;