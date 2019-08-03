'use strict';

let registrarClubLectura = (pnombre, ptema, ptipoClub, pfechaReunion , phoraReunion, pIdSucursal, pIdCategoria, pIdGenero, pIdUsuario,) => {
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
            categoria:pIdCategoria,
            genero:pIdGenero,
            administrador: pIdUsuario
        }
    });
};

var crearClubLectura = async (clubLectura) => {
    var response = await fetch('http://localhost:4000/api/registrarClubLectura', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(clubLectura)
    });
    var result = await response.json();
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