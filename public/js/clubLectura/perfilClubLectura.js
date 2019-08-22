let club = [];

let informacionLibreria = async function () {
    let contenedor = document.getElementById('informacionClub');
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    club = await obtenerClubPorId(id);

    partialInformacionClub(contenedor);
}

let partialInformacionClub = function (contenedor) {
    let infoContainer = document.createElement('div');
    infoContainer.setAttribute('class', 'info');
    contenedor.appendChild(infoContainer);
    let title = document.createElement('h2');
    title.innerText = "Información del club de lectura";
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
    text.innerText = club.clubLectura.nombre;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Tema:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.tema;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Tipo Club:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.tipoClub;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Fecha de Reunión:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.fechaReunion;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Hora de la reunión:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.horaReunion;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Administrador:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.administrador.nombre + " " + club.clubLectura.administrador.primerApellido;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Correo:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.administrador.correo;
    divInfo.appendChild(text);

    if (club.clubLectura.categoria) {
        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Categoría:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = club.clubLectura.categoria.nombre;
        divInfo.appendChild(text);
    }

    if (club.clubLectura.genero) {
        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Género:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = club.clubLectura.genero.nombre;
        divInfo.appendChild(text);
    }
    divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'crear-contenedor');
    infoContainer.appendChild(divInfo);
    if (club.clubLectura.sucursal) {
        let button = document.createElement('a');
        button.setAttribute("href", "http://localhost:3000/perfilSucursal.html?id=" + club.clubLectura.sucursal._id);
        button.setAttribute("class", "material-blue btn-sucursal btnClub");
        button.innerText = "Ver perfil librería";
        divInfo.appendChild(button);
    }
    if (sessionStorage.tipoUsuario == 'Lector' && club.clubLectura.administrador._id != sessionStorage.id) {
        let btnSuscribir = document.createElement('button');
        btnSuscribir.addEventListener('click', function () {
            if (usuarioSuscrito(club.clubLectura.participantes, sessionStorage.id)) {
                btnSuscribir.innerText = 'Cancelar suscribción';
                desuscribir(btnSuscribir);
            }
            else {
                btnSuscribir.innerText = 'Subscribir';
                subscribir(btnSuscribir);
            }
        })

        if (usuarioSuscrito(club.clubLectura.participantes, sessionStorage.id))
            btnSuscribir.innerText = 'Cancelar suscribción';
        else
            btnSuscribir.innerText = 'Subscribir';

        btnSuscribir.setAttribute('class', 'material-blue btn-sucursal btnClub');
        btnSuscribir.setAttribute('id', 'subscribir');
        divInfo.appendChild(btnSuscribir);
    }

    if (club.clubLectura.administrador._id == sessionStorage.id) {
        let button = document.createElement('a');
        button.setAttribute("href", "http://localhost:3000/chat.html?id=" + club.clubLectura.sucursal._id);
        button.setAttribute("class", "material-blue btn-sucursal btnClub");
        button.innerText = "Chat";
        divInfo.appendChild(button);
        
        let containerNames = document.getElementById('containerNames');

        let h2 = document.createElement('h2');
        h2.innerText = "Participantes";
        containerNames.appendChild(h2);

        let listUser = document.createElement('ul');
        listUser.setAttribute('class', 'listName')
        containerNames.appendChild(listUser);

        for (let i = 0; i < club.clubLectura.participantes.length; i++) {
            let liName = document.createElement('li');
            listUser.appendChild(liName);

            let label = document.createTextNode(club.clubLectura.participantes[i].usuario.nombre + " " + club.clubLectura.participantes[i].usuario.primerApellido);
            liName.appendChild(label);

            let rechazar = document.createElement('i');
            rechazar.setAttribute('class', 'far fa-window-close eliminarUsuario');
            rechazar.setAttribute('data-idUser', club.clubLectura.participantes[i].usuario._id);
            rechazar.setAttribute('data-id', club.clubLectura._id);
            rechazar.addEventListener('click', removerUsuario);
            liName.insertBefore(rechazar, label);
        }
        if (club.clubLectura.participantes.length == 0) {
            let liName = document.createElement('li');
            liName.innerText = 'No hay usuarios'
            listUser.appendChild(liName);

        }
    }
    else if (usuarioSuscrito(club.clubLectura.participantes, sessionStorage.id)) {
        let button = document.createElement('a');
        button.setAttribute("href", "http://localhost:3000/chat.html?id=" + club.clubLectura.sucursal._id);
        button.setAttribute("class", "material-blue btn-sucursal btnClub");
        button.innerText = "Chat";
        divInfo.appendChild(button);
    }
}

let removerUsuario = function (event) {
    let elemento = event.target;
    let idElemento = elemento.getAttribute('data-idUser');
    let clubId = elemento.getAttribute('data-id');

    Swal.fire({
        title: 'Eliminar',
        text: "¿Está seguro que quiere eliminar este usuario?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f2a5a0',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.value) {
            let clubLec = {
                idClubLectura: clubId,
                idUsuario: idElemento
            }
            let response = await desuscribirUsuarioClub(clubLec);
            if (response.success) {
                Swal.fire(
                    'Eliminado',
                    "El usuario ha sido expulsadp",
                    'success'
                ).then((result) => {
                    window.location.href = 'perfilClubLectura.html?id=' + clubId;
                })

            }
            else {
                Swal.fire({
                    type: 'error',
                    title: "Ocurrio un error",
                    text: 'Algo salió mal!'
                })
            }

        }
    })
}

let usuarioSuscrito = function (lista, idUsuario) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].usuario._id == idUsuario) return true;
    }
    return false;
}

let desuscribir = async (btnSuscribir) => {
    let response = await desuscribirUsuarioClub({
        idUsuario: sessionStorage.id,
        idClubLectura: club.clubLectura._id
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
    let response = await suscribirUsuarioClub({
        idUsuario: sessionStorage.id,
        idClubLectura: club.clubLectura._id,
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

let removerUsuarioLista = function () {
    for (let i = 0; i < club.clubLectura.participantes.length; i++) {
        if (club.clubLectura.participantes[i].usuario._id === sessionStorage.id) {
            club.clubLectura.participantes.splice(i, 1);
            break;
        }
    }
}

let agregarUsuarioLista = function () {
    club.clubLectura.participantes.push({ usuario: { _id: sessionStorage.id } });
}

informacionLibreria();