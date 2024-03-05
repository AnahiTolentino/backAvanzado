const asyncHandler = require ('express-async-handler')
const Tarea = require ('../models/tareasModel')
const getTareas = asyncHandler (async (req, res) => {

    const tareas = await Tarea.find({user : req.user.id})
    res.status(200).json(tareas)
})

const createTareas = asyncHandler (async (req, res) => {


    if(!req.body.description){
        res.status(400)
        throw new ERROR ('Por favor, teclea una descripción')  //éste es el error que va aparecer en el middleware
    }

    const tarea = await Tarea.create({
        description: req.body.description,
        user: req.user.id
    })

    res.status(201).json(tarea)
})



const updateTareas = asyncHandler( async (req, res) => {

const tarea = await Tarea.findById(req.params.id)

if (!tarea) {
    res.status(400)
    throw new Error ('Esa tarea no existe')
}

//nos aseguramos que la tarea pertezca al usuario loggeado, es decir el del token
if (tarea.user.toString() !== req.user.id) {
    res.status (401)
    throw new Error('Usuario no autorizado')
    } else {
    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(tareaUpdated)
    }
})

const deleteTareas = asyncHandler (async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)
})


module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}