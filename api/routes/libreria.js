'use strict'

const express = require('express'),
    router = express.Router(),//permite crear la ruta
    Libreria = require('../models/libreria.model');


router.get('/listarLibrerias', function (req, res) {
    Libreria.find(function (err, libreriasDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las tarjetas',
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
 
module.exports = router;

//localhosta:3000/api/registrarUsuario/
//localhosta:3000/api/registrarTarjeta/

  // nuevoUsuario.save(   
    //     function (err, usuarioDB) {
    //         if (err)
    //             res.status(400).json({
    //                 success: true,
    //                 msj: 'El usario no se guardó con éxito' 
    //             });



                
                
            //Obtiene y devuelve todas las personas tras crear una de ellas
    //         Usario.find(function (err, conct) {
    //             if (err)
    //                 res.send(err)
    //             res.json(conct);
    //         })
    //     }
    // );
