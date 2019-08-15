'use strict'

const mongoose = require('mongoose');

let libreriaSchema = new mongoose.Schema({
    nombreComercial: {type: String, required: true, unique: false },
    nombreFantasia: {type: String, required: true, unique: false },
    localizacionLatitud: { type: String, required: false, unique: false },
    localizacionLongitud: { type: String, required: false, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    estado: { type: Boolean, required: false, unique: false },
    sucursales: [{
        sucursal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sucursal',
            required: false
        }
    }],
    ejemplares: [{
        libro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ejemplar',
            required: false
        },
        cantidad: { type: Number, required: false, unique: false },
        estado: { type: Boolean, required: false, unique: false },
        iva: { type: Number, required: false, unique: false },
        vendidos: { type: Number, required: false, unique: false }
    }]
});


module.exports= mongoose.model('Libreria', libreriaSchema);