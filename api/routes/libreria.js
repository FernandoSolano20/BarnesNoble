'use strict'

const express = require('express'),
    router = express.Router(),//permite crear la ruta
    Libreria = require('../models/libreria.model'),
    mongoose = require('mongoose');


router.get('/listarLibrerias', async (req, res) => {
    return await Libreria.find(function (err, librerias) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna librería',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibrerias: librerias
            });
        }
    })
        .populate('sucursales.sucursal', 'nombre')
        .select('nombreComercial nombreFantasia localizacionLatitud localizacionLongitud provincia canton distrito estado sucursales');
});

router.get('/libreriaId/:id', async (req, res) => {
    return await Libreria.findById(req.params.id,function (err, librerias) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna librería',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibrerias: librerias
            });
        }
    })
        .populate('sucursales.sucursal', 'nombre nombre localizacionLongitud localizacionLatitud provincia canton distrito correo telefono')
        .select('nombreComercial nombreFantasia localizacionLatitud localizacionLongitud provincia canton distrito sucursales');
});

router.get('/sucursalId/:id', function (req, res) {
    Libreria.find({ 'sucursales.sucursal': mongoose.Types.ObjectId(req.params.id) },function (err, libreria) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro libreria',
                err
            });
        } else {
            return res.json({
                success: true,
                libreria: libreria
            });
        }
    })
});

router.get('/countLibreria', function (req, res) {
    Libreria.countDocuments(function (err, count) {
        return res.json({
            success: true,
            count: count
        });
    });
})
 

router.get('/obtenerTiendas', async (req, res) => {
    return await Libreria.find(function (err, librerias) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna librería',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibrerias: librerias
            });
        }
    })
        .populate('sucursales.sucursal', 'nombre correo telefono')
        .select('nombreFantasia sucursales');
});
module.exports = router;