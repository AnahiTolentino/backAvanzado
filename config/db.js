//Aquí nos vamos a conectar a la DB
//En el archivo .env sólo tenemos la cadena de conexión pero no, nos está conectando.
//Para conectar, vamos a requerir el paquete ya instalado de Mongoose

const mongoose = require ('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB;