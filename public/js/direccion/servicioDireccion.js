let obtenerProvincias = async () => {
    let response = await fetch('https://ubicaciones.paginasweb.cr/provincias.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    let result = await response.json();
    return result;
}

let obtenerCantones = async (provincia) => {
    let response = await fetch('https://ubicaciones.paginasweb.cr/provincia/' + provincia + '/cantones.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    let result = await response.json();
    return result;
}

let obtenerDistritos = async (provincia, canton) => {
    let response = await fetch('https://ubicaciones.paginasweb.cr/provincia/' + provincia + '/canton/' + canton + '/distritos.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    let result = await response.json();
    return result;
}
