const generoSelect = document.getElementById('genero');

let listaObtenerGenero = [];

let crearSectionGeneros = async () => {

    listaObtenerGenero = await obtenerGenero();

    generoSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un género--';
    generoSelect.appendChild(optionElemento);

    for (let i =0; i < listaObtenerGenero.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerGenero[i]._id);
        optionElemento.innerHTML = listaObtenerGenero[i].nombre;
        generoSelect.appendChild(optionElemento);
    }
};

crearSectionGeneros();