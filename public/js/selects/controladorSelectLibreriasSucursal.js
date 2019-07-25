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
    var select = document.getElementById('sucursal');
    if(select){
        select.remove();
    }
    let libreria = libreriaSelect.value;
    listaObtenerSucursal = await obtenerSucursalesIdLibreria(libreria);

    if (listaObtenerSucursal.success) {
        listaObtenerSucursal = listaObtenerSucursal.listaSucursales;
        let sucursalContenedor = document.getElementById("contenedorSucursal");
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
            optionElemento.setAttribute('value', listaObtenerSucursal[i]._id);
            optionElemento.innerHTML = listaObtenerSucursal[i].nombre;
            sucursalSelect.appendChild(optionElemento);
        }
    }
};

crearSectionLibreria();
libreriaSelect.addEventListener('change', crearSectionSucursal);
