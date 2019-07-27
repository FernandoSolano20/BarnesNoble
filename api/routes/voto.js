'use strict'
const express = require('express'),
    router = express.Router(),
    Voto = require('../models/voto.model');

router.post('/votar', function (req, res) {
    let body = req.body;
    let nuevoVoto = new Libros({
        voto: body.voto,
        comentario: body.comentario,
        usuario: body.usuario,
        libro: body.libro
    });

    nuevoVoto.save(
        function (err, voto) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No logro votar',
                    err
                });

            } else {
                res.json({
                    success: true,
                    msj: 'Se voto registrado'
                });
            }
        }
    );
});


module.exports = router;