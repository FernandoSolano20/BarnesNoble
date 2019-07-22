const sectionProvincia = document.getElementById('provincias');
const sectionCantones = document.getElementById('cantones');
const sectionDistritos = document.getElementById('distritos');
let listaObtenerProvincias = [];
let listaObtenerCantones = [];
let listaObtenerDistritos = [];

let crearSectionProvincias = async () => {

    listaObtenerProvincias = await obtenerProvincias();

    let sectionProvincias = document.getElementById('provincias');
    sectionProvincias.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una provincia--';
    sectionProvincias.appendChild(optionElemento);

    for (elementos in listaObtenerProvincias) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerProvincias[elementos];
        sectionProvincias.appendChild(optionElemento);
    }
};

let crearSectionCantones = async () => {

    let provincia = sectionProvincia.value;
    sectionCantones.innerHTML = '';
    sectionDistritos.innerHTML = '';

    listaObtenerCantones = await obtenerCantones(provincia);

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un canton--';
    sectionCantones.appendChild(optionElemento);

    optionElemento = document.createElement('option');
    optionElemento.innerHTML = '--Seleccione un distrito--';
    sectionDistritos.appendChild(optionElemento);

    for (elementos in listaObtenerCantones) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerCantones[elementos];
        sectionCantones.appendChild(optionElemento);
    }
};

let crearSectionDistritos = async () => {

    let provincia = sectionProvincia.value;
    let canton = sectionCantones.value;
    sectionDistritos.innerHTML = '';
    listaObtenerDistrito = await obtenerDistritos(provincia, canton);

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione un distrito--';
    sectionDistritos.appendChild(optionElemento);

    for (elementos in listaObtenerDistrito) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerDistrito[elementos];
        sectionDistritos.appendChild(optionElemento);
    }
};

crearSectionProvincias();
sectionProvincia.addEventListener('change', crearSectionCantones);
sectionCantones.addEventListener('change', crearSectionDistritos);