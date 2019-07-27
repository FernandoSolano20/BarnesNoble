'use strict'

const express = require('express'),
    router = express.Router(),//permite crear la ruta
    Libreria = require('../models/libreria.model');

router.param('_id', function(req, res, next, _id){
    req.body._id = _id;
    next();

});

router.param('nombreComercial', function(req, res, next, nombreComercial){
    req.body.nombreComercial = nombreComercial;
    next();

});


router.get('/listarLibrerias', function (req, res) {
    Libreria.find(function (err, libreriasDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las librerias',
                err
            });
        } else {
            return res.json({
                success: true,
                listaLibrerias: libreriasDB
            })
        }
    });
});
 
router.get('/buscarLibreria-id/:_id', function (req, res) {
    Libreria.findById(req.body._id,function (err, libreriaDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontró ningúna libreria con ese _id',
                err
            });
        } else {
            return res.json({
                success: true,
                listaLibreria: libreriaDB
            })
        }
    });
});

router.get('/buscarLibreria-nombreComercial/:nombreComercial', function (req, res) {
    Libreria.find({nombreComercial : req.body.nombreComercial},function (err, libreriaDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontró ningúna libreria con ese nombre',
                err
            });
        } else {
            return res.json({
                success: true,
                listaLibreria: libreriaDB
            })
        }
    });
});




module.exports = router;
