const ORDER_ASC_BY_PRICE = "+$";
const ORDER_DESC_BY_PRICE = "-$";
const ORDER_BY_REL = "Rel";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost< b.cost){ return -1; }
            if ( a.cost > b.cost){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

// funcion que crea el contenedor de cada uno de los productos de la categoria seleccionada
async function showProductList(){
        document.getElementById("p-category-description").innerText = `Aqui veras todos los articulos de la categoria: ${localStorage.getItem("catName")}`

        let htmlContentToAppend = "";
        for(product of currentProductsArray){

            if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
                ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){
        
                htmlContentToAppend += `
                    <div onclick=setProdID(${product.id}) class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                                    <small class="text-muted">${product.soldCount} Vendidos</small>
                                </div>
                                <p class="mb-1">${product.description}</p>
                            </div>
                        </div>
                    </div>
                    `
            }

            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            showProductList()

        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio de productos
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductList();
    });


});