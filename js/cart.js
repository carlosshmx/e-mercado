let cart_data = []

function changeQty(articleIndex, productID, priceID){
    let qtyImput = document.getElementById(productID)
    let price = document.getElementById(priceID);

    price.innerText = qtyImput.value * articles.data.articles[articleIndex].unitCost

}

document.addEventListener("DOMContentLoaded", async()=>{

    localStorage.setItem("userID", 25801)

    articles = await getJSONData(CART_INFO_URL);

    console.log(articles.data.articles[0])

    let htmlContentToAppend = ""

    for(article of articles.data.articles){
        htmlContentToAppend += `
        <tr>
        <td class="align-middle"> <img src="${article.image}" alt="" style="width: 150px;"> </td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle">  
          <div class="input-group">
            <input type="number" id="product1" class="form-control" value="1" onchange="changeQty(0, 'product1', 'price1')" style="width: 50%;">
            </div>
        </td>
        <td class="align-middle"> ${article.currency} <p id="price1">${article.unitCost}</p> </td>
      </tr>
        `

    }
    document.getElementById("cart_sumary").innerHTML= htmlContentToAppend;



})