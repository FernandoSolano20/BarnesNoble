'use strict';

const mongoose = require('mongoose');

//Esquema de la sucursal

let sucursal_schema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    localizacionLongitud: { type: String, required: true, unique: false },
    localizacionLatitud: { type: String, required: true, unique: false },
<<<<<<< HEAD
    libreria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libreria',
        required: true
    }, 
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false }

=======
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    estado: { type: Boolean, required: false, unique: false },
    ejemplares: [{
        libro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Libro',
            required: false
        },
        cantidad: { type: Number, required: false, unique: false },
        estado: { type: Boolean, required: false, unique: false },
        iva: { type: Number, required: false, unique: false }
    }],
    usuariosSubscritos: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: false
        }
    }]
>>>>>>> de1939adb83ba2acf509665bfa1c57864f530291
});

module.exports = mongoose.model('Sucursal', sucursal_schema);