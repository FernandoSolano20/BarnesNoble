let sucursal, libreria;

let informacionLibreria = async function () {
    let contenedor = document.getElementById('informacionSucursal');
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    sucursal = await obtenerSucursalPorId(id);
    libreria = await obtenerLibreriaPorIdSucursal(id);

    partialInformacionSucursal(contenedor);
}

let partialInformacionSucursal = function (contenedor) {
    let infoContainer = document.createElement('div');
    infoContainer.setAttribute('class', 'info');
    contenedor.appendChild(infoContainer);
    let title = document.createElement('h2');
    title.innerText = "Información de la sucursal";
    infoContainer.appendChild(title);

    let divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    let span = document.createElement('span');
    divInfo.appendChild(span);
    let label = document.createTextNode('Nombre:');
    span.appendChild(label);
    let icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    let text = document.createElement('p');
    text.innerText = sucursal.sucursal.nombre;
    divInfo.appendChild(text);
    document.getElementById('tiendaNombre').innerText = "Sucursal " + sucursal.sucursal.nombre;

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Teléfono:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = sucursal.sucursal.telefono;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Correo eléctronico:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = sucursal.sucursal.correo;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Provincia:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = sucursal.sucursal.provincia;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Cantón:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = sucursal.sucursal.canton;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Distrito:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = sucursal.sucursal.distrito;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'crear-contenedor');
    infoContainer.appendChild(divInfo);
    let button = document.createElement('a');
    button.setAttribute("href", "http://localhost:3000/perfilLibreria.html?id=" + libreria.libreria[0]._id);
    button.setAttribute("class", "material-blue btn-sucursal");
    button.innerText = "Ver perfil librería";
    divInfo.appendChild(button);

    if (sessionStorage.tipoUsuario == 'Lector') {
        let btnSuscribir = document.createElement('button');
        btnSuscribir.addEventListener('click', function () {
            if (usuarioSuscrito(sucursal.sucursal.usuariosSubscritos, sessionStorage.id)) {
                btnSuscribir.innerText = 'Cancelar suscribción';
                desuscribir(btnSuscribir);
            }
            else {
                btnSuscribir.innerText = 'Subscribir';
                subscribir(btnSuscribir);
            }
        })

        if (usuarioSuscrito(sucursal.sucursal.usuariosSubscritos, sessionStorage.id))
            btnSuscribir.innerText = 'Cancelar suscribción';
        else
            btnSuscribir.innerText = 'Subscribir';

        btnSuscribir.setAttribute('class', 'material-blue btn-sucursal');
        btnSuscribir.setAttribute('id', 'subscribir');
        divInfo.appendChild(btnSuscribir);
    }

    let position = {
        lat: Number(sucursal.sucursal.localizacionLatitud),
        lng: Number(sucursal.sucursal.localizacionLongitud)
    }
    initMap(position, 13);
    let message = '<h1 id="firstHeading" class="firstHeading"> Sucursal ' + sucursal.sucursal.nombre + '</h1>' +
        '<div id="bodyContent">' +
        '<p>' + sucursal.sucursal.provincia + ", " + sucursal.sucursal.canton + ", " + sucursal.sucursal.distrito + '</p>' +
        '<p>Está es la localización de la sucursal ' +
        '</p> </div>';
    addMarker(position, message);
    mostarLibros();
}

let desuscribir = async (btnSuscribir) => {
    let response = await desuscribirUsuario({
        idUsuario: sessionStorage.id,
        idSucursal: sucursal.sucursal['_id']
    });
    if (response.success) {
        btnSuscribir.innerText = 'Subscribir';
        Swal.fire({
            type: 'success',
            title: response.message
        })
        removerUsuarioLista();
    }
    else {
        Swal.fire({
            type: 'error',
            title: response.message
        })
    }
}

let subscribir = async (btnSuscribir) => {
    let response = await suscribirUsuario({
        idUsuario: sessionStorage.id,
        idSucursal: sucursal.sucursal['_id'],
        correo: sessionStorage.correo
    });
    if (response.success) {
        btnSuscribir.innerText = 'Cancelar suscribción';
        Swal.fire({
            type: 'success',
            title: response.message
        })
        agregarUsuarioLista();
    }
    else {
        Swal.fire({
            type: 'error',
            title: response.message
        })
    }
}

let usuarioSuscrito = function (lista, idUsuario) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].usuario == idUsuario) return true;
    }
    return false;
}

let removerUsuarioLista = function () {
    for (let i = 0; i < sucursal.sucursal.usuariosSubscritos.length; i++) {
        if (sucursal.sucursal.usuariosSubscritos[i].usuario === sessionStorage.id) {
            sucursal.sucursal.usuariosSubscritos.splice(i, 1);
            break;
        }
    }
}

let agregarUsuarioLista = function () {
    sucursal.sucursal.usuariosSubscritos.push({ usuario: sessionStorage.id });
}

informacionLibreria();