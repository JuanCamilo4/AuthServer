const express = require('express');
const cors = require('cors');
require('dotenv').config();

//CREAR EL SERVIDOR
const app = express();

//CORS
app.use(cors());

//LECTURA Y PARSEO DEL BODY
app.use(express.json());

//RUTAS
app.use('/api/auth', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+process.env.PORT);
})