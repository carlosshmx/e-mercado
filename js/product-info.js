let commemts = [];
let product_info = {};
let med_score;
let opinion_Score = 0;

// construye la calificacion de estrellas en base al score iungresado
function buildStarScore(score) {
  let stars = ``;
  for (let i = 1; i <= score; i++) {
    stars += `<span class="fa fa-star checked"></span>`;
  }
  for (let i = 1; i <= 5 - score; i++) {
    stars += `<span class="fa fa-star"></span>`;
  }
  return stars;
}

// construye el contenedor del comentario que se alimenta de la informacion contenida en el array "comments"
function showComments() {
  let htmlContentToAppend = "";
  let scoreSum = 0;

  commemts.forEach((elem) => {
    htmlContentToAppend += `
          <div class="list-group-item">
            <div class="d-flex justify-content-between flex-column flex-md-row ">
              <div class="d-flex">
                <p><b>${elem.user}</b></p>
                <p class="mx-1">-</p>
                <p class="fw-lighter">${elem.dateTime}</p>
              </div>
              <div>
                ${buildStarScore(elem.score)}
              </div>
            </div>
            <div class="">
              <p class="">${elem.description}</p>
            </div>
          </div>
    `;
    scoreSum += elem.score
  }
  );

  document.querySelector(".comments").innerHTML = htmlContentToAppend;

  // crea un promedio de las calificaciones de los comentarios creados
  med_score = Math.round(scoreSum / commemts.length);

}

// crea el contenedor de los articulos relacionados al actual, se alimenta del objeto "product_info.data.relatedProducts" del JSON
function showRelatedProducts() {
  let htmlContentToAppend = "";

  product_info.data.relatedProducts.forEach((elem) => {
    htmlContentToAppend += `
      <div class="d-flex flex-column align-items-center list-group-item list-group-item-action cursor-active mb-0" onclick=setProdID(${elem.id})>
        <img src="${elem.image}" class="img-fluid" alt="">
        <p class="fs-4 mt-2 mb-0">${elem.name}</p>
      </div>
    `
  })
  document.querySelector(".related_products").innerHTML = htmlContentToAppend;

}

function showProduct() {
  document.querySelector(".product_info").innerHTML = `

  <div class="mt-4 row mx-auto">
    <div class="col-12 row mx-auto">

        <div id="carouselExampleDark" class="col-sm-12 col-lg-8 carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="5000">
            <img src="${product_info.data.images[0]}" class="d-block w-100" alt="...">
          </div>

          <div class="carousel-item" data-bs-interval="5000">
            <img src="${product_info.data.images[1]}" class="d-block w-100" alt="...">
          </div>

          <div class="carousel-item" data-bs-interval="5000">
            <img src="${product_info.data.images[2]}" class="d-block w-100" alt="...">
          </div>

          <div class="carousel-item" data-bs-interval="5000">
            <img src="${product_info.data.images[3]}" class="d-block w-100" alt="...">
          </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class=" col-sm-12 col-lg-4 d-flex flex-column border">
        <p class="mb-0 mt-2">Vendidos: ${product_info.data.soldCount}</p>
        <h4 class="pt-2">${product_info.data.name}</h4>
      <div class="d-flex">
        ${buildStarScore(med_score)}
        <a href="#comments" class="ms-2 text-decoration-none">${commemts.length} Calificaciones</a>
      </div>
        <h2 class="p-2">${product_info.data.currency} $${product_info.data.cost}</h2>
        <p class="p-2">${product_info.data.description}</p>
        <p class="p-2" style="color: green;"><i class="fa-solid fa-truck"></i> Envios gratis a todo el pais</p>

        <button type="button" class="mt-auto mb-4 p-2 btn btn-primary fw-bold" onclick=addToCart()>Agregar al carrito</button>
      </div>
  </div>
</div>`;

}

function checkCart(product_id){  //Recibe el id de un articulo, si exite en el carrito retorna la posicion en el array, sino retorna -1
  
  var cartContent = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [];
  var pos = cartContent.findIndex(i => i.id === product_id)
  return pos
}

function addToCart(){  //Verifica si el articulo que se esta visualizando ya esta en el carrito, si es asi, suma 1 al count del articulo existente, sino agrega al carrito el articulo que se esta visualizando

  var cartContent = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [];

  if(checkCart(product_info.data.id) >= 0){
    cartContent[checkCart(product_info.data.id)].count += 1;
  }else{
    var infoToCart = {
      id: product_info.data.id,
      name: product_info.data.name,
      count: 1,
       unitCost: product_info.data.cost,
       currency: product_info.data.currency,
      image: product_info.data.images[0]
    }

    cartContent.push(infoToCart)
  }
  localStorage.setItem("cart", JSON.stringify(cartContent));
  window.location = "cart.html"
}



document.addEventListener("DOMContentLoaded", function () {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commemts = resultObj.data;
      showComments();
      getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          product_info = resultObj;
          showProduct();
          showRelatedProducts();
        }
      });
    }
  });

  // Bucle que define el estilo y funcionalidad de las estrellas de una nueva opinion

  let opinion_star = document.querySelectorAll(".opinion_star")

  for (let i = 0; i < 5; i++) {
    opinion_star[i].addEventListener("click", () => {
      opinion_Score = i + 1;
      for (j = 0; j <= i; j++) {
        opinion_star[j].classList.add("checked")
      }
      for (k = j; k < 5; k++) {
        opinion_star[k].classList.remove("checked")
      }
    })
  }


  document.getElementById("send_opinion").addEventListener("click", (event) => {
    event.preventDefault();

    // si el usuario seleciono un "score" (cantidad de estrellas), seguimos recolectamos la informacion para agregar el comnetario
    if (opinion_Score != 0) {
      let new_description = document.getElementById("new_description");

      // crea el nuevo dateTime con el formato que tienen los de los comentarios del JSON
      var dateTime = new Date();
      var dateString =
        dateTime.getUTCFullYear() +
        "-" +
        ("0" + (dateTime.getUTCMonth() + 1)).slice(-2) +
        "-" +
        ("0" + dateTime.getUTCDate()).slice(-2) +
        " " +
        ("0" + dateTime.getUTCHours()).slice(-2) +
        ":" +
        ("0" + dateTime.getUTCMinutes()).slice(-2) +
        ":" +
        ("0" + dateTime.getUTCSeconds()).slice(-2);

      // crea el objeto con la informacion ingresada por el usuario
      let new_opinion = {
        product: parseInt(prodID),
        score: parseInt(opinion_Score),
        description: new_description.value,
        user: username,
        dateTime: dateString,
      };

      // agrega el objeto del nuevo comentario al array de comentarios actuales y vacia el text area del nuevo comentario
      commemts.push(new_opinion);
      new_description.value = "";

      // oculta el mensaje de error de calificacion no seleccionada si est?? visible
      document.querySelector(".opinion_error").classList.add("invisible")

      // resetea las entrellas a vacias y reinicia el contador de score a 0
      for (k = 0; k < 5; k++) {
        opinion_star[k].classList.remove("checked")
      }
      opinion_Score = 0;

      showComments();
      showProduct();

    } else {
      // si el usuario seleciono un "score" (cantidad de estrellas), hacemos visible el error "Seleccione su calificaci??n"
      document.querySelector(".opinion_error").classList.remove("invisible")

    }


  });
});
