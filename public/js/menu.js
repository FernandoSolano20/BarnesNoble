let mostarMenuIzquierdo = (event) => {
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

let listMenu = document.getElementById('menuDinamico');
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
        anchor.href = "clubLectura.html";
        li.appendChild(anchor);
    }
    else if (sessionStorage.tipoUsuario === "Adminitrador librería") {
        //Libreria
        li = document.createElement('li');
        listMenu.appendChild(li);
        anchor = document.createElement('a');
        anchor.innerHTML = "Página Principal";
        anchor.href = "indexAdminLibreria.html";
        li.appendChild(anchor);

        li = document.createElement('li');
        listMenu.appendChild(li);
        anchor = document.createElement('a');
        anchor.innerHTML = "Mi libreria";
        anchor.href = "perfilLibreria.html";
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
        anchor.href = "clubLectura.html";
        li.appendChild(anchor);

        li = document.createElement('li');
        listMenu.appendChild(li);
        anchor = document.createElement('a');
        anchor.innerHTML = "Catálogo de libros";
        anchor.href = "#";
        li.appendChild(anchor);
    }
}

document.querySelector('body').addEventListener('click', mostarMenuIzquierdo);