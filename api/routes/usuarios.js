'use strict'

const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    randomString = require("randomstring"),
    nodeMailer = require("nodemailer"),
    Usuario = require('../models/usuarios.model'),
    Libreria = require('../models/libreria.model'),
    Sucursal = require("../models/sucursal.model"),
    Autor = require('../models/autor.model'),
    Libro = require('../models/libros.model'),
    Categoria = require('../models/categoria.model'),
    Genero = require('../models/genero.model'),
    Ejemplar = require('../models/ejemplar.model');

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

        // /Direccion/
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        sennas: body.sennas,
        localizacionLatitud: body.localizacionLatitud,
        localizacionLongitud: body.localizacionLongitud,
    });
    // /Datos Extra-Lector/
    if (body.alias)
        nuevoUsuario.alias = body.alias;
    if (body.autor)
        nuevoUsuario.autor = body.autor;
    if (body.genero)
        nuevoUsuario.genero = body.genero;
    if (body.libro)
        nuevoUsuario.libro = body.libro;
    if (body.categoria)
        nuevoUsuario.categoria = body.categoria;
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
                                            nuevoUsuario.estado = 0;
                                            try {
                                                let nuevaLibreria = new Libreria({
                                                    nombreComercial: body.nombreComercial,
                                                    nombreFantasia: body.nombreFantasia,
                                                    localizacionLatitud: body.localizacionLatitud,
                                                    localizacionLongitud: body.localizacionLongitud,
                                                    provincia: body.provincia,
                                                    canton: body.canton,
                                                    distrito: body.distrito,
                                                    estado: 1
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
                                        else {
                                            nuevoUsuario.estado = 1;
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
                                                        if (nuevoUsuario.tipoUsuario === "Lector") {
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
                                                        else {
                                                            return res.json({
                                                                success: true,
                                                                message: 'La libreria se ha creado, espere a ser aprobado.',
                                                                err
                                                            });
                                                        }
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
                    if (usuario.estado) {
                        res.json({
                            success: true,
                            usuario: usuario
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            message: 'El usuario está desactivado'
                        });
                    }
                }
                else {
                    res.json({
                        success: false,
                        message: 'El usuario o contraseña no coinciden'
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

router.put('/editarUsuario/:id', function (req, res) {
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

router.delete('/eliminarUsuario/:id', function (req, res) {
    Usuario.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no se pudo eliminar',
                err
            });
        }
        Libreria.findByIdAndRemove(user.libreria, function (err, libreria) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El usuario no se pudo eliminar',
                    err
                });
            }
            else {
                if (libreria && libreria.sucursales) {
                    let sucursales = [];
                    for (var i = 0; i < libreria.sucursales.length; i++)
                        sucursales.push(new mongoose.Types.ObjectId(libreria.sucursales[i].sucursal));

                    Sucursal.remove({ _id: { $in: sucursales } }, function (err, sucursal) {
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
                    })
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "Usuario elimnado"
                    });
                }
            }
        })

    });
});

router.patch('/modificarEstadoUsuario/:id', function (req, res) {
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

router.get('/buscarLectorId/:_id', function (req, res) {
    Usuario.findById(req.params._id, function (err, usuarioBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontró ningún contacto con ese _id',
                err
            });
        } else {
            return res.json({
                success: true,
                usuario: usuarioBD
            });
        }
    })
});

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
        .populate('genero', 'nombre')
        .populate('categoria', 'nombre')
        .populate('autor', 'nombre')
        .populate('libro', 'titulo')
        .populate({
            path: 'libreria',
            populate: {
                path: 'sucursales.sucursal',
                select: '_id nombre estado localizacionLongitud localizacionLatitud provincia canton distrito telefono correo ejemplares usuariosSubscritos'
            },
            select: 'nombreComercial nombreFantasia localizacionLongitud localizacionLatitud provincia canton distrito ejemplares'
        })
        .populate('ejemplares.libro', 'titulo')
        .populate('resennas.usuario', 'nombre primerApellido img')
        .select('id nombre segundoNombre primerApellido segundoApellido correo img sexo telefono tipoUsuario nacimiento sennas alias localizacionLatitud localizacionLongitud provincia canton distrito autor genero libro categoria libreria ejemplares resennas');
});

