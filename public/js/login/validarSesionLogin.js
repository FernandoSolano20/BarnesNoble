var locacion = function (){
    if (sessionStorage.tipoUsuario === 'Adminitrador plataforma') {
        //window.location.replace("http://localhost:3000/indexPlataforma.html");
        window.location.href = "http://localhost:3000/indexPlataforma.html";
    }
    else if(sessionStorage.tipoUsuario === 'Adminitrador librería'){
        window.location.href = "http://localhost:3000/AdminLibreria.html";
    }
    else if(sessionStorage.tipoUsuario === 'Lector'){
        window.location.href = "http://localhost:3000/indexLector.html";
    }
}
locacion();