

function changeQty(articleIndex, qtyID, priceID){
    let qtyImput = document.getElementById(qtyID)
    let price = document.getElementById(priceID);

    price.innerText = qtyImput.value * cart_info.articles[articleIndex].unitCost

}

function removeCartItem(id){
  for(let i=0; i<cart_info.articles.length; i++){
    if(cart_info.articles[i].id == id){
      console.log(id)
      cart_info.articles.slice(i,1);

      window.location = "cart.html"
      }
  }

}

function showCart(){
  let htmlContentToAppend = ""

    for(let i=0; i< cart_info.articles.length; i++){
      htmlContentToAppend += `
      <tr>
      <td class="align-middle"> <img src="${cart_info.articles[i].image}" alt="" style="width: 100px;"> </td>
      <td class="align-middle">${cart_info.articles[i].name}</td>
      <td class="align-middle">${cart_info.articles[i].currency} ${cart_info.articles[i].unitCost}</td>
      <td class="align-middle"><input type="number" id="qtyID${i}" class="form-control" value="${cart_info.articles[i].count}" onchange="changeQty(${i}, 'qtyID${i}', 'price${i}')"  style="width: 100px">
      </td>
      <td class="align-middle"> <b class="d-flex">${cart_info.articles[i].currency} <p id="price${i}" class="ms-2">${cart_info.articles[i].unitCost}</p></b>  </td>
      <td class="align-middle cursor-active" onclick="removeCartItem(${cart_info.articles[i].id})"><i class="fa-solid fa-trash text-secondary"></i></a></td>
    </tr>
      `

  }
  document.getElementById("cart_sumary").innerHTML= htmlContentToAppend;

}





