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






    console.log(listaLibrerias);
    tbodyLibro.innerHTML = '';
    for (let i = 0; i < listaLibrerias.length; i++) {

        if (listaLibrerias[i].ejemplares.length > 0) {
            let contador = 0;
            for (let j = 0; j < listaLibrerias[i].ejemplares.length; j++) {
                contador = contador + listaLibrerias[i].ejemplares[j].cantidad
            }

            agregarLibros(listaLibrerias[i], contador);

        }

        //agregarLibros(listaLibrerias[i]);
    }
    /* document.getElementById('libros').addEventListener('click', function(){
        window.location.href = "listarLibrosCards.html"; }) */
    ;
    //filaNoDatosLibro();
};

let agregarLibros = function (plibrerias, cantidadLibrosVendidos) {
    let fila = tbodyLibro.insertRow();

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        fila.insertCell().innerHTML = plibrerias.nombreFantasia;
        fila.insertCell().innerHTML = plibrerias.provincia;

        fila.insertCell().innerHTML = cantidadLibrosVendidos;
        fila.insertCell().innerHTML = plibrerias.distrito;
    } else {
        fila.insertCell().innerHTML = sucursales.sucursal.nombre;
        fila.insertCell().innerHTML = sucursales.sucursal.provincia;
        fila.insertCell().innerHTML = sucursales.sucursal.canton;
        fila.insertCell().innerHTML = sucursales.sucursal.distrito;
    }
    //let celda_perfil = fila.insertCell();

    /* let divContendor = document.createElement("div");
    divContendor.setAttribute('class', 'crear-contenedor')
    let btnPerfil = document.createElement('a');
    celda_perfil.appendChild(divContendor);
    divContendor.appendChild(btnPerfil);

    btnPerfil.innerText = 'Ver perfil'
    btnPerfil.setAttribute('class', 'material-blue')
    btnPerfil.href = "perfilLibro.html?id=" + libro._id; */
}
//mapa




crearReporteGeneralVentas();

