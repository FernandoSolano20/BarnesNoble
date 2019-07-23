//ARCHIVO DE SERVICIO DE OFERTAS, MARCO ARAGON
let registrarOfertas= (ptipoOferta, pdescuento, pdescripcion, pidSucursal, pidGenero, pidCategoria, pidLibro, pidAutor) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/ofertas/registrarOferta',
        responseType: 'json',
        data: {
            tipoOferta: ptipoOferta,
            descuento: pdescuento,
            descripcion: pdescripcion,
            idSucursal: pidSucursal,
            idGenero: pidGenero,
            idCategoria: pidCategoria,
            idLibro: pidLibro,
            idAutor: pidAutor


        }
    });
};