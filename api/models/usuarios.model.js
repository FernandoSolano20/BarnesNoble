'user strict'

const mongoose = require('mongoose');
//Esquema del contracto//

let usuarios_schema = new mongoose.Schema({

/*Datos Generales*/
nombre : {type: String, required : true, unique : false},
nombre2 : {type: String, required : false, unique : false},
apellido1 : {type: String, required : true, unique : false},
apellido2 : {type: String, required : false, unique : false},
nacimiento : {type: Date, required: true, unique: false},
img: { type: String, required: true},
sexo : {type: String, required: true, unique : false},
correo : {type: String, required: true, unique: true},
cedula : {type: Number, required : true, unique : true},
pass : {type: String, required: true, unique: false},
telefono : {type: Number, required: true, unique: false},
tipoUsuario: {type: String, required: true, unique: false},


/*Direccion*/

provincia: {type: String, required : true, unique : false},
canton : {type: String, required : true, unique : false},
distrito: {type: String, required : true, unique : false},
sennas : {type: String, required : true, unique : false},
  

/*Datos Extra-Lector*/

alias : {type: String, required : false, unique : false},
autor : {type: String, required : false, unique : false},
genero : {type: String, required : false, unique : false},
libro : {type: String, required : false, unique : false},

/*Datos Extra-Libreria*/

nombreFantasia : {type: String, required : false, unique : false},
nombreComercial : {type: String, required : false, unique : false}


});

module.exports = mongoose.model('Usuarios', usuarios_schema); 