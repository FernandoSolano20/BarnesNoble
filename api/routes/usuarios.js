'use strict'

const express = require('express');
    router = express.Router();//permite crear la ruta
    Usuario = require('../models/usuarios.model');

//Definir la ruta para registar contactos
//empizan con / por estandar
//- en el medio por standar
router.post('/registrarUsuarios', function (req, res) {
    /*req lo que recibo y response lo que respondo */
    let body = req.body;


 console.log(body);
 
    let nuevoUsuario =  new Usuario({
        /*Datos Generales*/
        nombre : body.nombre,
        nombre2 : body.nombre2,
        apellido1 : body.apellido1,
        apellido2 : body.apellido2,
        nacimiento : body.nacimiento,
        img: body.img,
        sexo : body.genero,
        correo : body.correo,
        cedula : body.cedula,
        pass : body.contrasenna,
        telefono : body.telefono,

        /*Direccion*/
        provincia: body.provincia,
        canton : body.canton,
        distrito: body.distrito,
        sennas : body.sennas,
        
        /*Datos Extra-Lector*/
        alias : body.alias,
        autor : body.autor,
        genero : body.genero,
        libro : body.libro,

        /*Datos Extra-Libreria*/
        nombreFantasia : body.nombreFantasia,
        nombreComercial : body.nombreComercial
    
    });

    nuevoUsuario.save(
        function(err, usuarioDB){
            if(err){
                return res.status(400).json({
                    success: false,
                    msj: 'El usuario no se pudo guardar',
                    err
                });
            }else{
                return res.json({
                    success: true,
                    msj: 'El usuario se guardó con éxito'
                })
            }
        }
    );
});

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

module.exports = router;

//localhosta:3000/api/registrarUsuario/

