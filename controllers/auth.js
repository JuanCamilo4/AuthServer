const { response } = require('express')

const newUser = (req, res = response) => {
    console.log(req.body);
    return res.json({status: 1, data: 'New'})
}

const login = (req, res = response) => {
        
    return res.json({status: 1, data: 'Login'})
}

module.exports = {
    newUser,
    login
}