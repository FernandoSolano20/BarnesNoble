'use strict'

const express = require('express'),
    router = express.Router(),
    Autor = require('../models/autor.model');

router.post('/registrarAutor', function (req, res) {
    let body = req.body;
    let nuevoAutor = new Autor({
        nombre: body.nombre,
        resenna: body.resenna,
        fechaNacimiento: body.fechaNacimiento,
        fechaMuerte: body.fechaMuerte,
        nombreArtistico: body.nombreArtistico,
        nacionalidad: body.nacionalidad,
        foto: body.foto,
        estado: body.estado,
    });

    nuevoAutor.save(
        function (err, autor) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El autor no se pudo guardar',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    message: 'El autor se guardó con éxito'
                })
            }
        }
    );
});

router.get('/listarAutores', function (req, res) {
    Autor.find(function (err, autoresBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los autores',
                err
            });
        } else {
            return res.json({
                success: true,
                listaAutores: autoresBD
            })
        }
    });
});

router.get('/buscarAutorId/:_id', function(req, res) {
    Autor.findById(req.params._id, function(err, autoresBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontró ningún autor con ese _id',
                err
            });
        } else {
            return res.json({
                success: true,
                autor: autoresBD
            });
        }
    })
});

router.post('/agregarPremios', function (req, res) {
    Autor.update({_id: req.body._id}, {
        $push: {
            'premios':{
                nombre: req.body.nombre,
                anno: req.body.anno,
                descripcion: req.body.descripcion
            }
        }
    },
    function(err, premio){
        if(err){
            return res.status(400).json({
                success: false,
                message: 'No se pudo agregar premio',
                err
            })
        }else{
            return res.json({
                success: true,
                message: 'Se agregó correctamente el premio'
            })
        }
    }
    )
    });

    router.put('/editar/:id', function (req, res) {
        Autor.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El autor no se pudo editar',
                    err
                });
            }
            Categoria.findById(req.params.id, (err, autor) => {
                return res.status(200).json({
                    success: true,
                    message: "Autor editado",
                    autor: autor
                })
            });
        });
    });
    
    router.delete('/eliminar/:id', function (req, res) {
        Categoria.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El autor no se pudo eliminar',
                    err
                });
            }
            return res.status(200).json({
                success: true,
                message: "Autor elimnado"
            });
        });
    });
    
    router.patch('/modificarEstado/:id', function (req, res) {
        Autor.findById(req.params.id, (err, autor) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado del autor',
                    err
                });
            }
    
            autor.set(req.body);
    
            autor.save((err, autorDB) => {
                if (err)
                    return res.status(400).json({
                        success: false,
                        message: 'No se pudo cambiar el estado del autor',
                        err
                    });
                let response;
                if (req.body.estado) {
                    response = {
                        success: true,
                        message: "Autor activado",
                        autor: autorDB
                    };
                } else {
                    response = {
                        success: true,
                        message: "Autor desactivado",
                        autor: autorDB
                    };
                }
                return res.status(200).json({ response });
            });
        });
    });
    

module.exports = router;