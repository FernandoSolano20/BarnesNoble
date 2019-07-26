'use strict';

const mongoose = require('mongoose');

//Esquema de la sucursal

let sucursal_schema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    localizacionLongitud: { type: String, required: true, unique: false },
    localizacionLatitud: { type: String, required: true, unique: false },
    IdLibreria: { type: String, required: false, unique: false },
    IdProvincia: { type: String, required: false, unique: false },
    IdCanton: { type: String, required: false, unique: false },
    IdDistrito: { type: String, required: false, unique: false }

});

module.exports = mongoose.model('sucursal', sucursal_schema);