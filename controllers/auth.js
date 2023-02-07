const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const newUser = async(req, res = response) => {
    const { email, name, password } = req.body;

    try {
        let usuario = await Usuarios.findOne({ email: email });
        
        if (usuario) {
            res.status(400).json({ status: 0, data: 'El usuario con este correo ya existe' })
        }

        usuario = new Usuarios(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt, salt);

        const token = await generarJWT(usuario.id, name);

        let userDB = await usuario.save();

        res.status(200).json({ status: 1, data: {userDB, token}});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({status: 0, data: 'No se puedo crear'})
    }

    return res.json({status: 1, data: 'New'})
}

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const dbUser = await Usuarios.findOne({ email: email });

        if (!dbUser) {
            res.status(404).json({ status: 0, data: 'El correo no existe'})
        }

        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword) {
            res.status(404).json({ status: 0, data: 'El password no coincide'})
        }

        const token = await generarJWT(dbUser.id, dbUser.name);

        res.status(200).json({ status: 1, data: {dbUser, token} })

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 0, data: error })
    }
}

module.exports = {
    newUser,
    login
}