if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked);
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-image')[0].src;
    // dataset accesses all the properties of HTML that are pre-fixed with data-
    // here dataset.itemId will access the property data-item-id on our HTML attribute (here we use camelcase)
    var id = shopItem.dataset.itemId
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc, id) {
    var cartRow = document.createElement('div')
    // we do this to make sure id of item is saved in cart. And when we access the cart rows, they all will
    // have IDs linked to them
    cartRow.dataset.itemId = id
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `<div class="cart-row">
    <div class="cart-item">
      <img
        class="cart-image"
        src="${imageSrc}"
        alt="tshirt-image"
      />
      <span class="cart-item-name">${title}</span>
    </div>
    <span class="cart-price">${price}</span>
    <div class="cart-quantity-group">
      <input class="cart-quantity-input" type="number" value="1" />
      <button class="class-btn btn-danger" role="button">REMOVE</button>
    </div>
    </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-value")[0].innerText = "$" + total;
}

// variable to handle stripe interactions
// StripeCheckout object is coming from stripe library
// we need to configure to send the actual information we need
var stripeHandler = StripeCheckout.configure({
    // below is the key sent from server to front-end view page, and now can access in front-end js
    key: stripePublicKey,
    locale: 'auto',
    // inside this function, we need to put all the information for how we want to respond when stripe
    // send us back the information.
    // token function is going to be called after the person click purchase button, fillout card information
    // then it will sent to stripe, stripe verifies everything and will send back and will call the token method
    token: (token) => {
        
    }
})


// when we click on purchase button, it is going to call stripe and stripe is going to call us back and say that
// it is valid. And we can call the server and the server is going to do all the checkout information that we need to do
function purchaseClicked() {
    // alert('Thank you for your purcase');
    // var cartItems = document.getElementsByClassName('cart-items')[0];
    // while (cartItems.hasChildNodes()){
    //     cartItems.removeChild(cartItems.firstChild)
    // }
    // updateCartTotal();

    var priceElement = document.getElementsByClassName('total-value')[0]
    // convert string into floating point number
    // stripe expects in cent format and we multiple by 100
    var price = parseFloat(priceElement.innerText.replace('$', '')) * 100
    // open the pop-up box
    stripeHandler.open({
        // set amount to price variable
        amount: price
    })
}

