
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
  elem.style.display="block";
}
function hideElement(elem){
  elem.style.display="none";
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
  let poetryPrice=setPoetryPriceInstance();
  let itemId, quant, numStr;

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
      finalPrice += quant*poetryPrice;
    }
    else if (itemId=== CART_ID_ARR[1]){
      finalPrice += quant*EBOOK_PRICE;
    }
  }

  document.getElementById("total-price").innerText = "$" + finalPrice;

}

function processCart(event)
{
  let cart =[];
  let poetryQty = parseInt(document.querySelector("input#poetryQtyInput").value);
  let ebookQty = parseInt(document.querySelector("input#ebookQtyInput").value);
  let beforePayDiv = document.getElementById("beforePay");
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


function onSubmitPoetryForm(event){
  event.preventDefault();
  setPoetryPriceInstance();

}

window.addEventListener("load", function(){
  let poetryForm = document.getElementById("poetryForm");
  let totalForm = document.getElementById("get-total");
  let paymentSec = document.getElementById("payment");

  hideElement(paymentSec);
  poetryForm.addEventListener("submit", onSubmitPoetryForm);
  totalForm.addEventListener("submit", processCart);
  


});