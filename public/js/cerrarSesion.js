let logoutUsuario = function(){
    sessionStorage.clear();
    window.location.href = "http://localhost:3000";
}
let btnLogout = document.getElementById('logout');
if(btnLogout)
    btnLogout.addEventListener('click', logoutUsuario);