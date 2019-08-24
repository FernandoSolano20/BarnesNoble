const connection = new WebSocket('ws://localhost:8080');
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let nombre = '';
let usuario  = [];

(async () => {
    usuario = await obtenerUsuarioPorIdFetch(sessionStorage.id);
    nombre = usuario.usuario.nombre + " " + usuario.usuario.primerApellido;
})()
connection.onopen = () => {
    console.log('connected');
};

connection.onclose = () => {
    console.error('disconnected');
};

connection.onerror = (error) => {
    console.error('failed to connect', error);
};

connection.onmessage = (event, _id) => {
    let response = JSON.parse(event.data);
    if (id == response.idClub) {
        let contendor = document.getElementById('contendorMensaje');

        let divMgs = document.createElement('div');
        divMgs.setAttribute('class', 'msg');
        contendor.appendChild(divMgs);

        let divUser = document.createElement('div');
        sessionStorage.id == response.idUsuario ? divUser.setAttribute('class', 'user friend t') : divUser.setAttribute('class', 'user me t');
        divMgs.appendChild(divUser);

        let divAvatar = document.createElement('div');
        divAvatar.setAttribute('class', 'avatarbox');
        divUser.appendChild(divAvatar);

        let divCon = document.createElement('div');
        divAvatar.appendChild(divCon);

        let divAvatarOverlay = document.createElement('div');
        divAvatarOverlay.setAttribute('class', 'avatar_overlay');
        divCon.appendChild(divAvatarOverlay);

        let imagen = document.createElement('img');
        imagen.setAttribute('src', response.img);
        divAvatarOverlay.appendChild(imagen);

        let pNombre = document.createElement('p');
        pNombre.setAttribute('class','nameUser')
        pNombre.innerText = response.nombre;
        divCon.appendChild(pNombre);

        let divText = document.createElement('div');
        divText.setAttribute('class', 'text');
        divText.innerText = response.message;
        divUser.appendChild(divText);
        messages.scrollTop = messages.scrollHeight;
    }
};

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    let message = document.querySelector('#message').value;
    if (message) {
        let data = {
            message: message,
            idClub: id,
            idUsuario: usuario.usuario._id,
            img: usuario.usuario.img,
            nombre: nombre
        }
        connection.send(JSON.stringify(data));
        document.querySelector('#message').value = '';
    }
});