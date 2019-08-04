const tbodyClub = document.querySelector('#tbl_clubesLectura tbody');
let listaClub;

const crearTablaClub = async () => {
    listaClub = await obtenerClubesLecturaUsuarioAdminClub(sessionStorage.id);
    tbodyClub.innerHTML = '';
    for (let i = 0; i < listaClub.length; i++) {
        agregarClub(listaClub[i]);
    }
    document.getElementById('club').addEventListener('click', function(){
        window.location.href = "listarClubLectura.html";
    });
    filaNoDatosClub();
};

let agregarClub = function (club) {
    let fila = tbodyClub.insertRow();
    fila.insertCell().innerHTML = club.nombre;
    fila.insertCell().innerHTML = club.tema;
    fila.insertCell().innerHTML = club.tipoClub;
    fila.insertCell().innerHTML = club.fechaReunion;
}

let filaNoDatosClub = function () {
    if (listaClub.length === 0 || tbodyClub.childElementCount === 0) {
        let fila = tbodyClub.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

crearTablaClub();