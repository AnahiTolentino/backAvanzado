//[este archivo va a cachar cualquier posible error

const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500 //este tipo de código se llama operación ternario (es un if: si tengo un error lo escribo y sino aparece un 500 que es el else )
    
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
})
}
module.exports = {
    errorHandler
    }