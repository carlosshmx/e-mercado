document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector("form").addEventListener("submit", (event) =>{
    event.preventDefault();

    let userEmail = document.getElementById("userEmail").value
    let userEmailLocal = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).email : " ";

    if(document.getElementById("login").checkValidity()){
      if(userEmail == userEmailLocal){
        window.location = "./home.html"
      }else{
        showAlertError();
        hiddeAlertError();
      }
      
    }else{
      showAlertError();
      hiddeAlertError();
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





// gapi.load('auth2', function(){
//   var auth2 = gapi.auth2.init();
// });

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }