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
    if (listaAutores.length === 0 || tbody.childElementCount === 0) {
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


    let premios = fila.insertCell();
    let btnPremios = document.createElement('a');
    btnPremios.innerText = 'Agregar Premios';
    btnPremios.setAttribute('class', 'btnVerPerfil');
    btnPremios.href = '#';
    btnPremios.dataset._id = autor['_id'];

    btnPremios.addEventListener('click', async function () {
        Swal.fire({
            title: 'Ingrese la información del premio',
            html: '<input type= "text" id="valorNombrePremio" placeholder="Ingrese un nombre">' + '<input type= "text" id="valorAnnoPremio" placeholder="Ingrese el año de la premiación">' + '<input type= "text" id="valorDesPremio" placeholder="Ingrese una descripción">'
        }).then(async () => {
            let nombre = document.querySelector('#valorNombrePremio').value;
            let anno = document.querySelector('#valorAnnoPremio').value;
            let descripcion = document.querySelector('#valorDesPremio').value;
            if (nombre && anno && descripcion) {
                let response = await agregarPremios(this.dataset._id, nombre, anno, descripcion);
                if (response.success) {
                    Swal.fire({
                        type: 'success',
                        title: response.message
                    })
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: response.message
                    })
                }

            }
        }
        )
    });
    premios.appendChild(btnPremios);

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

    let perfil = fila.insertCell();
    let btnPerfil = document.createElement('button');
    btnPerfil.innerText = 'Ver perfil';
    btnPerfil.setAttribute('class', 'btnVerPerfil');
    btnPerfil.dataset._id = autor['_id'];
    btnPerfil.addEventListener('click', function () {
        window.location.href = `verPerfilAutor.html?_id=${this.dataset._id}`
    });
    perfil.appendChild(btnPerfil);
}




