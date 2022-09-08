let commemts = [];
let product_info = {};
let med_score;

function buildStarScore(score){
  let stars = ``;
  for (let i = 1; i <= score; i++) {
    stars += `<span class="fa fa-star checked"></span>`;
  }
  for (let i = 1; i <= 5 - score; i++) {
    stars += `<span class="fa fa-star"></span>`;
  }
  return stars;
}

function showComments() {
  let htmlContentToAppend = "";
  let scoreSum = 0;

  commemts.forEach((elem) => {
    htmlContentToAppend += `
          <div class="list-group-item">
            <div class="d-flex">
              <p><b>${elem.user}</b></p>
              <p class="mx-1">-</p>
              <p>${elem.dateTime}</p>
              <p class="mx-1">-</p>
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
  med_score = Math.round(scoreSum/commemts.length);

}

function showProduct(){
  document.querySelector(".product_info").innerHTML = `
        <div class="mt-4 container">
            <div class="row">
                <div id="carouselExampleControls" class="col-sm-12 col-lg-8 carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner bgslider" style="z-index: -1;">
                        <div class="carousel-item active">
                        <img src="${product_info.data.images[0]}" class="d-block img-fluid" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${product_info.data.images[1]}" class="d-block img-fluid" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${product_info.data.images[2]}" class="d-block img-fluid" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${product_info.data.images[3]}" class="d-block img-fluid" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" >
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <div class="border col-sm-12 col-lg-4 d-flex flex-column">
                    <p class="mb-0 mt-2">Vendidos: ${product_info.data.soldCount}</p>
                    <h4 class="pt-2">${product_info.data.name}</h4>
                    <div class="d-flex">
                      ${buildStarScore(med_score)}
                      <a href="#comments" class="ms-2 text-decoration-none">${commemts.length} Calificaciones</a>
                    </div>
                    <h2 class="p-2">${product_info.data.currency} $${product_info.data.cost}</h2>
                    <p class="p-2">${product_info.data.description}</p>
                    <p class="p-2" style="color: green;"><i class="fa-solid fa-truck"></i> Envios gratis a todo el pais</p>
                    
                    <button type="button" class="mt-auto mb-4 p-2 btn btn-primary fw-bold">Agregar al carrito</button>
                </div>
            </div>
        </div>
          
          `;

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
        }
      });
    }
  });

  

  document.getElementById("send_opinion").addEventListener("click", (event) => {
    event.preventDefault();
    let new_score = document.getElementById("new_score");
    let new_description = document.getElementById("new_description");

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

    let new_opinion = {
      product: parseInt(prodID),
      score: parseInt(new_score.value),
      description: new_description.value,
      user: username,
      dateTime: dateString,
    };

    commemts.push(new_opinion);
    new_description.value = ""
    showComments();
    showProduct();
  });
});
