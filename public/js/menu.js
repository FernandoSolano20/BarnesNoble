let countBooksCart = 0;
let mostarMenuIzquierdo = (event) => {
    if (listMenu) {
        let element = event.target;
        let nav = document.querySelector('.menuIzquierdo');
        if (element.getAttribute("data-menu") == 'mostrar-nav-izq') {
            if (nav.classList[1] == 'mostrar') {
                nav.className = nav.className.replace(' mostrar', '');
            } else {
                nav.className = nav.className + ' mostrar';
            }
        } else if (!element.offsetParent || !(element.offsetParent.classList[0] == 'menuIzquierdo')) {
            nav.className = nav.className.replace(' mostrar', '');
        }
    }
}

let obtenerUsuarioIdInfoBasicaFetch = async (id) => {
    var response = await fetch('http://localhost:4000/api/buscarLectorId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let obtenerLibreriasPendientesCount = async () => {
    var response = await fetch('http://localhost:4000/api/obtenerLibreriasPendientesCount', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.count;
};

let forgetPassUsuario = async (usuario) => {
    let response = await fetch('http://localhost:4000/api/olvidarPass/' + usuario.correo, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}

let cambiarPassUsuario = async function () {
    const { value: email } = await Swal.fire({
        title: 'Digite su correo eléctronico',
        input: 'email',
        inputPlaceholder: 'Correo eléctronico'
    });

    let usuario = {
        correo: email
    }

    let user = await forgetPassUsuario(usuario);

    if (user.success) {
        Swal.fire({
            type: 'success',
            title: user.message
        }, logoutCambioPassword());
    }
    else {
        Swal.fire({
            type: 'error',
            title: user.message
        });
    }
}

let borrarUsuarioMenu = async(id) => {
    let response = await fetch('http://localhost:4000/api/eliminarUsuario/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}

let elimninarCuenta = function () {
    Swal.fire({
        title: 'Eliminar',
        text: "¿Está seguro que quiere eliminar la cuenta?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        //llamar al servicio para borrar elemento
        if (result.value) {
            let response = await borrarUsuarioMenu(sessionStorage.id);
            if (response.success) {
                Swal.fire(
                    'Eliminado',
                    response.message,
                    'success'
                ).then((result) => {
                    sessionStorage.clear();
                    window.location.href = "/";
                })

            }
            else {
                Swal.fire({
                    type: 'error',
                    title: response.message,
                    text: 'Algo salió mal!'
                })
            }
        }
    })
}

var adminLib;
let listMenu = document.getElementById('menuDinamico');
let crearMenu = async function () {
    if (listMenu) {
        listMenu.innerHTML = '';
        let li = document.createElement('li');
        listMenu.appendChild(li);
        let anchor = document.createElement('a');
        anchor.innerHTML = "Mi perfil";
        anchor.href = "perfilUsuario.html?id=" + sessionStorage.id + "";
        li.appendChild(anchor);
        if (sessionStorage.tipoUsuario === "Lector") {
            //Menu Lector
            let vertMenu = document.getElementById('verticalMenuUser') || document.getElementById('menuVertical');
            let divCarrito = document.createElement('div');
            divCarrito.setAttribute('class', 'cd-cart-trigger');
            vertMenu.appendChild(divCarrito);
            allStorage();
            let spanNumber = document.createElement('span');
            spanNumber.setAttribute('class', 'p1 fa-stack fa-2x has-badge');
            spanNumber.setAttribute('id', 'numCarrito');
            spanNumber.setAttribute('data-count', countBooksCart);
            divCarrito.appendChild(spanNumber);

            let anchorCarro = document.createElement('a');
            anchorCarro.setAttribute('class', 'cd-img-replace');
            anchorCarro.setAttribute('href', 'carrito.html');
            anchorCarro.innerText = 'Carro';
            spanNumber.appendChild(anchorCarro);

            divCarrito = document.createElement('div');
            divCarrito.setAttribute('class', 'cd-cart-trigger');
            divCarrito.setAttribute('id','cd-bell-trigger');
            vertMenu.appendChild(divCarrito);

            spanNumber = document.createElement('span');
            spanNumber.setAttribute('class', 'p1 fa-stack fa-2x has-badge');
            spanNumber.setAttribute('id', 'numCarrito');
            spanNumber.setAttribute('data-count', '0');
            divCarrito.appendChild(spanNumber);

            anchorCarro = document.createElement('a');
            anchorCarro.setAttribute('class', 'fal fa-bell');
            anchorCarro.setAttribute('id', 'bell');
            anchorCarro.setAttribute('href', '#');
            spanNumber.appendChild(anchorCarro);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Editar perfil";
            anchor.href = "editarPerfilUsuarios.html?id=" + sessionStorage.id;
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Cambiar contraseña";
            anchor.addEventListener('click', cambiarPassUsuario);
            anchor.href = "#";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Página Principal";
            anchor.href = "indexLector.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Clubes de lectura";
            anchor.href = "listarClubLectura.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Catálogo de libros";
            anchor.href = "#";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Mis libros";
            anchor.href = "misLibrosUsuario.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Mis Tarjetas";
            anchor.href = "listarTarjetas.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Librerias";
            anchor.href = "listarLibrerias.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Sucursales";
            anchor.href = "sucursales.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Intercambios";
            anchor.href = "intercambios.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Eliminar cuenta";
            anchor.addEventListener('click', elimninarCuenta);
            anchor.href = "#";
            li.appendChild(anchor);
        }
        else if (sessionStorage.tipoUsuario === "Adminitrador plataforma") {
            //Plataforma
            let countLib = await obtenerLibreriasPendientesCount();
            let vertMenu = document.getElementById('verticalMenuUser') || document.getElementById('menuVertical');
            let divCarrito = document.createElement('div');
            divCarrito.setAttribute('class', 'cd-cart-trigger');
            vertMenu.appendChild(divCarrito);

            let spanNumber = document.createElement('span');
            spanNumber.setAttribute('class', 'p1 fa-stack fa-2x has-badge');
            spanNumber.setAttribute('id', 'numCarrito');
            spanNumber.setAttribute('data-count', countLib);
            divCarrito.appendChild(spanNumber);

            let iconBell = document.createElement('a');
            iconBell.setAttribute('class', 'fal fa-bell');
            iconBell.setAttribute('id', 'bell');
            iconBell.setAttribute('href', 'solicitudLibreria.html');
            spanNumber.appendChild(iconBell);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Página Principal";
            anchor.href = "indexPlataforma.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Géneros";
            anchor.href = "genero.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Categorías";
            anchor.href = "categoria.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Autores";
            anchor.href = "autor.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Libros";
            anchor.href = "listarLibrosCards.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Usuarios";
            anchor.href = "listar-usuarios.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Librerias";
            anchor.href = "listarLibrerias.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Sucursales";
            anchor.href = "sucursales.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Clubes de lectura";
            anchor.href = "listarClubLectura.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Ofertas";
            anchor.href = "listarOfertas.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.setAttribute('class','linkGrande');
            anchor.innerHTML = "Reporte libros más vendidos";
            anchor.href = "reporteMasVendidos.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.setAttribute('class','linkGrande');
            anchor.innerHTML = "Reporte libros mejores calificados";
            anchor.href = "reporteMejoresCalificados.html";
            li.appendChild(anchor);
        }
        else if (sessionStorage.tipoUsuario === "Adminitrador librería") {
            //Libreria
            adminLib = await obtenerUsuarioIdInfoBasicaFetch(sessionStorage.id);
            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Página Principal";
            anchor.href = "indexAdminLibreria.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Catálogo de libros";
            anchor.href = "listarLibrosCards.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Mi librería";
            anchor.href = "perfilLibreria.html?id=" + adminLib.usuario.libreria + "";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Cátalogo de librería";
            anchor.href = "misLibrosLibreria.html?id=" + adminLib.usuario.libreria + "";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Mis Sucursales";
            anchor.href = "sucursales.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Clubes de lectura";
            anchor.href = "listarClubLectura.html";
            li.appendChild(anchor);

            li = document.createElement('li');
            listMenu.appendChild(li);
            anchor = document.createElement('a');
            anchor.innerHTML = "Ofertas";
            anchor.href = "listarOfertas.html";
            li.appendChild(anchor);
        }
    }
}
crearMenu();

function allStorage() {
    countBooksCart = 0;
    var book = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        book.push({ tienda: JSON.parse(localStorage.getItem(key)) });
        countBooksCart += (book[i].tienda.length) - 1;
    }

    return book;
}

document.querySelector('body').addEventListener('click', mostarMenuIzquierdo);