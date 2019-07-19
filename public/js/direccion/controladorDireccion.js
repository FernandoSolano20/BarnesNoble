const sectionProvincia = document.getElementById('provincias');
const sectionCantones = document.getElementById('cantones');
const sectionDistritos = document.getElementById('distritos');
var listaObtenerProvincias = [];
var listaObtenerCantones = [];
var listaObtenerDistritos = [];

var crearSectionProvincias = async () => {

    listaObtenerProvincias = await obtenerProvincias();

    var sectionProvincias = document.getElementById('provincias');
    sectionProvincias.innerHTML = '';

    var optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una provincia--';
    sectionProvincias.appendChild(optionElemento);

    for (elementos in listaObtenerProvincias) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerProvincias[elementos];
        sectionProvincias.appendChild(optionElemento);
    }
};

var crearSectionCantones = async () => {

    var provincia = sectionProvincia.value;
    sectionCantones.innerHTML = '';
    sectionDistritos.innerHTML = '';

    listaObtenerCantones = await obtenerCantones(provincia);

    var optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un canton--';
    sectionCantones.appendChild(optionElemento);

    optionElemento = document.createElement('option');
    optionElemento.innerHTML = '--Seleccione un distrito--';
    sectionDistritos.appendChild(optionElemento);

    for (elementos in listaObtenerCantones) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerCantones[elementos];
        sectionCantones.appendChild(optionElemento);
    }
};

var crearSectionDistritos = async () => {

    var provincia = sectionProvincia.value;
    var canton = sectionCantones.value;
    sectionDistritos.innerHTML = '';
    listaObtenerDistrito = await obtenerDistritos(provincia, canton);

    var optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un distrito--';
    sectionDistritos.appendChild(optionElemento);

    for (elementos in listaObtenerDistrito) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerDistrito[elementos];
        sectionDistritos.appendChild(optionElemento);
    }
};

crearSectionProvincias();
sectionProvincia.addEventListener('change', crearSectionCantones);
sectionCantones.addEventListener('change', crearSectionDistritos);