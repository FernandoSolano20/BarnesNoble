'use strict';

let crearClubLectura = (pnombre, ptema, ptipoClub, pfechaReunion , phoraReunion, pIdSucursal, pIdCategoria, pIdGenero, pIdUsuario,) => {
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

let registrarClubLectura = async (clubLectura) => {
    let response = await fetch('http://localhost:4000/api/clubLectura/registrarClubLectura', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(clubLectura)
    });
    let result = await response.json();
    return result;
}

let obtenerClubesLectura = async() => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/clubLectura/listarClubLectura',
            responseType: 'json'
        });

        return response.data.listaClubesLectura;
    } catch (error) {
        console.log(error);
    }
};