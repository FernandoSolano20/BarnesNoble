let listaLibrerias = [];
let txtFiltro = document.querySelector('#txt-filtro');
let tbody = document.querySelector('#tbl_librerias tbody');

let mostrar_tabla = async (event) => {
    if (!event) {
        listaLibrerias = await obtenerLibreriasPendientes();
    }
    tbody.innerHTML = '';

    let filtro = txtFiltro.value.toLowerCase();
    for (let i = 0; i < listaLibrerias.libreria.length; i++) {
        let libreria = listaLibrerias.libreria[i].libreria;
        let admin = listaLibrerias.libreria[i];
        if (libreria['nombreComercial'].toLowerCase().includes(filtro)
            || libreria['nombreFantasia'].toLowerCase().includes(filtro)
            || admin['correo'].toLowerCase().includes(filtro)) {

            let fila = tbody.insertRow();
            fila.setAttribute('data-id', admin._id);
            fila.insertCell().innerHTML = libreria['nombreComercial'];
            fila.insertCell().innerHTML = libreria['nombreFantasia'];
            fila.insertCell().innerHTML = admin['correo'];


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
    filaNoDatos();
};

let filaNoDatos = function () {
    if (listaLibrerias.libreria.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

txtFiltro.addEventListener('keyup', mostrar_tabla);
mostrar_tabla()