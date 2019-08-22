'use strict';

const express = require('express'),
    router = express.Router(),
    ClubLectura = require('../models/clubLectura.model');

//Definición de la ruta para registrar contactos

router.post('/registrarClubLectura', function (req, res) {
    let body = req.body;

    let nuevoClubLectura = new ClubLectura({
        nombre: body.nombre,
        tema: body.tema,
        tipoClub: body.tipoClub,
        fechaReunion: body.fechaReunion,
        horaReunion: body.horaReunion,
        sucursal: body.sucursal,
        administrador: body.administrador,
        categoria: body.categoria,
        genero: body.genero
    });

    nuevoClubLectura.save(
        function (err, clubesLecturaDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El club de lectura no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'El club de lectura se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listarClubLectura', function (req, res) {
    ClubLectura.find(function (err, clubesLecturaBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los clubes de lectura',
                err
            });
        } else {
            return res.json({
                success: true,
                listaClubesLectura: clubesLecturaBD
            });
        }
    })
        .populate('administrador', '_id nombre primerApellido correo')
        .populate('sucursal', 'nombre _id')
        .populate('participantes.usuario', '_id nombre primerApellido correo')
        .select('nombre tema tipoClub fechaReunion horaReunion administrador sucursal participantes chat');
});

router.get('/listarClubLecturaPorUsuario/:id', function (req, res) {
    ClubLectura.find({ administrador: req.params.id }, function (err, clubesLecturaBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los clubes de lectura',
                err
            });
        } else {
            return res.json({
                success: true,
                listaClubesLectura: clubesLecturaBD
            });
        }
    })
        .populate('administrador', '_id nombre primerApellido correo')
        .populate('sucursal', 'nombre _id')
        .populate('participantes.usuario', '_id nombre primerApellido correo')
        .select('nombre tema tipoClub fechaReunion horaReunion administrador sucursal participantes chat');
});

router.get('/obtenerContClubAdministrador/:id', function (req, res) {
    ClubLectura.find({ administrador: req.params.id }).distinct('sucursal').countDocuments().exec(function (err, count) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden contar los clubes de lectura',
                err
            });
        } else {
            return res.json({
                success: true,
                count: count
            });
        }
    });
});

router.get('/listarClubLecturaPorId/:id', function (req, res) {
    ClubLectura.findById(req.params.id,function (err, clubesLecturaBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los clubes de lectura',
                err
            });
        } else {
            return res.json({
                success: true,
                clubLectura: clubesLecturaBD
            });
        }
    })
        .populate('administrador', '_id nombre primerApellido correo')
        .populate('sucursal', 'nombre _id')
        .populate('genero', 'nombre _id')
        .populate('categoria', 'nombre _id')
        .populate('participantes.usuario', '_id nombre primerApellido correo')
        .select('nombre tema tipoClub fechaReunion horaReunion administrador sucursal participantes chat genero categoria');
});

router.patch('/suscribirUsuarioClubLectura', function(req, res){
    if(req.body.idUsuario && req.body.idClubLectura){
        ClubLectura.findById(req.params.id, (err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se encontro este club de lectura',
                    err
                });
            }
            ClubLectura.updateOne({ _id: req.body.idClubLectura }, {
                $push: {
                    'usuariosSubscritos': {
                        usuario: req.body.idUsuario
                    }
                }
            },
            function (err, usuario) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se pudo realizar la suscripcion',
                        err
                    })
                } else {
                    return res.json({
                        success: true,
                        message: 'Subscripcion exitosa'
                    })
                }
            });
        });
    }
    else{
        return res.json({
            success: false,
            message: 'Debe seleccionar un usuario y una libreria',
            err
        }) 
    }
});

router.patch('/desuscribirUsuarioClubLectura', function(req, res){
    if(req.body.idUsuario && req.body.idClubLectura){
        ClubLectura.findOne({ _id: req.body.idClubLectura, "usuariosSubscritos.usuario": req.params.id }, (err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El usuario no esta suscrito a este club de lectura',
                    err
                });
            }
            ClubLectura.updateOne({ _id: req.body.idClubLectura }, {
                $pull: {
                    'usuariosSubscritos': {
                        usuario: req.body.idUsuario
                    }
                }
            },
            function (err, usuario) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se pudo cancelar la suscripción',
                        err
                    })
                } else {
                    return res.json({
                        success: true,
                        message: 'Subscripción cancelada'
                    })
                }
            });
        });
    }
    else{
        return res.json({
            success: false,
            message: 'Debe seleccionar un usuario y una librería',
            err
        }) 
    }
});


module.exports = router;


router.post('/modificarClubLectura', function(req, res) {
    let body = req.body;

    ClubLectura.findByIdAndUpdate(body._id, {
            $set: req.body
        },
        function(error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar el club' });
            } else {
                res.json({ success: true, msg: 'El club se modificó con éxito' });
            }
        }
    )
});

router.post('/eliminarClubLectura', function(req, res) {
    let body = req.body;

    ClubLectura.findByIdAndRemove(body._id,
        function(error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo borrar el club' });
            } else {
                res.json({ success: true, msg: 'El club se borró con éxito' });
            }
        }
    )
});
