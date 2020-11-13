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
app.use('/api/departamentos', require('./routes/departamento.routes'));
app.use('/api/domicilios', require('./routes/domicilio.routes'));
app.use('/api/roles', require('./routes/rol.routes'));
app.use('/api/clientes', require('./routes/cliente.routes'));
app.use('/api/empleados', require('./routes/empleado.routes'));

//iniciar el servidor de express
app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en puerto " + process.env.PORT);
});
