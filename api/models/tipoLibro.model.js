//modelo de TipoLibro, marco aragon
'use strict'

const mongoose = require('mongoose');

let tipoLibroSchema = new mongoose.Schema({
    tipo: {type: String, required: true, unique: false },
   
});


module.exports= mongoose.model('TipoLibro', tipoLibroSchema);