'user strict'

const mongoose = require('mongoose');
//Esquema de tarjeta//

let tarjeta_schema = new mongoose.Schema({

/*Datos Generales*/
nombre1 : {type: String, required : true, unique : false},
tipoTarjeta : {type: String, required: true, unique: false},
numTarjeta : {type: Number, required : true, unique : false},
expiracion : {type: Date, required : true, unique : false},
cvv : {type: Number, required : true, unique : false},

});

module.exports = mongoose.model('Tarjeta', tarjeta_schema); 