const sucursalSelect = document.getElementById('sucursal');

let listaObtenerSucursal = [];

let crearSectionSucursal = async () => {

    listaObtenerSucursal = await obtenerUsuarioPorIdFetchTiendas(sessionStorage.id);

    sucursalSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una tienda--';
    sucursalSelect.appendChild(optionElemento);

    optionElemento = document.createElement('option');
    optionElemento.setAttribute('data-tienda','Libreria');
    optionElemento.setAttribute('value', listaObtenerSucursal.usuario.libreria._id);
    optionElemento.innerHTML = listaObtenerSucursal.usuario.libreria.nombreFantasia;
    sucursalSelect.appendChild(optionElemento);

    listaObtenerSucursal = listaObtenerSucursal.usuario.libreria.sucursales;

    for (let i = 0; i < listaObtenerSucursal.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerSucursal[i].sucursal._id);
        optionElemento.setAttribute('data-tienda','Sucursal');
        optionElemento.innerHTML = listaObtenerSucursal[i].sucursal.nombre;
        sucursalSelect.appendChild(optionElemento);
    }
};

crearSectionSucursal();