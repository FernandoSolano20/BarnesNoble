let modalComprarLibroBarnesNoble = async (event) => {
    let idLibro = event.target.getAttribute('data-libro');
    let radioButtons = '';
    listaEjemplares = await obtenerEjemplaresPorIdLibro(idLibro);
    for (let i = 0; i < listaEjemplares.listaLibros.length; i++) {
        if (i == 0) {
            radioButtons += `<input type="radio" data-tipoLibro="Tipo Libro" data-idEjemplar="${listaEjemplares.listaLibros[i]._id}" name="ejemplar" id="input${i}" value="${i}" checked>
                        <label for="input${i}" class="labelRadio">${listaEjemplares.listaLibros[i].tipo}</label>`;
        } else {
            radioButtons += `<input type="radio" data-tipoLibro="Tipo Libro" data-idEjemplar="${listaEjemplares.listaLibros[i]._id}" name="ejemplar" id="input${i}" value="${i}">
                        <label for="input${i}" class="labelRadio">${listaEjemplares.listaLibros[i].tipo}</label>`;
        }
    }

    Swal.fire({
        title: 'Datos para la venta',
        html: `<form class="formRegistro modalForm" name="formulario_registro">
        <div class="column columnModal">
            <div class="inputGroup radio">
                <span class="left alertHidden" id="alertTipoEjemplar">Seleccione una opción.</span>
                ${radioButtons}
            </div>
            <div class="inputGroup">
                <label class="label" for="inputPrecio">Precio:</label>
                 <input type="number" class="inputForm" id="inputPrecio" name="Precio" disabled value="${listaEjemplares.listaLibros[0].precio}">
            </div>
            <div class="inputGroup">
                <span class="left alertHidden" id="alertIVA">Seleccione una opción.</span>
                <label class="label" for="inputIVA">Impuesto del valor agregado:</label>
                <input type="number" class="inputForm" id="inputIVA" name="iva">
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
        let iva = document.querySelector('#inputIVA');
        let ivaAlert = document.querySelector('#alertIVA');
        let elementIVA = {
            value: iva.value,
            alert: ivaAlert,
            input: iva
        }
        var err1 = !(noVacio(elementIVA) && validarNumeros(elementIVA));

        let cant = document.querySelector('#inputCantidad');
        let cantAlert = document.querySelector('#alertCantidad');
        let tipoLibroRadio = document.querySelectorAll('[name="ejemplar"]')
        for (let i = 0; i < tipoLibroRadio.length; i++) {
            if (tipoLibroRadio[i].checked) {
                tipoLibroRadio = i;
                break;
            }
        }
        let elementCant = {
            value: cant.value,
            alert: cantAlert,
            input: cant
        }
        var err2 = !(noVacio(elementCant) && validarNumeros(elementCant) && validarMenorStock(elementCant, listaEjemplares.listaLibros[tipoLibroRadio].cantidad));

        if (!(err1 || err2)) {
            let ejemplarLibreria = {
                idLibreria: adminLib.usuario.libreria,
                cantidad: elementCant.value,
                iva: elementIVA.value,
                libro: listaEjemplares.listaLibros[tipoLibroRadio]._id,
                id: listaEjemplares.listaLibros[tipoLibroRadio].libro
            }
            let response = await comprarLibros(ejemplarLibreria);
            if (response.success) {
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
                title: "El premio no se pudo guardar"
            })
        }
    });
}

let validarMenorStock = function (elementos, stock) {
    if (elementos.value > stock) {
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

let changeRadioButtons = function (event) {
    let element = event.target;
    if (element.getAttribute('data-tipoLibro') == 'Tipo Libro') {
        document.getElementById('inputPrecio').value = listaEjemplares.listaLibros[element.value].precio;
    }
}
document.body.addEventListener('change', changeRadioButtons);