const tbodyLibro = document.querySelector('#tabla-elementos-libro tbody');
let listaLibrosMasVendidos;

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