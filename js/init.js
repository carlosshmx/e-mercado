let catID = localStorage.getItem("catID");
let prodID = localStorage.getItem("prodID");
let username = localStorage.getItem("username");
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  try{
    document.getElementById("spinner-wrapper").style.display = "block";
  }catch{

  }
  
}

let hideSpinner = function(){
  try{
    document.getElementById("spinner-wrapper").style.display = "none";
  }catch{

  }
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
           
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


// Obtenemos la lista de productos por categoria

let categoriesIdArray = [];
let allProductList = [];
let searchInput;

getJSONData(CATEGORIES_URL)
    .then(function(resultObj){
      if (resultObj.status === "ok"){
        categoriesIdArray = resultObj.data.map((category) => {
            return category.id;
          });
      }
    })
    .then(()=>{
      categoriesIdArray.forEach((categoryId)=>{
      getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`)
        .then(function(resultObj){
          if (resultObj.status === "ok"){
            resultObj.data.products.map((product) =>{
              allProductList.push(product);
            })
          }
        })
      })
});

////////////////////////////////////

// funcion que establece el id del articulo seleccionado
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}


/////////////////////////////////

function signOut(){
  localStorage.removeItem("username");
  window.location = "index.html"
}


//Dropdown de opciones de usuario
document.addEventListener("DOMContentLoaded", function(){
  document.querySelector(".lower-bar li:nth-child(4)").innerHTML = 

  `<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle active" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${username}
      </a>
      <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
        <li><a class="dropdown-item" href="./cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="./my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item" onclick=signOut()>Cerrar sesión</a></li>
      </ul>
    </li>
  </ul>
</div>`


  
  searchInput = document.getElementById("searchInput");
  searchInput.addEventListener('keyup', (event) => {
    document.getElementById("suggests").classList.remove("d-none")
    let suggests = document.getElementById("suggests")
    suggests.innerHTML = ``;
    let content = ``

    if(searchInput.value){
      allProductList.find((product)=>{
        if((product.name.toLowerCase()).includes(searchInput.value.toLowerCase())){
          content += `<a class="card-body d-flex align-items-center text-body border" href="product-info.html"      onclick=setProdID(${product.id}) style="z-index: 10;">
                        <img class="p-2" src="${product.image}" style="width: 100px;" alt="">
                        <h5 class="p-2 card-title">${product.name}</h5>
                        <p class="ms-auto p-2">${product.currency} $${product.cost} </p>
                      </a>`;
        }
      })
      if(content == ``){
        content += `<div class="card-body d-flex align-items-center gap-2">
                        <h5 class="card-title">Sin resultados</h5>
                      </div>`;
      }
    }else{
      document.getElementById("suggests").classList.add("d-none")
    }
    
    suggests.innerHTML += content
  })


  document.querySelector("main").addEventListener("click", (event)=>{
    document.getElementById("suggests").innerHTML = ``
    document.getElementById("suggests").classList.add("d-none")
  })
  

});






