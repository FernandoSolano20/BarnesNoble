var crearIntercambio = async (intercambio) => {
    var response = await fetch('http://localhost:4000/api/intercambio/registrarIntercambio', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(intercambio)
    });
    var result = await response.json();
    return result;
}

let solicitudesIntercambios = async (id) => {
    var response = await fetch('http://localhost:4000/api/intercambio/solicitudesIntercambios/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let borrarIntercambio = async (id) => {
    let response = await fetch('http://localhost:4000/api/intercambio/eliminar/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}

let aprobarSolcitudIntercambio = async (intercambio, id) => {
    let response = await fetch('http://localhost:4000/api/intercambio/aprobarSolcitud/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(intercambio)
    });
    let result = await response.json();
    return result;
}

let obtenerMisIntercambios = async (id) =>{
    var response = await fetch('http://localhost:4000/api/intercambio/obtenerMisIntercambios/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
}

let terminarIntercambio = async (intercambio, id) => {
    let response = await fetch('http://localhost:4000/api/intercambio/terminarIntercambio/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(intercambio)
    });
    let result = await response.json();
    return result;
}