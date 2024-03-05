const jwt = require ('jsonwebtoken')
const asyncHandler = require ('express-async-handler')
const User = require ('../models/usersModel')

const protect = asyncHandler (async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith ('Bearer')) {
        try {
            //obetenemos el token
            token = req.headers.authorization.split(' ') [1]

            //verificamos el token a través de su firma
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Obtener los datos del usuario del token que pasé a través, del payload
            req.user = await User.findById(decoded.id_usuario).select('-password')  //Me va a traer todos los datos que concuerden con ese id. menos el password

            next()
            
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ('Acceso no autorizado')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error ('Acceso no autorizado, no se proporcionó un token')
    }
})


module.exports = { protect }