const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/carlosshmc/upload"
const CLOUDINARY_UPLOAD_PRESET = "qg4cujmb"
let profile_picture_url;


document.addEventListener("DOMContentLoaded", ()=>{

    if(!localStorage.getItem("user")){
        window.location = "./index.html"
    }else{
        var localUser = JSON.parse(localStorage.getItem("user"));
        document.getElementById("email").value = localUser.email;
        document.getElementById("name1").value = localUser.name1;
        document.getElementById("name2").value = localUser.name2;
        document.getElementById("lastname1").value = localUser.lastname1;
        document.getElementById("lastname2").value = localUser.lastname2;
        document.getElementById("phone").value =  localUser.phone;

        profile_picture_url = localUser.profilePic? localUser.profilePic : "./img/img_perfil.png";
        document.getElementById("profilePicture").src = profile_picture_url;
        


        document.getElementById("profileForm").addEventListener("submit", (event)=>{
            event.preventDefault();
            if(document.getElementById("profileForm").checkValidity()){
                showAlertSuccess();
                hiddeAlertSuccess();
                saveData();
            }else{
                document.getElementById('alert-text').innerText = "Complete la información requerida (*)";
                showAlertError();
                hiddeAlertError();
            }
        })

        document.getElementById("profilePictureInput").addEventListener('change', async (event) =>{
            const file = event.target.files[0]
        
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            try{
                const res = await axios.post(CLOUDINARY_URL, formData, {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                });
                document.getElementById("profilePicture").src = res.data.secure_url;
                profile_picture_url = res.data.secure_url;
                saveData();
            }catch{
                document.getElementById('alert-text').innerText = "Error de conexion";
                showAlertError();
                hiddeAlertError();
            }
        })
    }
})


function saveData(){
    var localUser = JSON.parse(localStorage.getItem("user"));
    localUser.name1 = document.getElementById("name1").value
    localUser.name2 = document.getElementById("name2").value
    localUser.lastname1 = document.getElementById("lastname1").value
    localUser.lastname2 = document.getElementById("lastname2").value
    localUser.phone = document.getElementById("phone").value
    localUser.profilePic = profile_picture_url;
    localStorage.setItem("user" , JSON.stringify(localUser));
}