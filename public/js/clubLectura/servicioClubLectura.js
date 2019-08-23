'use strict';

let crearClubLectura = (pnombre, ptema, ptipoClub, pfechaReunion, phoraReunion, pIdSucursal, pIdCategoria, pIdGenero, pIdUsuario, ) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/clubLectura/registrarClubLectura',
        responseType: 'json',
        data: {
            nombre: pnombre,
            tema: ptema,
            tipoClub: ptipoClub,
            fechaReunion: pfechaReunion,
            horaReunion: phoraReunion,
            sucursal: pIdSucursal,
            categoria: pIdCategoria,
            genero: pIdGenero,
            administrador: pIdUsuario
        }
    });
};

let registrarClubLectura = async (clubLectura) => {
    let response = await fetch('http://localhost:4000/api/clubLectura/registrarClubLectura', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(clubLectura)
    });
    let result = await response.json();
    return result;
}

let obtenerClubesLectura = async () => {
    let response = await fetch('http://localhost:4000/api/clubLectura/listarClubLectura', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaClubesLectura;
}

let obtenerClubesLecturaUsuarioAdminClub = async (id) => {
    let response = await fetch('http://localhost:4000/api/clubLectura/listarClubLecturaPorUsuario/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaClubesLectura;
}

let obtenerContClubAdministrador = async (id) => {
    let response = await fetch('http://localhost:4000/api/clubLectura/obtenerContClubAdministrador/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.count;
}


let obtenerClubPorId = async (id) => {
    let response = await fetch('http://localhost:4000/api/clubLectura/listarClubLecturaPorId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}

let suscribirUsuarioClub = async function (participante) {
    var response = await fetch('http://localhost:4000/api/clubLectura/suscribirUsuarioClubLectura', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(participante)
    });
    var result = await response.json();
    return result;
}

let desuscribirUsuarioClub = async function (participante) {
    var response = await fetch('http://localhost:4000/api/clubLectura/desuscribirUsuarioClubLectura', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(participante)
    });
    var result = await response.json();
    return result;
}

let modificarClubLectura = async (club,id) => {
    let response = await fetch('http://localhost:4000/api/clubLectura/modificarClubLectura/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(club)
    });
    let result = await response.json();
    return result;
};

let eliminarClubLectura = async (id) => {
    let response = await fetch('http://localhost:4000/api/clubLectura/eliminarClubLectura/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    let result = await response.json();
    return result;
};