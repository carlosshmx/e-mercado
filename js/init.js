let catID = localStorage.getItem("catID");
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
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

/////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", function(){
  document.querySelector(".lower-bar li:nth-child(4)").innerHTML = `<a class="nav-link active" href="my-profile.html" id="toProfile">${localStorage.getItem("username")}</a>`
  searchInput = document.getElementById("searchInput");

  
  searchInput.addEventListener('keyup', (event) => {
    document.getElementById("suggests").classList.remove("d-none")
    let suggests = document.getElementById("suggests")
    suggests.innerHTML = ``;
    let content = ``

    if(searchInput.value){
      allProductList.find((product)=>{
        if((product.name.toLowerCase()).includes(searchInput.value.toLowerCase())){
          content += `<div class="card-body d-flex align-items-center gap-2">
                        <img src="${product.image}" style="width: 100px;" alt="">
                        <h5 class="card-title">${product.name}</h5>
                      </div>`;
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






