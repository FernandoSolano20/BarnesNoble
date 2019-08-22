let inputFiltro = document.querySelector('#input-filtro');

let crearTabla = async (event) => {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (!event) {
        listaAutores = await obtenerAutores();
    }
    let filtro = inputFiltro.value;

    tbody.innerHTML = '';
    for (let i = 0; i < listaAutores.length; i++) {
        if (listaAutores[i].nombre.toLowerCase().includes(filtro.toLowerCase()) || listaAutores[i].nombreArtistico.toLowerCase().includes(filtro.toLowerCase())) {
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
    fila.insertCell().innerHTML = autor.nombreArtistico;

    let editarCelda = fila.insertCell();
    let editar = document.createElement('i');
    editar.setAttribute('class', 'far fa-edit');
    editar.setAttribute('data-id', autor._id);
    editar.addEventListener('click', function () {
        window.location.href = `modificarAutor.html?_id=${autor._id}`
    });
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
    let premios = fila.insertCell();
    let btnPremios = document.createElement('a');
    btnPremios.innerText = 'Agregar Premios';
    btnPremios.setAttribute('class', 'btnVerPerfil');
    btnPremios.href = '#';
    btnPremios.dataset._id = autor['_id'];

    btnPremios.addEventListener('click', async function () {
        Swal.fire({
            title: 'Ingrese la información del premio',
            html: `<form class="formRegistro" name="formulario_registro">
            <div class="column">
                <div class="inputGroup">
                    <span class="left alertHidden" id="alertNombrePremio">La identificación debe tener 9 dígitos.</span>
                    <label class="label" for="valorNombrePremio">Nombre del Premio:</label>
                    <input type="text" id="valorNombrePremio" name="Cédula">
                </div>
                <div class="inputGroup">
                    <span class="left alertHidden" id="alertAnno">La identificación debe tener 9 dígitos.</span>
                    <label class="label" for="valorAnnoPremio">Año del premio:</label>
                    <input type="text" id="valorAnnoPremio" name="Año premio">
                </div>
                <div class="inputGroup">
                    <span class="left alertHidden" id="alertDescrip">La identificación debe tener 9 dígitos.</span>
                    <label class="label" for="valorDesPremio">Descripción:</label>
                    <input type="text" id="valorDesPremio" name="Descripción">
                </div>
                `
        }).then(async () => {
            let nombre = document.querySelector('#valorNombrePremio');
            let nombreAlert = document.querySelector('#alertNombrePremio');
            let elementText = {
                value: nombre.value,
                alert: nombreAlert,
                input: nombre
            }
            var err1 = !(noVacio(elementText) && validarTexto(elementText));

            let anno = document.querySelector('#valorAnnoPremio');
            let annoAlert = document.querySelector('#alertAnno');
            let elementNumber = {
                value: anno.value,
                alert: annoAlert,
                input: anno
            }
            var err2 = !(validarNumeros(elementNumber) && validarAnno(elementNumber));

            let descripcion = document.querySelector('#valorDesPremio');
            let alertDescrip = document.querySelector('#alertDescrip');
            elementText = {
                value: descripcion.value,
                alert: alertDescrip,
                input: descripcion
            }
            var err3 = !(noVacio(elementText));

            if (!(err1 || err2 || err3)) {
                let response = await agregarPremios(this.dataset._id, nombre.value, anno.value, descripcion.value);
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
            else {
                Swal.fire({
                    type: 'warning',
                    title: "El premio no se pudo guardar"
                })
            }
        }
        )
    });
    premios.appendChild(btnPremios);

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

let validarAnno = function (elementos) {
    if (elementos.value > new Date().getFullYear()) {
        elementos.alert.innerText = "Debe ser menor que el año actual."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("inputError", "");
        elementos.input.className = elementos.input.className + " inputError";
        return false;
    }
    elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
    elementos.alert.className = elementos.alert.className + " alertHidden";
    elementos.input.className = elementos.input.className.replace("inputError", "");
    return true;
}

    