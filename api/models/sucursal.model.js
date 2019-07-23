'use strict';

const mongoose = require('mongoose');

//Esquema de la sucursal

let sucursal_schema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    localizacionLongitud: { type: String, required: true, unique: false },
    localizacionLatitud: { type: String, required: true, unique: false },
    libreria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libreria',
        required: true
    }, 
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false }

});

module.exports = mongoose.model('Sucursal', sucursal_schema);