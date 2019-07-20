'use strict'

const express = require('express'),
    router = express.Router(),
    Autor = require('../models/autor.model');

router.post('/registrarAutor', function (req, res) {
    let body = req.body;
    let nuevoAutor = new Autor({
        nombre: body.nombre,
        resenna: body.resenna,
        fechaNacimiento: body.fechaNacimiento,
        fechaMuerte: body.fechaMuerte,
        nombreArtistico: body.nombreArtistico,
        nacionalidad: body.nacionalidad,
        foto: body.foto,
        lugarNacimiento: body.lugarNacimiento,
        estado: body.estado,
    });

    nuevoAutor.save(
        function (err, autor) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El autor no se pudo guardar',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    message: 'El autor se guardó con éxito'
                })
            }
        }
    );
});

router.get('/listarAutores', function (req, res) {
    Autor.find(function (err, autoresBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los autores',
                err
            });
        } else {
            return res.json({
                success: true,
                listaAutores: autoresBD
            })
        }
    });
});

module.exports = router;