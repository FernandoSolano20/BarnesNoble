var generoSelect = document.getElementById('genero');

var listaObtenerGenero = [];

var crearSectionGeneros = async () => {

    listaObtenerGenero = await obtenerGenero();

    generoSelect.innerHTML = '';

    var optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un género--';
    generoSelect.appendChild(optionElemento);

    for (var i =0; i < listaObtenerGenero.length; i++) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerGenero[i]._id);
        optionElemento.innerHTML = listaObtenerGenero[i].nombre;
        generoSelect.appendChild(optionElemento);
    }
};

crearSectionGeneros();