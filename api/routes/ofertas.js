'use strict'

const express = require('express'),
    router = express.Router(),
    Ofertas = require('../models/ofertas.model');
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
        sucursal: body.sucursal,
        genero: body.genero,
        categoria: body.categoria,
        libro: body.libro,
        autor: body.autor,
        estado: body.estado

    });

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
    Ofertas.findByIdAndUpdate(req.params.id), { $set: req.body }, function(err)
    {
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

module.exports = router;