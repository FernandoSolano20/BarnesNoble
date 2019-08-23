'use strict';

const express = require('express'),
    router = express.Router(),
    nodeMailer = require("nodemailer"),
    ClubLectura = require('../models/clubLectura.model');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'grupovalhalla2019@gmail.com',
        pass: 'BarnesNoblePass123'
    }
});
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
                    message: 'El club de lectura no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    message: 'El club de lectura se guardó con éxito'
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
    ClubLectura.findById(req.params.id, function (err, clubesLecturaBD) {
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
        .populate('participantes.usuario', '_id nombre primerApellido correo img')
        .select('nombre tema tipoClub fechaReunion horaReunion administrador sucursal participantes chat genero categoria');
});

router.patch('/suscribirUsuarioClubLectura', function (req, res) {
    if (req.body.idUsuario && req.body.idClubLectura) {
        ClubLectura.findById(req.body.idClubLectura, (err, clubLectura) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se encontro este club de lectura',
                    err
                });
            }
            ClubLectura.updateOne({ _id: req.body.idClubLectura }, {
                $push: {
                    'participantes': {
                        usuario: req.body.idUsuario,
                        correo: req.body.correo
                    }
                }
            },
                function (err, club) {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: 'No se pudo realizar la suscripcion',
                            err
                        })
                    } else {
                        let mailOption = {
                            from: 'grupovalhalla2019@gmail.com',
                            to: req.body.correo,
                            subject: `Subcripcion a club ${clubLectura.nombre} ${clubLectura.tema}`,
                            html: `<html>
                                    <head>
                                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
                                    <style>
                                    .wrapper{
                                    background : #81ecec;
                                    font-family: 'Roboto', sans-serif;
                                    }
                                    .container{
                                    margin: 0 auto;
                                    background: #fff;
                                    width: 500px;
                                    text-align: center;
                                    padding: 10px;
                                    }
                                    .boton{
                                    background: #ff7675;
                                    color: #fff;
                                    display: block;
                                    padding: 15px;
                                    text-decoration: none;
                                    width: 50%;
                                    margin: 0 auto;
                                    }
                                    </style>
                                    </head>
                                    <body class="wrapper">
                                    <div class="container">
                                        <h1>Subscripción al club ${clubLectura.nombre}</h1>

                                    <p>Usted se ha subscripto al ${clubLectura.nombre} ${clubLectura.tema}</p>
                                    <p>El correo electrónico asociado es: ${req.body.correo}</p>
                                    <p>Para ingresar visite nuestra página<p>
                                        <a href="http://localhost:3000/inicioSesion.html" class="boton">Ingresar a Barnes & Noble </a>
                                    </div>

                                    </body>

                                </html>`
                        };
                        transporter.sendMail(mailOption, function (error, info) {
                            if (error) {
                                return res.json({
                                    success: true,
                                    message: `El usuario se subscribió con exitosa`
                                })
                            }
                            return res.json({
                                success: true,
                                message: 'El usuario se subscribió con exitosa'
                            })
                        });
                    }
                });
        });
    }
    else {
        return res.json({
            success: false,
            message: 'Debe seleccionar un usuario y una libreria',
            err
        })
    }
});

router.patch('/desuscribirUsuarioClubLectura', function (req, res) {
    if (req.body.idUsuario && req.body.idClubLectura) {
        ClubLectura.findOne({ _id: req.body.idClubLectura, "participantes.usuario": req.body.idUsuario }, (err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El usuario no esta suscrito a este club de lectura',
                    err
                });
            }
            ClubLectura.updateOne({ _id: req.body.idClubLectura }, {
                $pull: {
                    'participantes': {
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
    else {
        return res.json({
            success: false,
            message: 'Debe seleccionar un usuario y una librería',
            err
        })
    }
});


module.exports = router;


router.put('/modificarClubLectura/:id', function (req, res) {
    let body = req.body;

    ClubLectura.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },
        function (error) {
            if (error) {
                res.json({ success: false, message: 'No se pudo modificar el club' });
            } else {
                res.json({ success: true, message: 'El club se modificó con éxito' });
            }
        }
    )
});

router.delete('/eliminarClubLectura/:id', function (req, res) {
    ClubLectura.findByIdAndRemove(req.params.id,
        function (error) {
            if (error) {
                res.json({ success: false, message: 'No se pudo borrar el club' });
            } else {
                res.json({ success: true, message: 'El club se borró con éxito' });
            }
        }
    )
});
