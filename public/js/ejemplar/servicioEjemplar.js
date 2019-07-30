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

let obtenerEjemplaresPorIdLibro = async (id) => {
    var response = await fetch('http://localhost:4000/api/ejemplar/listarEjemplarIdLibro/'+id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};