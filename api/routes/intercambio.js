'use strict';

const express = require('express'),
    router = express.Router(),
    Intercambio = require('../models/intercambio.model');

router.post('/registrarIntercambio', function (req, res) {
    let body = req.body;

    let nuevoIntercambio = new Intercambio({
        nombre: body.nombre,
        fechaFin: body.fechaFin,
        sucursal: body.sucursal,
        participantes: body.participantes,
        ejemplarUsuario: body.ejemplarUsuario
    });

    nuevoIntercambio.save(
        function (err, intercambioDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El intercambio no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'El intercambio se guardó con éxito'
                });
            }
        }
    );
});

module.exports = router;