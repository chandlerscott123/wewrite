
const SIZE_ARR = ["small", "medium", "large"];
const PRICE_SIZE_ARR = [10, 15, 25];

const TYPE_ARR = ["blank", "filled"];
const PRICE_TYPE_ARR = [0,12];

const COVER_ARR =["paper", "cardstock", "leather"];
const PRICE_COVER_ARR = [4,7,13];

const EBOOK_PRICE = 25;

const CART_ID_ARR = ["poetry-book", "digital-anthology"]


$(document).ready(function(){
$('.header').height($(window).height());
});

function UnhideElement(elem){
  elem.classList.remove("d-none");
}
function hideElement(elem){
  elem.classList.add("d-none");
}

function setPoetryPriceInstance(){
  let price=0;
  const size = document.querySelector("input[name='sizeRadio']:checked").value;
  const type = document.querySelector("input[name='typeRadio']:checked").value;
  const cover = document.querySelector("input[name='coverRadio']:checked").value;
  let ebookQty =parseInt(document.querySelector("input#ebookQtyInput").value);

  let priceArr = [size,type,cover];
  
  for (let i=0; i<priceArr.length; i++){
    if(i===0)
    {
      price+=PRICE_SIZE_ARR[SIZE_ARR.indexOf(size)];
    }
    else if(i===1)
    {
      price+= PRICE_TYPE_ARR[TYPE_ARR.indexOf(type)];
    }
    else if (i===2)
    {
      price+= PRICE_COVER_ARR[COVER_ARR.indexOf(cover)];    
    }
  }
  
  return price;
}


function getPriceFromCart(cartIdArr){
  let finalPrice=0;
  let price=0;
  const poetryPrice=setPoetryPriceInstance();
  let itemId, quant, numStr, uqPoetryPrice, uqEbookPrice;
  const poetryDisc =.12;
  const ebookDisc=.2;
  let totalDisc, uqPoetryDisc, uqEbookDisc;
  

  for (let i= 0; i<cartIdArr.length; i++){
    quant =0;
    numStr="";

    for (let j=0; j<cartIdArr[i].length; j++){
      if(!isNaN(parseInt(cartIdArr[i][j]))) {
        numStr += cartIdArr[i][j];
      }
      else {
        break;
      }
    }

    if (numStr!=="")
    {
      quant = parseInt(numStr);
    }
    itemId = cartIdArr[i].substring(numStr.length);

    if (itemId === CART_ID_ARR[0]){
      price += (quant*poetryPrice);
      price-= (price*poetryDisc);
      uqPoetryDisc=price*poetryDisc;
      uqPoetryPrice = price;
      finalPrice+=price;
    }
    else if (itemId=== CART_ID_ARR[1]){
      price += ((quant*EBOOK_PRICE));
      price-=(price*ebookDisc)
      uqEbookDisc=price*ebookDisc;
      uqEbookPrice=price;
      finalPrice+=price;
    }
  }
  
  totalDisc=uqPoetryDisc + uqEbookDisc;

  totalDisc = totalDisc.toFixed(2);
  finalPrice = finalPrice.toFixed(2);
  price = price.toFixed(2);


  document.getElementById("poetry-price").innerText=uqEbookPrice.toFixed(2);
  document.getElementById("ebook-price").innerText=uqEbookPrice.toFixed(2);

  document.getElementById("subtotal").innerText="$"+price;
  document.getElementById("discount").innerText="$" + totalDisc;
  document.getElementById("total-price").innerText = "$" + finalPrice;
  document.getElementById("totalPrice").innerText="$"+finalPrice;

}

function processCart(event)
{
  let cart =[];
  let poetryQty = parseInt(document.querySelector("input#poetryQtyInput").value);
  let ebookQty = parseInt(document.querySelector("input#ebookQtyInput").value);
  let paymentSec = document.getElementById("payment");
  cart = [poetryQty, ebookQty];

  for (let i=0;i<cart.length; i++){
    if(cart[i]!==0)
    {
      if(i===0){
        cart[i]+=CART_ID_ARR[i];
      }
      else if (i===1)
      {
        cart[i]+=CART_ID_ARR[i];
      }
    }
  }

  getPriceFromCart(cart);
  event.preventDefault();
  UnhideElement(paymentSec);
  
}

function populateTable(itemInfoArr){
  let cover, size, type, infoStr;
  const itemQty = itemInfoArr[1];
  if (itemInfoArr[0]===CART_ID_ARR[0]){
    size = document.querySelector("input[name='sizeRadio']:checked").value;
    type = document.querySelector("input[name='typeRadio']:checked").value;
    cover = document.querySelector("input[name='coverRadio']:checked").value;

    infoStr = "Size: " + size + "<br>"+ "Type: " + type + "<br>"+"Cover: " +cover;
    document.getElementById("poetry-type").innerText =infoStr;
    document.getElementById("poetry-qty").innerText = itemQty;
  }
  else if (itemInfoArr[0] === CART_ID_ARR[1]){

    document.getElementById("ebook-qty").innerText = itemInfoArr[1];

  }


}

function displayReciept(lastFour, poetryQty, ebookQty){

  document.querySelector("span#cardNum").innerText = lastFour;
  let poetryInfoArray = [];
  let ebookInfoArray=[];
  const poetryId =  CART_ID_ARR[0];
  const ebookId = CART_ID_ARR[1];
  
  if (poetryQty!==0 || ebookQty !==0)
  {
    if (ebookQty && !poetryQty){
      ebookInfoArray=[ebookId,ebookQty];
      populateTable(ebookInfoArray);
    }
    else if(!ebookQty&&poetryQty){
      poetryInfoArray = [poetryId, poetryQty];
      populateTable(poetryInfoArray);
    }
    else if (ebookQty && poetryQty){
      poetryInfoArray=[poetryId,poetryQty];
      ebookInfoArray=[ebookId,ebookQty];
      populateTable(poetryInfoArray);
      populateTable(ebookInfoArray);

    }
    
    
  }

}

function processPayment(event){
  const beforePay = document.getElementById("beforePay");
  hideElement(beforePay);
  const paymentSec = document.getElementById("payment");
  const paymentConfirm = document.getElementById("paymentConfirm");
  event.preventDefault();
  let poetryQty = parseInt(document.querySelector("input#poetryQtyInput").value);
  let ebookQty = parseInt(document.querySelector("input#ebookQtyInput").value);
  let lastFour;
  let cardNum = document.querySelector("input#cardNum").value;
  
  if (cardNum.length === 16)
  {
    lastFour = cardNum.substring(12); 
  }
  else if (cardNum.length ===19)  
  {
    lastFour =cardNum.substring(16);
  }

  hideElement(paymentSec);
  UnhideElement(paymentConfirm);
  displayReciept(lastFour, poetryQty, ebookQty);
}

function onSubmitPoetryForm(event){
  event.preventDefault();
  setPoetryPriceInstance();

}

window.addEventListener("load", function(){
  
  const poetryForm = document.getElementById("poetryForm");
  const totalForm = document.getElementById("get-total");
  const paymentSec = document.getElementById("payment");
  const paymentForm = document.getElementById("paymentInfo"); 
  const paymentConfirm = document.getElementById("paymentConfirm");

  hideElement(paymentSec);
  hideElement(paymentConfirm);
  poetryForm.addEventListener("submit", onSubmitPoetryForm);
  totalForm.addEventListener("submit", processCart);
  paymentForm.addEventListener("submit", processPayment);
  


});