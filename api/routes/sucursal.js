'use strict';

const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Sucursal = require('../models/sucursal.model'),
    Libreria = require('../models/libreria.model');

//Definición de la ruta para registrar contactos

router.post('/registrarSucursal', function (req, res) {
    let body = req.body;

    let nuevoSucursal = new Sucursal({
        nombre: body.nombre,
        telefono: body.telefono,
        correo: body.correo,
        localizacionLongitud: body.localizacionLongitud,
        localizacionLatitud: body.localizacionLatitud,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        estado: body.estado
    });

    nuevoSucursal.save(
        function (err, sucursalesDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'La sucursal no se pudo guardar',
                    err
                });
            } else {
                Libreria.findByIdAndUpdate(body.idLibreria, {
                    $push: {
                        'sucursales': {
                            sucursal: sucursalesDB._id
                        }
                    }
                }, function (err) {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: 'Ocurrio un error al asociar a la sucursal, comuniquese con el administrador',
                            err
                        });
                    }
                });
                res.status(200).json({
                    success: true,
                    msj: 'La sucursal se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listarSucursales', function (req, res) {
    Sucursal.find(function (err, sucursalesBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las sucursales',
                err
            });
        } else {
            return res.json({
                success: true,
                listaSucursales: sucursalesBD
            });
        }
    })
});

router.get('/sucursalId/:id', function (req, res) {
    Sucursal.findById(req.params.id, function (err, sucursaleBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las sucursales',
                err
            });
        } else {
            return res.json({
                success: true,
                sucursal: sucursaleBD
            });
        }
    })
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
});

router.get('/buscarIdLibreria/:id', function (req, res) {
    Sucursal.find({ libreria: req.params.id }, function (err, sucursalesBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las sucursales',
                err
            });
        } else {
            return res.json({
                success: true,
                listaSucursales: sucursalesBD
            });
        }
    })
});



router.get('/countSucursal', function (req, res) {
    Sucursal.countDocuments(function (err, count) {
        return res.json({
            success: true,
            count: count
        });
    });
})


