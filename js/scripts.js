
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
  let quant;
  let itemId;
  let poetryPrice=setPoetryPriceInstance();
  let isNum = 1;
  let index=0;
  let lastNumIndex=0;

  if(cartIdArr.length>1){
  
    //it's interating through the loop but doesn't have separate values for each index
    //2item,3item

    for(let i=0; i<cartIdArr.length; i++){
      console.log("index in for loop: "+index); 
      console.log("evaluating for" + cartIdArr[i]);
     
      while (isNum) //12poetry-book index: 0
      {
        quant=parseInt(cartIdArr[i].substring(0,index+1)); //1 index: 0 12 index: 1

        if((quant>=10)){ 
          index++; //index: 2
          console.log("index in quant>=10 for quant " + quant.toString());
          lastNumIndex=index; //index: 2
          isNum = parseInt(cartIdArr[i].substring(0,index+1)); //12p -> NaN index:2
        }

        else if ((quant<10)){
          lastNumIndex=0;
          index++; 
          console.log("index in quant<10 for quant " + quant.toString());
          isNum = parseInt(cartIdArr[i].substring(0,index+1)); //12
        } 
      }
      itemId=cartIdArr[i].substring(lastNumIndex); //poetry-book
      console.log(itemId);
      console.log(i);
      if (itemId === CART_ID_ARR[0])
      {
        finalPrice+= (quant*poetryPrice); // 12 * price
      }
      else if (itemId === CART_ID_ARR[1])
      {
        finalPrice+=(quant*EBOOK_PRICE)
      }
    }
  }
  else if (cartIdArr.length===1) {

    quant=parseInt(cartIdArr[0].substring(0,1));
    itemId=cartIdArr[0].substring(1);
    if (itemId === CART_ID_ARR[0])
    {
      finalPrice+= (quant*poetryPrice);
    }
    else if (itemId === CART_ID_ARR[1])
    {
      finalPrice+=(quant*EBOOK_PRICE)
    }
    
  }

  document.getElementById("total-price").innerText = finalPrice;


}

function processCart(event)
{
  let cart =[];
  let poetryQty = parseInt(document.querySelector("input#poetryQtyInput").value);
  let ebookQty = parseInt(document.querySelector("input#ebookQtyInput").value);

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
}


function onSubmitPoetryForm(event){
  event.preventDefault();
  setPoetryPriceInstance();

}

window.addEventListener("load", function(){
  let poetryForm = document.getElementById("poetryForm");
  let totalForm = document.getElementById("get-total");

  poetryForm.addEventListener("submit", onSubmitPoetryForm);
  totalForm.addEventListener("submit", processCart);
  


});