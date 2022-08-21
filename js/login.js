document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector("form").addEventListener("submit", (checkdata) =>{
    checkdata.preventDefault();

    let inputcontainers = document.querySelectorAll(".input-container");
    let allwrote = true;
    let alert_msj = document.getElementById("alert-danger");

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
      window.location.href = "./home.html";
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

gapi.load('auth2', function(){
  gapi.auth2.init();
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}