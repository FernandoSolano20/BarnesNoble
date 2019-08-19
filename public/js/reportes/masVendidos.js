const tbodyLibro = document.querySelector('#tabla-elementos-libro tbody');
let listaLibrosMasVendidos;
const inputFiltro = document.getElementById('input-filtro');

const crearSliderMasVendidos = async (event) => {
    if(!event)
        listaLibrosMasVendidos = await obtenerLibrosMasVendidos();
    tbodyLibro.innerHTML = '';
    let filtro = inputFiltro.value;
    for (let i = 0; i < listaLibrosMasVendidos.length; i++) {
        if (listaLibrosMasVendidos[i].titulo.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosMasVendidos[i].autor.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosMasVendidos[i].autor.nombreArtistico.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosMasVendidos[i].genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosMasVendidos[i].categoria.nombre.toLowerCase().includes(filtro.toLowerCase()))
            agregarLibros(listaLibrosMasVendidos[i]);
    }
    filaNoDatosLibro();
};

let agregarLibros = function (libro) {
    let fila = tbodyLibro.insertRow();
    fila.insertCell().innerHTML = libro.titulo;
    fila.insertCell().innerHTML = libro.vendidos?libro.vendidos:0;
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

inputFiltro.addEventListener('keyup', crearSliderMasVendidos);
crearSliderMasVendidos();