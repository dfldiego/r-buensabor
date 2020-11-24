require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbconnection } = require('./database/config');

// crear el servidor de express
const app = express();

// configurar cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// base de datos
dbconnection();

// rutas
app.use(require('./routes/index'));

//iniciar el servidor de express
app.listen(process.env.PORT, () => {
    console.log("Listening requests in the port " + process.env.PORT);
});