router.get('/usuarioIdLibreria/:id', function (req, res) {
    Usuario.findOne({ libreria: req.params.id }).then(
        function (usuario) {
            if (usuario) {
                res.json({
                    success: true,
                    usuario: usuario
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

//SofiaZu-Para listar por preferencia
router.get('/obtenerPreferenciaUsuario/:id', async (req, res) => {

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
    }
    );
});


router.get('/usuarioIdGetTiendas/:id', async (req, res) => {
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
        .populate({
            path: 'libreria',
            populate: {
                path: 'sucursales.sucursal',
                select: '_id nombre'
            },
            select: '_id nombreFantasia'
        })
        .select('_id libreria');
});

router.get('/autorFavCount', async (req, res) => {
    return await Usuario.aggregate(
        [{
            "$group": {
                "_id": "$autor",
                "count": { "$sum": 1 }
            }
        }])
        .exec(function (err, transactions) {
            Autor.populate(transactions, { path: '_id', select: '_id nombre' }, function (err, populatedTransactions) {
                return res.json({
                    success: true,
                    usuario: populatedTransactions
                });
            });
        });
})

router.get('/libroFavCount', function (req, res) {
    Usuario.aggregate(
        [{
            "$group": {
                "_id": "$libro",
                "count": { "$sum": 1 }
            }
        }])
        .exec(function (err, transactions) {
            Libro.populate(transactions, { path: '_id', select: '_id titulo' }, function (err, populatedTransactions) {
                return res.json({
                    success: true,
                    usuario: populatedTransactions
                });
            });
        });
})

router.get('/generoFavCount', function (req, res) {
    Usuario.aggregate(
        [{
            "$group": {
                "_id": "$genero",
                "count": { "$sum": 1 }
            }
        }])
        .exec(function (err, transactions) {
            Genero.populate(transactions, { path: '_id', select: '_id nombre' }, function (err, populatedTransactions) {
                return res.json({
                    success: true,
                    usuario: populatedTransactions
                });
            });
        });
})

router.get('/categoriaFavCount', function (req, res) {
    Usuario.aggregate(
        [{
            "$group": {
                "_id": "$categoria",
                "count": { "$sum": 1 }
            }
        }])
        .exec(function (err, transactions) {
            Categoria.populate(transactions, { path: '_id', select: '_id nombre' }, function (err, populatedTransactions) {
                return res.json({
                    success: true,
                    usuario: populatedTransactions
                });
            });
        });
})

router.get('/countUser', function (req, res) {
    Usuario.countDocuments({ tipoUsuario: 'Lector' }, function (err, count) {
        return res.json({
            success: true,
            count: count
        });
    });
})


// Editar Perfil Lector

router.patch('/editarUsuario/:id', function (req, res) {
    let body = req.body;
    let usuarioRegistrado = false;
    let usuarioModificado = false;

    console.log(req.params.id);

    Usuario.findById(req.params.id).then(
        function (usuario) {
            console.log(usuario);
            if (!usuario) {
                return res.json({
                    success: false,
                    message: 'El usuario no se encuentra en el sistema'
                });
            }
            else {
                let cambios = {};

                usuarioRegistrado = usuario;
                if (usuarioRegistrado.correo != req.body.correo) {
                    Usuario.findOne({ correo: req.body.correo }).then(
                        function (usuario) {
                            if (usuario && usuario.id != usuarioRegistrado.id) {
                                return res.json({
                                    success: false,
                                    message: 'El correo ya se encuentra en el sistema'
                                });
                            } else {
                                cambios.correo = req.body.correo;
                                usuarioModificado = true;

                            }
                        }
                    );
                }
                if (usuarioRegistrado.telefono != req.body.telefono) {
                    Usuario.findOne({ telefono: req.body.telefono }).then(
                        function (usuario) {
                            if (usuario && usuario.id != usuarioRegistrado.id) {
                                return res.json({
                                    success: false,
                                    message: 'El telefono ya se encuentra en el sistema'
                                });
                            } else {
                                cambios.telefono = req.body.telefono;
                                usuarioModificado = true;

                            }
                        }
                    );
                }
                if (req.body.nombre && usuarioRegistrado.nombre != req.body.nombre) {
                    cambios.nombre = req.body.nombre;
                    usuarioModificado = true;
                }
                if (req.body.segundoNombre && usuarioRegistrado.segundoNombre != req.body.segundoNombre) {
                    cambios.segundoNombre = req.body.segundoNombre;
                    usuarioModificado = true;
                }
                if (req.body.primerApellido && usuarioRegistrado.primerApellido != req.body.primerApellido) {
                    cambios.primerApellido = req.body.primerApellido;
                    usuarioModificado = true;
                }
                if (req.body.segundoApellido && usuarioRegistrado.segundoApellido != req.body.segundoApellido) {
                    cambios.segundoApellido = req.body.segundoApellido;
                    usuarioModificado = true;
                }
                if (req.body.img && usuarioRegistrado.img != req.body.img) {
                    cambios.img = req.body.img;
                    usuarioModificado = true;
                }
                if (req.body.sexo && usuarioRegistrado.sexo != req.body.sexo) {
                    cambios.sexo = req.body.sexo;
                    usuarioModificado = true;
                }
                if (req.body.nacimiento && usuarioRegistrado.nacimiento != req.body.nacimiento) {
                    cambios.nacimiento = req.body.nacimiento;
                    usuarioModificado = true;
                }
                if (req.body.provincia && usuarioRegistrado.provincia != req.body.provincia) {
                    cambios.provincia = req.body.provincia;
                    usuarioModificado = true;
                }
                if (req.body.canton && usuarioRegistrado.canton != req.body.canton) {
                    cambios.canton = req.body.canton;
                    usuarioModificado = true;
                }
                if (req.body.distrito && usuarioRegistrado.distrito != req.body.distrito) {
                    cambios.distrito = req.body.distrito;
                    usuarioModificado = true;
                }
                if (req.body.sennas && usuarioRegistrado.sennas != req.body.sennas) {
                    cambios.sennas = req.body.sennas;
                    usuarioModificado = true;
                }
                if (req.body.alias && usuarioRegistrado.alias != req.body.alias) {
                    cambios.alias = req.body.alias;
                    usuarioModificado = true;
                }
                if (req.body.nombreComercial && usuarioRegistrado.nombreComercial != req.body.nombreComercial) {
                    cambios.sennas = req.body.nombreComercial;
                    usuarioModificado = true;
                }
                if (req.body.nombreFantasia && usuarioRegistrado.nombreFantasia != req.body.nombreFantasia) {
                    cambios.alias = req.body.nombreFantasia;
                    usuarioModificado = true;
                }
                if (req.body.localizacionLatitud && usuarioRegistrado.localizacionLatitud != req.body.localizacionLatitud) {
                    cambios.localizacionLatitud = req.body.localizacionLatitud;
                    usuarioModificado = true;
                }
                if (req.body.localizacionLongitud && usuarioRegistrado.localizacionLongitud != req.body.localizacionLongitud) {
                    cambios.localizacionLongitud = req.body.localizacionLongitud;
                    usuarioModificado = true;
                }

                if (!usuarioModificado) {
                    return res.json({
                        success: true,
                        message: 'No se ha realizado ninguna modificación'
                    });
                } else {
                    Usuario.findByIdAndUpdate(req.params.id, { $set: cambios }, function (err) {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: 'El usuario no se pudo guardar',
                                err
                            });
                        }
                        Usuario.findById(req.params.id, (err, usuario) => {
                            return res.status(200).json({
                                success: true,
                                message: "Los cambios han sido guardados'",
                                usuarios: usuario
                            });
                        });
                    });
                    usuarioModificado.save(
                        function (err, usuarioDB) {
                            if (err) {
                                return res.status(400).json({
                                    success: false,
                                    message: 'El usuario no se pudo guardar',
                                    err
                                });
                            } else {
                                return res.json({
                                    success: true,
                                    message: 'Los cambios han sido guardados'
                                });
                            }
                        }
                    );
                }
            }
        }
    );
});

router.patch('/comprarLibroUsuarioLibreria', function (req, res) {
    let ejemplarId = new mongoose.Types.ObjectId(req.body.ejemplar);
    Libreria.findOne({ _id: req.body.idLibreria }, function (err, ejemp) {
        if (err) {
            return res.json({
                success: false,
                message: 'No se agregaron los libros al catálogo de libros de la librería',
                err
            })
        }
        else {
            let query;
            let vendidoQuery;
            if (ejemp) {
                for (let i = 0; i < ejemp.ejemplares.length; i++) {
                    if (ejemp.ejemplares[i].libro == req.body.ejemplar) {
                        query = i;
                    }
                }
            }
            vendidoQuery = "ejemplares." + query + ".vendidos";
            query = "ejemplares." + query + ".cantidad";
            Libreria.updateOne({ _id: req.body.idLibreria, "ejemplares.libro": req.body.ejemplar, [`${query}`]: { $gte: req.body.cantidad } }, { $inc: { [`${query}`]: -(req.body.cantidad), [`${vendidoQuery}`]: (req.body.cantidad) } }, function (err, ejemp) {
                if (err)
                    return res.json({
                        success: false,
                        message: 'No se agregaron los libros al catálogo de libros de la librería',
                        err
                    })
                else {
                    if (ejemp.n) {
                        Usuario.updateOne({ _id: req.body.idUsuario, "ejemplares.libro": ejemplarId }, { $inc: { "ejemplares.$.cantidad": (req.body.cantidad) } }, function (err, ejemplar) {
                            if (err) {
                                return res.status(400).json({
                                    success: false,
                                    message: 'Ocurrio un error',
                                    err
                                });
                            } else if (ejemplar.n) {
                                return res.json({
                                    success: true,
                                    message: 'Se logró comprar los libros'
                                })
                            }
                            else {
                                Usuario.updateOne({ _id: req.body.idUsuario }, {
                                    $push: {
                                        'ejemplares': {
                                            libro: req.body.ejemplar,
                                            cantidad: req.body.cantidad,
                                            estadoIntercambio: 1
                                        }
                                    }
                                },
                                    function (err, ejemplar) {
                                        if (err) {
                                            return res.status(400).json({
                                                success: false,
                                                message: 'No se pudo comprar el libro',
                                                err
                                            })
                                        } else {
                                            return res.json({
                                                success: true,
                                                message: 'Se logró comprar los libros'
                                            })
                                        }
                                    }
                                )

                            }
                        });
                    }
                    else {
                        return res.json({
                            success: false,
                            message: 'No hay muchos libros en stock',
                            err
                        })
                    }
                }
            });
        }
    });
});

router.patch('/comprarLibroUsuarioSucursal', function (req, res) {
    let ejemplarId = new mongoose.Types.ObjectId(req.body.ejemplar);
    Sucursal.findOne({ _id: req.body.idSucursal }, function (err, ejemp) {
        if (err) {
            return res.json({
                success: false,
                message: 'No se agregaron los libros al catálogo de libros de la librería',
                err
            })
        }
        else {
            let query;
            let vendidoQuery;
            if (ejemp) {
                for (let i = 0; i < ejemp.ejemplares.length; i++) {
                    if (ejemp.ejemplares[i].libro == req.body.ejemplar) {
                        query = i;
                    }
                }
            }
            vendidoQuery = "ejemplares." + query + ".vendidos";
            query = "ejemplares." + query + ".cantidad";
            Sucursal.updateOne({ _id: req.body.idSucursal, "ejemplares.libro": req.body.ejemplar, [`${query}`]: { $gte: req.body.cantidad } }, { $inc: { [`${query}`]: -(req.body.cantidad), [`${vendidoQuery}`]: (req.body.cantidad) } }, function (err, ejemp) {
                if (err)
                    return res.json({
                        success: false,
                        message: 'No se compro el libro',
                        err
                    })
                else {
                    if (ejemp.n) {
                        Usuario.updateOne({ _id: req.body.idUsuario, "ejemplares.libro": ejemplarId }, { $inc: { "ejemplares.$.cantidad": (req.body.cantidad) } }, function (err, ejemplar) {
                            if (err) {
                                return res.status(400).json({
                                    success: false,
                                    message: 'Ocurrio un error',
                                    err
                                });
                            } else if (ejemplar.n) {
                                return res.json({
                                    success: true,
                                    message: 'Se logró comprar los libros'
                                })
                            }
                            else {
                                Usuario.updateOne({ _id: req.body.idUsuario }, {
                                    $push: {
                                        'ejemplares': {
                                            libro: req.body.ejemplar,
                                            cantidad: req.body.cantidad,
                                            estadoIntercambio: 1
                                        }
                                    }
                                },
                                    function (err, ejemplar) {
                                        if (err) {
                                            return res.status(400).json({
                                                success: false,
                                                message: 'No se pudo comprar el libro',
                                                err
                                            })
                                        } else {
                                            return res.json({
                                                success: true,
                                                message: 'Se logró comprar los libros'
                                            })
                                        }
                                    }
                                )

                            }
                        });
                    }
                    else {
                        return res.json({
                            success: false,
                            message: 'No hay muchos libros en stock',
                            err
                        })
                    }
                }
            });
        }
    });
});

router.get('/librosLector/:id', async (req, res) => {
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
        .populate({
            path: 'ejemplares.libro',
            populate: {
                path: 'libro',
                populate: {
                    path: 'genero categoria autor',
                    select: '_id nombre nombreArtistico'
                },
                select: '_id titulo genero categoria caratula contraportada'
            },
            select: '_id tipo precio isbn10 isbn13 cantidad iva libro'
        })
        .select('nombre libreria ejemplares');
});

router.post('/tieneElLibro/', async (req, res) => {
    let libros = [];
    for (var i = 0; i < req.body.ejemplares.length; i++)
        libros.push(new mongoose.Types.ObjectId(req.body.ejemplares[i]));

    Usuario.find({ _id: req.body.idUsuario, "ejemplares.libro": { $in: libros } }, function (err, usuario) {
        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }
        else if (usuario != "") {
            Libro.findOne({ _id: req.body.idLibro, "voto.usuario": req.body.idUsuario }, function (err, user) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        err
                    });
                } else if (user) {
                    return res.json({
                        success: false
                    });
                } else {
                    return res.json({
                        success: true
                    });
                }
            });
        }
        else {
            return res.json({
                success: false
            });
        }
    })
});

