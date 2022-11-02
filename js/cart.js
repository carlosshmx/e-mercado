let paymentMethod = "No se ha seleccionado";

function updateCartTotal(){  //Recoore el array del carrito, suma los totales en pesos y los totales en dolares, convierte los pesos en dolares, establece el precio de envio y el total
  let dollarValue = 41;
  let subTotalPesos = 0;
  let subTotalUsd = 0;
  let total = 0;
  let deliveryFee = 0;

  let cartContent = JSON.parse(localStorage.getItem("cart"));   //se obtiene el contenido del carrrito desde el el localstorage

  cartContent.forEach(article =>{   //recorre el contenido del carrito, separa el total dolares y pesos multiplicados por cantidad.
    if(article.currency == "UYU"){
      subTotalPesos += article.unitCost * article.count
    }else{
      subTotalUsd += article.unitCost * article.count
    }
  })
  subTotalUsd += subTotalPesos/dollarValue;

  document.getElementById("subTotal-Cart").innerText = `USD ${Math.round(subTotalUsd)}`

  let deliverySelector = document.getElementsByName('deliverySelection');

  deliverySelector.forEach(delivery => {    //Recorre los radio y cuando encuentre el seleccionado, calcula el total sumando cargo por envio y subTotalUsd
    if(delivery.checked){
      deliveryFee = Math.round(subTotalUsd * delivery.value);
      total = Math.round(subTotalUsd + deliveryFee);
      document.getElementById("deliveryFee-Cart").innerText = `USD ${deliveryFee}`
      document.getElementById("total-Cart").innerText = `USD ${total}`
    }  
  })
}

function changeQty(id, qtyID, subtotalID){  //Recibe el id del articulo a cambiar, el id del input de cantidad y el id del contenedor del subtotal
  let qtyImput = document.getElementById(qtyID)
  let subTotal = document.getElementById(subtotalID);
  let cartContent = JSON.parse(localStorage.getItem("cart"));

  cartContent.forEach(article => {   //Recorre el contenido del carrito, cuando encuentra el articulo, iguala su propiedad count al valor del imput y reemplaza el subtotal (catidad * valor unitario)
      if(article.id == id){
        article.count = qtyImput.value
        subTotal.innerText = qtyImput.value * article.unitCost
      }
  });
  localStorage.setItem("cart", JSON.stringify(cartContent))
  updateCartTotal()
}

function removeCartItem(product_id){
  var cartContent = JSON.parse(localStorage.getItem("cart"))
  var pos = cartContent.findIndex(i => i.id === product_id)
  cartContent.splice(pos, pos+1);
  localStorage.setItem("cart", JSON.stringify(cartContent));
  showCart();
}

function showCart(){    //Recorre el carrito y renderiza cada articulo tomando sus propiedades y creando filas de la tabla.
  let cartContent = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [];

  //Si el carro esta vacio, solo muestra el html a continuacion:
  if(cartContent.length == 0){document.getElementById("generalForm").innerHTML = ` 
  <div class="d-flex mt-4 align-items-center flex-column fw-bold"> 
    <p>No hay articulos en su carrito</p>
    <p>Explora la catregorias <a href="./categories.html">aqui</a></p> 
  </div> `; return}   

  let htmlContentToAppend = ""

  cartContent.forEach(article => {
    htmlContentToAppend += `
    <tr>
    <td class="align-middle"> <img src="${article.image}" alt="" style="width: 100px;"> </td>
    <td class="align-middle">${article.name}</td>
    <td class="align-middle">${article.currency} ${article.unitCost}</td>
    <td class="align-middle"><input type="number" id="qtyID${article.id}" class="form-control" value="${article.count}" onchange="changeQty(${article.id}, 'qtyID${article.id}', 'subtotalID${article.id}')"  style="width: 100px" min="1" required>
    </td>
    <td class="align-middle"> <b class="d-flex">${article.currency} <p id="subtotalID${article.id}" class="ms-2">${article.unitCost * article.count}</p></b> </td>
    <td class="align-middle cursor-active" onclick="removeCartItem(${article.id})"><i class="fa-solid fa-trash text-secondary"></i></a></td>
  </tr>
    `
  })
  document.getElementById("cart_sumary").innerHTML= htmlContentToAppend;
  updateCartTotal()
}

