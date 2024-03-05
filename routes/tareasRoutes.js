const express = require('express')
const router = express.Router()
const { getTareas, createTareas, updateTareas, deleteTareas } = require('../controllers/tareasController')
const { protect } = require ('../middleware/authMiddleware')

//router.route('/').get(protect, getTareas).post(protect, createTareas) éste es el mismo comando de abajo pero escito en una sola línea

router.get('/', protect, getTareas)

router.post('/', protect, createTareas)
//Línea 7 y 8 son lo mismo que línea5

router.put('/:id', protect, updateTareas)

router.delete('/:id', protect, deleteTareas)

module.exports = router