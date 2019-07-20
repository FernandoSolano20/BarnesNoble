'use strict'

const mongoose = require('mongoose');

let autorSchema = new mongoose.Schema({
    nombre: {type: String, required: true, unique: false },
    resenna: {type: String, required: true, unique: false },
    fechaNacimiento: {type: Date, required: true, unique: false },
    fechaMuerte: {type: Date, required: false, unique: false },
    nombreArtistico: {type: String, required: true, unique: false },
    nacionalidad: {type: String, required: true, unique: false },
    foto: {type: String, required: true, unique: false },
    lugarNacimiento: {type: String, required: true, unique: false },
    estado: {type: Boolean, required: true, unique: false}
});


module.exports= mongoose.model("Autor", autorSchema);