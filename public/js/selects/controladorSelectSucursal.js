const sucursalSelect = document.getElementById('sucursal');

let listaObtenerSucursal = [];

let crearSectionSucursal = async () => {

    if (sessionStorage.tipoUsuario == "Adminitrador librería") {
        listaObtenerSucursal = await obtenerUsuarioPorIdFetchTiendas(sessionStorage.id);
        listaObtenerSucursal = listaObtenerSucursal.usuario.libreria.sucursales;
    }
    else {
        listaObtenerSucursal = await obtenerSucursales();
    }

    sucursalSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una sucursal--';
    sucursalSelect.appendChild(optionElemento);

    // optionElemento = document.createElement('option');
    // optionElemento.setAttribute('data-tienda','Libreria');
    // optionElemento.setAttribute('value', listaObtenerSucursal.usuario.libreria._id);
    // optionElemento.innerHTML = listaObtenerSucursal.usuario.libreria.nombreFantasia;
    // sucursalSelect.appendChild(optionElemento);



    for (let i = 0; i < listaObtenerSucursal.length; i++) {
        if (listaObtenerSucursal[i].sucursal) {
            createOption(listaObtenerSucursal[i].sucursal);
        }
        else{
            createOption(listaObtenerSucursal[i]);
        }
    }
};

let createOption = function (sucursal) {
    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', sucursal._id);
    optionElemento.setAttribute('data-tienda', 'Sucursal');
    optionElemento.innerHTML = sucursal.nombre;
    sucursalSelect.appendChild(optionElemento);
}

crearSectionSucursal();