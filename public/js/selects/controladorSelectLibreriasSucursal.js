const libreriaSelect = document.getElementById('libreria');
const sucursalSelect = document.getElementById('sucursal');
let listaObtnerSucursa = [];
let listaObtenerLibreria = [];



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
        optionElemento.innerHTML = listaObtenerLibreria[i].nombreFantasia;
        libreriaSelect.appendChild(optionElemento);

    }
};

let crearSectionSucursal = async () => {

    let libreria = libreriaSelect.value;
    sucursalSelect.innerHTML = '';

    listaObtenerSucursal = await obtenerSucursales(libreria);


    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una sucursal--';
    sucursalSelect.appendChild(optionElemento);

    for (elementos in listaObtnerSucursa) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtnerSucursa[elementos];
        sucursalSelect.appendChild(optionElemento);
    }
};

crearSectionLibreria();
libreriaSelect.addEventListener('change', crearSectionSucursal);
