let crearTabla = async (event) => {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (!event) {
        listaAutores = await obtenerAutores();
    }
    let filtro = inputFiltro.value;

    tbody.innerHTML = '';
    for (let i = 0; i < listaAutores.length; i++) {
        if (listaAutores[i].nombre.toLowerCase().includes(filtro.toLowerCase())) {
            agregarFilaAutores(listaAutores[i]);
        }
    }
    filaNoDatos();
};

inputFiltro.addEventListener('keyup', crearTabla);
crearTabla();

let filaNoDatos = function () {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (lista.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

let agregarFilaAutores = function (autor) {
    let tbody = document.querySelector('#tabla-elementos tbody');
    let fila = tbody.insertRow();
    fila.setAttribute('data-id', autor._id);
    fila.insertCell().innerHTML = autor.nombre;
}