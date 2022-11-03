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

//Codigo de validacion Bootstrap
// Example starter JavaScript for disabling form submissions if there are invalid fields
var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("register").addEventListener("submit", (event)=>{
       event.preventDefault()

        let password1 = document.getElementById("password1").value
        let password2 = document.getElementById("password2").value

        if(document.getElementById("register").checkValidity() && password1 == password2){
            console.log("listo")
            let user = {
                email: document.getElementById("email").value,
                name1: "",
                name2: "",
                lastname1: "",
                lastname2: "",
                phone: "",
                profilePic: ""
            }
            localStorage.setItem("user", JSON.stringify(user));
        }
        window.location = "./home.html"
        
    })


})