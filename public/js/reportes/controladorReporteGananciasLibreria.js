const tbodyLibro = document.querySelector('#tabla-elementos-libro tbody');
let listaLibrosMasVendidos;
let librosVendidos = 0;
let idLibro = 0;
let iva = 0;
let precioLibro = 0;
let gananciaTotal = 0;

const crearReporteLocalizacionesSurcursales = async () => {

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        listaLocalizacionesSucursal = await obtenerSucursales();
        listaLibrerias = await obtenerLibreriasCompletas();
        tbodyLibro.innerHTML = '';
        for (let i = 0; i < listaLibrerias.length; i++) {

            if (listaLibrerias[i].ejemplares.length > 0) {
                //let contador = 0;
                //let precioTotal = 0;
                for (let j = 0; j < listaLibrerias[i].ejemplares.length; j++) {
                    /*  contador = contador + listaLibrerias[i].ejemplares[j].cantidad;
                     idEjemplar = listaLibrerias[i].ejemplares[j].libro;
                     let Ejemplar = await listaEjemplarPorID(idEjemplar);
                     precioTotal = precioTotal + listaLibrerias[i].ejemplares[j].cantidad * Ejemplar.precio.precio; */

                    if (librosVendidos + listaLibrerias[i].ejemplares[j].vendidos > 0) {
                        librosVendidos = librosVendidos + listaLibrerias[i].ejemplares[j].vendidos;
                    }
                    iva = listaLibrerias[i].ejemplares[j].iva
                    idLibro = listaLibrerias[i].ejemplares[j].libro;
                    let datosLibro = await listaEjemplarPorID(idLibro);
                    precioSinIva = datosLibro.precio.precio;
                    gananciaTotal = gananciaTotal + precioSinIva * iva / 100 * librosVendidos;

                }

                agregarLibrerias(listaLibrerias[i], librosVendidos, gananciaTotal);

            }

            //agregarLibros(listaLibrerias[i]);
        }
    }
    else {
        /* lista_sucursales = await obtenerTiendas();
        listaLibreria = lista_sucursales;
        lista_sucursales = lista_sucursales.listaLibrerias; */
        lista_sucursales = await obtenerUsuarioPorIdFetch(sessionStorage.id);
        listaLocalizacionesSucursal = lista_sucursales.usuario.libreria.sucursales;
        listaLibreria = lista_sucursales.usuario.libreria;

        for (let k = 0; k < listaLibreria.ejemplares.length; k++) {

            if (listaLibreria.ejemplares[k].vendidos > 0) {
                librosVendidos = librosVendidos + listaLibreria.ejemplares[k].vendidos;
                iva = listaLibreria.ejemplares[k].iva;
                idLibro = listaLibreria.ejemplares[k].libro;
                let datosLibro = await listaEjemplarPorID(idLibro);
                precioSinIva = datosLibro.precio.precio;
                gananciaTotal = gananciaTotal + precioSinIva * iva / 100 * librosVendidos;

            }
        }


    }


    console.log(listaLocalizacionesSucursal);
    //tbodyLibro.innerHTML = '';

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {


    } else {
        agregarLibreria(listaLibreria, librosVendidos, gananciaTotal);


    };




    //empieza codigo para contruir valores de sucursales

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {

        for (let i = 0; i < listaLocalizacionesSucursal.length; i++) {
            let librosVendidos = 0;
            let idLibro = 0;
            let iva = 0;
            let precioLibro = 0;
            let gananciaTotal = 0;
            for (let j = 0; j < listaLocalizacionesSucursal[i].ejemplares.length; j++) {

                if (listaLocalizacionesSucursal[i].ejemplares[j].vendidos > 0) {
                    librosVendidos = librosVendidos + listaLocalizacionesSucursal[i].ejemplares[j].vendidos;
                    iva = listaLocalizacionesSucursal[i].ejemplares[j].iva;
                    idLibro = listaLocalizacionesSucursal[i].ejemplares[j].libro;
                    let datosLibro = await listaEjemplarPorID(idLibro);
                    precioSinIva = datosLibro.precio.precio;
                    gananciaTotal = gananciaTotal + precioSinIva * iva / 100 * librosVendidos;

                }
            } if (librosVendidos != 0) {
                agregarSucursales(listaLocalizacionesSucursal[i], librosVendidos, gananciaTotal);
            }
            //cantidaddevendidos = listaLocalizacionesSucursal[i].ejemplares[j].vendidos;


        }

    } else {
        for (let i = 0; i < listaLocalizacionesSucursal.length; i++) {
            let librosVendidos = 0;
            let idLibro = 0;
            let iva = 0;
            let precioLibro = 0;
            let gananciaTotal = 0;
            for (let j = 0; j < listaLocalizacionesSucursal[i].sucursal.ejemplares.length; j++) {

                if (listaLocalizacionesSucursal[i].sucursal.ejemplares[j].vendidos > 0) {
                    librosVendidos = librosVendidos + listaLocalizacionesSucursal[i].sucursal.ejemplares[j].vendidos;
                    iva = listaLocalizacionesSucursal[i].sucursal.ejemplares[j].iva;
                    idLibro = listaLocalizacionesSucursal[i].sucursal.ejemplares[j].libro;
                    let datosLibro = await listaEjemplarPorID(idLibro);
                    precioSinIva = datosLibro.precio.precio;
                    gananciaTotal = gananciaTotal + precioSinIva * iva / 100 * librosVendidos;

                }
            }

            agregarSucursales(listaLocalizacionesSucursal[i], librosVendidos, gananciaTotal);

            cantidaddevendidos = listaLocalizacionesSucursal[0].sucursal.ejemplares[0].vendidos;


        }
    }

    //filaNoDatosLibro();
};

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};


