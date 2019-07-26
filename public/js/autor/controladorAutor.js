let inputFiltro = document.querySelector('#input-filtro');

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


    let perfil = fila.insertCell();
    let btnPerfil = document.createElement('button');
    btnPerfil.innerText = 'Ver perfil';
    btnPerfil.setAttribute('class', 'btnVerPerfil');
    btnPerfil.dataset._id = autor['_id'];
    btnPerfil.addEventListener('click', function () {
        window.location.href = `verPerfilAutor.html?_id=${this.dataset._id}`
    });
    perfil.appendChild(btnPerfil);

    let editarCelda = fila.insertCell();
    let editar = document.createElement('i');
    editar.setAttribute('class', 'far fa-edit');
    editar.setAttribute('data-id', autor._id);
    editarCelda.appendChild(editar);

    let eliminarCelda = fila.insertCell();
    let eliminar = document.createElement('i');
    eliminar.setAttribute('class', 'fal fa-trash-alt');
    eliminar.setAttribute('data-action', 'borrar');
    eliminarCelda.appendChild(eliminar);

    let estadoCelda = fila.insertCell();

    let estadoInput = document.createElement('input');
    estadoInput.setAttribute('class', 'switch');
    estadoInput.setAttribute('id', autor._id);
    estadoInput.setAttribute('type', 'checkbox');
    estadoCelda.appendChild(estadoInput);
    estadoInput.checked = !autor.estado;

    let estadoLabel = document.createElement('label');
    estadoLabel.setAttribute('data-action', 'estado');
    estadoLabel.setAttribute('for', autor._id);
    estadoCelda.appendChild(estadoLabel);
}
