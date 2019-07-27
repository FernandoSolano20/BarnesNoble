'use strict'

const mongoose = require('mongoose');

let librosSucursalesSchema = new mongoose.Schema({
    sucursales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true
    },
    libro : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    },
    cantidad: { type: Number, required: true, unique: false },

});


module.exports= mongoose.model('librosSurcursales', librosSucursalesSchema);