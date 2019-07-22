// Listar Usuarios

let obtenerUsuarios = async() => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarUsuarios',
            responseType: 'json'
        });

        var result = await response.data.listaUsuarios;

        return result;

    } catch (error) {
        console.log(error);
    }
};

var crearUsuario = async (usuario) => {
    var response = await fetch('http://localhost:4000/api/registrarUsuario', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(usuario)
    });
    var result = await response.json();
    return result;
}

var cambiarPassword = async(usuario,id) => {
    var response = await fetch('http://localhost:4000/api/modificarPassword/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(usuario)
    });
    var result = await response.json();
    return result;
}
