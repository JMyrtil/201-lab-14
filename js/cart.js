/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
  console.log(state.cart.items);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// DONE: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbody = document.querySelector('tbody');
  tbody.innerHTML = "";
  // for (tr in tbody) {
  //   tr.remove();
  // }
}

// DONE: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // DONE: Find the table body
  console.log('inside showCart')
  let tbody = document.querySelector('tbody');
  // DONE: Iterate over the items in the cart
  
  for (let i in state.cart.items) {
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdQuantity = document.createElement('td');
    
    console.log('inside for loop');
    //Delete link
    let tdDelete = document.createElement('td');
    let linkDelete = document.createElement('a');
    let l = document.createTextNode('Delete');
    linkDelete.appendChild(l);
    linkDelete.title = 'Delete';
    tdDelete.appendChild(linkDelete);


    tdName.textContent = state.cart.items[i].product;
    console.log(state.cart.items[i].product);
    tdQuantity.textContent = state.cart.items[i].quantity;
    tr.appendChild(tdName);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdDelete);
    tbody.appendChild(tr);
  }
  // DONE: Create a TR
  // DONE: Create a TD for the delete link, quantity,  and the item

  // DONE: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {
  let tdName = event.target.parentNode.parentNode.firstChild.textContent;
  console.log(tdName);
  //check which cartItem in state.cart.items matches this tr
  for(let i = 0; i<state.cart.items.length; i++){
    if(state.cart.items[i].product == tdName){
      state.cart.removeItem(i);
    }
  }
  
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  state.cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
