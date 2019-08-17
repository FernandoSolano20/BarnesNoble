'use strict'

const express = require('express'),
    router = express.Router(),//permite crear la ruta
    Tarjeta = require('../models/tarjeta.model');

//Definir la ruta para registar contactos
//empizan con / por estandar
//- en el medio por standar
router.post('/registrarTarjeta', function (req, res) {
    /*req lo que recibo y response lo que respondo */
    let body = req.body;
    let nuevaTarjeta = new Tarjeta({
        // /Datos de Tarejeta/
        nombre1: body.nombre,
        numTarjeta: body.numero,
        tipoTarjeta: body.tipo,
        expiracionMM: body.mes,
        expiracionYY: body.year,
        cvv: body.cvv,
        usuario: body.usuario
    });
    Tarjeta.findOne({ numTarjeta: body.numero }).then(
        function (tarjeta) {
            if (tarjeta) {
                return res.status(400).json({
                    success: false,
                    message: 'La tarjeta no se pudo guardar ya esta en el sistema',
                    err
                });
            }
            else {
                nuevaTarjeta.save(
                    function (err, tarjetaDB) {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: 'La tarjeta no se pudo guardar',
                                err
                            });
                        } else {
                            return res.json({
                                success: true,
                                message: 'La tajeta se guardó con éxito'
                            })
                        }
                    }
                );
            }
        })

});

router.get('/listarTarjetas', function (req, res) {
    Tarjeta.find(function (err, tarjetasDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las tarjetas',
                err
            });
        } else {
            return res.json({
                success: true,
                listaTarjetas: tarjetasDB
            })
        }
    });
});

router.get('/listarTarjetasPorId/:id', function (req, res) {
    Tarjeta.find({usuario:req.params.id},function (err, tarjetasDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las tarjetas',
                err
            });
        } else {
            return res.json({
                success: true,
                listaTarjetas: tarjetasDB
            })
        }
    })
    .populate('usuario', 'nombre primerApellido correo')
    .select('nombre1 numTarjeta tipoTarjeta expiracionMM expiracionYY cvv usuario');
});

router.delete('/eliminarTarjeta/:id', function (req, res) {
    Categoria.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La tarjeta no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Tarjeta fue elimnada"
        });
    });
});

// router.post('/actualizarTarjeta/:id', function (req, res) {
//     Tarjeta.update({_id: req.body.id,}; {
//         if (err) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'La tarjeta no se pudo actualizar',
//                 err
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             message: "Tarjeta fue actualizada"
//         });
//     });
// });

router.put('/editarTarjeta/:id', function (req, res) {
    Tarjeta.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La tarjeta no se pudo actualizar',
                err
            });
        }
        Tarjeta.findById(req.params.id, (err, tarjetaDB) => {
            return res.status(200).json({
                success: true,
                message: "Tarjeta fue actualizada",
                listaTarjetas: tarjetasDB
            })
        });
    });
});

router.delete('/eliminar/:id', function (req, res) {
    Tarjeta.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'La tarjeta no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Tarjeta eliminada"
        });
    });
});



module.exports = router;
