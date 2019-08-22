'use strict'
const express = require('express'),
    router = express.Router(),
    Ejemplar = require('../models/ejemplar.model');

router.post('/registrarEjemplar', function (req, res) {
    let body = req.body;
    let nuevoEjemplar = new Ejemplar({
        tipo: body.tipo,
        precio: body.precio,
        isbn10: body.isbn10,
        isbn13: body.isbn13,
        editorial: body.editorial,
        edicion: body.edicion,
        annoEdicion: body.annoEdicion,
        cantidad: body.cantidad,
        libro: body.libro
    });

    nuevoEjemplar.save(
        function (err, libro) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'No se guardo este ejemplar',
                    err
                });

            } else {
                res.json({
                    success: true,
                    message: 'Se guardo este ejemplar'
                });
            }
        }
    );
});

router.get('/listarEjemplarIdLibro/:id', async (req, res) => {
    return await Ejemplar.find({libro:req.params.id},function (err, LibrosBD) {
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
});

router.get('/listaEjemplarID/:id', async (req, res) => {
    return await Ejemplar.findById(req.params.id,function (err, EjemplarBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ningún ejemplar',
                err
            });
        }
        else {
            return res.json({
                success: true,
                precio: EjemplarBD
            });
        }
    })
});

module.exports = router;