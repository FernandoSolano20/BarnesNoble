'use strict'

const express = require('express'),
    router = express.Router(),
    Genero = require('../models/genero.model');

router.post('/registrarGenero', function (req, res) {
    let body = req.body;
    let nuevoGenero = new Genero({
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: body.estado
    });

    nuevoGenero.save(
        function (err, genero) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El género no se pudo guardar',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    genero: genero,
                    message: 'El género se guardó con éxito'
                })
            }
        }
    );
});

router.get('/listarGeneros', function (req, res) {
    Genero.find(function (err, generosBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los géneros',
                err
            });
        } else {
            return res.json({
                success: true,
                listaGeneros: generosBD
            })
        }
    });
});

router.put('/editar/:id', function (req, res) {
    Genero.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El género no se pudo editar',
                err
            });
        }
        Genero.findById(req.params.id, (err, genero) => {
            return res.status(200).json({
                success: true,
                message: "Genero editado",
                genero: genero
            })
        });
    });
});

router.delete('/eliminar/:id', function (req, res) {
    Genero.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El género no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Genero elimnado"
        });
    });
});

router.patch('/modificarEstado/:id', function (req, res) {
    Genero.findById(req.params.id, (err, genero) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado del género',
                err
            });
        }

        genero.set(req.body);

        genero.save((err, generosBD) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado del género',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Genero activado",
                    genero: generosBD
                };
            } else {
                response = {
                    success: true,
                    message: "Genero desactivado",
                    genero: generosBD
                };
            }
            return res.status(200).json({ response });
        });
    });
});

module.exports = router;