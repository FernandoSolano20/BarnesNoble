let loginUsuario = async (usuario) => {
    let response = await fetch('http://localhost:4000/api/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(usuario)
    });
    let result = await response.json();
    return result;
}

let forgetPass = async (usuario) => {
    let response = await fetch('http://localhost:4000/api/olvidarPass/'+ usuario.correo, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}