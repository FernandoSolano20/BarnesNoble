'use strict'

const mongoose = require('mongoose');

let ofertasSchema = new mongoose.Schema({
    nombre: {type: String, required: true, unique: true },
    descuento: {type: Number, required: true, unique: false },
    descripcion: {type: String, required: true, unique: false},
    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: false
    },
    libreria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libreria',
        required: false
    },
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
    libro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: false
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: false
    },
    estado: {type: Boolean, required: true, unique: false}
});


module.exports= mongoose.model('Ofertas', ofertasSchema);