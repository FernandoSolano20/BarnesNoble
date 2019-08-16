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
            divCarrito.setAttribute('id','cd-cart-trigger');
            vertMenu.appendChild(divCarrito);
            allStorage();
            let spanNumber = document.createElement('span');
            spanNumber.setAttribute('class','p1 fa-stack fa-2x has-badge');
            spanNumber.setAttribute('id','numCarrito');
            spanNumber.setAttribute('data-count', countBooksCart);
            divCarrito.appendChild(spanNumber);

            let anchorCarro = document.createElement('a');
            anchorCarro.setAttribute('class','cd-img-replace');
            anchorCarro.setAttribute('href','carrito.html');
            anchorCarro.innerText = 'Carro';
            spanNumber.appendChild(anchorCarro);
            
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
            anchor.href = "#";
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
        }
        else if (sessionStorage.tipoUsuario === "Adminitrador plataforma") {
            //Plataforma
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
        book.push({tienda: JSON.parse(localStorage.getItem(key))});
        countBooksCart += (book[i].tienda.length) - 1;
    }

    return book;
}

document.querySelector('body').addEventListener('click', mostarMenuIzquierdo);