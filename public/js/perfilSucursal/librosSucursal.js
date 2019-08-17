const containerCard = document.querySelector('#cardElements')
const txtFiltro = document.getElementById("txtFiltro");
let listaOfertas = [];

let mostarLibros = async (event) => {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let filtro = txtFiltro.value;
    containerCard.innerHTML = '';
    if(!event){
        if (sessionStorage.tipoUsuario == 'Lector') {
            listaOfertas = await obtenerOfertasSucursalId(id);
        }
    }
    for (let i = 0; i < sucursal.sucursal.ejemplares.length; i++) {
        let libro = sucursal.sucursal.ejemplares[i].libro.libro;
        let ejemplar = sucursal.sucursal.ejemplares[i].libro;
        if (ejemplar.tipo.toLowerCase().includes(filtro.toLowerCase()) || libro.titulo.toLowerCase().includes(filtro.toLowerCase()) || libro.autor.nombre.toLowerCase().includes(filtro.toLowerCase()) || libro.autor.nombreArtistico.toLowerCase().includes(filtro.toLowerCase()) || libro.genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || libro.categoria.nombre.toLowerCase().includes(filtro.toLowerCase()))
            agregarCardLibro(libro, ejemplar, sucursal.sucursal.ejemplares[i], id);
    }
    filaNoDatos();
};

let agregarCardLibro = function (libro, ejemplar, infoEjemplar, SucursalIDURL) {
    let oferta = 0;
    let nombreOferta;
    listaOfertas.listaOfertas.forEach((ofer) => {
        if (ofer.autor == libro.autor._id) {
            oferta = ofer.descuento;
            nombreOferta = ofer.nombre;
            return;
        } else if (ofer.categoria == libro.categoria._id) {
            oferta = ofer.descuento;
            nombreOferta = ofer.nombre;
            return;
        } else if (ofer.libro == libro._id) {
            oferta = ofer.descuento;
            nombreOferta = ofer.nombre;
            return;
        } else if (ofer.genero == libro.genero._id) {
            oferta = ofer.descuento;
            nombreOferta = ofer.nombre;
            return;
        }
    });
    let divParrent = document.createElement('div');
    divParrent.setAttribute('class', 'parrent');
    divParrent.setAttribute('data-idEjemplar', ejemplar._id);
    containerCard.appendChild(divParrent);

    let child = document.createElement('div');
    child.setAttribute('class', 'child');
    divParrent.appendChild(child);

    let span = document.createElement('i');
    span.setAttribute('class', 'far fa-books');
    child.appendChild(span);

    let child2 = document.createElement('div');
    child2.setAttribute('class', 'child-two');
    divParrent.appendChild(child2);

    let divInformationBook = document.createElement('div');
    divInformationBook.setAttribute('class', 'informacionLibro');
    child2.appendChild(divInformationBook);

    if (oferta) {
        let ofertaDiv = document.createElement('div');
        ofertaDiv.setAttribute('class', 'bookie-offers__sash');
        ofertaDiv.innerHTML = "Oferta: " + nombreOferta + " de " + oferta + "%";
        divInformationBook.appendChild(ofertaDiv);
    }

    let h3 = document.createElement('h3');
    h3.innerText = libro.titulo;
    divInformationBook.appendChild(h3);

    let img = document.createElement('img');
    img.setAttribute('src', libro.caratula);
    divInformationBook.appendChild(img);

    let p1 = document.createElement('p');
    p1.setAttribute('class', 'infoBook');
    p1.innerText = ejemplar.tipo;
    divInformationBook.appendChild(p1);

    p1 = document.createElement('p');
    p1.setAttribute('class', 'infoBook');
    let precioFinal = ejemplar.precio + ejemplar.precio * Number(infoEjemplar.iva) / 100;
    precioFinal -= precioFinal * Number("0." + oferta);
    p1.innerText = "Precio: ₡" + precioFinal;
    divInformationBook.appendChild(p1);

    p1 = document.createElement('p');
    p1.setAttribute('class', 'infoBook');
    p1.setAttribute('id', 'pCantidad');
    p1.innerText = "Cantidad: " + infoEjemplar.cantidad;
    divInformationBook.appendChild(p1);

    let divContainerButtons = document.createElement('div');
    divContainerButtons.setAttribute('class', 'containerButtonsCards');
    child2.appendChild(divContainerButtons);

    if (sessionStorage.tipoUsuario == 'Adminitrador librería') {
        let btnAsignarSucursal = document.createElement('a');
        btnAsignarSucursal.setAttribute('class', 'material btnLibreria downButton');
        btnAsignarSucursal.setAttribute('id', 'btnFormato');
        btnAsignarSucursal.innerText = 'Mover a sucursal';
        btnAsignarSucursal.setAttribute('data-libro', ejemplar._id);
        btnAsignarSucursal.setAttribute('data-cantidad', infoEjemplar.cantidad);
        btnAsignarSucursal.setAttribute('data-iva', infoEjemplar.iva);
        btnAsignarSucursal.setAttribute('style', 'line-height:normal');
        btnAsignarSucursal.addEventListener('click', modalDarLibrosASucursal);
        divContainerButtons.appendChild(btnAsignarSucursal);
    }else if(sessionStorage.tipoUsuario == 'Lector'){
        let btnAsignarSucursal = document.createElement('a');
        btnAsignarSucursal.setAttribute('class', 'material btnLibreria downButton');
        btnAsignarSucursal.setAttribute('id', 'btnFormato');
        btnAsignarSucursal.innerText = 'Agregar a carrito';
        btnAsignarSucursal.setAttribute('data-libro', ejemplar._id);
        btnAsignarSucursal.setAttribute('data-tipoLibro', ejemplar.tipo);
        btnAsignarSucursal.setAttribute('data-nombreLibro', libro.titulo);
        btnAsignarSucursal.setAttribute('data-cantidad', infoEjemplar.cantidad);
        btnAsignarSucursal.setAttribute('data-iva', infoEjemplar.iva);
        btnAsignarSucursal.setAttribute('data-idTienda', SucursalIDURL);
        btnAsignarSucursal.setAttribute('data-tienda', "sucursal");
        btnAsignarSucursal.setAttribute('data-img', libro.caratula);
        btnAsignarSucursal.setAttribute('data-nombreTienda', sucursal.sucursal.nombre);
        btnAsignarSucursal.setAttribute('data-precio', precioFinal);
        btnAsignarSucursal.setAttribute('style', 'line-height:normal');
        btnAsignarSucursal.addEventListener('click',modalAgregarCarrito);
        divContainerButtons.appendChild(btnAsignarSucursal);
}
}

