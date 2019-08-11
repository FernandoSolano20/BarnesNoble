let modalDarLibrosASucursal = async (event) => {
    let optionSucursal = await crearSectionSucursal();
    let idEjemplar = event.target.getAttribute('data-libro');
    let stockLibreria = event.target.getAttribute('data-cantidad');
    let ivaLibro = event.target.getAttribute('data-iva');
    Swal.fire({
        title: 'Datos para la venta',
        html: `<form class="formRegistro modalForm" name="formulario_registro">
        <div class="column columnModal">
            <div class="inputGroup box">
                <span class="left alertHidden" id="alertSucursal">Seleccione una opción.</span>
                ${optionSucursal}
            </div>
            <div class="inputGroup">
                <span class="left alertHidden" id="alertCantidad">Seleccione una opción.</span>
                <label class="label" for="inputCantidad">Cantidad de libros:</label>
                <input type="number" class="inputForm" id="inputCantidad" name="cantidad">
            </div>
        </div>
        </form>
            `
    }).then(async () => {

        let cant = document.querySelector('#inputCantidad');
        let cantAlert = document.querySelector('#alertCantidad');
        let elementCant = {
            value: cant.value,
            alert: cantAlert,
            input: cant
        }
        var err1 = !(noVacio(elementCant) && validarNumeros(elementCant) && validarMenorStock(elementCant, stockLibreria));

        let sucursalSelected = document.getElementById('selectSucursalModal');
        let sucursalAlert = document.getElementById('alertSucursal');

        let elementSelect = {
            value: sucursalSelected.value,
            alert: sucursalAlert,
            input: sucursalSelected
        }
        
        var err2 = !(noVacio(elementSelect) && validarSelect(elementSelect));

        if (!(err1 || err2)) {
            let ejemplarSucursal = {
                idLibreria: adminLib.usuario.libreria,
                idSucursal: sucursalSelected.value,
                cantidad: elementCant.value,
                iva: ivaLibro,
                ejemplar: idEjemplar
            }
            let response = await pasarLibroLibreriaSucursal(ejemplarSucursal);
            if (response.success) {
                editarListaEjemplar(ejemplarSucursal.ejemplar,ejemplarSucursal.cantidad);
                document.querySelector('[data-idEjemplar="'+ejemplarSucursal.ejemplar+'"] #pCantidad').innerHTML = "Cantidad: " + (stockLibreria -= ejemplarSucursal.cantidad);
                Swal.fire({
                    type: 'success',
                    title: response.message
                })
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: response.message
                })
            }
        }
        else {
            Swal.fire({
                type: 'warning',
                title: "El libro no se pudo traspasar a la sucursal"
            })
        }
    });
}

let validarMenorStock = function (elementos, stock) {
    if (Number(elementos.value) > Number(stock)) {
        elementos.alert.innerText = "Debe ser menor " + stock + " unidades, cantidad de libros en bódega."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("inputError", "");
        elementos.input.className = elementos.input.className + " inputError";
        return false;
    }
    elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
    elementos.alert.className = elementos.alert.className + " alertHidden";
    elementos.input.className = elementos.input.className.replace("inputError", "");
    return true;
}

let editarListaEjemplar = function (ejemplarID, compra) {
    for (let i = 0; i < listaEjemplares.length; i++) {
        if (listaEjemplares[i].libro._id === ejemplarID) {
            listaEjemplares[i].cantidad -= compra;
            break;
        }
    }
}