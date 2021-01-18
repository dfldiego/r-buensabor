require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbconnection } = require('./database/config');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");

// crear el servidor de express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// middelware que captura todos los archivos que se estan subiendo y los pone dentro del objeto "files"
app.use(fileUpload({ useTempFiles: true }));

// configurar cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// base de datos
dbconnection();

// directorio publico
app.use(express.static('public'));

// rutas
app.use(require('./routes/index'));

//iniciar el servidor de express
app.listen(process.env.PORT, () => {
    console.log("Listening requests in the port " + process.env.PORT);
});
