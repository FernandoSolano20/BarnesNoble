'use strict'

const mongoose = require('mongoose');

let librosSchema = new mongoose.Schema({
    titulo: {type: String, required: true, unique: false },
    edicion: {type: String, required: true, unique: false },
    editorial: {type: String, required: true, unique: false},
    annoEdicion: {type: String, required: true, unique: false},
    isbl: {type: String, required: true, unique: false},
    caratula: {type: String, required: true, unique: false},
    contraportada: {type: String, required: true, unique: false},
    precio: {type: String, required: true, unique: false},
    vendidos:{type: Number, required: false, unique: false},
    idGenero: {type: String, required: false, unique: false},
    idCategoria: {type: String, required: false, unique: false},
    idAutor: {type: String, required: false, unique: false}
});


module.exports= mongoose.model('Libros', librosSchema);