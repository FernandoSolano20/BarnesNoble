'use strict';

const express = require('express'),
    router = express.Router(),
    Sucursal = require('../models/sucursal.model'),
    Libreria = require('../models/libreria.model');

//Definición de la ruta para registrar contactos

router.post('/registrarSucursal', function (req, res) {
    let body = req.body;

    let nuevoSucursal = new Sucursal({
        nombre: body.nombre,
        telefono: body.telefono,
        correo: body.correo,
        localizacionLongitud: body.localizacionLongitud,
        localizacionLatitud: body.localizacionLatitud,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        estado: body.estado
    });

    nuevoSucursal.save(
        function (err, sucursalesDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'La sucursal no se pudo guardar',
                    err
                });
            } else {
                Libreria.findByIdAndUpdate(body.idLibreria, {
                    $push: {
                        'sucursales': {
                            sucursal: sucursalesDB._id
                        }
                    }
                }, function (err) {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: 'Ocurrio un error al asociar a la sucursal, comuniquese con el administrador',
                            err
                        });
                    }
                });
                res.status(200).json({
                    success: true,
                    msj: 'La sucursal se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listarSucursales', function (req, res) {
    Sucursal.find(function (err, sucursalesBD) {
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

router.get('/sucursalId/:id', function (req, res) {
    Sucursal.findById(req.params.id,function (err, sucursaleBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las sucursales',
                err
            });
        } else {
            return res.json({
                success: true,
                sucursal: sucursaleBD
            });
        }
    })
});

router.get('/buscarIdLibreria/:id', function(req, res) {
    Sucursal.find({libreria: req.params.id},function(err, sucursalesBD) {
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
});


module.exports = router;