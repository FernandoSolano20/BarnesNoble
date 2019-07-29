'use strict'

const mongoose = require('mongoose');

let ejemplarSchema = new mongoose.Schema({
    tipo: { type: String, required: true, unique: false },
    precio: {type: Number, required: true, unique: false},
    isbn10: { type: String, required: true, unique: false },
    isbn13: { type: String, required: true, unique: false },
    editorial: { type: String, required: true, unique: false },
    edicion: { type: String, required: true, unique: false },
    annoEdicion: { type: String, required: true, unique: false },
    cantidad: {type: Number, required: true, unique: false},
    formatoDigtal: {type: String, required: false, unique: false},
    libro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    }
});

module.exports = mongoose.model('Ejemplar', ejemplarSchema);