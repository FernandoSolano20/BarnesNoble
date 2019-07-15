var logoutUsuario = function(){
    sessionStorage.clear();
    window.location.href = "http://localhost:3000";
}

document.getElementById('logout').addEventListener('click', logoutUsuario);

