'use strict'

const mongoose = require('mongoose');

let libreriaLibrosSchema = new mongoose.Schema({
    librerias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libreria',
        required: true
    }, 
    libro : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: true  
    },
    cantidad: { type: Number, required: true, unique: false },
    iva: { type: Number, required: true, unique: false },

});


module.exports= mongoose.model('libreriaLibros', libreriaLibrosSchema);