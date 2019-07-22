let locacion = function (){
    if (sessionStorage.tipoUsuario === 'Adminitrador plataforma' && !Number(sessionStorage.cambiarPass)) {
        window.location.href = "http://localhost:3000/indexPlataforma.html";
    }
    else if(sessionStorage.tipoUsuario === 'Adminitrador librería' && !Number(sessionStorage.cambiarPass)){
        window.location.href = "http://localhost:3000/indexAdminLibreria.html";
    }
    else if(sessionStorage.tipoUsuario === 'Lector' && !Number(sessionStorage.cambiarPass)){
        window.location.href = "http://localhost:3000/indexLector.html";
    }
}
locacion();