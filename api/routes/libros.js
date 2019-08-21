// ARCHIVO ROUTE PARA LISTAR, REGISTRAR LIBROS, MARCO ARAGON
'use strict'
const express = require('express'),
    router = express.Router(),
    Libros = require('../models/libros.model'),
    Autor = require('../models/autor.model');

router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;

})

router.post('/registrarLibro', function (req, res) {
    let body = req.body;
    let nuevoLibro = new Libros({
        titulo: body.titulo,
        caratula: body.caratula,
        contraportada: body.contraportada,
        genero: body.genero,
        categoria: body.categoria,
        autor: body.autor,
        resenna: body.resenna
    });

    nuevoLibro.save(
        function (err, libroDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'No se registro el libro correctamente',
                    err
                });

            } else {
                res.json({
                    success: true,
                    message: 'Se registró correctamente el libro'
                });
            }
        }
    );
});

router.get('/listarLibros', async (req, res) => {
    return await Libros.find(function (err, LibrosBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ningún libro',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibros: LibrosBD
            });
        }
    })
        .populate('genero', 'nombre _id')
        .populate('categoria', 'nombre _id')
        .populate('autor', 'nombre nombreArtistico _id')
        .select('titulo caratula contraportada genero categoria autor');
});

router.get('/buscarLibroID/:id', async (req, res) => {

    return await Libros.findById(req.params.id, function (err, LibroBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ningún libro',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibro: LibroBD
            });
        }
    })
        .populate('genero', 'nombre _id')
        .populate('categoria', 'nombre _id')
        .populate('autor', '_id nombre resenna fechaNacimiento fechaMuerte nombreArtistico nacionalidad foto lugarNacimiento')
        .populate('voto.usuario', '_id nombre primerApellido img')
        .select('titulo caratula contraportada genero categoria autor voto resenna');

});

router.get('/listarMasVendidos', function (req, res) {
    let criterioOrden = { vendidos: -1 };
    Libros.find(function (err, LibrosBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pueden listar los libros',
                err
            });
        } else {
            return res.json({
                success: true,
                listaLibros: LibrosBD
            });
        }
    }).limit(25).sort(criterioOrden)

        .populate('autor', 'nombre nombreArtistico -_id')
        .populate('genero', 'nombre -_id')
        .populate('categoria', 'nombre -_id')
        .select('titulo caratula autor genero categoria voto vendidos');

});

router.get('/titulo/:titulo', async (req, res) => {
    return await Libros.find({ "titulo": { "$regex": req.params.titulo, "$options": "i" } }, function (err, LibroBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ningún libro',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibro: LibroBD
            });
        }
    })
        .select('titulo');

});

//SofiaZu-Prefrencia de libros del usuario
router.post('/listarLibrosPorPreferencia', async (req, res) => {
    Libros.find({ genero: req.body.genero, autor: req.body.autor, categoria: req.body.categoria }, function (err, librosPreferidos) {
        if (librosPreferidos != "") {
            return res.json({
                success: true,
                listaLibros: librosPreferidos
            });
        }
        else {
            // el $or busca las prefrencias por separado entre los libros
            Libros.find({ $or: [{ genero: req.body.genero }, { autor: req.body.autor }, { categoria: req.body.categoria }] }, function (err, librosPreferidos) {
                if (librosPreferidos != "") {
                    return res.json({
                        success: true,
                        listaLibros: librosPreferidos
                    });
                }
                else {
                    return res.json({
                        success: false,
                        message: "No se encontro nada"
                    });
                }
            })
        }
    })
});

router.get('/countLibros', function (req, res) {
    Libros.countDocuments(function (err, count) {
        return res.json({
            success: true,
            count: count
        });
    });
})

router.patch('/votarLibro', function (req, res) {
    Libros.findByIdAndUpdate(req.body.idLibro, {
        $push: {
            'voto': {
                usuario: req.body.idUsuario,
                calificacion: req.body.voto,
                comentario: req.body.comentario
            }
        }
    }, function (err, voto) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Ocurrio un error al votar por el libro',
                err
            });
        }
        else {
            return res.json({
                success: true,
                message: "El voto se ha guardado en el sistema"
            });
        }
    });;
})

router.get('/listarMejoreCalificados', function (req, res) {
    let criterioOrden = { "voto.calificacion": -1 };

    Libros.aggregate(
        [{
            $unwind: "$voto"
        }, {
            "$group": {
                "_id": {
                    "_id": "$_id",
                    "titulo": "$titulo",
                    "autor": "$autor"
                },
                "average": { "$avg": "$voto.calificacion" }
            }
        }, {
            "$sort":
            {
                "average": -1
            }
        }, {
            "$limit": 25
        }])
        .exec(function (err, transactions) {
            Autor.populate(transactions, { path: '_id.autor', select: '_id nombre' }, function (err, populatedTransactions) {
                return res.json({
                    success: true,
                    listaLibros: populatedTransactions
                });
            });
        });

});
//Creado por Fran
router.get('/listarLibrosPorIdDB/:id', function (req, res) {
    Libros.findById( req.params.id , function (err, librosDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los libros',
                err
            });
        } else {
            return res.json({
                success: true,
                listaLibros: librosDB
            })
        }
    });
});

//Creado por Fran
router.put('/editar/:id', function (req, res) {
    Libros.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El libro no se pudo editar',
                err
            });
        }
        Libros.findById(req.params.id, (err, libros) => {
            return res.status(200).json({
                success: true,
                message: "libro editado",   
                libros: libros
            })
        });
    });
});

//Creado por Fran
router.post('/eliminarLibro', function (req, res) {
    let body = req.body;
    Libros.findByIdAndRemove(body._id,
         function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El libro no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Libro eliminado'
        });
    });
});

//Creado por Fran
router.patch('/modificarEstado/:id', function (req, res) {
    Libros.findById(req.params.id, (err, libros) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado de el libro',
                err
            });
        }

        libros.set(req.body);

        libros.save((err, librosDB) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado de el libro',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Libro activado",
                    libros: librosDB
                };
            } else {
                response = {
                    success: true,
                    message: "Libro desactivado",
                    libros: librosDB
                };
            }
            return res.status(200).json({ response });
        });
    });
});


module.exports = router;