let modalLector = '';
let listaLibreria = [];
let listaSucursales = [];
var tienda;
let ejempInput;
let modalComprarLibroBarnesNobleLector = async () => {

    Swal.fire({
        title: 'Ventas',
        html: ` <div class="radio" id="tipoLibroModal">${radioEjemple}
                    </div>`,
        showCancelButton: true,
        showConfirmButton: !!radioEjemple
    }).then(async (result) => {
        if (result.value) {
            let ejempRad = document.querySelectorAll('[name="ejempRadio"]');
            ejempRad.forEach((elem) => {
                if (elem.checked) {
                    ejempInput = elem
                }
            })
            let confirm = true;
            if (!modalLector) {
                confirm = true;
                let ejemp = {
                    ejemplar: ejempInput.getAttribute("data-libro")
                }
                listaLibreria = await obtenerLibreriaPorEjemplaresId(ejemp);
                listaSucursales = await obtenerSucursalesPorEjemplaresId(ejemp);
                listaLibreria = listaLibreria.librerias;
                listaSucursales = listaSucursales.sucursales;
                for (let i = 0; i < listaLibreria.length; i++) {
                    modalLector += ` <div class="radioCard">
                            <input class="radioCard__input" id="${listaLibreria[i]._id}" data-idTienda="${listaLibreria[i]._id}" data-tienda="libreria" data-nombreTienda="${listaLibreria[i].nombreFantasia}" type="radio" name="tienda" />
                            <label class="radioCard__button" for="${listaLibreria[i]._id}" tabindex="1">
                                <span class="radioCard__content">
                                    <span class="radioCard__title">${listaLibreria[i].nombreFantasia}</span>
                                </span>
                            </label>
                        </div>`;
                }

                for (let i = 0; i < listaSucursales.length; i++) {
                    modalLector += ` <div class="radioCard">
                            <input class="radioCard__input" id="${listaSucursales[i]._id}" data-idTienda="${listaSucursales[i]._id}" data-tienda="sucursal" data-nombreTienda="${listaSucursales[i].nombre}" type="radio" name="tienda" />
                            <label class="radioCard__button" for="${listaSucursales[i]._id}" tabindex="1">
                                <span class="radioCard__content">
                                    <span class="radioCard__title">${listaSucursales[i].nombre}</span>
                                </span>
                            </label>
                        </div>`;
                }
            }

            if (!modalLector) {
                confirm = false;
                modalLector = ` <div class="radioCard" id="noData">
                            <span class="radioCard__content">
                                <span class="radioCard__title">No hay tiendas</span>
                            </span>
                    </div>`;
            }
            Swal.fire({
                title: 'Ventas',
                html: ` <div>${modalLector}
                            </div>`,
                showCancelButton: true,
                showConfirmButton: !!confirm
            }).then(async (result) => {
                if (result.value) {
                    let tiendas = document.querySelectorAll('[name="tienda"]');
                    tiendas.forEach((elem) => {
                        if (elem.checked) {
                            tienda = elem
                        }
                    })
                    Swal.fire({
                        title: 'Ventas',
                        html: ` <form class="formRegistro modalForm" name="formulario_registro">
                                    <div class="column columnModal">
                                        <div class="inputGroup">
                                            <span class="left alertHidden" id="alertCantidad">Seleccione una opción.</span>
                                            <label class="label" for="inputCantidad">Cantidad de libros:</label>
                                            <input type="number" class="inputForm" id="inputCantidad" name="cantidad">
                                        </div>
                                    </div>
                                </form>`,
                        showCancelButton: true,
                        showConfirmButton: true
                    }).then(async (result) => {
                        let cantidad = document.getElementById('inputCantidad');
                        if (result.value) {
                            let libroObtenido;
                            let cantDBEjemp;
                            if (tienda.getAttribute("data-tienda") == "libreria") {
                                libroObtenido = {
                                    ejemplar: ejempInput.getAttribute("data-libro"),
                                    idLibreria: tienda.getAttribute("data-idTienda")
                                }
                                cantDBEjemp = await obtenerCantidadEjemplarPorLibreria(libroObtenido);
                            }
                            else {
                                libroObtenido = {
                                    ejemplar: ejempInput.getAttribute("data-libro"),
                                    idSucursal: tienda.getAttribute("data-idTienda")
                                }
                                cantDBEjemp = await obtenerCantidadEjemplarPorSucursal(libroObtenido);
                            }
                            
                            ejempInput.setAttribute("data-idTienda", tienda.getAttribute("data-idTienda"));
                            ejempInput.setAttribute("data-tienda", tienda.getAttribute("data-tienda"));
                            ejempInput.setAttribute("data-nombreTienda", tienda.getAttribute("data-nombreTienda"));
                            ejempInput.setAttribute("data-iva", cantDBEjemp.ejemplar.ejemplares[0].iva);
                            ejempInput.setAttribute("data-precio",  Number("0."+cantDBEjemp.ejemplar.ejemplares[0].iva) * Number(ejempInput.getAttribute("data-precio")) + Number(ejempInput.getAttribute("data-precio")));
                            var response = agregarCarritoCompras(ejempInput, cantidad.value, cantDBEjemp.ejemplar.ejemplares[0].cantidad);
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
                    })
                }
            })
        }
    })
}