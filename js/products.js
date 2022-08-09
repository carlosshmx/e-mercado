
async function fetchdata(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}


async function showProductList(){

    const autos = await fetchdata("https://japceibal.github.io/emercado-api/cats_products/101.json");

    let htmlContentToAppend = "";
    for(auto of autos.products){

        htmlContentToAppend += `
            <div onclick="setAutoID(${auto.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${auto.image}" alt="${auto.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${auto.name} - ${auto.currency} ${auto.cost}</h4>
                            <small class="text-muted">${auto.soldCount} Vendidos</small>
                        </div>
                        <p class="mb-1">${auto.description}</p>
                    </div>
                </div>
            </div>
            `
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
    showProductList();
    }
)