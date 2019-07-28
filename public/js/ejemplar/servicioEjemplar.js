let crearEjemplar = async (ejemplar) => {
    var response = await fetch('http://localhost:4000/api/ejemplar/registrarEjemplar', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(ejemplar)
    });
    var result = await response.json();
    return result;
};