// scripts.js

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    // Prompt for quantity
    const quantity = parseInt(prompt(`Enter quantity for ${name}:`), 10);

    // Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
        alert('Invalid quantity. Please enter a number greater than 0.');
        return;
    }

    // Add to cart
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}



// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Populate cart items on the checkout page
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `<strong>${item.name}</strong> - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Handle checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const confirmationMessage = document.getElementById('confirmation-message');
            if (confirmationMessage) {
                confirmationMessage.style.display = 'block';
                checkoutForm.style.display = 'none';
            }
            localStorage.removeItem('cart'); // Clear cart after checkout
        });
    }

    // Handle "Looking for More?" button click
    const moreButton = document.getElementById('more-button');
    if (moreButton) {
        moreButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // Adjust URL as necessary
        });
    }
});