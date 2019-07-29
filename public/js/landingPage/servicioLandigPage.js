'use strict';

const obtenerLibrosMasVendidos = async () => {
    let response = await fetch('http://localhost:4000/api/libros/listarMasVendidos', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaLibros;
}