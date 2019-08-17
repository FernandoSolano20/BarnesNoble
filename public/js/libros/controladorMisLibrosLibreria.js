'use strict';

let listaSucursal = [];
let listaLibreria = [];
let listaEjemplares = [];
let listaOfertas = [];
const containerCard = document.querySelector('#cardElements')
const txtFiltro = document.getElementById("txtFiltro");

let mostarLibros = async (event) => {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    if (!event) {
        listaLibreria = await obtenerLibrosTienda(id);
        listaLibreria = listaLibreria.listaLibrerias;
        listaEjemplares = listaLibreria.ejemplares;
        if (sessionStorage.tipoUsuario == 'Lector') {
            listaOfertas = await obtenerOfertasLibreriaId(id);
        }
    }

    let filtro = txtFiltro.value;
    containerCard.innerHTML = '';
    for (let i = 0; i < listaLibreria.ejemplares.length; i++) {
        let listaLibrosLib = listaLibreria.ejemplares[i].libro.libro;
        let ejemplar = listaLibreria.ejemplares[i].libro;
        if (listaLibreria.nombreFantasia.toLowerCase().includes(filtro.toLowerCase()) || ejemplar.tipo.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosLib.titulo.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosLib.autor.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosLib.autor.nombreArtistico.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosLib.genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosLib.categoria.nombre.toLowerCase().includes(filtro.toLowerCase()))
            agregarCardLibro(listaLibrosLib, ejemplar, listaEjemplares[i].iva, listaEjemplares[i].cantidad, id);
    }
    filaNoDatos();
};

let agregarCardLibro = function (libro, ejemplar, iva, cantidad, idLibreria) {
    let oferta = 0;
    let nombreOferta;
    listaOfertas.listaOfertas.forEach((ofer) => {
        if (ofer.autor == libro.autor._id) {
            oferta = ofer.descuento;
            nombreOferta = ofer.nombre;
            return;
        } else if (ofer.categoria == libro.categoria._id) {
            oferta = ofer.descuento;
            nombreOferta = ofer.nombre;
            return;
        } else if (ofer.libro == libro._id) {
            oferta = ofer.descuento;
            nombreOferta = ofer.nombre;
            return;
        } else if (ofer.genero == libro.genero._id) {
            oferta = ofer.descuento;
            nombreOferta = ofer.nombre;
            return;
        }
    });
    let divParrent = document.createElement('div');
    divParrent.setAttribute('class', 'parrent');
    divParrent.setAttribute('data-idEjemplar', ejemplar._id);
    containerCard.appendChild(divParrent);

    let child = document.createElement('div');
    child.setAttribute('class', 'child');
    divParrent.appendChild(child);

    let span = document.createElement('i');
    span.setAttribute('class', 'far fa-books');
    child.appendChild(span);

    let child2 = document.createElement('div');
    child2.setAttribute('class', 'child-two');
    divParrent.appendChild(child2);

    let divInformationBook = document.createElement('div');
    divInformationBook.setAttribute('class', 'informacionLibro');
    child2.appendChild(divInformationBook);

    if (oferta) {
        let ofertaDiv = document.createElement('div');
        ofertaDiv.setAttribute('class', 'bookie-offers__sash');
        ofertaDiv.innerHTML = "Oferta: " + nombreOferta + " de " + oferta + "%";
        divInformationBook.appendChild(ofertaDiv);
    }

    let h3 = document.createElement('h3');
    h3.innerText = libro.titulo;
    divInformationBook.appendChild(h3);

    let img = document.createElement('img');
    img.setAttribute('src', libro.caratula);
    divInformationBook.appendChild(img);

    let p1 = document.createElement('p');
    p1.setAttribute('class', 'infoBook');
    p1.innerText = ejemplar.tipo;
    divInformationBook.appendChild(p1);

    p1 = document.createElement('p');
    p1.setAttribute('class', 'infoBook');
    let precioFinal = ejemplar.precio + ejemplar.precio * Number(iva) / 100;
    precioFinal -= precioFinal * Number("0." + oferta);
    p1.innerText = "Precio: ₡" + precioFinal;
    divInformationBook.appendChild(p1);

    p1 = document.createElement('p');
    p1.setAttribute('class', 'infoBook');
    p1.setAttribute('id', 'pCantidad');
    p1.innerText = "Cantidad: " + cantidad;
    divInformationBook.appendChild(p1);

    let divContainerButtons = document.createElement('div');
    divContainerButtons.setAttribute('class', 'containerButtonsCards');
    child2.appendChild(divContainerButtons);

    if (sessionStorage.tipoUsuario == 'Adminitrador librería') {
        let btnAsignarSucursal = document.createElement('a');
        btnAsignarSucursal.setAttribute('class', 'material btnLibreria downButton');
        btnAsignarSucursal.setAttribute('id', 'btnFormato');
        btnAsignarSucursal.innerText = 'Agregar a sucursal';
        btnAsignarSucursal.setAttribute('data-libro', ejemplar._id);
        btnAsignarSucursal.setAttribute('data-cantidad', cantidad);
        btnAsignarSucursal.setAttribute('data-iva', iva);
        btnAsignarSucursal.setAttribute('style', 'line-height:normal');
        btnAsignarSucursal.addEventListener('click', modalDarLibrosASucursal);
        divContainerButtons.appendChild(btnAsignarSucursal);
    } else if (sessionStorage.tipoUsuario == 'Lector') {
        let btnAsignarSucursal = document.createElement('a');
        btnAsignarSucursal.setAttribute('class', 'material btnLibreria downButton');
        btnAsignarSucursal.setAttribute('id', 'btnFormato');
        btnAsignarSucursal.innerText = 'Agregar a carrito';
        btnAsignarSucursal.setAttribute('data-libro', ejemplar._id);
        btnAsignarSucursal.setAttribute('data-tipoLibro', ejemplar.tipo);
        btnAsignarSucursal.setAttribute('data-nombreLibro', libro.titulo);
        btnAsignarSucursal.setAttribute('data-cantidad', cantidad);
        btnAsignarSucursal.setAttribute('data-iva', iva);
        btnAsignarSucursal.setAttribute('data-idTienda', idLibreria);
        btnAsignarSucursal.setAttribute('data-tienda', "libreria");
        btnAsignarSucursal.setAttribute('data-img', libro.caratula);
        btnAsignarSucursal.setAttribute('data-nombreTienda', listaLibreria.nombreFantasia);
        btnAsignarSucursal.setAttribute('data-precio', precioFinal);
        btnAsignarSucursal.setAttribute('style', 'line-height:normal');
        btnAsignarSucursal.addEventListener('click', modalAgregarCarrito);
        divContainerButtons.appendChild(btnAsignarSucursal);
    }
}



let filaNoDatos = function () {
    if (listaLibreria.ejemplares.length === 0 || containerCard.childElementCount === 0) {
        let divParrent = document.createElement('div');
        divParrent.setAttribute('class', 'parrent');
        containerCard.appendChild(divParrent);

        let child = document.createElement('div');
        child.setAttribute('class', 'child');
        divParrent.appendChild(child);

        let span = document.createElement('i');
        span.setAttribute('class', 'far fa-books');
        child.appendChild(span);

        let child2 = document.createElement('div');
        child2.setAttribute('class', 'child-two');
        divParrent.appendChild(child2);

        let h3 = document.createElement('h3');
        h3.innerText = "No hay datos";
        child2.appendChild(h3);
    }
}

mostarLibros();
txtFiltro.addEventListener('keyup', mostarLibros);