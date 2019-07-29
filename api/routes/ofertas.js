'use strict'
const express = require('express'),
    router = express.Router(),
    Ofertas = require('../models/ofertas.model');
    router.param('_id', function(req, res, next, _id){
    req.body._id= _id;

    })

//Definición de la ruta para registrar libros

router.post('/registrarOferta', function (req, res) {
    let body = req.body;
    let nuevaOferta = new Ofertas({
        tipoOferta: body.tipoOferta,
        descuento: body.descuento,
        descripcion: body.descripcion,
        idSucursal: body.idSucursal,
        idGenero: body.idGenero,
        idCategoria: body.idCategoria,
        idLibro: body.idLibro,
        idAutor: body.idAutorT

    });

    nuevaOferta.save(
        function (err, ofertaDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No registró la oferta correctamente',
                    err
                });

            } else {
                res.json({
                    success: true,
                    msj: 'Se registró correctamente la oferta'
                });
            }
        }
    );
});

router.get('/listarOfertas', function(req, res){
    Ofertas.find(function(err,OfertasBD){
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las ofertas',
                err
            });
        }else{
            return res.json({
                success: true,
                listaOfertas: OfertasBD
            });
        }
    })
});

module.exports = router;