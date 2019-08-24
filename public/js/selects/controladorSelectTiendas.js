const sucursalSelect = document.getElementById('sucursal');

let listaObtenerSucursal = [];

let crearSectionSucursal = async () => {
    sucursalSelect.innerHTML = '';
    if (sessionStorage.tipoUsuario == "Adminitrador plataforma") {
        listaObtenerSucursal = await obtenerLibrerias();
        drawSelectPlataforma();
    }
    else {
        listaObtenerSucursal = await obtenerUsuarioPorIdFetchTiendas(sessionStorage.id);
        listaObtenerSucursal = listaObtenerSucursal.usuario.libreria;
        drawSelectLibreria();
    }
};

crearSectionSucursal();

let drawSelectLibreria = function () {
    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una sucursal--';
    sucursalSelect.appendChild(optionElemento);

    optionElemento = document.createElement('option');
    optionElemento.setAttribute('data-tienda', 'Libreria');
    optionElemento.setAttribute('value', listaObtenerSucursal._id);
    optionElemento.innerHTML = listaObtenerSucursal.nombreFantasia;
    sucursalSelect.appendChild(optionElemento);

    listaObtenerSucursal = listaObtenerSucursal.sucursales;

    for (let i = 0; i < listaObtenerSucursal.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerSucursal[i].sucursal._id);
        optionElemento.setAttribute('data-tienda', 'Sucursal');
        optionElemento.innerHTML = listaObtenerSucursal[i].sucursal.nombre;
        sucursalSelect.appendChild(optionElemento);
    }
}

let drawSelectPlataforma = function () {
    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una tienda--';
    sucursalSelect.appendChild(optionElemento);

    for (let j = 0; j < listaObtenerSucursal.length; j++) {
        optionElemento = document.createElement('option');
        optionElemento.setAttribute('data-tienda', 'Libreria');
        optionElemento.setAttribute('value', listaObtenerSucursal[j]._id);
        optionElemento.innerHTML = listaObtenerSucursal[j].nombreFantasia;
        sucursalSelect.appendChild(optionElemento);

        for (let i = 0; i < listaObtenerSucursal[j].sucursales.length; i++) {
            let optionElemento = document.createElement('option');
            optionElemento.setAttribute('value', listaObtenerSucursal[j].sucursales[i].sucursal._id);
            optionElemento.setAttribute('data-tienda', 'Sucursal');
            optionElemento.innerHTML = listaObtenerSucursal[j].sucursales[i].sucursal.nombre;
            sucursalSelect.appendChild(optionElemento);
        }
    }

}