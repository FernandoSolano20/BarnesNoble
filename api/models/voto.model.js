'use strict'

const mongoose = require('mongoose');

let votoSchema = new mongoose.Schema({
    voto: {type: String, required: true, unique: false },
    comentario: {type: String, required: false, unique: false },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    libro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    }
});


module.exports= mongoose.model("Voto", votoSchema);