const mongoose = require('mongoose');

const dbconnection = async () => {
    try {
        // conexion sacada de pagina de mongoose
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Connection database successfully');
    } catch (error) {
        console.log(error);
        throw new Error('Error trying to connect to the database')
    }
}

module.exports = {
    dbconnection
}