'use strict';

const express = require('express'),
    router = express.Router(),
    Sucursal = require('../models/sucursal.model');

//Definición de la ruta para registrar contactos

router.post('/registrarSucursal', function(req, res) {
    let body = req.body;

    let nuevoSucursal = new Sucursal({
        nombre: body.nombre,
        telefono:body.telefono,
        correo: body.correo,
        localizacionLongitud: body.localizacionLongitud,
        localizacionLatitud: body.localizacionLatitud,
        IdLibreria:body.IdLibreria,
        IdProvincia:body.IdProvincia,
        IdCanton:body.IdCanton,
        IdDistrito:body.IdDistrito
    });

    nuevoSucursal.save(
        function(err, sucursalesDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'La sucursal no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La sucursal se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listarSucursales', function(req, res) {
    Sucursal.find(function(err, sucursalesBD) {
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

module.exports = router;