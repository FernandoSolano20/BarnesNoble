var locacion = function (){
    if (sessionStorage.tipoUsuario === 'Adminitrador plataforma') {
        window.location.href = "http://localhost:3000/indexPlataforma.html";
    }
    else if(sessionStorage.tipoUsuario === 'Adminitrador librería'){
        window.location.href = "http://localhost:3000/indexAdminLibreria.html";
    }
    else if(sessionStorage.tipoUsuario === 'Lector'){
        window.location.href = "http://localhost:3000/indexLector.html";
    }
}
locacion();