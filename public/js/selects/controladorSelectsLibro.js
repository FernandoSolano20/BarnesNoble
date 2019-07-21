var libroSelect = document.getElementById('libro');

var listaObtenerLibro = [];

var crearSectionLibros = async () => {

    listaObtenerLibro = await obtenerAutoresFetch();

    libroSelect.innerHTML = '';

    var optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un libro--';
    libroSelect.appendChild(optionElemento);

    for (var i =0; i < listaObtenerLibro.length; i++) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerLibro[i]._id);
        optionElemento.innerHTML = listaObtenerLibro[i].titulo;
        libroSelect.appendChild(optionElemento);
    }
};

crearSectionLibros();