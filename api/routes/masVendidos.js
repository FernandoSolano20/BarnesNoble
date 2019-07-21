'use strict'

const express = require('express'),
    router = express.Router(),
    libros = require('../models/libros.model');

router.get('/listarMasVendidos', function (req, res) {

    //https://www.w3schools.com/nodejs/nodejs_mongodb_sort.asp
    //definir criterio de orden y direccion
    let criterioOrden = { vendidos: -1 };

    libros.find().sort(criterioOrden).limit(25).toArray(function(err, masVendidos) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los libros',
                err
            });
        } else {
            return res.json({
                success: true,
                listaMasVendidos: masVendidos
            })
        }
    });
});

