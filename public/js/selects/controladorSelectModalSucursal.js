let listaObtenerSucursal = [];
let crearSectionSucursalModal = async () => {
    let selectSucursal = '';
    listaObtenerSucursal = await obtenerSucursales();

    selectSucursal = `<select id="selectSucursalModal"><option value=''>--Seleccione una sucursal--</option>`;

    for (let i = 0; i < listaObtenerSucursal.length; i++) {
        selectSucursal += `<option value='${listaObtenerSucursal[i]._id}' data-tienda='sucursal'>${listaObtenerSucursal[i].nombre}</option>`
    }
    selectSucursal += `</select>`;
    return selectSucursal;
};