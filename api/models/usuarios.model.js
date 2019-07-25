'user strict'

const mongoose = require('mongoose');
//Esquema del contracto//

let usuarios_schema = new mongoose.Schema({

    /*Datos Generales*/
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true, unique: false },
    segundoNombre: { type: String, required: false, unique: false },
    primerApellido: { type: String, required: true, unique: false },
    segundoApellido: { type: String, required: false, unique: false },
    correo: { type: String, required: true, unique: true },
    pass: { type: String, required: true, unique: false },
    img: { type: String, required: true, unique: false },
    sexo: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: true },
    tipoUsuario: { type: String, required: true, unique: false },
    nacimiento: { type: Date, required: true, unique: false },
    sennas: { type: String, required: false, unique: false },
    alias: { type: String, required: false, unique: false },
    localizacionLatitud: { type: String, required: false, unique: false },
    localizacionLongitud: { type: String, required: false, unique: false },
    estado: { type: Boolean, required: false, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    cambiarPass: { type: Boolean, required: true, unique: false, default: true },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: false
    },
    genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        required: false
    },
    libro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: false
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: false
    },
    libreria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libreria',
        required: false
    }
});

module.exports = mongoose.model('Usuario', usuarios_schema); 