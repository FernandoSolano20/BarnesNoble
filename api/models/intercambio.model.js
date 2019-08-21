'use strict';

const mongoose = require('mongoose');

//Esquema del intercambio
let intercambio_schema = new mongoose.Schema({
    nombre: { type: String, required: false, unique: false },
    fechaInicio: { type: Date, required: false, unique: false },
    fechaFin: { type: Date, required: false, unique: false },
    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: false
    },

    participantes: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: false
        },
        ejemplarUsuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ejemplar',
            required: false
        },
        tipoUsuario: { type: String, required: false, unique: false }
    }],
    aprobado: { type: Boolean, required: false, unique: false},
    terminado: { type: Boolean, required: false, unique: false}
});

module.exports = mongoose.model('Intercambio', intercambio_schema);