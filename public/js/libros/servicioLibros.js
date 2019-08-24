//ARCHIVO DE SERVICIO DE LIBROS, MARCO ARAGON
'use strict';
let registrarLibros = async (libro) => {
    var response = await fetch('http://localhost:4000/api/libros/registrarLibro', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(libro)
    });
    var result = await response.json();
    return result;
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

let obtenerLibrosFetch = async () => {
    let response = await fetch('http://localhost:4000/api/libros/listarLibros', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaLibros;
}

let obtenerLibrosPorId = async (id) => {
    try {
        //Fetch data from an url endpoint:
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/libros/listarLibrosPorIdDB/' + id,
            responseType: 'json'
        });
        const result = await response;
        return result.data.Libros;
    } catch (error) {
        console.log(error);
    }
};


let obtenerLibrosId = async (id) => {
    let response = await fetch('http://localhost:4000/api/libros/buscarLibroID/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}

let obtenerLibrorId = async(id) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/autor/buscarLibroId/${id}`,
            responseType: 'json'
        });

        return response.data.libro;
    } catch (error) {
        console.log(error);
    }
};


//SofiaZu-Para listar por preferencia
let obtenerPreferencias = async (usuario) => {
    let response = await fetch('http://localhost:4000/api/libros/listarLibrosPorPreferencia', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(usuario)
    });
    let result = await response.json();
    return result.listaLibros;
}

let obtenerCountLibro = async function () {
    var response = await fetch('http://localhost:4000/api/libros/countLibros', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.count;
}

let votarPorLibro = async function (voto) {
    var response = await fetch('http://localhost:4000/api/libros/votarLibro', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(voto)
    });
    var result = await response.json();
    return result;
 }


const obtenerLibrosMejoresCalificados = async () => {
    let response = await fetch('http://localhost:4000/api/libros/listarMejoreCalificados', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaLibros;
}

let obtenerLibroId = async(id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/libros/buscar-libro-id/${id}`,
            responseType: 'json'
        });

        return response.data.Libros;
    } catch (error) {
        console.log(error);
    }
};

//Creado por Frank
let modificarLibro = async (id, libro) => {
    let response = await fetch('http://localhost:4000/api/libros/editar/'+ id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(libro)
    });
    let result = await response.json();
    return result;
};
let eliminarLibro = (pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/libros/eliminarLibro/',
        responseType: 'json',
        data: {
            _id: pid
        }

    });

};
let estadoLibro = async(libro,id) => {
    let response = await fetch('http://localhost:4000/api/autor/modificarEstado/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(libro)
    });
    let result = await response.json();
    return result.response;
}