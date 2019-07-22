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
    idProvincia: { type: String, required: false, unique: false },
    idCanton: { type: String, required: false, unique: false },
    idDistrito: { type: String, required: false, unique: false },
    idAutor: { type: String, required: false, unique: false },
    idGenero: { type: String, required: false, unique: false },
    idLibro: { type: String, required: false, unique: false },
    idCategoria: { type: String, required: false, unique: false },
    idLibreria: { type: String, required: false, unique: false },
    cambiarPass: { type: Boolean, required: true, unique: false, default: true }
});

module.exports = mongoose.model('Usuarios', usuarios_schema); 