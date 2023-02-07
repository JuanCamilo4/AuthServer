const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//CREAR EL SERVIDOR
const app = express();

//DATABASE
dbConnection();

//DIRECTORIO PUBLICO
app.use(express.static('public'))

//CORS
app.use(cors());

//LECTURA Y PARSEO DEL BODY
app.use(express.json());

//RUTAS
app.use('/api/auth', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+process.env.PORT);
})