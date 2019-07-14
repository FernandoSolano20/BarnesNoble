'use strict'

const express = require('express'),
    router = express.Router(),
    Categoria = require('../models/categoria.model');

router.post('/registrarCategoria', function (req, res) {
    let body = req.body;
    let nuevaCategoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: body.estado
    });

    nuevaCategoria.save(
        function (err, categoria) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'La categoría no se pudo guardar',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    categoria: categoria,
                    message: 'La categoría se guardó con éxito'
                })
            }
        }
    );
});

router.get('/listarCategorias', function (req, res) {
    Categoria.find(function (err, categorias) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las categorías',
                err
            });
        } else {
            return res.json({
                success: true,
                listaCategorias: categorias
            })
        }
    });
});

router.put('/editar/:id', function (req, res) {
    Categoria.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La categoría no se pudo editar',
                err
            });
        }
        Categoria.findById(req.params.id, (err, categoria) => {
            return res.status(200).json({
                success: true,
                message: "Categoría editada",
                categoria: categoria
            })
        });
    });
});

router.delete('/eliminar/:id', function (req, res) {
    Categoria.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La categoría no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Categoría elimnada"
        });
    });
});

router.patch('/modificarEstado/:id', function (req, res) {
    Categoria.findById(req.params.id, (err, categoria) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado de la categoría',
                err
            });
        }

        categoria.set(req.body);

        categoria.save((err, categoriaDB) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado de la categoría',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Categoría activada",
                    categoria: categoriaDB
                };
            } else {
                response = {
                    success: true,
                    message: "Categoría desactivada",
                    categoria: categoriaDB
                };
            }
            return res.status(200).json({ response });
        });
    });
});

module.exports = router;