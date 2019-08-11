let modalAgregarCarrito = function (event) {
    let element = event.target;
    let stockLibreria = event.target.getAttribute('data-cantidad');
    Swal.fire({
        title: 'Datos para la venta',
        html: `<form class="formRegistro modalForm" name="formulario_registro">
        <div class="column columnModal">
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

        if (!(err1)) {
            var response = agregarCarritoCompras(element, elementCant.value, stockLibreria);
            if (response) {
                Swal.fire({
                    type: 'success',
                    title: "Libro agregado al carro de compra"
                })
            }
            else {
                Swal.fire({
                    type: 'warning',
                    title: "No hay suficientes libros en stock"
                })
            }
        }
        else {
            Swal.fire({
                type: 'warning',
                title: "El libro no se agregó al carrito de compras"
            })
        }
    });
}

let agregarCarritoCompras = function (element, cantidad, stock) {
    let listaEjemplaresUsuario = [];
    let compra = Number(cantidad);
    if (localStorage.getItem(element.getAttribute('data-idTienda'))) {
        var ejemplaresJSON = localStorage.getItem(element.getAttribute('data-idTienda'));
        listaEjemplaresUsuario = JSON.parse(ejemplaresJSON);
        let change = false;
        listaEjemplaresUsuario.forEach((ejemp) => {
            if (ejemp.idEjemplar == element.getAttribute('data-libro')) {
                compra = Number(ejemp.cantidad) + Number(cantidad);
                ejemp.cantidad = compra;
                change = true;
            }
        });
        if (!change) {
            let ejemplar = {
                titulo: element.getAttribute('data-nombreLibro'),
                idEjemplar: element.getAttribute('data-libro'),
                tipo: element.getAttribute('data-tipoLibro'),
                cantidad: cantidad,
                iva: element.getAttribute('data-iva'),
                precio: element.getAttribute('data-precio'),
                img: element.getAttribute('data-img')
            }
            listaEjemplaresUsuario.push(ejemplar);
        }
    }
    else {
        let tienda = {
            idtienda: element.getAttribute('data-idTienda'),
            tienda: element.getAttribute('data-tienda'),
            nombre: element.getAttribute('data-nombreTienda')
        }
        listaEjemplaresUsuario.push(tienda, {
            titulo: element.getAttribute('data-nombreLibro'),
            idEjemplar: element.getAttribute('data-libro'),
            tipo: element.getAttribute('data-tipoLibro'),
            cantidad: cantidad,
            iva: element.getAttribute('data-iva'),
            precio: element.getAttribute('data-precio'),
            img: element.getAttribute('data-img')
        });
    }
    if (compra > stock)
        return false;
    localStorage.setItem(element.getAttribute('data-idTienda'), JSON.stringify(listaEjemplaresUsuario));
    allStorage();
    document.getElementById('numCarrito').setAttribute('data-count', countBooksCart);
    return true;
}