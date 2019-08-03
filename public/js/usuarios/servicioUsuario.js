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