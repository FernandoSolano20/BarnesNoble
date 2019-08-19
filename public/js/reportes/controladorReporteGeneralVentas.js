const tbodyLibro = document.querySelector('#tabla-elementos-libro tbody');
let listaLibrosMasVendidos;

const crearReporteGeneralVentas = async () => {

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        //listaLocalizacionesSucursal = await obtenerSucursales();
        listaLibrerias = await obtenerLibreriasCompletas();

    }
    else {
        /* lista_sucursales = await obtenerTiendas();
        listaLibreria = lista_sucursales;
        lista_sucursales = lista_sucursales.listaLibrerias; 
        lista_sucursales = await obtenerUsuarioPorIdFetch(sessionStorage.id);
        lista_sucursales = await obtenerUsuarioPorIdFetch(sessionStorage.id);
        listaLocalizacionesSucursal = lista_sucursales.usuario.libreria.sucursales;
 */

    }






    tbodyLibro.innerHTML = '';
    for (let i = 0; i < listaLibrerias.length; i++) {

        if (listaLibrerias[i].ejemplares.length > 0) {
            let contador = 0;
            let precioTotal = 0;
            for (let j = 0; j < listaLibrerias[i].ejemplares.length; j++) {
                contador = contador + listaLibrerias[i].ejemplares[j].cantidad;
                idEjemplar = listaLibrerias[i].ejemplares[j].libro;
                let Ejemplar = await listaEjemplarPorID(idEjemplar);
                precioTotal = precioTotal + listaLibrerias[i].ejemplares[j].cantidad * Ejemplar.precio.precio;
            }

            agregarLibros(listaLibrerias[i], contador, precioTotal);

        }

        //agregarLibros(listaLibrerias[i]);
    }
    /* document.getElementById('libros').addEventListener('click', function(){
        window.location.href = "listarLibrosCards.html"; }) */
    ;
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


let agregarLibros = function (plibrerias, pcantidadLibrosVendidos, pprecioTotal) {
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

crearReporteGeneralVentas();

