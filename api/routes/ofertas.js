'use strict'

const express = require('express'),
    router = express.Router(),
    Ofertas = require('../models/ofertas.model'),
    mongoose = require('mongoose');
router.param('id', function (req, res, next, id) {
    req.body.id = id;
    next();
})

//Definición de la ruta para registrar ofertas

router.post('/registrarOferta', function (req, res) {
    let body = req.body;
    let nuevaOferta = new Ofertas({
        nombre: body.nombre,
        tipoOferta: body.tipoOferta,
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
    Ofertas.findById(req.params.id, (err, genero) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado del género',
                err
            });
        }

        Ofertas.set(req.body);

        Ofertas.save((err, OfertasBD) => {
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
        .select('nombre descripcion descuento estado tipoOferta sucursal libreria autor genero categoria libro');
});

module.exports = router;