const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var validarUsuario = function (usuario) {
    var error = false;

    if (usuario.correo === '' || !regexEmail.test(usuario.correo)) {
        error = true;
        emailInput.className = emailInput.className.replace("error", "");
        emailInput.className = emailInput.className + " error";
    }
    else {
        emailInput.className = emailInput.className.replace("error", "");
    }

    if (usuario.password === '') {
        error = true;
        passwordInput.className = passwordInput.className.replace("error", "");
        passwordInput.className = passwordInput.className + " error";
    }
    else {
        passwordInput.className = passwordInput.className.replace("error", "");
    }
    return error;
}

var obtenerCredenciales = async (event) => {
    var usuario = {
        correo: emailInput.value,
        pass: passwordInput.value
    }

    if (!validarUsuario(usuario)) {
        var response = await loginUsuario(usuario);
        if (response.success) {
            sessionStorage.setItem('conectado', response.success);
            sessionStorage.setItem('tipoUsuario', response.usuario.tipoUsuario);
            sessionStorage.setItem('cambiarPass', Number(response.usuario.cambiarPass));
            sessionStorage.setItem('id', response.usuario._id);
            if(Number(sessionStorage.cambiarPass)){
                window.location.href = "http://localhost:3000/cambiarPassword.html";
            }
            else
                locacion();
        }
        else {
            Swal.fire({
                type: 'error',
                title: "El usuario o la contraseña no coinciden"
            });
        }
    }
    else {
        Swal.fire({
            type: 'warning',
            title: 'No se puede enviar los credenciales',
            text: 'Revise los campos resaltados e intételo de nuevo'
        });
    }
};

var olvidePass = async function(){
    const {value: email} = await Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputPlaceholder: 'Enter your email address'
      })
      
      if (email) {
        Swal.fire('Entered email: ' + email)
      }
}

document.getElementById('login').addEventListener('click', obtenerCredenciales);
document.getElementById('olvidar').addEventListener('click', olvidePass);