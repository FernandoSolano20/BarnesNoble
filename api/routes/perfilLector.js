router.get('/buscar-lector-id/:_id', function(req, res) {
    Usuario.findById(req.body._id, function(err, usuarioBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontró ningún lector con ese _id',
                err
            });
        } else {
            return res.json({
                success: true,
                usuario : usuarioBD
            });
        }
    })
});