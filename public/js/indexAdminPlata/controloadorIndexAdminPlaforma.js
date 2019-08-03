
const autor = document.getElementById('autor');
const genero = document.getElementById('genero');
const categoria = document.getElementById('categoria');
const libro = document.getElementById('libro');

const users = document.getElementById('users');
const libreria = document.getElementById('libreria');
const sucursal = document.getElementById('sucursal');
const librosCount = document.getElementById('librosCont');

let usersCount = async function(){
    var countUser = await obtenerCountUsers();
    users.innerText = countUser;
}
usersCount();

let libreriaCount = async function(){
    var countLibreria = await obtenerCountLibreria();
    libreria.innerText = countLibreria;
}
libreriaCount();

let sucursalCount = async function(){
    var countSucursal = await obtenerCountSucursal();
    sucursal.innerText = countSucursal;
}
sucursalCount();

let LibroCount = async function(){
    var countLibro = await obtenerCountLibro();
    librosCount.innerText = countLibro;
}
LibroCount();

let autorFav = async function(){
     var autorNombre = await obtenerCountAutoroFav();
     autorNombre = autorNombre.filter(number => number._id)
     autorNombre = autorNombre.reduce((acc, autorNombre) => acc = acc > autorNombre.count ? acc : autorNombre )._id.nombre;
     autor.innerText = autorNombre;
}
autorFav();

let generoFav = async function(){
    var generoNombre = await obtenerCountGeneroFav();
    generoNombre = generoNombre.filter(number => number._id)
    generoNombre = generoNombre.reduce((acc, generoNombre) => acc = acc > generoNombre.count ? acc : generoNombre )._id.nombre;
    genero.innerText = generoNombre;
}
generoFav();

let categoriaFav = async function(){
    var categoriaNombre = await obtenerCountCategoriaFav();
    categoriaNombre = categoriaNombre.filter(number => number._id)
    categoriaNombre = categoriaNombre.reduce((acc, categoriaNombre) => acc = acc > categoriaNombre.count ? acc : categoriaNombre )._id.nombre;
    categoria.innerText = categoriaNombre;
}
categoriaFav();

let libroFav = async function(){
    var libroNombre = await obtenerCountLibroFav();
    libroNombre = libroNombre.filter(number => number._id)
    libroNombre = libroNombre.reduce((acc, libroNombre) => acc = acc > libroNombre.count ? acc : libroNombre )._id.titulo;
    libro.innerText = libroNombre;
}
libroFav();

const tbodyLibro = document.querySelector('#tabla-elementos-libro tbody');
let listaLibrosMasVendidos;
let listaClub;

const crearSliderMasVendidos = async () => {
    listaLibrosMasVendidos = await obtenerLibrosMasVendidos();
    tbodyLibro.innerHTML = '';
    for (let i = 0; i < listaLibrosMasVendidos.length; i++) {
        agregarLibros(listaLibrosMasVendidos[i]);
    }
    document.getElementById('libros').addEventListener('click', function(){
        window.location.href = "listarLibrosCards.html";
    });
    filaNoDatosLibro();
};

let agregarLibros = function (libro) {
    let fila = tbodyLibro.insertRow();
    fila.insertCell().innerHTML = libro.titulo;
    fila.insertCell().innerHTML = libro.genero.nombre;
    fila.insertCell().innerHTML = libro.categoria.nombre;
    fila.insertCell().innerHTML = libro.autor.nombre;
    let celda_perfil = fila.insertCell();

    let divContendor = document.createElement("div");
    divContendor.setAttribute('class', 'crear-contenedor')
    let btnPerfil = document.createElement('a');
    celda_perfil.appendChild(divContendor);
    divContendor.appendChild(btnPerfil);

    btnPerfil.innerText = 'Ver perfil'
    btnPerfil.setAttribute('class', 'material-blue')
    btnPerfil.href = "perfilLibro.html?id=" + libro._id;
}

let filaNoDatosLibro = function () {
    if (listaLibrosMasVendidos.length === 0 || tbodyLibro.childElementCount === 0) {
        let fila = tbodyLibro.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

crearSliderMasVendidos();



const tbodyClub = document.querySelector('#tbl_clubesLectura tbody');
const crearTablaClub = async () => {
    listaClub = await obtenerClubesLecturaUsuarioAdminClub(sessionStorage.id);
    tbodyClub.innerHTML = '';
    for (let i = 0; i < listaClub.length; i++) {
        agregarClub(listaClub[i]);
    }
    document.getElementById('club').addEventListener('click', function(){
        window.location.href = "listarClubLectura.html";
    });
    filaNoDatosClub();
};

let agregarClub = function (club) {
    let fila = tbodyClub.insertRow();
    fila.insertCell().innerHTML = club.nombre;
    fila.insertCell().innerHTML = club.tema;
    fila.insertCell().innerHTML = club.tipoClub;
    fila.insertCell().innerHTML = club.fechaReunion;
    let celda_perfil = fila.insertCell();

    let divContendor = document.createElement("div");
    divContendor.setAttribute('class', 'crear-contenedor')
    let btnPerfil = document.createElement('a');
    celda_perfil.appendChild(divContendor);
    divContendor.appendChild(btnPerfil);

    btnPerfil.innerText = 'Ver perfil'
    btnPerfil.setAttribute('class', 'material-blue')
    //btnPerfil.href = "perfilLibro.html?id=" + libro._id;
}

let filaNoDatosClub = function () {
    if (listaClub.length === 0 || tbodyClub.childElementCount === 0) {
        let fila = tbodyClub.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

crearTablaClub();