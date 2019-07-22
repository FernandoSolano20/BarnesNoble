'use strict'

const express = require('express'),
    router = express.Router(),
    randomString = require("randomstring"),
    nodeMailer = require("nodemailer"),
    Usuario = require('../models/usuarios.model'),
    Libreria = require('../models/libreria.model');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'grupovalhalla2019@gmail.com',
        pass: 'BarnesNoblePass123'
    }
});

router.post('/registrarUsuario', function (req, res) {
    let body = req.body;

    let randomPass = randomString.generate({
        length: 3,
        charset: 'numeric'
    });
    randomPass += randomString.generate({
        length: 3,
        charset: 'alphabetic'
    });

    let nuevoUsuario = new Usuario({

        // /Datos Generales/
        id: body.id,
        nombre: body.nombre,
        segundoNombre: body.segundoNombre,
        primerApellido: body.primerApellido,
        segundoApellido: body.segundoApellido,
        correo: body.correo,
        pass: randomPass,
        img: body.img,
        sexo: body.sexo,
        telefono: body.telefono,
        tipoUsuario: body.tipoUsuario,
        nacimiento: body.nacimiento,
        sennas: body.sennas,
        alias: body.alias,

        localizacionLatitud: body.localizacionLatitud,
        localizacionLongitud: body.localizacionLongitud,
        estado: body.estado,

        // /Direccion/
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
    });
    // /Datos Extra-Lector/
    
    if (body.autor)
        nuevoUsuario.autor = body.autor
    if (body.genero)
        nuevoUsuario.genero = body.genero
    if (body.libro)
        nuevoUsuario.libro = body.libro
    if (body.categoria)
        nuevoUsuario.categoria = body.categoria
    let createLibreria;
    let createUser = true;
    Usuario.findOne({ id: req.body.id }).then(
        function (usuario) {
            if (usuario) {
                return res.json({
                    success: false,
                    message: 'La identificación ya se encuentra en el sistema'
                });
            }
            else {
                Usuario.findOne({ correo: req.body.correo }).then(
                    function (usuario) {
                        if (usuario) {
                            return res.json({
                                success: false,
                                message: 'El correo ya se encuentra en el sistema'
                            });
                        }
                        else {
                            Usuario.findOne({ telefono: req.body.telefono }).then(
                                async (usuario) => {
                                    if (usuario) {
                                        return res.json({
                                            success: false,
                                            message: 'El teléfono ya se encuentra en el sistema'
                                        });
                                    }
                                    else {
                                        if (nuevoUsuario.tipoUsuario === "Adminitrador librería") {
                                            try {
                                                let nuevaLibreria = new Libreria({
                                                    nombreComercial: body.nombreComercial,
                                                    nombreFantasia: body.nombreFantasia,
                                                    localizacionLatitud: body.localizacionLatitud,
                                                    localizacionLongitud: body.localizacionLongitud,
                                                    provincia: body.provincia,
                                                    canton: body.canton,
                                                    distrito: body.distrito
                                                });
                                                createLibreria = await nuevaLibreria.save();
                                                createUser = true;
                                                nuevoUsuario.libreria = createLibreria._id;
                                            } catch (err) {
                                                createUser = false;
                                                return res.status(400).json({
                                                    success: false,
                                                    message: 'La librería no se pudo guardar',
                                                    err
                                                });
                                            }

                                        }
                                        if (createUser) {
                                            nuevoUsuario.save(
                                                function (err, usuarioDB) {
                                                    if (err) {
                                                        return res.status(400).json({
                                                            success: false,
                                                            message: 'El usuario no se pudo guardar',
                                                            err
                                                        });
                                                    } else {
                                                        let mailOption = {
                                                            from: 'grupovalhalla2019@gmail.com',
                                                            to: nuevoUsuario.correo,
                                                            subject: 'Bienvenido a Barnes & Noble',
                                                            html: `<html>
                                                            <head>
                                                              <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
                                                              <style>
                                                               .wrapper{
                                                              background : #81ecec;
                                                              font-family: 'Roboto', sans-serif;
                                                            }
                                                            .container{
                                                              margin: 0 auto;
                                                              background: #fff;
                                                              width: 500px;
                                                              text-align: center;
                                                              padding: 10px;
                                                            }
                                                            .boton{
                                                              background: #ff7675;
                                                              color: #fff;
                                                              display: block;
                                                              padding: 15px;
                                                              text-decoration: none;
                                                              width: 50%;
                                                              margin: 0 auto;
                                                            }
                                                            </style>
                                                            </head>
                                                            <body class="wrapper">
                                                              <div class="container">
                                                                <h1>Bienvenido a Barnes & Noble</h1>
                                                              <h2>Su biblioteca digital</h2>
                                                              
                                                              <p>Saludos ${nuevoUsuario.nombre} ${nuevoUsuario.primerApellido} le agradecemos por escoger utilizar los servicios de Barnes & Noble</p>
                                                              <p>El correo electrónico asociado es: ${nuevoUsuario.correo}</p>
                                                              <p>Su contraseña temporal es: ${nuevoUsuario.pass}</p>
                                                              <p>Para ingresar visite el siguiente<p> 
                                                                <a href="http://localhost:3000/inicioSesion.html" class="boton">Ingresar a Barnes & Noble </a>
                                                              </div>
                                                              
                                                            </body>
                                                            
                                                          </html>`
                                                        };
                                                        transporter.sendMail(mailOption, function (error, info) {
                                                            if (error) {
                                                                return res.json({
                                                                    success: true,
                                                                    message: `Ocurrio un error al envio del correo, su contraseña es ${nuevoUsuario.pass}`
                                                                })
                                                            }
                                                            return res.json({
                                                                success: true,
                                                                message: 'El usuario se guardó con éxito, revise su correo eléctronico'
                                                            })
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});

router.post('/login', function (req, res) {
    Usuario.findOne({ correo: req.body.correo }).then(
        function (usuario) {
            if (usuario) {
                if (usuario.pass === req.body.pass) {
                    res.json({
                        success: true,
                        usuario: usuario
                    });
                }
                else {
                    res.json({
                        success: false
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'El usuario no existe'
                });
            }
        }
    );
});

router.get('/listarUsuarios', function (req, res) {
    Usuario.find(function (err, usuarios) {

        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los usuarios',
                err
            });
        } else {
            return res.json({
                success: true,
                listaUsuarios: usuarios
            })
        }
    });
});

router.put('/editar/:id', function (req, res) {
    Usuario.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no se pudo editar',
                err
            });
        }
        Usuario.findById(req.params.id, (err, usuario) => {
            return res.status(200).json({
                success: true,
                message: "Usuario editado",
                usuarios: usuarios
            })
        });
    });
});

router.delete('/eliminar/:id', function (req, res) {
    Usuario.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no se pudo eliminar',
                err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Usuario elimnado"
        });
    });
});

router.patch('/modificarEstado/:id', function (req, res) {
    Usuario.findById(req.params.id, (err, usuarios) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado del usuario',
                err
            });
        }

        usuarios.set(req.body);

        usuarios.save((err, usuariosDB) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar el estado del usuario',
                    err
                });
            let response;
            if (req.body.estado) {
                response = {
                    success: true,
                    message: "Usuario activado",
                    usuario: usuariosDB
                };
            } else {
                response = {
                    success: true,
                    message: "Usuario desactivado",
                    usuario: usuariosDB
                };
            }
            return res.status(200).json({ response });
        });
    });
});

