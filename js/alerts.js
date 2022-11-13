let alertSuccess = document.getElementById("alert-success");
let alertError = document.getElementById("alert-danger");

function showAlertSuccess() {
    alertSuccess.classList.add("show");
    alertSuccess.style.zIndex = 100;
}

function hiddeAlertSuccess(){
    setTimeout( () => {alertSuccess.classList.remove("show");
    alertSuccess.style.zIndex = -100;}
    , 3000) 
}
 
function showAlertError() {
    alertError.classList.add("show");
    alertError.style.zIndex = 100;
}

function hiddeAlertError() {
    setTimeout( () => {alertError.classList.remove("show");
    alertError.style.zIndex = -100;}
    , 3000) 
}

