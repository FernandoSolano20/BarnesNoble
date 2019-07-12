'use strict'

const mongoose = require('mongoose');

let generoSchema = new mongoose.Schema({
    nombre: {type: String, required: true, unique: false },
    descripcion: {type: String, required: true, unique: false },
    estado: {type: Boolean, required: true, unique: false}
});


module.exports= mongoose.model("Genero", generoSchema);