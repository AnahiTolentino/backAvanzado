const express = require('express') /*Aquí estamos importando express guardado en una constante*/
const colors = require ('colors') 
const connectDB = require ('./config/db')
const dotenv = require('dotenv').config() /*Mandamos a llamar a dotenv que sirve para nuestras variables de entorno*/
/*Con las dos líneas de arriba, estamos importando las librerías que instalamos antes para que estén accesibles en la aplicación*/
const { errorHandler } = require ('./middleware/errorMiddleware')
const port = process.env.PORT || 5000 /*Aquí definimos el puerto de escucha de nuestro backend*/

connectDB ()

const app = express() /*En esta línea iniciamos nuestra aplicación y la ejecutamos y definiendo nuestra aplicación con el número de puerto que está escuchando*/
/*Recordemos que con EXPRES se usan backticks `` */

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))

app.use (errorHandler)  //Aquí le estamso diciendo a la app que vamos a usaer el manejador de errores

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`)) /*Aquí ejecutamos una función flecha que nos indica que el servidor está inicalizado*/
