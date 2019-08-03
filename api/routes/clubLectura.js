'use strict';

const express = require('express'),
    router = express.Router(),
    ClubLectura = require('../models/clubLectura.model');

router.param('_id'), function (req, res, next, _id) {
    req.body._id = _id;
    next();
}

//Definición de la ruta para registrar contactos

router.post('/registrarClubLectura', function (req, res) {
    let body = req.body;

    let nuevoClubLectura = new ClubLectura({
        nombre: body.nombre,
        tema: body.tema,
        tipoClub: body.tipoClub,
        fechaReunion: body.fechaReunion,
        horaReunion: body.horaReunion,
        sucursal: body.sucursal,
        administrador: body.administrador,
        categoria: body.categoria,
        genero: body.genero
    });

    nuevoClubLectura.save(
        function (err, clubesLecturaDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El club de lectura no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'El club de lectura se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listarClubLectura', function (req, res) {
    ClubLectura.find(function (err, clubesLecturaBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los clubes de lectura',
                err
            });
        } else {
            return res.json({
                success: true,
                listaClubesLectura: clubesLecturaBD
            });
        }
    })
});

module.exports = router;


router.get('/usuarioId/:id', async (req, res) => {
    return await Usuario.findById(req.params.id, function (err, usuario) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna usuario',
                err
            });
        }
        else {
            return res.json({
                success: true,
                usuario: usuario
            });
        }
    })
     
});