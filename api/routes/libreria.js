'use strict'

const express = require('express'),
    router = express.Router(),
    Libreria = require('../models/libreria.model'),
    mongoose = require('mongoose'),
    Ejemplar = require('../models/ejemplar.model'),
    Libro = require('../models/libros.model'),
    Usuario = require('../models/usuarios.model'),
    Sucursal = require('../models/sucursal.model'),
    ClubLectura = require('../models/clubLectura.model');


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
        .populate('sucursales.sucursal', 'nombre correo telefono usuariosSubscritos estado')
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
                Libro.updateOne({ _id: req.body.id }, { $inc: { "vendidos": (req.body.cantidad) } }, function (err, libro) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'No se agregaron los libros al catálogo de libros de la librería',
                            err
                        })
                    }
                    else {
                        if (libro.n) {
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
                                        message: 'Se agregaron los libros al catálogo de libros de la librería'
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
                                                    message: 'Se agregaron los libros al catálogo de libros de la librería'
                                                })
                                            }
                                        }
                                    )

                                }
                            });
                        } else {
                            return res.json({
                                success: false,
                                message: 'Error al actulizar el libro',
                                err
                            })
                        }
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
        .populate('sucursales.sucursal', 'nombre')
        .select('nombreFantasia sucursales')
});

router.patch('/modificarEstadoLibreria/:id', function (req, res) {
    Libreria.findById(req.params.id, (err, libreria) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado de la librería',
                err
            });
        }

        libreria.set(req.body);

        libreria.save((err, libreriaDB) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado de la librería',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Librería activada",
                    libreria: libreriaDB
                };
            } else {
                response = {
                    success: true,
                    message: "Librería desactivada",
                    libreria: libreriaDB
                };
            }
            return res.status(200).json({ response });
        });
    });
});


router.post('/obtenerLibreriasPorEjemplaresId', function (req, res) {
    Libreria.find({ "ejemplares.libro": req.body.ejemplar }, function (err, librerias) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro libreria',
                err
            });
        } else {
            return res.json({
                success: true,
                librerias: librerias
            });
        }
    })
        .select("nombreFantasia");
});

router.post('/obtenerCantidadEjemplarPorLibreria', function (req, res) {
    Libreria.findOne({
        _id: req.body.idLibreria,
        'ejemplares.libro': req.body.ejemplar
    }, {
            'ejemplares.$': 1
        }, function (err, ejempl) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se encontro libros',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    ejemplar: ejempl
                });
            }
        });
});

router.get('/listarLibreriasCompletas', async (req, res) => {
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
        .select('nombreComercial nombreFantasia localizacionLatitud localizacionLongitud provincia canton distrito estado sucursales ejemplares');
});

router.delete('/eliminarLibreria/:id', function (req, res) {

    ClubLectura.findOne({ libreria: req.params.id }).then(
        function (libreria) {
            if (libreria) {
                return res.json({
                    success: false,
                    message: 'La librería esta asociada a un club de lectura'
                });
            }
            else {
                Libreria.findByIdAndDelete(req.params.id, function (err, libreria) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Ocurrio un error'
                        });
                    }
                    else {
                        Usuario.deleteOne({ libreria: req.params.id }, function (err, user) {
                            if (err) {
                                return res.json({
                                    success: false,
                                    message: 'Ocurrio un error'
                                });
                            }
                            else {
                                let sucursales = [];
                                for (var i = 0; i < libreria.sucursales.length; i++)
                                    sucursales.push(new mongoose.Types.ObjectId(libreria.sucursales[i].sucursal));

                                Sucursal.remove({ _id: { $in: sucursales } }, function (err, sucursal) {
                                    if (err) {
                                        return res.status(400).json({
                                            success: false,
                                            message: 'El usuario no se pudo eliminar',
                                            err
                                        });
                                    }
                                    return res.status(200).json({
                                        success: true,
                                        message: "Libreria elimnada"
                                    });
                                })
                            }
                        })
                    }
                });
            }
        })
});

router.patch('/modificarEstadoLibreria/:id', function (req, res) {
    Libreria.findById(req.params.id, (err, libreria) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado de la librería',
                err
            });
        }

        libreria.set(req.body);

        libreria.save((err, libreriaDB) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado de la librería',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Librería activada",
                    autor: libreriaDB
                };
            } else {
                response = {
                    success: true,
                    message: "Librería desactivada",
                    autor: libreriaDB
                };
            }
            return res.status(200).json({ response });
        });
    });
});



module.exports = router;