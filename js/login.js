document.getElementById("login-button").addEventListener("click", showInputsErrors);

function showInputsErrors() {
		var inputs = document.querySelectorAll(".form-control");
        console.log(inputs)
        for(input of inputs){
            if (input.value == '') {
                input.style.border = "solid red 3px";
            }
            else {
                input.style.border = "";
            }
        }
    
}

function passwordShow(){
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }