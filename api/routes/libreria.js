'use strict'

const express = require('express'),
    router = express.Router(),//permite crear la ruta
    Libreria = require('../models/libreria.model'),
    mongoose = require('mongoose'),
    Ejemplar = require('../models/ejemplar.model');


router.get('/listarLibrerias', async (req, res) => {
    return await Libreria.find(function (err, librerias) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna librería',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibrerias: librerias
            });
        }
    })
        .populate('sucursales.sucursal', 'nombre')
        .select('nombreComercial nombreFantasia localizacionLatitud localizacionLongitud provincia canton distrito estado sucursales');
});

router.get('/libreriaId/:id', async (req, res) => {
    return await Libreria.findById(req.params.id, function (err, librerias) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna librería',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibrerias: librerias
            });
        }
    })
        .populate('sucursales.sucursal', 'nombre nombre localizacionLongitud localizacionLatitud provincia canton distrito correo telefono')
        .select('nombreComercial nombreFantasia localizacionLatitud localizacionLongitud provincia canton distrito sucursales');
});

router.get('/sucursalId/:id', function (req, res) {
    Libreria.find({ 'sucursales.sucursal': mongoose.Types.ObjectId(req.params.id) }, function (err, libreria) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro libreria',
                err
            });
        } else {
            return res.json({
                success: true,
                libreria: libreria
            });
        }
    })
});

router.get('/countLibreria', function (req, res) {
    Libreria.countDocuments(function (err, count) {
        return res.json({
            success: true,
            count: count
        });
    });
})


router.get('/obtenerTiendas', async (req, res) => {
    return await Libreria.find(function (err, librerias) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna librería',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibrerias: librerias
            });
        }
    })
        .populate('sucursales.sucursal', 'nombre correo telefono')
        .select('nombreFantasia sucursales');
});

router.patch('/comprarLibroLibreria', function (req, res) {
    let ejemplarId = new mongoose.Types.ObjectId(req.body.libro);
    Ejemplar.updateOne({ _id: req.body.libro, 'cantidad': { $gte: req.body.cantidad } }, { $inc: { "cantidad": -(req.body.cantidad) } }, function (err, ejemp) {
        if (err)
            return res.json({
                success: false,
                message: 'No se agregaron los libros al catálogo de libros de la librería',
                err
            })
        else {
            if (ejemp.n) {
                Libreria.updateOne({ _id: req.body.idLibreria, "ejemplares.libro": ejemplarId }, { $inc: { "ejemplares.$.cantidad": (req.body.cantidad) } }, function (err, ejemplar) {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: 'Ocurrio un error',
                            err
                        });
                    } else if (ejemplar.n) {
                        return res.json({
                            success: true,
                            message: 'Se agregaron los libros al catálogo de libros de la librería 1'
                        })
                    }
                    else {
                        Libreria.updateOne({ _id: req.body.idLibreria }, {
                            $push: {
                                'ejemplares': {
                                    libro: req.body.libro,
                                    cantidad: req.body.cantidad,
                                    estado: 1,
                                    iva: req.body.iva
                                }
                            }
                        },
                            function (err, ejemplar) {
                                if (err) {
                                    return res.status(400).json({
                                        success: false,
                                        message: 'No se pudo comprar el libro',
                                        err
                                    })
                                } else {
                                    return res.json({
                                        success: true,
                                        message: 'Se agregaron los libros al catálogo de libros de la librería 1'
                                    })
                                }
                            }
                        )

                    }
                });
            }
            else {
                return res.json({
                    success: false,
                    message: 'No hay muchos libros en stock',
                    err
                })
            }
        }
    });
});

router.get('/obtenerLibrosPorLibreriaID/:id', async (req, res) => {
    return await Libreria.findById(req.params.id, function (err, libreria) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna librería',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibrerias: libreria
            });
        }
    })
        // .populate({
        //     path: 'sucursales.sucursal',
        //     populate: {
        //         path: 'ejemplares.libro',
        //     populate: {
        //         path: 'libro',
        //         populate: {
        //             path: 'genero categoria autor',
        //             select: '_id nombre nombreArtistico'
        //         },
        //         select: '_id titulo genero categoria caratula contraportada'
        //     },
        //     select: '_id tipo precio isbn10 isbn13 cantidad iva libro'
        //     },
        //     select: '_id nombre'
        // })
        .populate({
            path: 'ejemplares.libro',
            populate: {
                path: 'libro',
                populate: {
                    path: 'genero categoria autor',
                    select: '_id nombre nombreArtistico'
                },
                select: '_id titulo genero categoria caratula contraportada'
            },
            select: '_id tipo precio isbn10 isbn13 cantidad iva libro'
        })
        .select('nombreFantasia sucursales ejemplares');
});

router.get('/obtenerSucursalesPorLibreriaId/:id', function (req, res) {
    Libreria.findById(req.params.id, function (err, libreria) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro libreria',
                err
            });
        } else {
            return res.json({
                success: true,
                libreria: libreria
            });
        }
    })
    .populate('sucursales.sucursal','nombre')
    .select('nombreFantasia sucursales')
});

module.exports = router;