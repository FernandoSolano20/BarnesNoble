'use strict'

const express = require('express'),
    router = express.Router(),//permite crear la ruta
    Usuario = require('../models/usuarios.model');

router.post('/registrarUsuario', function (req, res) {
    let body = req.body;
    let nuevoUsuario = new Usuario({

        // /Datos Generales/
        id: body.id,
        nombre: body.nombre,
        segundoNombre: body.segundoNombre,
        primerApellido: body.primerApellido,
        segundoApellido: body.segundoApellido,
        correo: body.correo,
        pass: body.pass,
        img: body.img,
        sexo: body.sexo,
        telefono: body.telefono,
        tipoUsuario: body.tipoUsuario,
        nacimiento: body.nacimiento,
        sennas: body.sennas,
        alias: body.alias,

        localizacionLatitud: body.localizacionLatitud,
        localizacionLongitud: body.localizacionLongitud,
        estado: body.estado,

        // /Direccion/
        idProvincia: body.idProvincia,
        idCanton: body.idCanton,
        idDistrito: body.idDistrito,

        // /Datos Extra-Lector/
        idAutor: body.idAutor,
        idGenero: body.idGenero,
        idLibro: body.idLibro,
        idCategoria: body.idCategoria,

        // /Datos Extra-Libreria/
        idLibreria: body.idCategoria

    });

    Usuario.findOne({ id: req.body.id }).then(
        function (usuario) {
            if (usuario) {
                return res.json({
                    success: false,
                    message: 'La identificación ya se encuentra en el sistema'
                });
            }
            else{
                Usuario.findOne({ correo: req.body.correo }).then(
                    function (usuario) {
                        if (usuario) {
                            return res.json({
                                success: false,
                                message: 'El correo ya se encuentra en el sistema'
                            });
                        }
                        else{
                            Usuario.findOne({ telefono: req.body.telefono }).then(
                                function (usuario) {
                                    if (usuario) {
                                        return res.json({
                                            success: false,
                                            message: 'El teléfono ya se encuentra en el sistema'
                                        });
                                    }
                                    else{
                                        nuevoUsuario.save(
                                            function (err, usuarioDB) {
                                                if (err) {
                                                    return res.status(400).json({
                                                        success: false,
                                                        message: 'El usuario no se pudo guardar',
                                                        err
                                                    });
                                                } else {
                                                    return res.json({
                                                        success: true,
                                                        message: 'El usuario se guardó con éxito'
                                                    })
                                                }
                                            }
                                        );
                                    } 
                                }
                            );
                        } 
                    }
                );
            } 
        }
    );
});

router.post('/login', function (req, res) {
    Usuario.findOne({ correo: req.body.correo }).then(
        function (usuario) {
            if (usuario) {
                if (usuario.pass === req.body.pass) {
                    res.json({
                        success: true,
                        usuario: usuario
                    });
                }
                else {
                    res.json({
                        success: false
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'El usuario no existe'
                });
            }
        }
    );
});

router.get('/listarUsuarios', function (req, res) {
    Usuario.find(function (err, usuarios) {

        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los usuarios',
                err
            });
        } else {
            return res.json({
                success: true,
                listaUsuarios: usuarios
            })
        }
    });
});

router.put('/editar/:id', function (req, res) {
    Usuario.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no se pudo editar',
                err
            });
        }
        Usuario.findById(req.params.id, (err, usuario) => {
            return res.status(200).json({
                success: true,
                message: "Usuario editado",
                usuarios: usuarios
            })
        });
    });
});

router.delete('/eliminar/:id', function (req, res) {
    Usuario.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Usuario elimnado"
        });
    });
});

router.patch('/modificarEstado/:id', function (req, res) {
    Usuario.findById(req.params.id, (err, usuarios) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado del usuario',
                err
            });
        }

        usuarios.set(req.body);

        usuarios.save((err, usuariosDB) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado del usuario',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Usuario activado",
                    usuario: usuariosDB
                };
            } else {
                response = {
                    success: true,
                    message: "Usuario desactivado",
                    usuario: usuariosDB
                };
            }
            return res.status(200).json({ response });
        });
    });
});

module.exports = router;