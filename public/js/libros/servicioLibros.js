//ARCHIVO DE SERVICIO DE LIBROS, MARCO ARAGON
'use strict';
let registrarLibros = (ptitulo, pedicion, peditorial, pannoEdicion, pisbn_10, pisbn_13, pcaratula, pcontraportada, pprecio, pvendidos, pidGenero, pidCategoria, pidAutor) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/libros/registrarLibro',
        responseType: 'json',
        data: {
            titulo: ptitulo,
            edicion: pedicion,
            editorial: peditorial,
            annoEdicion: pannoEdicion,
            isbn_10: pisbn_10,
            isbn_13: pisbn_13,
            caratula: pcaratula,
            contraportada: pcontraportada,
            precio: pprecio,
            vendidos: pvendidos,
            idGenero: pidGenero,
            idCategoria: pidCategoria,
            idAutor: pidAutor


        }
    });
};

let obtenerLibros = async () => {
    try {
        const response = axios({
            method: 'get',
            url: 'http://localhost:4000/api/libros/listarLibros',
            responseType: 'json'
        });

        const result = await response;
        return result.data.listaLibros;

    } catch (error) {
        console.log(error);
    }
};