let agregarLibreria = function (plibreria, plibrosVendidos, pgananciaTotal) {

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {

        let fila = tbodyLibro.insertRow();
        fila.insertCell().innerHTML = plibreria.nombreFantasia;
        fila.insertCell().innerHTML = plibreria.provincia;
        fila.insertCell().innerHTML = plibrosVendidos;
        fila.insertCell().innerHTML = `₡ ${formatMoney(pgananciaTotal, decimalCount = 2, decimal = ".", thousands = ",")}`;;



    } else {
        let fila = tbodyLibro.insertRow();
        fila.insertCell().innerHTML = plibreria.nombreFantasia;
        fila.insertCell().innerHTML = plibreria.provincia;
        fila.insertCell().innerHTML = plibrosVendidos;
        fila.insertCell().innerHTML = `₡ ${formatMoney(pgananciaTotal, decimalCount = 2, decimal = ".", thousands = ",")}`;;

    }
}

let agregarLibrerias = function (plibrerias, pcantidadLibrosVendidos, pprecioTotal) {
    let fila = tbodyLibro.insertRow();

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        fila.insertCell().innerHTML = plibrerias.nombreFantasia;
        fila.insertCell().innerHTML = plibrerias.provincia;

        fila.insertCell().innerHTML = pcantidadLibrosVendidos;
        let valorFinal = formatMoney(pprecioTotal, decimalCount = 2, decimal = ".", thousands = ",");
        fila.insertCell().innerHTML = `₡ ${valorFinal}`;
    } /* else {
        fila.insertCell().innerHTML = sucursales.sucursal.nombre;
        fila.insertCell().innerHTML = sucursales.sucursal.provincia;
        fila.insertCell().innerHTML = sucursales.sucursal.canton;
        fila.insertCell().innerHTML = sucursales.sucursal.distrito;
    } */

}


let agregarSucursales = function (psucursales, plibrosVendidos, pgananciaTotal) {
    let fila = tbodyLibro.insertRow();

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        fila.insertCell().innerHTML = psucursales.nombre;
        fila.insertCell().innerHTML = psucursales.provincia;
        fila.insertCell().innerHTML = plibrosVendidos;
        fila.insertCell().innerHTML = `₡ ${formatMoney(pgananciaTotal, decimalCount = 2, decimal = ".", thousands = ",")}`;
    } else {
        fila.insertCell().innerHTML = psucursales.sucursal.nombre;
        fila.insertCell().innerHTML = psucursales.sucursal.provincia;
        fila.insertCell().innerHTML = plibrosVendidos;
        fila.insertCell().innerHTML = `₡ ${formatMoney(pgananciaTotal, decimalCount = 2, decimal = ".", thousands = ",")}`;
    }


}





crearReporteLocalizacionesSurcursales();
