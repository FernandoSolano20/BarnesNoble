'use strict';

const mongoose = require('mongoose');

//Esquema de la clubLectura

let clubLectura_schema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    tema: { type: String, required: true, unique: false },
    tipoClub: { type: String, required: true, unique: false },
    fechaReunion: { type: String, required: true, unique: false },
    horaReunion: { type: String, required: true, unique: false },
    genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        required: false
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: false
    },
    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: false
    },
    administrador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    participantes: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: false
        }
    }],
    chat: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: false
        },
        mensaje: { type: String, required: false, unique: false }
    }]
});

module.exports = mongoose.model('clubLectura', clubLectura_schema);