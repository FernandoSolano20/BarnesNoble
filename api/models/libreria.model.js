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
});


module.exports= mongoose.model('Libreria', libreriaSchema);