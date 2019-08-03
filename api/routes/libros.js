// ARCHIVO ROUTE PARA LISTAR, REGISTRAR LIBROS, MARCO ARAGON
'use strict'
const express = require('express'),
    router = express.Router(),
    Libros = require('../models/libros.model');

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
        .populate('genero', 'nombre -_id')
        .populate('categoria', 'nombre -_id')
        .populate('autor', 'nombre -_id')
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
        .populate('genero', 'nombre -_id')
        .populate('categoria', 'nombre -_id')
        .populate('autor', '_id nombre resenna fechaNacimiento fechaMuerte nombreArtistico nacionalidad foto lugarNacimiento')
        .select('titulo caratula contraportada genero categoria autor');

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

        .populate('autor', 'nombre -_id')
        .populate('genero', 'nombre -_id')
        .populate('categoria', 'nombre -_id')
        .select('titulo caratula autor genero categoria');

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
    Libros.find({genero: req.body.genero, autor: req.body.autor, categoria: req.body.categoria},function (err, librosPreferidos) {
        if (librosPreferidos != "") {
            return res.json({
                success: true,
                listaLibros: librosPreferidos
            });
        }
        else {
            // el $or busca las prefrencias por separado entre los libros
            Libros.find({$or:[{genero: req.body.genero}, {autor: req.body.autor}, {categoria: req.body.categoria}]},function (err, librosPreferidos) {
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

module.exports = router;