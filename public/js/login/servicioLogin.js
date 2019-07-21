var loginUsuario = async (usuario) => {
    var response = await fetch('http://localhost:4000/api/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(usuario)
    });
    var result = await response.json();
    return result;
}

var forgetPass = async (usuario) => {
    var response = await fetch('http://localhost:4000/api/olvidarPass/'+ usuario.correo, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
}