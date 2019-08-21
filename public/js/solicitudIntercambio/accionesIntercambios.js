let tbodyLib = document.querySelector('#tbl_librerias tbody');

let borrar = function (event) {
    let element = event.target;
    if (element.getAttribute("data-action") == "rechazar") {
        parent = element.parentElement.parentElement;
        idElemento = parent.getAttribute("data-id");
        Swal.fire({
            title: 'Eliminar',
            text: "¿Está seguro que quiere rechazar este intercambio?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Rechazar'
        }).then(async (result) => {
            if (result.value) {
                let response = await borrarIntercambio(idElemento);
                if (response.success) {
                    parent.remove();
                    Swal.fire(
                        'Eliminado',
                        response.message,
                        'success'
                    ).then((result) => {
                        window.location.href = "solicitudIntercambios.html";
                    })
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: response.message,
                        text: 'Algo salió mal!'
                    })
                }

            }
        })
    }
}

let estado = function (event) {
    let element = event.target;
    if (element.getAttribute("data-action") == "aprobar") {
        parent = element.parentElement.parentElement;
        idElemento = parent.getAttribute("data-id");
        Swal.fire({
            title: 'Aprovar',
            text: "¿Está seguro que quiere aprobar este intercambio?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aprobar'
        }).then(async (result) => {
            if (result.value) {
                let selectSucursal = await crearSectionSucursalModal();
                Swal.fire({
                    title: 'Datos del intercambio',
                    html: `<form class="formRegistro modalForm" name="formulario_registro">
                    <div class="column columnModal">
                        <div class="inputGroup">
                            <span class="left alertHidden" id="alert-dateInicio">Debe ser menor al día de hoy.</span>
                            <label class="label" for="fechaInicio-input">Fecha de inicio:</label>
                            <input type="date" id="fechaInicio-input" name="fecha inicio">
                        </div>
                        <div class="inputGroup">
                            <span class="left alertHidden" id="alert-dateFin">Debe ser menor al día de hoy.</span>
                            <label class="label" for="fechaFin-input">Fecha fin:</label>
                            <input type="date" id="fechaFin-input" name="fecha fin">
                        </div>
                        <div class="inputGroup box">
                            <span class="left alertHidden" id="alert-sucursal">Seleccione una opción.</span>
                            ${selectSucursal}
                        </div>
                    </div>
                    </form>
                        `
                }).then(async () => {
                    let fechaInicioInput = document.getElementById('fechaInicio-input');
                    let fechaInicioAlert = document.getElementById('alert-dateInicio');

                    let fechaObj = {
                        input: fechaInicioAlert,
                        value: fechaInicioInput.value,
                        alert: fechaInicioAlert
                    }
                    let err1 = !(validarFecha(fechaObj) && validarFechaMenorActualFech(fechaObj));

                    let fechaFinInput = document.getElementById('fechaFin-input');
                    let fechaFinAlert = document.getElementById('alert-dateFin');
                    let fechaObjFin = {
                        input: fechaFinInput,
                        value: fechaFinInput.value,
                        alert: fechaFinAlert
                    }
                    let err2 = !(validarFecha(fechaObjFin) && validarFechaMenorActualFech(fechaObjFin) && validarFechaFin(fechaObj, fechaObjFin));

                    let sucursalInput = document.getElementById('selectSucursalModal');
                    let sucursalAlert = document.getElementById('alert-sucursal');
                    let selectObj = {
                        input: sucursalInput,
                        value: sucursalInput.value,
                        alert: sucursalAlert
                    }
                    let err3 = !(validarSelect(selectObj))
                    if (!(err1 || err2 || err3)) {
                        let intercambio = {
                            aprobado: true,
                            fechaInicio: new Date(fechaInicioInput.value),
                            fechaFin: new Date(fechaFinInput.value),
                            sucursal: sucursalInput.value
                        }
                        let response = await aprobarSolcitudIntercambio(intercambio, idElemento);
                        if (response.success) {
                            parent.remove();
                            Swal.fire(
                                'Activado!',
                                'El intercambio se aprobó con éxito',
                                'success'
                            ).then((result) => {
                                window.location.href = "solicitudIntercambios.html";
                            })
                        }
                        else {
                            Swal.fire(
                                'Ocurrio un error',
                                'El intercambio se no se pudo aprobar con éxito',
                                'error'
                            )
                        }
                    }
                    else {
                        Swal.fire(
                            'Ocurrio un error',
                            'Rellene correctamente los campos',
                            'warning'
                        )
                    }
                })
            }
        })
    }
}

let validarFechaFin = function (inicio, fin) {
    let fechaInicio = new Date(inicio.value);
    fechaInicio = new Date(fechaInicio.getUTCFullYear() + "-" + (fechaInicio.getUTCMonth() + 1) + "-" + fechaInicio.getUTCDate());
    let fechaFin = new Date(fin.value);
    fechaFin = new Date(fechaFin.getUTCFullYear() + "-" + (fechaFin.getUTCMonth() + 1) + "-" + fechaFin.getUTCDate());

    if (fechaInicio > fechaFin) {
        fin.alert.innerText = "La fecha de fin debe ser menor a la de inico."
        fin.alert.className = fin.alert.className.replace("alertHidden", "");
        fin.input.className = fin.input.className.replace("inputError", "");
        fin.input.className = fin.input.className + " inputError";
        return false;
    }
    else {
        fin.alert.className = fin.alert.className.replace("alertHidden", "");
        fin.alert.className = fin.alert.className + " alertHidden";
        fin.input.className = fin.input.className.replace("inputError", "");
        return true;
    }
}

tbodyLib.addEventListener("click", borrar);
tbodyLib.addEventListener("click", estado); 