router.post('/correoCompra', function (req, res) {
    let libreria = req.body.libros[0];
    let tarjeta = req.body.tarjeta;
    let user = req.body.tarjeta.usuario;
    let libros = req.body.libros;
    let total = 0;
    let htmlLibro = '';
    for (let i = 2; i < libros.length; i++) {
        let precioActual = Number(libros[i].precio) * Number(libros[i].cantidad);
        htmlLibro += `  <tr>
                            <td>${libros[i].titulo} (${libros[i].tipo})</td>
                            <td>${libros[i].cantidad}</td>
                            <td>${libros[i].iva}%</td>
                            <td>${precioActual}</td>
                        </tr>`;
        total += precioActual;
    }
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let mailOption = {
        from: 'grupovalhalla2019@gmail.com',
        to: user.correo,
        subject: `Compra en ${libreria.nombre}`,
        html: `<head>
        <meta charset="UTF-8">
        <title>INVOICE</title>
        <style>
            table{
                margin-left:auto; 
                margin-right:auto; 
                padding:20px;
                }
            table,td,th{
                border:1.5px solid black;
                border-collapse:collapse;
                text-align:left;
                width:800px;
                }
            td,tr,th{
            font-size:20px;
            padding:15px;
            text-align:left;
            }
            th{
                background-color:lightcyan;
            }          
        </style>
      </head>
      <body>
      
        <table >
          <tr>
              <th colspan="3">Factura</th>
              <th colspan="2">Fecha ${day}/${month}/${year}</th>
          </tr>
          <tr> <td colspan="2"><strong>Tienda:</strong>
            <br>${libreria.nombre} 
            </td>
            <td colspan="2"><strong>Cliente:</strong>
              <br>Nombre: ${user.nombre} ${user.primerApellido} 
              <br>Tarjeta: ${tarjeta.numTarjeta}
              <br>${tarjeta.nombre1}
             </td>
          </tr>
          
          <tr>
            <th>Item:</th>
            <th>Cantidad:</th>
            <th>IVA: </th>
            <th>Precio:</th>
          </tr>
          ${htmlLibro}
           <th colspan="3">Total:</th>
            <td>${total}</td>
          </tr>
        </table>
      </body>
      </html>`
    };
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            return res.json({
                success: true,
                message: `No se pudo enviar el correo de factura`
            })
        }
        return res.json({
            success: true,
            message: 'Revise su correo eléctronico'
        })
    });
})