router.patch('/comprarLibroSucursalLibreria', function (req, res) {
    let ejemplarId = new mongoose.Types.ObjectId(req.body.ejemplar);
    Libreria.findOne({ _id: req.body.idLibreria }, function (err, ejemp) {
        if (err) {
            return res.json({
                success: false,
                message: 'No se agregaron los libros al catálogo de libros de la librería',
                err
            })
        }
        else {
            let query;
            if (ejemp) {
                for (let i = 0; i < ejemp.ejemplares.length; i++) {
                    if (ejemp.ejemplares[i].libro == req.body.ejemplar) {
                        query = i;
                    }
                }
            }

            query = "ejemplares." + query + ".cantidad";
            Libreria.updateOne({ _id: req.body.idLibreria, "ejemplares.libro": req.body.ejemplar, [`${query}`]: { $gte: req.body.cantidad } }, { $inc: { [`${query}`]: -(req.body.cantidad) } }, function (err, ejemp) {
                if (err)
                    return res.json({
                        success: false,
                        message: 'No se agregaron los libros al catálogo de libros de la librería',
                        err
                    })
                else {
                    if (ejemp.n) {
                        Sucursal.updateOne({ _id: req.body.idSucursal, "ejemplares.libro": ejemplarId }, { $inc: { "ejemplares.$.cantidad": (req.body.cantidad) } }, function (err, ejemplar) {
                            if (err) {
                                return res.status(400).json({
                                    success: false,
                                    message: 'Ocurrio un error',
                                    err
                                });
                            } else if (ejemplar.n) {
                                return res.json({
                                    success: true,
                                    message: 'Se agregaron los libros al catálogo de libros de la sucursal'
                                })
                            }
                            else {
                                Sucursal.updateOne({ _id: req.body.idSucursal }, {
                                    $push: {
                                        'ejemplares': {
                                            libro: req.body.ejemplar,
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
                                                message: 'Se agregaron los libros al catálogo de libros de la sucursal'
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
                            err,
                            ejemp
                        })
                    }
                }
            })
        }
    });
});

router.patch('/pasarLibrosEntreSucursales', function (req, res) {
    let ejemplarId = new mongoose.Types.ObjectId(req.body.ejemplar);

    Sucursal.findOne({ _id: req.body.idSucursal }, function (err, ejemp) {
        if (err) {
            return res.json({
                success: false,
                message: 'No se agregaron los libros al catálogo de libros de la sucursal',
                err
            })
        }
        else {
            let query;
            if (ejemp) {
                for (let i = 0; i < ejemp.ejemplares.length; i++) {
                    if (ejemp.ejemplares[i].libro == req.body.ejemplar) {
                        query = i;
                    }
                }
            }

            query = "ejemplares." + query + ".cantidad";
            
            Sucursal.updateOne({ _id: req.body.idSucursal, "ejemplares.libro": req.body.ejemplar, [`${query}`]: { $gte: req.body.cantidad } }, { $inc: { [`${query}`]: -(req.body.cantidad) } }, function (err, ejemp) {
                if (err)
                    return res.json({
                        success: false,
                        message: 'No se agregaron los libros al catálogo de libros de la sucursal',
                        err
                    })
                else {
                    if (ejemp.n) {
                        Sucursal.updateOne({ _id: req.body.idSucursal2, "ejemplares.libro": ejemplarId }, { $inc: { "ejemplares.$.cantidad": (req.body.cantidad) } }, function (err, ejemplar) {
                            if (err) {
                                return res.status(400).json({
                                    success: false,
                                    message: 'Ocurrio un error',
                                    err
                                });
                            } else if (ejemplar.n) {
                                return res.json({
                                    success: true,
                                    message: 'Se agregaron los libros al catálogo de libros de la sucursal'
                                })
                            }
                            else {
                                Sucursal.updateOne({ _id: req.body.idSucursal2 }, {
                                    $push: {
                                        'ejemplares': {
                                            libro: req.body.ejemplar,
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
                                                message: 'Se agregaron los libros al catálogo de libros de la sucursal'
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
                            err,
                            ejemp
                        })
                    }
                }
            });
        }
    });
});

router.patch('/pasarLibrosEntreSucursalLibreria', function (req, res) {
    let ejemplarId = new mongoose.Types.ObjectId(req.body.ejemplar);

    Sucursal.findOne({ _id: req.body.idSucursal }, function (err, ejemp) {
        if (err) {
            return res.json({
                success: false,
                message: 'No se agregaron los libros al catálogo de libros de la sucursal',
                err
            })
        }
        else {
            let query;
            if (ejemp) {
                for (let i = 0; i < ejemp.ejemplares.length; i++) {
                    if (ejemp.ejemplares[i].libro == req.body.ejemplar) {
                        query = i;
                    }
                }
            }

            query = "ejemplares." + query + ".cantidad";
            Sucursal.updateOne({ _id: req.body.idSucursal, "ejemplares.libro": req.body.ejemplar, [`${query}`]: { $gte: req.body.cantidad } }, { $inc: { [`${query}`]: -(req.body.cantidad) } }, function (err, ejemp) {
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
                                    message: 'Se agregaron los libros al catálogo de libros de la librería'
                                })
                            }
                            else {
                                Libreria.updateOne({ _id: req.body.idLibreria }, {
                                    $push: {
                                        'ejemplares': {
                                            libro: req.body.ejemplar,
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
                    }
                    else {
                        return res.json({
                            success: false,
                            message: 'No hay muchos libros en stock',
                            err,
                            ejemp
                        })
                    }
                }
            });
        }
    });
});

router.post('/obtenerSucursalesPorEjemplaresId', function (req, res) {
    let ejemplares = [];
    for(let i = 0; i < req.body.ejemplar; i++){
        ejemplares.push(new mongoose.Types.ObjectId(req.body.ejemplar[i]));
    }
    Sucursal.find({ "ejemplares.libro": { $in: req.body.ejemplar } }, function (err, sucursales) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro sucursales',
                err
            });
        } else {
            return res.json({
                success: true,
                sucursales: sucursales
            });
        }
    })
    .select("nombre");
});

router.post('/obtenerCantidadEjemplarPorSucursal', function (req, res) {
    Sucursal.findOne({
        _id: req.body.idSucursal,
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

module.exports = router;