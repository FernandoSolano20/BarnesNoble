'use strict'

const express = require('express'),
    router = express.Router(),
    Ofertas = require('../models/ofertas.model'),
    nodeMailer = require("nodemailer"),
    Sucursal = require('../models/sucursal.model'),
    mongoose = require('mongoose');

router.param('id', function (req, res, next, id) {
    req.body.id = id;
    next();
})

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'grupovalhalla2019@gmail.com',
        pass: 'BarnesNoblePass123'
    }
});

//Definición de la ruta para registrar ofertas

router.post('/registrarOferta', function (req, res) {
    let body = req.body;
    let nuevaOferta = new Ofertas({
        nombre: body.nombre,
        descuento: body.descuento,
        descripcion: body.descripcion,
        estado: body.estado
    });
    if (body.sucursal)
        nuevaOferta.sucursal = body.sucursal;
    if (body.libreria)
        nuevaOferta.libreria = body.libreria;
    if (body.genero)
        nuevaOferta.genero = body.genero;
    if (body.categoria)
        nuevaOferta.categoria = body.categoria;
    if (body.libro)
        nuevaOferta.libro = body.libro;
    if (body.autor)
        nuevaOferta.autor = body.autor;

    nuevaOferta.save(
        function (err, oferta) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No registró la oferta correctamente',
                    err
                });

            } else {
                if (body.sucursal) {
                    Sucursal.findById(body.sucursal, function (err, sucursal) {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                msj: 'No se encontro la surcusal',
                                err
                            });
                        }
                        else {
                            let terxtoCorreo = ``;

                            let usuarios = sucursal.usuariosSubscritos;
                            for (let i = 0; i < usuarios.length; i++) {
                                let mailOption = {
                                    from: 'grupovalhalla2019@gmail.com',
                                    to: usuarios[i].correo,
                                    subject: `Oferta en sucursal ${sucursal.nombre} `,
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
                                    <h1>Nueva oferta en ${sucursal.nombre}</h1>
        
                                  <p>La sucursal ${sucursal.nombre} ha creado una nueva oferta.</p>
                                  <p>El nombre de la oferta es ${body.nombre}</p>
                                  <p>Para más información entrar a la aplicación<p>
                                    <a href="http://localhost:3000/inicioSesion.html" class="boton">Ingresar a Barnes & Noble </a>
                                  </div>
        
                                </body>
        
                              </html>`
                                };
                                transporter.sendMail(mailOption, function (error, info) {
                                    if (error) {
                                        return res.json({
                                            success: true,
                                            message: `Ocurrio un error al envio del correo, contacte con el administrador de la plataforma`
                                        })
                                    }
                                    return res.json({
                                        success: true,
                                        message: 'Se registró correctamente la oferta'
                                    })
                                });
                            }
                        }
                    })
                }
                res.json({
                    success: true,
                    msj: 'Se registró correctamente la oferta'
                });
            }
        }
    );
});

router.get('/listarOfertas', function (req, res) {
    Ofertas.find(function (err, OfertasBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las ofertas',
                err
            });
        } else {
            return res.json({
                success: true,
                listaOfertas: OfertasBD
            });
        }
    })
        .populate('sucursal', 'nombre _id')
        .populate('libreria', 'nombreFantasia _id')
        .populate('autor', 'nombre -_id')
        .populate('genero', 'nombre -_id')
        .populate('categoria', 'nombre -_id')
        .populate('libro', 'titulo -_id')
        .select('nombre descripcion descuento estado sucursal libreria autor genero categoria libro');
});

router.get('/buscarOfertaId/:id', function (req, res) {
    Ofertas.findById(req.body.id, function (err, OfertaBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontró algún con ese id',
                err
            });
        } else {
            return res.json({
                success: true,
                listaOfertas: OfertaBD
            });
        }
    })
});

router.put('/editar/:id', function (req, res) {
    Ofertas.findByIdAndUpdate(req.params.id), { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La oferta no se registró',
                err

            });
        }
        Ofertas.findById(req.params.id, (err, ofertas) => {
            return res.status(200).json({
                success: true,
                message: "Oferta editada",
                ofertas: ofertas
            })
        });
    };
});

router.delete('/eliminar/:id', function (req, res) {
    Ofertas.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La oferta no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Oferta elimnada"
        });
    });
});

router.patch('/modificarEstado/:id', function (req, res) {
    Ofertas.findById(req.params.id, (err, ofertas) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado del género',
                err
            });
        }

        ofertas.set(req.body);

        ofertas.save((err, OfertasBD) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado de la oferta',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Oferta activa",
                    genero: OfertasBD
                };
            } else {
                response = {
                    success: true,
                    message: "Oferta inactiva",
                    genero: OfertasBD
                };
            }
            return res.status(200).json({ response });
        });
    });
});


router.patch('/listarOfertasPorTiendas', function (req, res) {
    let sucursales = [];
    for (var i = 0; i < req.body.sucursal.length; i++)
        sucursales.push(new mongoose.Types.ObjectId(req.body.sucursal[i]));

    Ofertas.find({ $or: [{ libreria: req.body.libreria }, { sucursal: { $in: sucursales } }] }, function (err, OfertasBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las ofertas',
                err
            });
        } else {
            return res.json({
                success: true,
                listaOfertas: OfertasBD
            });
        }
    })
        .populate('sucursal', 'nombre -_id')
        .populate('libreria', 'nombreFantasia -_id')
        .populate('autor', 'nombre -_id')
        .populate('genero', 'nombre -_id')
        .populate('categoria', 'nombre -_id')
        .populate('libro', 'titulo -_id')
        .select('nombre descripcion descuento estado sucursal libreria autor genero categoria libro');
});

router.get('/listarOfertasPorLibreriasId/:id', function (req, res) {
    Ofertas.find({ libreria: req.params.id }, function (err, OfertasBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las ofertas',
                err
            });
        } else {
            return res.json({
                success: true,
                listaOfertas: OfertasBD
            });
        }
    })
});

router.get('/listarOfertasPorSucursalesId/:id', function (req, res) {
    Ofertas.find({ sucursal: req.params.id }, function (err, OfertasBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las ofertas',
                err
            });
        } else {
            return res.json({
                success: true,
                listaOfertas: OfertasBD
            });
        }
    })
});

router.post('/modificarOferta/:id', function (req, res) {
    let body = req.body;
    Ofertas.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar la oferta' });
            } else {
                res.json({ success: true, msg: 'Se modificó la oferta correctamente' });

            }
        }
    )
});

module.exports = router;