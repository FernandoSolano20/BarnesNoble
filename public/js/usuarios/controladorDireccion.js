// Controlador Provincia 

var crearSectionProvincias = async () => {

    listaObtenerProvincias = await obtenerProvincias();

    var sectionProvincias = document.getElementById('provincias');

    var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', '0');
        optionElemento.innerHTML = '--Seleccione una provincia--';
        sectionProvincias.appendChild(optionElemento);

    for (elementos in listaObtenerProvincias) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerProvincias[elementos];
        sectionProvincias.appendChild(optionElemento);
    }
};

crearSectionProvincias();

// Fin Controlador Provincia

// Controlador Cantones

var crearSectionCantones = async () => {

    var provincia = sectionProvincia.value;
    sectionCantones.innerHTML = '';
    
    listaObtenerCantones = await obtenerCantones(provincia);

    var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', '0');
        optionElemento.innerHTML = '--Seleccione un canton--';
        sectionCantones.appendChild(optionElemento);
  
    for (elementos in listaObtenerCantones) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerCantones[elementos];
        sectionCantones.appendChild(optionElemento);
    }
};

sectionProvincia.addEventListener('change', crearSectionCantones);

// Fin Controlador Cantones

// Controlador Distrito

var crearSectionDistritos = async () => {

    var provincia = sectionProvincia.value;
    var canton = sectionCantones.value;
    sectionDistritos.innerHTML = '';
    listaObtenerDistrito = await obtenerDistritos(provincia, canton);

    var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', '0');
        optionElemento.innerHTML = '--Seleccione un distrito--';
        sectionDistritos.appendChild(optionElemento);

    for (elementos in listaObtenerDistrito) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerDistrito[elementos];
        sectionDistritos.appendChild(optionElemento);
    }
};

sectionCantones.addEventListener('change', crearSectionDistritos);