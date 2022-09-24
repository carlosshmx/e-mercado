function validate(){

    let inputcontainers = document.querySelectorAll(".input-container");
    let allwrote = true;

    for(inputcont of inputcontainers){
      let input = inputcont.querySelector(".form-control")
        if (input.value == '') {
            inputcont.querySelector("p").style.visibility = "visible";
            input.style.border = "solid red 3px";
            allwrote = false;
            showAlertError();
            hiddeAlertError();
        }
        else {
            inputcont.querySelector("p").style.visibility = "hidden";
            input.style.border = "";
            
        }
    }

    if(allwrote){
        let inputs = document.querySelectorAll(".form-control");
        let contrasena1 = document.getElementById("password1").value;
        let contrasena2 = document.getElementById("password2").value;
        let check = document.getElementById("terminos").checked;
    
        if(contrasena1.length >= 6 && contrasena1 == contrasena2 && check){
            showAlertSuccess();
            showSpinner();
            
            hiddeAlertSuccess();                                            //simulacion de conexion con servidor
            setTimeout(()=>window.location.href = "./home.html", 3000);     //luego de espera redirecciona al home
        }else{
            showAlertError();
            hiddeAlertError();
        }
    }
}

