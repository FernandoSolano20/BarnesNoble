'use strict';

let registrarClubLectura = (pnombre, ptema, ptipoClub, pfechaReunion , phoraReunion, pIdChat, pIdSucursal, pIdCategoria, pIdGenero, pIdUsuario,) => {
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
            IdSucursal: pIdSucursal,
            IdCategoria:pIdCategoria,
            IdGenero:pIdGenero,
            IdUsuario: pIdUsuario,
            IdChat: pIdChat

        }
    });
};

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