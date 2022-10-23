let dollarValue = 41;
let subTotalPesos = 0;
let subTotalUsd = 0;
let total = 0;
let deliveryFee = 0;

function resetTotals(){
    subTotalPesos = 0;
    subTotalUsd = 0;
    total = 0;
    deliveryFee = 0;
}

function updateCartTotal(){

  resetTotals()

  let cartContent = JSON.parse(localStorage.getItem("cart"));

  for(let i=0; i< cartContent.length; i++){
    if(cartContent[i].currency == "UYU"){
      subTotalPesos += cartContent[i].unitCost * cartContent[i].count
    }
    else{
      subTotalUsd += cartContent[i].unitCost * cartContent[i].count
    }
  }
  subTotalUsd += subTotalPesos/dollarValue;

  localStorage.setItem("cart", JSON.stringify(cartContent))

  document.getElementById("subTotal-Cart").innerText = `USD ${Math.round(subTotalUsd)}`

  let deliverySelector = document.getElementsByName('deliverySelection');

  for(i = 0; i < deliverySelector.length; i++) {
    if(deliverySelector[i].checked){
      deliveryFee = Math.round(subTotalUsd * deliverySelector[i].value);
      total = Math.round(subTotalUsd + deliveryFee);
      document.getElementById("deliveryFee-Cart").innerText = `USD ${deliveryFee}`
      document.getElementById("total-Cart").innerText = `USD ${total}`
    }  
  }
}

function changeQty(id, qtyID, subtotalID){
  let qtyImput = document.getElementById(qtyID)
  let subTotal = document.getElementById(subtotalID);

  let cartContent = JSON.parse(localStorage.getItem("cart"));

    cartContent.forEach(article => {
      if(article.id == id){
        article.count = qtyImput.value
        subTotal.innerText = qtyImput.value * article.unitCost
      }
    });

    localStorage.setItem("cart", JSON.stringify(cartContent))
    
    resetTotals()

    updateCartTotal()

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

  let cartContent = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [];

  let htmlContentToAppend = ""

    for(let i=0; i< cartContent.length; i++){
      htmlContentToAppend += `
      <tr>
      <td class="align-middle"> <img src="${cartContent[i].image}" alt="" style="width: 100px;"> </td>
      <td class="align-middle">${cartContent[i].name}</td>
      <td class="align-middle">${cartContent[i].currency} ${cartContent[i].unitCost}</td>
      <td class="align-middle"><input type="number" id="qtyID${cartContent[i].id}" class="form-control" value="${cartContent[i].count}" onchange="changeQty(${cartContent[i].id}, 'qtyID${cartContent[i].id}', 'subtotalID${cartContent[i].id}')"  style="width: 100px">
      </td>
      <td class="align-middle"> <b class="d-flex">${cartContent[i].currency} <p id="subtotalID${cartContent[i].id}" class="ms-2">${cartContent[i].unitCost}</p></b>  </td>
      <td class="align-middle cursor-active" onclick="removeCartItem(${cartContent[i].id})"><i class="fa-solid fa-trash text-secondary"></i></a></td>
    </tr>
      `

  }
  document.getElementById("cart_sumary").innerHTML= htmlContentToAppend;
  updateCartTotal()

}

document.addEventListener("DOMContentLoaded", ()=>{
  showCart()

  let radios = document.querySelectorAll('input[type=radio][name="deliverySelection"]');
    radios.forEach(radio => radio.addEventListener('change', () => {
      updateCartTotal()
    }));


})


