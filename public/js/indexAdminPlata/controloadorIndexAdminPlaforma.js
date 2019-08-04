
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