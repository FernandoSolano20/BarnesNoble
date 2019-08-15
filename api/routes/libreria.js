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
    return await Libreria.findById(req.params.id, function (err, librerias) {
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
    Libreria.find({ 'sucursales.sucursal': mongoose.Types.ObjectId(req.params.id) }, function (err, libreria) {
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

router.post('/deshabilitar-libreria', function (req, res) {
    let body = req.body;

    Contacto.findByIdAndUpdate(body._id, {
        $set: {
            estado: 'Deshabilitada'
        }
    },
        function (error) {
            if (error) {
                console.log("error")
                console.log(error)
                res.json({ success: false, msg: 'No se pudo deshabilitar la libreria' });
            } else {
                console.log("scuccess")
                res.json({ success: true, msg: 'La libreria se deshabilitó con éxito' });
            }
        }
    )
});

router.post('/habilitar-libreria', function (req, res) {
    let body = req.body;

    Contacto.findByIdAndUpdate(body._id, {
        $set: {
            estado: req.body.estado
        }
    },
        function (error) {

            if (error) {
                res.json({ success: false, msg: 'No se pudo habilitar la libreria' });
            } else {
                res.json({ success: true, msg: 'La libreria se habilitó con éxito' });
            }
        }
    )
});


module.exports = router;