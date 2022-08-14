function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}
 
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function hiddeAlertError() {
    setTimeout( () => document.getElementById("alert-danger").classList.remove("show"), 3000) 
}

function hiddeAlertSuccess(){
    setTimeout( () => document.getElementById("alert-success").classList.remove("show"), 3000) 
}
 
function validate(){
    let inputs = document.querySelectorAll(".form-control");
    let contrasena1 = document.getElementById("password1").value;
    let contrasena2 = document.getElementById("password2").value;
    let check = document.getElementById("terminos").checked;

    inputs.forEach(input => {
        if(input.value == ""){
            showAlertError();
            hiddeAlertError();
        }
    });
 
    if(contrasena1.length >= 6 && contrasena1 == contrasena2 && check){
        showAlertSuccess();
        hiddeAlertSuccess();                                            //simulacion de conexion con servidor
        setTimeout(()=>window.location.href = "./home.html", 3000);     //luego de espera redirecciona al home
    }else{
        showAlertError();
        hiddeAlertError();
    }

}

// function restore_alert_login(){
//     document.querySelector('.alert_login').remove();

//     let content = document.createElement('div');
//     content.classList.add('alert_login')
   
//     content.innerHTML= 
//     `<div class="alert alert-danger alert-dismissible fade" role="alert" id="alert-danger">
//         <p>Usuario y/o contraseña incorrectos</p>
//         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="restore()"></button>
//     </div>`
    
//     document.querySelector('main').append(content);
// }

