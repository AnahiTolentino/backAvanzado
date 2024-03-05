const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require ('express-async-handler')
const User = require ('../models/usersModel')



const crearUser = asyncHandler (async (req, res) => {

//desestructuramos el body
    const { name, email, password } = req.body

//verificamos que nos pasen todos los datos para crear un usuario
    if (!name || !email || !password) {
        res.status(400)
        throw new Error ('Faltan datos')
    }

//Verificar que el usuario no exista a través de su email
const userExiste = await User.findOne({email})
    if (userExiste) {
        res.status(400)
        throw new Error ('Ese ususario ya existe en la base de datos')
    }

//Hacemos un HASH en el password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

//Crear el usuario
const user = await User.create({
    name,
    email,
    password: hashedPassword
})

if (user) {
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
    })
} else {
    res.status(400)
    throw new Error ('No se pudieron guardar los datos')
}


    //res.status(201).json ({ menssage: 'Crear Usuario'}) ésra sería otra forma de respuesta en lugar del if/else
})

const loginUser = asyncHandler (async (req, res) => {

    const { email, password } = req.body

    //Verificar que exista un usuario con ese email
    const user = await User.findOne({email})  //Al colocar findOne, nos vaa traer todos los datos del usuario que tenga email y lo va a poner en el obejto o constante user

    //Si el usuario existe, verificamos también el password
    if (user && (await bcrypt.compare (password, user.password))) { //Aquí el usuario se compara con el hash y si son iguales, nos muestra el usuario y sino aparece credenciales incorrectas
        res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generarToken(user.id)  //si nos loggeamos, que nos muestre el token
        })
        } else {
            res.status(400)
            throw new Error('Credenciales incorrectas')
        }
})

const datosUser = asyncHandler (async (req, res) => {
    res.status(200).json (req.user)
})

//Función para generar el token
const generarToken = (id_usuario) => {
    return jwt.sign ({id_usuario}, process.env.JWT_SECRET, {
        expiresIn: '30d'
        })
    }
    

module.exports = {
    crearUser,
    loginUser,
    datosUser
}