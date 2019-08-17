'use strict';

const mongoose = require('mongoose');

//Esquema del intercambio
let intercambio_schema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    fechaFin: { type: Date, required: true, unique: false },
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
        comentario: { type: String, required: false, unique: false },
        calificacion: { type: Number, required: false, unique: false },
        ejemplarUsuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Libro',
            required: false
        }
    }]
});

module.exports = mongoose.model('intercambio', intercambio_schema);