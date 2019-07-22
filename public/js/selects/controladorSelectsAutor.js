const autorSelect = document.getElementById('autor');

let listaObtenerAutor = [];

let crearSectionAutores = async () => {

    listaObtenerAutor = await obtenerAutores();

    autorSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un autor--';
    autorSelect.appendChild(optionElemento);

    for (let i =0; i < listaObtenerAutor.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerAutor[i]._id);
        optionElemento.innerHTML = listaObtenerAutor[i].nombre;
        autorSelect.appendChild(optionElemento);
    }
};

crearSectionAutores();