const libreriaSelect = document.getElementById('libreria');
let listaObtenerSucursal = [];
let listaObtenerLibreria = [];



let crearSectionLibreria = async () => {

    listaObtenerLibreria = await obtenerLibrerias();

    libreriaSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una libreria--';
    libreriaSelect.appendChild(optionElemento);

    for (let i = 0; i < listaObtenerLibreria.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerLibreria[i]._id);
        optionElemento.innerHTML = listaObtenerLibreria[i].nombreFantasia;
        libreriaSelect.appendChild(optionElemento);

    }
};

let crearSectionSucursal = async () => {

    let labelSucursal = document.getElementById('sucursalLabel')
    let select = document.getElementById('sucursal');
    if (select) {
        labelSucursal.remove();
        select.remove();
    }
    let libreria = libreriaSelect.value;
    listaObtenerSucursal = obtenerSucursalesDeLibrerias(libreria);

    let sucursalContenedor = document.getElementById("contenedorSucursal");
    let labelSucursalSelect = document.createElement('label');
    labelSucursalSelect.setAttribute('for', 'sucursal');
    labelSucursalSelect.setAttribute('id', 'sucursalLabel');
    labelSucursalSelect.innerText = 'Sucursales:';
    sucursalContenedor.appendChild(labelSucursalSelect);
    var sucursalSelect = document.createElement('select');
    sucursalSelect.setAttribute('name', 'sucursal');
    sucursalSelect.setAttribute('id', 'sucursal');
    sucursalContenedor.appendChild(sucursalSelect);

    sucursalSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una sucursal--';
    sucursalSelect.appendChild(optionElemento);

    for (var i = 0; i < listaObtenerSucursal.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerSucursal[i].sucursal._id);
        optionElemento.innerHTML = listaObtenerSucursal[i].sucursal.nombre;
        sucursalSelect.appendChild(optionElemento);
    }
};

let obtenerSucursalesDeLibrerias = function (idLibreria) {
    for (let i = 0; i < listaObtenerLibreria.length; i++) {
        if (listaObtenerLibreria[i]._id === idLibreria) {
            return listaObtenerLibreria[i].sucursales;
        }
    }
}

crearSectionLibreria();
libreriaSelect.addEventListener('change', crearSectionSucursal);