let filaNoDatos = function () {
    if (sucursal.sucursal.ejemplares.length === 0 || containerCard.childElementCount === 0) {
        let divParrent = document.createElement('div');
        divParrent.setAttribute('class', 'parrent');
        containerCard.appendChild(divParrent);

        let child = document.createElement('div');
        child.setAttribute('class', 'child');
        divParrent.appendChild(child);

        let span = document.createElement('i');
        span.setAttribute('class', 'far fa-books');
        child.appendChild(span);

        let child2 = document.createElement('div');
        child2.setAttribute('class', 'child-two');
        divParrent.appendChild(child2);

        let h3 = document.createElement('h3');
        h3.innerText = "No hay datos";
        child2.appendChild(h3);
    }
}

txtFiltro.addEventListener('keyup', mostarLibros);



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

        let txtTienda;
        txtTienda = sucursalSelected.value;
        txtTienda = sucursalSelected.querySelector('[value="' + txtTienda + '"]').getAttribute('data-tienda');

        let elementSelect = {
            value: sucursalSelected.value,
            alert: sucursalAlert,
            input: sucursalSelected
        }

        var err2 = !(noVacio(elementSelect) && validarSelect(elementSelect));

        if (!(err1 || err2)) {
            let url = new URL(window.location.href);
            let idSucur = url.searchParams.get("id");
            let ejemplarSucursal = {
                idSucursal: idSucur,
                cantidad: elementCant.value,
                iva: ivaLibro,
                ejemplar: idEjemplar
            }
            if (txtTienda == 'libreria') {
                ejemplarSucursal.idLibreria = sucursalSelected.value;
            }
            else {
                ejemplarSucursal.idSucursal2 = sucursalSelected.value;
            }
            let response;
            if (txtTienda == 'libreria') {
                response = await pasarLibroEntreSucursaleLibreria(ejemplarSucursal);
            }
            else {
                response = await pasarLibroEntreSucursales(ejemplarSucursal);
            }
            if (response.success) {
                editarListaEjemplar(ejemplarSucursal.ejemplar, ejemplarSucursal.cantidad);
                document.querySelector('[data-idEjemplar="' + ejemplarSucursal.ejemplar + '"] #pCantidad').innerHTML = "Cantidad: " + (stockLibreria -= ejemplarSucursal.cantidad);
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
    for (let i = 0; i < sucursal.sucursal.ejemplares.length; i++) {
        if (sucursal.sucursal.ejemplares[i].libro._id === ejemplarID) {
            sucursal.sucursal.ejemplares[i].cantidad -= compra;
            break;
        }
    }
}