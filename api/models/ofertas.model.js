'use strict'

const mongoose = require('mongoose');

let ofertasSchema = new mongoose.Schema({
    tipoOferta: {type: String, required: true, unique: false },
    descuento: {type: String, required: true, unique: false },
    descripcion: {type: String, required: true, unique: false},
    idSucursal: {type: String, required: false, unique: false},
    idGenero: {type: String, required: false, unique: false},
    idCategoria: {type: String, required: false, unique: false},
    idLibro: {type: String, required: false, unique: false},
    idAutor: {type: String, required: false, unique: false}
});


module.exports= mongoose.model('Ofertas', ofertasSchema);