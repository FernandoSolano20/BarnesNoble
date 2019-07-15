
if (!sessionStorage.tipoUsuario) {
    window.location.href = "http://localhost:3000";
}
else if (sessionStorage.tipoUsuario !== 'Adminitrador plataforma') {
    if (sessionStorage.tipoUsuario === 'Lector') {
        window.location.href = "http://localhost:3000/indexLector.html";
    }
    else if (sessionStorage.tipoUsuario === 'Adminitrador librería') {
        window.location.href = "http://localhost:3000/indexAdminLibreria.html";
    }
}
