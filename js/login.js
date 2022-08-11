document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector("form").addEventListener("submit", (checkdata) =>{
    checkdata.preventDefault();
    let inputcontainers = document.querySelectorAll(".input-container");
    let allwhite = true;

    for(inputcont of inputcontainers){
      let input = inputcont.querySelector(".form-control")
        if (input.value == '') {
            inputcont.querySelector("p").style.visibility = "visible";
            input.style.border = "solid red 3px";
            allwhite = false;
        }
        else {
            inputcont.querySelector("p").style.visibility = "hidden";
            input.style.border = "";
        }
    }
    if(allwhite){
      window.location.replace("./home.html");
    }
  });
  
})

function passwordShow(){
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}