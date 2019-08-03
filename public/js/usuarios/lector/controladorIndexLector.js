let mostrarUsuarioRegistrado = async () => {
    let usuarioActual = await obtenerLectorId(sessionStorage.id);

    let avatar = document.getElementById('avatar_lector');
    let nombre = document.getElementById('nombre_lector');
    let primerApellido = document.getElementById('apellido_lector');
    let alias = document.getElementById('alias_lector');
    let correo = document.getElementById('correo_lector');

    avatar.setAttribute('src', usuarioActual.img);
    nombre.innerHTML = usuarioActual.nombre;
    primerApellido.innerHTML = usuarioActual.primerApellido;



    if (usuarioActual.alias) {
        alias.innerHTML = usuarioActual.alias;
    }

    let linkCorreo = document.createElement('a');
    linkCorreo.setAttribute('href', 'mailto:' + usuarioActual.correo);
    linkCorreo.innerHTML = usuarioActual.correo;

    correo.appendChild(linkCorreo);
}
 mostrarUsuarioRegistrado();