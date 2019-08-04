const nombreComercial = document.getElementById('txt-nombreComercial');
const nombreFantasia = document.getElementById('txt-nombreFantasia');
const provincia = document.getElementById('txt-provincia');
const canton = document.getElementById('txt-canton');
const distrito = document.getElementById('txt-distrito');
let usuario;

(async () => {
    usuario = await obtenerUsuarioPorIdFetch(sessionStorage.id);
    document.getElementById('libPerfilFoto').src = usuario.usuario.img;
    document.getElementById('nombreAdmin').innerText = usuario.usuario.nombre + " " + usuario.usuario.primerApellido; 
    let libreria = usuario.usuario.libreria;
    let sucursales = libreria.sucursales;
    nombreComercial.innerHTML = libreria.nombreComercial;
    nombreFantasia.innerHTML = libreria.nombreFantasia;
    provincia.innerHTML = libreria.provincia;
    canton.innerHTML = libreria.canton;
    distrito.innerHTML = libreria.distrito;

    let haightAshbury = { lat: 9.9281, lng: -84.0907 };
    initMap(haightAshbury, 8);
    let message = '<h1 id="firstHeading" class="firstHeading">Librería ' + libreria.nombreFantasia + '</h1>' +
        '<div id="bodyContent">' +
        '<p>' + libreria.provincia + ", " + libreria.canton + ", " + libreria.distrito + '</p>' +
        '<p><a href="http://localhost:3000/perfilLibreria.html?id=' + libreria._id + '">' +
        'Ver perfil librería</a> ' +
        '</p> </div>';
    let position = {
        lat: Number(libreria.localizacionLatitud),
        lng: Number(libreria.localizacionLongitud)
    }
    addMarker(position, message);

    for (let i = 0; i < sucursales.length; i++) {
        let message = '<h1 id="firstHeading" class="firstHeading"> Sucursal ' + sucursales[i].sucursal.nombre + '</h1>' +
            '<div id="bodyContent">' +
            '<p>' + sucursales[i].sucursal.provincia + ", " + sucursales[i].sucursal.canton + ", " + sucursales[i].sucursal.distrito + '</p>' +
            '<p><a href="http://localhost:3000/perfilSucursal.html?id=' + sucursales[i].sucursal._id + '">' +
            'Ver perfil sucursal</a> ' +
            '</p> </div>';
        let position = {
            lat: Number(sucursales[i].sucursal.localizacionLatitud),
            lng: Number(sucursales[i].sucursal.localizacionLongitud)
        }
        addMarker(position, message);
    }
})();