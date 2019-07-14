'use strict'

const mongoose = require('mongoose');

let categoriaSchema = new mongoose.Schema({
    nombre: {type: String, required: true, unique: false },
    descripcion: {type: String, required: true, unique: false },
    estado: {type: Boolean, required: true, unique: false}
});


module.exports= mongoose.model("Categoria", categoriaSchema);