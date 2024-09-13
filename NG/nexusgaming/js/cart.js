document.addEventListener('DOMContentLoaded', function () {
  const CartItems = document.querySelector(".cart-items");
  const clearCartButton = document.querySelector(".clear-cart-button");

  function displayCartItems() {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      CartItems.innerHTML = "";
      items.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart_item";
        cartItem.innerHTML = `
          <p class="cart_id">${item.id}</p>
          <p class="cart_title">${item.title}</p>
          <img src="${item.image}" alt="${item.title}" class="cart_img" />
          <p class="cart_price">${item.price}</p>
          <button class="cart_delete" data-id="${item.id}">Delete</button>
        `;
        CartItems.appendChild(cartItem);
      });
    }
  }

  function clearCart() {
    CartItems.innerHTML = "";
    localStorage.removeItem("cart");
  }

  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
  }

  clearCartButton.addEventListener('click', clearCart);

  CartItems.addEventListener('click', function (e) {
    if (e.target.classList.contains("cart_delete")) {
      const id = e.target.getAttribute("data-id");
      removeFromCart(id);
    }
  });

  displayCartItems();
});



var purchaseButton = document.getElementById('purchaseButton');
var popup = document.getElementById('popup');
var closePopupBtn = document.getElementById('closePopupBtn');

purchaseButton.addEventListener('click', function() {
  popup.style.display = 'block';
  setTimeout(function() {
    popup.style.display = 'none';
  }, 3000); 
});

closePopupBtn.addEventListener('click', function() {
  popup.style.display = 'none';
});
