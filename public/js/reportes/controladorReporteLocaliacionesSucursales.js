const tbodyLibro = document.querySelector('#tabla-elementos-libro tbody');
let listaLibrosMasVendidos;

const crearReporteLocalizacionesSurcursales = async () => {

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        listaLocalizacionesSucursal = await obtenerSucursales();

    }
    else {
        /* lista_sucursales = await obtenerTiendas();
        listaLibreria = lista_sucursales;
        lista_sucursales = lista_sucursales.listaLibrerias; */
        lista_sucursales = await obtenerUsuarioPorIdFetch(sessionStorage.id);
        listaLocalizacionesSucursal = lista_sucursales.usuario.libreria.sucursales;


    }






    console.log(listaLocalizacionesSucursal);
    tbodyLibro.innerHTML = '';
    for (let i = 0; i < listaLocalizacionesSucursal.length; i++) {
        agregarLibros(listaLocalizacionesSucursal[i]);
    }
    /* document.getElementById('libros').addEventListener('click', function(){
        window.location.href = "listarLibrosCards.html"; }) */
    ;
    //filaNoDatosLibro();
};

let agregarLibros = function (sucursales) {
    let fila = tbodyLibro.insertRow();

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        fila.insertCell().innerHTML = sucursales.nombre;
        fila.insertCell().innerHTML = sucursales.provincia;
        fila.insertCell().innerHTML = sucursales.canton;
        fila.insertCell().innerHTML = sucursales.distrito;
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




crearReporteLocalizacionesSurcursales();