router.get('/obtenerLibreriasPendientesCount', async (req, res) => {//Adminitrador librería
    return await Usuario.countDocuments({ estado: 0, tipoUsuario: 'Adminitrador librería', cambiarPass: 1 }, function (err, count) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna libreria',
                err
            });
        }
        else {
            return res.json({
                success: true,
                count: count
            });
        }
    });
});

router.get('/obtenerLibreriasPendientes', async (req, res) => {
    return await Usuario.find({ estado: 0, tipoUsuario: 'Adminitrador librería', cambiarPass: 1 }, function (err, libreria) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se encontro ninguna libreria',
                err
            });
        }
        else {
            return res.json({
                success: true,
                libreria: libreria
            });
        }
    })
        .populate('libreria', 'nombreComercial nombreFantasia')
        .select('nombre primerApellido correo libreria');
});

router.patch('/aprobarSolcitud/:id', function (req, res) {
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
            else {
                let mailOption = {
                    from: 'grupovalhalla2019@gmail.com',
                    to: usuariosDB.correo,
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
    
                      <p>Saludos ${usuariosDB.nombre} ${usuariosDB.primerApellido} le agradecemos por escoger utilizar los servicios de Barnes & Noble</p>
                      <p>El correo electrónico asociado es: ${usuariosDB.correo}</p>
                      <p>Su contraseña temporal es: ${usuariosDB.pass}</p>
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
                            message: `Ocurrio un error al envio del correo, su contraseña es ${usuariosDB.pass}`
                        })
                    }
                    return res.json({
                        success: true,
                        message: 'El usuario se guardó con éxito'
                    })
                });
            }
        });
    });
});

