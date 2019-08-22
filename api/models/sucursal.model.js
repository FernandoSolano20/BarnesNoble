'use strict';

const mongoose = require('mongoose');

//Esquema de la sucursal

let sucursal_schema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    localizacionLongitud: { type: String, required: true, unique: false },
    localizacionLatitud: { type: String, required: true, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    estado: { type: Boolean, required: false, unique: false },
    ejemplares: [{
        libro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ejemplar',
            required: false
        },
        cantidad: { type: Number, required: false, unique: false },
        estado: { type: Boolean, required: false, unique: false },
        iva: { type: Number, required: false, unique: false },
        vendidos: { type: Number, required: false, unique: false }
    }],
    usuariosSubscritos: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: false
        },
        correo: { type: String, required: true, unique: false }
    }]
});

module.exports = mongoose.model('Sucursal', sucursal_schema);