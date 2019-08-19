let listaSolicitudIntercambio = [];
let txtFiltro = document.querySelector('#txt-filtro');
let tbody = document.querySelector('#tbl_librerias tbody');
let rowCount = 0;

let mostrar_tabla = async (event) => {
    if (!event) {
        listaSolicitudIntercambio = await solicitudesIntercambios(sessionStorage.id);
        listaSolicitudIntercambio = listaSolicitudIntercambio.intercambio;
    }
    tbody.innerHTML = '';
    rowCount = 0;
    let filtro = txtFiltro.value.toLowerCase();
    for (let i = 0; i < listaSolicitudIntercambio.length; i++) {
        let receptor = listaSolicitudIntercambio[i].participantes[0];
        let emisor = listaSolicitudIntercambio[i].participantes[1];
        if (receptor.tipoUsuario == 'Receptor' && sessionStorage.id == receptor.usuario._id) {
            if (receptor.usuario.nombre.toLowerCase().includes(filtro.toLowerCase()) || receptor.usuario.primerApellido.toLowerCase().includes(filtro.toLowerCase()) || receptor.ejemplarUsuario.libro.titulo.toLowerCase().includes(filtro.toLowerCase()) || receptor.ejemplarUsuario.tipo.toLowerCase().includes(filtro.toLowerCase()) || receptor.ejemplarUsuario.libro.categoria.nombre.toLowerCase().includes(filtro.toLowerCase()) || receptor.ejemplarUsuario.libro.genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || receptor.ejemplarUsuario.libro.autor.nombre.toLowerCase().includes(filtro.toLowerCase())) {
                rowCount++;
                let fila = tbody.insertRow();
                fila.setAttribute('data-id', listaSolicitudIntercambio[i]._id);
                fila.insertCell().innerHTML = emisor.usuario.nombre + " " + emisor.usuario.primerApellido;
                fila.insertCell().innerHTML = `${receptor.ejemplarUsuario.libro.titulo} (${receptor.ejemplarUsuario.tipo}) `;
                fila.insertCell().innerHTML = `${emisor.ejemplarUsuario.libro.titulo} (${emisor.ejemplarUsuario.tipo}) `;


                let aprobarCelda = fila.insertCell();
                let aprobar = document.createElement('i');
                aprobar.setAttribute('class', 'fas fa-check');
                aprobar.setAttribute('data-action', 'aprobar');
                aprobarCelda.appendChild(aprobar);

                let rechazarCelda = fila.insertCell();
                let rechazar = document.createElement('i');
                rechazar.setAttribute('class', 'far fa-window-close');
                rechazar.setAttribute('data-action', 'rechazar');
                rechazarCelda.appendChild(rechazar);
            }
        }
    }
    filaNoDatos();
};

let filaNoDatos = function () {
    if (rowCount === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

txtFiltro.addEventListener('keyup', mostrar_tabla);
mostrar_tabla()