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
        edicion: body.edicion,
        editorial: body.editorial,
        annoEdicion: body.annoEdicion,
        isbn_10: body.isbn_10,
        isbn_13: body.isbn_13,
        caratula: body.caratula,
        contraportada: body.contraportada,
        precio: body.precio,
        vendidos: body.vendidos,
        genero: body.genero,
        categoria: body.categoria,
        autor: body.autor

    });

    nuevoLibro.save(
        function (err, libroDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No registrÃ³ el libro correctamente',
                    err
                });

            } else {
                res.json({
                    success: true,
                    msj: 'Se registrÃ³ correctamente el libro'
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
                msj: 'No se encontro ningún libro',
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
        .select('titulo edicion editorial annoEdicion isbn_10 isbn_13 caratula contraportada precio vendidos genero categoria autor');
});

router.get('/buscarLibroID/:id', async (req, res) => {

    return await Libros.findById(req.params.id, function (err, LibroBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro ningÃºn libro',
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
        .populate('autor', 'nombre resenna fechaNacimiento fechaMuerte nombreArtistico nacionalidad foto lugarNacimiento -_id')
        .select('titulo edicion editorial annoEdicion isbn_10 isbn_13 caratula contraportada precio vendidos genero categoria autor');

});

router.get('/listarMasVendidos', function (req, res) {
    let criterioOrden = { vendidos: -1 };
<<<<<<< HEAD
    Libros.find(function(err,LibrosBD){
=======
    
    Libros.find(function (err, LibrosBD) {
>>>>>>> de1939adb83ba2acf509665bfa1c57864f530291
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los libros',
                err
            });
        }else{
            return res.json({
                success: true,
                listaLibros: LibrosBD
            });
        }
    }).limit(25).sort(criterioOrden);
});

router.get('/titulo/:titulo', async (req, res) => {
    return await Libros.find({ "titulo": { "$regex": req.params.titulo, "$options": "i" } }, function (err, LibroBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro ningún libro',
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

module.exports = router;