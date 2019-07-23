let crearSectionLibreria = async () => {

    listaObtenerLibreria = await obtenerLibrerias();

    libreriaSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una libreria--';
    libreriaSelect.appendChild(optionElemento);

    for (let i =0; i < listaObtenerLibreria.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerLibreria[i]._id);
        optionElemento.innerHTML = listaObtenerLibreria[i].nombre;
        autorSelect.appendChild(optionElemento);
    }
};

crearSectionLibreria();