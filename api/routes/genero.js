'use strict'

const express = require('express'),
    router = express.Router(),
    Genero = require('../models/genero.model');

router.post('/registrarGenero', function(req, res){
    let body = req.body;
    let nuevoGenero =  new Genero({
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: body.estado
    });

    nuevoGenero.save(
        function(err,contactoDB){
            if(err){
                return res.status(400).json({
                    success: false,
                    msj: 'El género no se pudo guardar',
                    err
                });
            }else{
                return res.json({
                    success: true,
                    msj: 'El género se guardó con éxito'
                })
            }
        }
    );
});

router.get('/listarGeneros', function(req, res){
    Genero.find(function(err, generosBD){
        if(err){
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los géneros',
                err
            });
        }else{
            return res.json({
                success: true,
                listaGeneros: generosBD
            })
        }
    });
});


module.exports = router;