let crearSectionSucursal = async () => {
    let sucursalSelect = document.getElementById("sucursal");
    listaObtenerSucursal = await obtenerSucursales();

    sucursalSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una sucursal--';
    sucursalSelect.appendChild(optionElemento);

    for (let i =0; i < listaObtenerSucursal.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerSucursal[i]._id);
        optionElemento.innerHTML = listaObtenerSucursal[i].nombre;
        sucursalSelect.appendChild(optionElemento);
    }
};

crearSectionSucursal();