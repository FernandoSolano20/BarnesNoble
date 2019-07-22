'use strict'

const mongoose = require('mongoose');

let librosSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique: false },
    edicion: { type: String, required: true, unique: false },
    editorial: { type: String, required: true, unique: false },
    annoEdicion: { type: String, required: true, unique: false },
    isbl: { type: String, required: true, unique: false },
    caratula: { type: String, required: true, unique: false },
    contraportada: { type: String, required: true, unique: false },
    precio: { type: String, required: true, unique: false },
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
    }
});


module.exports = mongoose.model('Libro', librosSchema);