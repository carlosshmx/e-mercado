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