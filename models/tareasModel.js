
//Éstos modelos sirven a través de mongoose y por ello lo vamos a mandar a llamar
//Con ello le estamos diciendo a nuestra coleeción, a través de éste moedelo, que para que yo pued acrear una tarea y alogarla
    //en la descripción que es de tipo string, se tienen que poner a la fuerza una descripción, sino nos va a marcar un error.
//El campo DESCRIPTION, tiene las siguientes propiedades: es de tipo string y es requerido.
//La propiedad timestamps: nos digitaliza y automatiza la fecha del registro
const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: [true, 'Por favor teclea una descripción']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)  //al escribirlo con letra capital y en singular, ésto va a crear una colección en plural, llamado Tareas