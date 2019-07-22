'use strict'
const express = require('express'),
    router = express.Router(),
    tipoLibro = require('../models/tipoLibro.model');
    router.param('_id', function(req, res, next, _id){
    req.body._id= _id;

    })

    //Definición de la ruta para registrar libros

router.post('/registrarTipoLibro', function (req, res) {
    let body = req.body;
    let nuevatipoLibro = new tipoLibro({
        tipo: body.tipo,
       
    });

    nuevatipoLibro.save(
        function (err, tipoLibroDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No registró el tipo de libro correctamente',
                    err
                });

            } else {
                res.json({
                    success: true,
                    msj: 'Se registró correctamente el tipo de libro'
                });
            }
        }
    );
});

router.get('/listarTipoLibro', function(req, res){
    tipoLibro.find(function(err,tipoLibroBD){
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los tipos',
                err
            });
        }else{
            return res.json({
                success: true,
                listaTipoLibro: tipoLibroBD
            });
        }
    })
});

module.exports = router;