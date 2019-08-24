let mostrarUsuarioRegistrado = async () => {
    let usuarioActual = await obtenerUsuarioPorIdFetch(sessionStorage.id);
    usuarioActual = usuarioActual.usuario;

    document.getElementById('librosCont').innerHTML = usuarioActual.ejemplares.length;
    document.getElementById('genero').innerHTML = usuarioActual.genero.nombre;
    document.getElementById('categoria').innerHTML = usuarioActual.categoria.nombre;
    document.getElementById('autor').innerHTML = usuarioActual.autor.nombre;
    document.getElementById('libro').innerHTML = usuarioActual.libro.titulo;
    
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
    let intercambioCount = await obtenerCountIntercambio(sessionStorage.id);
    document.getElementById('intercambio').innerHTML = intercambioCount;
}

 mostrarUsuarioRegistrado();
