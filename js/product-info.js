document.addEventListener("DOMContentLoaded", function () {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      document.querySelector("main").innerHTML = `
        <div class="mt-4 container">
            <div class="row">
                <div id="carouselExampleControls" class="col-sm-12 col-lg-8 carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner bgslider" style="z-index: -1;">
                        <div class="carousel-item active">
                        <img src="${resultObj.data.images[0]}" class="d-block img-fluid" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${resultObj.data.images[1]}" class="d-block img-fluid" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${resultObj.data.images[2]}" class="d-block img-fluid" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${resultObj.data.images[3]}" class="d-block img-fluid" alt="...">
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
                    <p class="mb-0 mt-2">Vendidos: ${resultObj.data.soldCount}</p>
                    <h4 class="p-2">${resultObj.data.name}</h4>
                    <h2 class="p-2">${resultObj.data.currency} $${resultObj.data.cost}</h2>
                    <p class="p-2">${resultObj.data.description}</p>
                    <p class="p-2" style="color: green;"><i class="fa-solid fa-truck"></i> Envios gratis a todo el pais</p>
                    
                    <button type="button" class="mt-auto mb-4 p-2 btn btn-primary fw-bold">Agregar al carrito</button>
                </div>
            </div>
        </div>
          
          
       
          
          `;
    }
  });
});
