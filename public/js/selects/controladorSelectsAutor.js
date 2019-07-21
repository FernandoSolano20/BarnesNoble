var autorSelect = document.getElementById('autor');

var listaObtenerAutor = [];

var crearSectionAutores = async () => {

    listaObtenerAutor = await obtenerAutores();

    autorSelect.innerHTML = '';

    var optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un autor--';
    autorSelect.appendChild(optionElemento);

    for (var i =0; i < listaObtenerAutor.length; i++) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerAutor[i]._id);
        optionElemento.innerHTML = listaObtenerAutor[i].nombre;
        autorSelect.appendChild(optionElemento);
    }
};

crearSectionAutores();