function selectedPaymentError(status){  //Oculta el mensaje de error "Debe seleccionar un tipo de pago" si se le pasa true, si se le pasa false, lo muestra.
  if(status){
    document.getElementById("noSelectedPayment").classList.remove("visually-hidden");
  }else{
    document.getElementById("noSelectedPayment").classList.add("visually-hidden");
  }
}

function simulatePuerchaseLoading(){  //Simula el tiempo de carga de una compra.
    showSpinner();
    setTimeout(() => {hideSpinner(); showAlertSuccess(); hiddeAlertSuccess()}, 3000)   
}

//Ejecuta cuando el documento está cargado
document.addEventListener("DOMContentLoaded", ()=>{

  let deliveyRadios = document.querySelectorAll('input[type=radio][name="deliverySelection"]');  //Le asigna acciones a los radios, cuando se cambian, actualiza el precio
    deliveyRadios.forEach(radio => radio.addEventListener('change', () => {
      updateCartTotal()
    }));

  let paymentRadios = document.querySelectorAll('input[type=radio][name="paymentSelection"]'); //Le asigna acciones a los radios del modal, si se seleeciona uno, desabilita los campos del otro.
    paymentRadios.forEach(radio => radio.addEventListener('change', () => {
        if(radio.value == "creditCard"){
          document.getElementById("creditCardInformation").removeAttribute("disabled");
          document.getElementById("bankTransferInformation").setAttribute("disabled", "");
          paymentMethod = "Tarjeta de crédito"
        }else{
          document.getElementById("bankTransferInformation").removeAttribute("disabled");
          document.getElementById("creditCardInformation").setAttribute("disabled", "");
          paymentMethod = "Transferencia bancaria"
        }
      }));


  document.getElementById("paymentModal").addEventListener("submit", (event)=>{   //Al dar submit (guardar) al modal 
      event.preventDefault();
      let modalSubmitAlert = document.getElementById("modalSubmitAlert")

      if(paymentMethod == "No se ha seleccionado"){   //si no se ha seleccionado un radio, muestra el mensaje "Seleccione un método de pago"
        modalSubmitAlert.classList.remove("visually-hidden")
        modalSubmitAlert.classList.add("text-danger")
      }else{
        modalSubmitAlert.classList.add("visually-hidden")     
        if(paymentModal.checkValidity()){                       //Si se ha seleccionado un radio y la informacion esta completa, muestra en verde "Información guardada" y muestra en DOM el tipo de pago
          modalSubmitAlert.innerText = "Información guardada"
          modalSubmitAlert.classList.remove("visually-hidden","text-danger")
          modalSubmitAlert.classList.add("text-success")
          document.getElementById("noSelectedPayment").classList.add("visually-hidden")
          document.getElementById("selected-payment").innerText = paymentMethod;
        }else{                                                      
          modalSubmitAlert.innerText = "Ingrese informació valida"      //Si la infomacion de pago esta incompleta, muestra en rojo "Ingrese informació valida"
          modalSubmitAlert.classList.remove("visually-hidden", "text-success")
          modalSubmitAlert.classList.add("text-danger")
        }
      }  
    })
  
  let generalForm = document.getElementById("generalForm")  //Chequea validez de todos los inputs y el metodo de pago, si esta correcto procede al pago, sino muestra mensajes de error
    generalForm.addEventListener("submit", (event)=>{
        event.preventDefault();

        if(generalForm.checkValidity() && paymentMethod != "No se ha seleccionado"){
          selectedPaymentError(false)
          simulatePuerchaseLoading()      
        }else{
          selectedPaymentError(true)
          showAlertError();
          hiddeAlertError();
        }
    })

  showCart()
})


