const libroSelect = document.getElementById('libro');

let listaObtenerLibro = [];

let crearSectionLibros = async () => {

    listaObtenerLibro = await obtenerLibrosFetch();

    libroSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un libro--';
    libroSelect.appendChild(optionElemento);

    for (let i =0; i < listaObtenerLibro.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerLibro[i]._id);
        optionElemento.innerHTML = listaObtenerLibro[i].titulo;
        libroSelect.appendChild(optionElemento);
    }
};

crearSectionLibros();