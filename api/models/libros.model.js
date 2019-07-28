'use strict'

const mongoose = require('mongoose');

let librosSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique: false },
    caratula: { type: String, required: true, unique: false },
    contraportada: { type: String, required: true, unique: false },
    vendidos: {type: Number, required: false, unique: false},
    genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: true
    },
    voto: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: false
        },
        calificacion: { type: Number, required: false, unique: false },
        comentario: { type: String, required: true, unique: false }
    }]
});


module.exports = mongoose.model('Libro', librosSchema);