'use strict';

const mongoose = require('mongoose');

//Esquema de la clubLectura

let clubLectura_schema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    tema: { type: String, required: true, unique: false },
    tipoClub: { type: String, required: true, unique: false },
    fechaReunion: { type: String, required: true, unique: false },
    horaReunion: { type: String, required: true, unique: false },
    IdGenero: { type: String, required: false, unique: false },
    IdCategoria: { type: String, required: false, unique: false },
    IdUsuario: { type: String, required: false, unique: false },
    IdclubLectura: { type: String, required: false, unique: false },
    IdChat: { type: String, required: false, unique: false }

});

module.exports = mongoose.model('clubLectura', clubLectura_schema);