
const SIZE_ARR = ["small", "medium", "large"];
const PRICE_SIZE_ARR = [10, 15, 25];

const TYPE_ARR = ["blank", "filled"];
const PRICE_TYPE_ARR = [0,12];

const COVER_ARR =["paper", "cardstock", "leather"];
const PRICE_COVER_ARR = [4,7,13];

const EBOOK_PRICE = 25;

CART_ID_ARR = ["poetry-book", "digital-anthology"]


$(document).ready(function(){
$('.header').height($(window).height());
});


/*

**** TO DO: ******




ADD: onclick event listener: 
        stored val cart in array accross diff webpages 
        
      items: items[name, quantity, price]
                                    nameArray                          priceStr           quantityStr
      cart.items.checkout();

      PARAMETERS: [ [size , bookType , bookMaterial], [priceSize, priceMaterial], quantity ]

      cart = array [nameArray, priceStr, quantityStr]
      getPrice(): "small.blank.leather"


const cart = {
firstName: "John",
lastName: "Doe",
age: 50,
status: "marketing contact"
};

                                

poetry book size:
small medium large

input radio

input radio

input radio

small (10-20 pages): 10
medium(20-30 pages): 15
large (30-50 pages): 25

poetry book type:

blank (FREE)
filled (+ $12)

poetry book of type with material:

leather: +$13
cardstock: +$7
paper: +$4

*/

function setPriceInstance(){
  let price;
  const size = document.querySelector("input[name='sizeRadio']:checked").value;
  const type = document.querySelector("input[name='typeRadio']:checked").value;
  const cover = document.querySelector("input[name='coverRadio']:checked").value;

  let priceArr = [size,type,cover];
  
  for (let i=0; i<priceArr.length; i++){
    if(i=0)
    {
      price+=PRICE_SIZE_ARR[SIZE_ARR.indexOf(size)];
    }
    else if(i=1)
    {
      price+= PRICE_TYPE_ARR[TYPE_ARR.indexOf(type)];
    }
    else if (i=2)
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
  let poetryPrice=setPriceInstance();

  if(cartIdArr.length>1){
    for(i=0; i<cartIdArr.length; i++){
      quant=parseInt(cartIdArr[i].substring(0,1));
      itemId=cartIdArr[i].substring(1);
      finalPrice += quant;

    }
  }
  else if (cartIdArr>0) {

    quant=parseInt(cartIdArr[i].substring(0,1));
    itemId=cartIdArr[i].subtring(1);
    if (itemId === CART_ID_ARR[0])
    {
      finalPrice+= (quant*poetryPrice);
    }
    else if (itemId === CART_ID_ARR[1])
    {
      finalPrice+=(quant*EBOOK_PRICE)
    }
    
  }

}

function inCart()
{
  let cart =[];
  let poetryInCart=false;
  let ebookInCart=false;
  let poetryQty = parseInt(document.querySelector("input#poetryQtyInput").value);
  let ebookQty = parseInt(document.querySelector("input#ebookQtyInput").value);

  cart = [poetryQty, ebookQty];

  for (i=0;i<cart.length; i++){
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
}


window.addEventListener("load", function(){
  let poertyForm = document.getElementById("poetryForm");

  // poertyForm.addEventListener("submit", )
  


});