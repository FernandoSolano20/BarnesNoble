const tbodyLibro = document.querySelector('#tabla-elementos-libro tbody');
let listaLibrosMejoresCalificados;
const inputFiltro = document.getElementById('input-filtro');

const crearSliderMejoresCalificados = async (event) => {
    if(!event)
        listaLibrosMejoresCalificados = await obtenerLibrosMejoresCalificados();
    tbodyLibro.innerHTML = '';
    let filtro = inputFiltro.value;
    for (let i = 0; i < listaLibrosMejoresCalificados.length; i++) {
        if (listaLibrosMejoresCalificados[i]._id.titulo.toLowerCase().includes(filtro.toLowerCase()) || listaLibrosMejoresCalificados[i]._id.autor.nombre.toLowerCase().includes(filtro.toLowerCase()))
            agregarLibros(listaLibrosMejoresCalificados[i]._id, listaLibrosMejoresCalificados[i].average);
    }
    filaNoDatosLibro();
};

let agregarLibros = function (libro,average) {
    let fila = tbodyLibro.insertRow();
    fila.insertCell().innerHTML = libro.titulo;

    fila.insertCell().innerHTML = libro.autor.nombre;

    let celdaCalificaion = fila.insertCell();
    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('class', 'table-div');
    celdaCalificaion.appendChild(tableDiv);

    let tableCellDiv = document.createElement('div');
    tableCellDiv.setAttribute('class', 'table-cell-div table-cell-resenna');
    tableDiv.appendChild(tableCellDiv);

    let divBooks = document.createElement('div');
    tableCellDiv.appendChild(divBooks);

    let spanBooksContainer = document.createElement('span');
    spanBooksContainer.setAttribute('class', 'container');
    divBooks.appendChild(spanBooksContainer);

    let divStarOuter = document.createElement('div');
    divStarOuter.setAttribute('class', 'stars-outer far fa-book-alt');
    spanBooksContainer.appendChild(divStarOuter);

    let divStarInner = document.createElement('div');
    divStarInner.setAttribute('class', 'stars-inner fas fa-book-alt');
    divStarInner.setAttribute('style', 'width: '+(Number(average)*20)+'%');
    divStarOuter.appendChild(divStarInner);

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
    if (listaLibrosMejoresCalificados.length === 0 || tbodyLibro.childElementCount === 0) {
        let fila = tbodyLibro.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

inputFiltro.addEventListener('keyup', crearSliderMejoresCalificados);
crearSliderMejoresCalificados();