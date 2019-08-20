// Listar Usuarios

let obtenerUsuarios = async () => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarUsuarios',
            responseType: 'json'
        });

        var result = await response.data.listaUsuarios;

        return result;

    } catch (error) {
        console.log(error);
    }
};

var crearUsuario = async (usuario) => {
    var response = await fetch('http://localhost:4000/api/registrarUsuario', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(usuario)
    });
    var result = await response.json();
    return result;
}

var editarUsuario = async (usuario, id) => {
    var response = await fetch('http://localhost:4000/api/editarUsuario/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(usuario)
    });
    var result = await response.json();
    return result;
}

var cambiarPassword = async (usuario, id) => {
    var response = await fetch('http://localhost:4000/api/modificarPassword/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(usuario)
    });
    var result = await response.json();
    return result;
}

let obtenerLectorId = async (_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscarLectorId/${_id}`,
            responseType: 'json'
        });

        return response.data.usuario;
    } catch (error) {
        console.log(error);
    }
};

let obtenerUsuarioPorIdFetch = async (id) => {
    var response = await fetch('http://localhost:4000/api/usuarioId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let obtenerUsuarioPorIdLibreria = async (id) => {
    var response = await fetch('http://localhost:4000/api/usuarioIdLibreria/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

//SofiaZu-Para listar por preferencia
let preferenciasUsuario = async (_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/obtenerPreferenciaUsuario/${_id}`,
            responseType: 'json'
        });

        return response.data.usuario;
    } catch (error) {
        console.log(error);
    }
};

let obtenerUsuarioPorIdFetchTiendas = async (id) => {
    var response = await fetch('http://localhost:4000/api/usuarioIdGetTiendas/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let obtenerCountAutoroFav = async function () {
    var response = await fetch('http://localhost:4000/api/autorFavCount', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.usuario;
}

let obtenerCountGeneroFav = async function () {
    var response = await fetch('http://localhost:4000/api/generoFavCount', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.usuario;
}
let obtenerCountCategoriaFav = async function () {
    var response = await fetch('http://localhost:4000/api/categoriaFavCount', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.usuario;
}
let obtenerCountLibroFav = async function () {
    var response = await fetch('http://localhost:4000/api/libroFavCount', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.usuario;
}

let obtenerCountUsers = async function () {
    var response = await fetch('http://localhost:4000/api/countUser', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.count;
}

let comprarLibroEnLibreria = async function (compra) {
    var response = await fetch('http://localhost:4000/api/comprarLibroUsuarioLibreria', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(compra)
    });
    var result = await response.json();
    return result;
}

let comprarLibroEnSucursal = async function (compra) {
    var response = await fetch('http://localhost:4000/api/comprarLibroUsuarioSucursal', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(compra)
    });
    var result = await response.json();
    return result;
}

let verLibrosCompradosLector = async function (id) {
    var response = await fetch('http://localhost:4000/api/librosLector/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
}

let tieneElLibroVoto = async function (usuario) {
    var response = await fetch('http://localhost:4000/api/tieneElLibro', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(usuario)
    });
    var result = await response.json();
    return result;
}

let enviarCorreoUserCompra = async function (datos) {
    var response = await fetch('http://localhost:4000/api/correoCompra', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(datos)
    });
    var result = await response.json();
    return result;
}

let estadoUser = async(user,id) => {
    let response = await fetch('http://localhost:4000/api/modificarEstadoUsuario/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(user)
    });
    let result = await response.json();
    return result.response;
}

let obtenerLibreriasPendientes = async () => {
    var response = await fetch('http://localhost:4000/api/obtenerLibreriasPendientes', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let borrarUsuario = async(id) => {
    let response = await fetch('http://localhost:4000/api/eliminarUsuario/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}

let aprobarSolcitud = async(user,id) => {
    let response = await fetch('http://localhost:4000/api/aprobarSolcitud/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(user)
    });
    let result = await response.json();
    return result;
}