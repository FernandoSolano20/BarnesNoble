let crearSectionSucursal = async () => {
    let url = new URL(window.location.href);
    let idSucur = url.searchParams.get("id");
    let selectSucursal;
    listaObtenerSucursal = await obtenerUsuarioPorIdFetchTiendas(sessionStorage.id);
    let libreria = listaObtenerSucursal.usuario.libreria;
    let sucursalesLista = listaObtenerSucursal.usuario.libreria.sucursales;

    selectSucursal = `<select id="selectSucursalModal"><option value=''>--Seleccione una sucursal--</option>`;

    if(idSucur  != libreria._id){
        selectSucursal += `<option value='${libreria._id}' data-tienda='libreria'>${libreria.nombreFantasia}</option>`
    }

    for (let i = 0; i < sucursalesLista.length; i++) {
        if(idSucur != sucursalesLista[i].sucursal._id)
            selectSucursal += `<option value='${sucursalesLista[i].sucursal._id}' data-tienda='sucursal'>${sucursalesLista[i].sucursal.nombre}</option>`
    }
    selectSucursal += `</select>`;
    return selectSucursal;
};