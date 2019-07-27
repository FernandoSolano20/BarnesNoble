'use strict'

const mongoose = require('mongoose');

let librosTipoLibroSchema = new mongoose.Schema({
    idLibro: {type: String, required: true, unique: false },
    idTipoLibro: {type: String, required: true, unique: false },
    stock: {type: Number, required: true, unique: false }
    
});


module.exports= mongoose.model('LibrosTipoLibro', librosTipoLibroSchema);