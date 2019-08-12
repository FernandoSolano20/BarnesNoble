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

router.put('/editar/:id', function (req, res) {
    Libreria.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La libreria no se pudo editar',
                err
            });
        }
        Libreria.findById(req.params.id, (err, libreria) => {
            return res.status(200).json({
                success: true,
                message: "Libreria fue editada",
                libreria: libreria
            })
        });
    });
});

router.delete('/eliminar/:id', function (req, res) {
    Libreria.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El género no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Libreria eliminado'
        });
    });
});

router.patch('/modificarEstado/:id', function (req, res) {
    Libreria.findById(req.params.id, (err, libreria) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado de la libreria',
                err
            });
        }

        libreria.set(req.body);

        libreria.save((err, libreriasBD) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado de la libreria',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Libreria activada",
                    libreria: libreriasBD
                };
            } else {
                response = {
                    success: true,
                    message: "Libreria desactivada",
                    libreria: libreriasBD
                };
            }
            return res.status(200).json({ response });
        });
    });
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