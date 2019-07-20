var obtenerProvincias = async () => {
    var response = await fetch('https://ubicaciones.paginasweb.cr/provincias.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    var result = await response.json();
    return result;
}

var obtenerCantones = async (provincia) => {
    var response = await fetch('https://ubicaciones.paginasweb.cr/provincia/' + provincia + '/cantones.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    var result = await response.json();
    return result;
}

var obtenerDistritos = async (provincia, canton) => {
    var response = await fetch('https://ubicaciones.paginasweb.cr/provincia/' + provincia + '/canton/' + canton + '/distritos.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    var result = await response.json();
    return result;
}
