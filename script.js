// scripts.js

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    // Prompt the user for quantity
    const quantity = prompt('Enter quantity:');
    if (quantity === null || isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    // Create cart item object
    const cartItem = {
        name: itemName,
        price: parseFloat(itemPrice),
        quantity: parseInt(quantity)
    };

    // Retrieve existing cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === itemName);
    if (existingItemIndex > -1) {
        // Update quantity if item already exists in the cart
        cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
        // Add new item to the cart
        cart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Item added to cart.');
}

// Function to display cart items on the checkout page
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let itemsHtml = '<ul>';
    cart.forEach(item => {
        itemsHtml += `<li>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</li>`;
    });
    itemsHtml += '</ul>';
    cartItemsDiv.innerHTML = itemsHtml;
}

// Function to handle the checkout process
function completePurchase() {
    const clientName = document.getElementById('clientName').value;
    if (!clientName) {
        alert('Please enter your name.');
        return;
    }

    // Clear cart
    localStorage.removeItem('cart');

    // Show thank you message
    document.getElementById('confirmationMessage').style.display = 'block';
    document.getElementById('checkoutForm').style.display = 'none';
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    // Handle "Looking for More?" button click
    const moreButton = document.getElementById('moreButton');
    if (moreButton) {
        moreButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // Adjust URL as necessary
        });
    }
});