router.get('/obtenerLibroIntercambio', function (req, res) {
    Usuario.aggregate(
        [{
            $unwind: "$ejemplares"
        },
        {
            "$group": {
                "_id": "$ejemplares.libro",
            }
        }])
        .exec(function (err, transactions) {
            Ejemplar.populate(transactions, { path: '_id', select: '_id tipo libro' }, function (err, populatedTransactions) {
                if (err) {
                    return res.json({
                        success: false,
                        message: `Ocurrio un error`
                    })
                }
                else {
                    Libro.populate(populatedTransactions, { path: '_id.libro', select: '_id titulo caratula genero categoria autor' }, function (err, libro) {
                        if (err) {
                            return res.json({
                                success: false,
                                message: `Ocurrio un error`
                            })
                        }
                        else {
                            Autor.populate(populatedTransactions, { path: '_id.libro.autor', select: '_id nombre nombreArtistico' }, function (err, libro) {
                                if (err) {
                                    return res.json({
                                        success: false,
                                        message: `Ocurrio un error`
                                    })
                                }
                                else {
                                    Genero.populate(populatedTransactions, { path: '_id.libro.genero', select: '_id nombre' }, function (err, libro) {
                                        if (err) {
                                            return res.json({
                                                success: false,
                                                message: `Ocurrio un error`
                                            })
                                        }
                                        else {
                                            Categoria.populate(populatedTransactions, { path: '_id.libro.categoria', select: '_id nombre' }, function (err, libro) {
                                                if (err) {
                                                    return res.json({
                                                        success: false,
                                                        message: `Ocurrio un error`
                                                    })
                                                }
                                                else {
                                                    return res.json({
                                                        success: true,
                                                        libro: libro
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            });
        });
})

router.get('/obtenerLectoresPorEjemplaresId/:idEjemplar', function (req, res) {
    Usuario.find({ "ejemplares.libro": req.params.idEjemplar, "ejemplares.estadoIntercambio": 1 }, {
        'ejemplares.$': 1
    }, function (err, usuario) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro usuarios',
                err
            });
        } else {
            return res.json({
                success: true,
                usuario: usuario
            });
        }
    })
        .select("nombre primerApellido provincia canton img");
});

router.patch('/votarUsuario', function (req, res) {
    Usuario.findByIdAndUpdate(req.body.idUser, {
        $push: {
            'resennas': {
                intercambio: req.body.idIntercambio,
                usuario: req.body.usuario,
                calificacion: req.body.voto,
                comentario: req.body.comentario
            }
        }
    }, function (err, voto) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Ocurrio un error al votar por el usuario',
                err
            });
        }
        else {
            return res.json({
                success: true,
                message: "El voto se ha guardado en el sistema"
            });
        }
    });;
})

router.post('/tieneVotoUsuario', async (req, res) => {
    Usuario.find({ _id: req.body.idUsuarioVotado, "resennas.intercambio": req.body.idIntercambio }, function (err, usuario) {
        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }
        else if (usuario == "") {
            return res.json({
                success: true
            });
        }
        else {
            return res.json({
                success: false
            });
        }
    })
});

module.exports = router;