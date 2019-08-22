'use strict';

const express = require('express'),
    router = express.Router(),
    Intercambio = require('../models/intercambio.model'),
    Usuario = require('../models/usuarios.model');

router.post('/registrarIntercambio', function (req, res) {
    let body = req.body;

    let nuevoIntercambio = new Intercambio({
        nombre: body.nombre,
        participantes: body.participantes,
        terminado: false,
        aprobado: false
    });

    nuevoIntercambio.save(
        function (err, intercambioDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El intercambio no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    message: 'El intercambio se guardó con éxito'
                });
            }
        }
    );
});

router.get('/solicitudesIntercambios/:idUsuario', async (req, res) => {
    return await Intercambio.find({ aprobado: 0, participantes: { $elemMatch: { usuario: req.params.idUsuario, tipoUsuario: "Receptor" } } }, function (err, intercambio) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ningún libro',
                err
            });
        }
        else {
            return res.json({
                success: true,
                intercambio: intercambio
            });
        }
    })
        .populate('participantes.usuario', 'nombre primerApellido')
        .populate({
            path: 'participantes.ejemplarUsuario',
            populate: {
                path: 'libro',
                populate: {
                    path: 'genero categoria autor',
                    select: '_id nombre nombreArtistico'
                },
                select: '_id titulo genero categoria caratula contraportada'
            },
            select: '_id tipo libro'
        })
        .select('nombre participantes terminado aprobado')
});

router.get('/solicitudesIntercambiosCount/:idUsuario', async (req, res) => {
    //return await Intercambio.find({ aprobado: 0, "participantes.usuario": req.params.idUsuario, 'participantes.0.tipoUsuario': "Receptor" }, function (err, intercambio) {
    return await Intercambio.countDocuments({ aprobado: 0, participantes: { $elemMatch: { usuario: req.params.idUsuario, tipoUsuario: "Receptor" } } }, function (err, count) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ningún libro',
                err
            });
        }
        else {
            return res.json({
                success: true,
                count: count
            });
        }
    })
});

router.delete('/eliminar/:id', function (req, res) {
    Intercambio.findByIdAndRemove(req.params.id, function (err, intercambio) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El intercambio no se pudo eliminar',
                err
            });
        }
        else{
            return res.json({
                success: true,
                message: 'El intercambio fue rechazado',
            });
        }
    });
});

router.patch('/aprobarSolcitud/:id', function (req, res) {
    Intercambio.findById(req.params.id, (err, intercambio) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El intercambio no se pudo aprobado',
                err
            });
        }

        intercambio.set(req.body);

        intercambio.save((err, intercambioDB) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'El intercambio no se pudo aprobado',
                    err
                });
            else {
                let participantes = intercambio.participantes;
                for(let i = 0; i < participantes.length; i++){
                    Usuario.updateOne({ _id: participantes[i].usuario, "ejemplares.libro": participantes[i].ejemplarUsuario }, {  "ejemplares.$.estadoIntercambio": 0  }, function (err, ejemplar) {
                        if(err){
                            return res.status(400).json({
                                success: false,
                                message: 'El intercambio no se pudo aprobado',
                                err
                            });
                        }
                    });
                }
                
                return res.json({
                    success: true,
                    message: 'El intercambio fue aprobado',
                });
            }
        });
    });
});

router.get('/obtenerMisIntercambios/:idUsuario', async (req, res) => {
    return await Intercambio.find({ aprobado: 1, "participantes.usuario": req.params.idUsuario }, function (err, intercambio) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ningún libro',
                err
            });
        }
        else {
            return res.json({
                success: true,
                intercambio: intercambio
            });
        }
    })
        .populate('participantes.usuario', 'nombre primerApellido')
        .populate('sucursal', 'nombre provincia canton distrito')
        .populate({
            path: 'participantes.ejemplarUsuario',
            populate: {
                path: 'libro',
                populate: {
                    path: 'genero categoria autor',
                    select: '_id nombre nombreArtistico'
                },
                select: '_id titulo genero categoria caratula contraportada'
            },
            select: '_id tipo libro'
        })
        .select('nombre participantes terminado aprobado fechaInicio fechaFin sucursal')
});

router.patch('/terminarIntercambio/:id', function (req, res) {
    Intercambio.findById(req.params.id, (err, intercambio) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Ocurrio un error',
                err
            });
        }

        intercambio.set(req.body);

        intercambio.save((err, intercambioDB) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'El intercambio no se pudo terminar',
                    err
                });
            else {
                let participantes = intercambio.participantes;
                for(let i = 0; i < participantes.length; i++){
                    Usuario.updateOne({ _id: participantes[i].usuario, "ejemplares.libro": participantes[i].ejemplarUsuario }, {  "ejemplares.$.estadoIntercambio": 1  }, function (err, ejemplar) {
                        if(err){
                            return res.status(400).json({
                                success: false,
                                message: 'El intercambio se ha terminado',
                                err
                            });
                        }
                    });
                }
                
                return res.json({
                    success: true,
                    message: 'El intercambio se ha terminado',
                });
            }
        });
    });
});

module.exports = router;