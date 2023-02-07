const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult( req );
    if (!errors.isEmpty()) {
        res.status(400).json({status: 0, errors: errors.mapped()})
    }

    next();
}

module.exports = {
    validarCampos
}