router.patch('/modificarPassword/:id', function (req, res) {
    Usuario.findById(req.params.id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar la contraseña del usuario',
                err
            });
        }
        req.body.cambiarPass = 0;
        usuario.set(req.body);

        usuario.save((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo cambiar la contraseña del usuario',
                    err
                });
            }

            return res.status(200).json({
                success: true,
                message: "Contraseña modificada"
            });
        });
    });
});

router.patch('/olvidarPass/:correo', function (req, res) {
    Usuario.findOne({ correo: req.params.correo }).then(
        function (usuario) {
            if (usuario) {
                let randomPass = randomString.generate({
                    length: 3,
                    charset: 'numeric'
                });
                randomPass += randomString.generate({
                    length: 3,
                    charset: 'alphabetic'
                });
                req.body.pass = randomPass;
                req.body.cambiarPass = 1;
                usuario.set(req.body);
                usuario.save((err, usuarioDB) => {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: 'No se pudo cambiar la contraseña del usuario',
                            err
                        });
                    }

                    let mailOption = {
                        from: 'grupovalhalla2019@gmail.com',
                        to: usuarioDB.correo,
                        subject: 'Bienvenido a Barnes & Noble',
                        html: `<html>
                        <head>
                          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
                          <style>
                           .wrapper{
                          background : #81ecec;
                          font-family: 'Roboto', sans-serif;
                        }
                        .container{
                          margin: 0 auto;
                          background: #fff;
                          width: 500px;
                          text-align: center;
                          padding: 10px;
                        }
                        .boton{
                          background: #ff7675;
                          color: #fff;
                          display: block;
                          padding: 15px;
                          text-decoration: none;
                          width: 50%;
                          margin: 0 auto;
                        }
                        </style>
                        </head>
                        <body class="wrapper">
                          <div class="container">
                            <h1>Cambio de contraseña en Barnes & Noble</h1>
                          <h2>Su biblioteca digital</h2>
                          
                          <p>Saludos ${usuarioDB.nombre} ${usuarioDB.primerApellido}</p>
                          <p>Se ha solicitado el cambio de contraseña de su cuenta</p>
                          <p>El correo electrónico asociado es: ${usuarioDB.correo}</p>
                          <p>Su contraseña temporal es: ${randomPass}</p>
                          <p>Para ingresar visite el siguiente<p> 
                            <a href="http://localhost:3000/inicioSesion.html" class="boton">Ingresar a Barnes & Noble </a>
                          </div>
                          
                        </body>
                        
                      </html>`
                    };
                    transporter.sendMail(mailOption, function (error, info) {
                        if (error) {
                            return res.json({
                                success: true,
                                message: `Ocurrio un error al envio del correo, contacte con el administrador de la plataforma`
                            })
                        }
                        return res.json({
                            success: true,
                            message: 'Se ha enviado un correo con la nueva contraseña'
                        })
                    });
                });
            } else {
                res.json({
                    success: false,
                    message: 'El usuario no existe'
                });
            }
        }
    );
});

module.exports = router;