var passInput1 = document.getElementById('password');
var passAlert1 = document.getElementById('alert-pass');

var passInput2 = document.getElementById('password2');

var cambiarPass = async function () {
    var error = !validarPass();
    if (!error) {

        document.body.className = "loading";

        var usuario = {
            pass: passInput1.value
        }
        var usuarioModificado = await cambiarPassword(usuario,sessionStorage.id);
        document.body.className = "";
        if (usuarioModificado.success) {
            sessionStorage.cambiarPass = false;
            locacion();
        }
        else {
            Swal.fire({
                type: 'error',
                title: nuevoUsuario.message
            });
        }
    }
    else {
        Swal.fire({
            type: 'warning',
            title: 'La contraseña no se pudo cambiar',
            text: 'Revise los campos resaltados e intételo de nuevo'
        });
    }
}

passInput2.addEventListener('blur', validarPass);
document.getElementById('cambiar-pass').addEventListener('click', cambiarPass)