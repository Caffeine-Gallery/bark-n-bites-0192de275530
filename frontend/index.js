import { backend } from 'declarations/backend';

let cart = [];
let products = [];

async function initializeApp() {
    showLoading();
    try {
        products = await backend.getProducts();
        displayProducts();
        hideLoading();
    } catch (error) {
        console.error("Error initializing app:", error);
        hideLoading();
    }
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="col-md-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.addToCart = async function(productId) {
    showLoading();
    try {
        const result = await backend.addToCart(productId);
        if (result) {
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCartDisplay();
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
    hideLoading();
}

window.toggleCart = function() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.length;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})" class="btn btn-sm btn-danger">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

window.removeFromCart = async function(productId) {
    showLoading();
    try {
        const result = await backend.removeFromCart(productId);
        if (result) {
            cart = cart.filter(item => item.id !== productId);
            updateCartDisplay();
        }
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
    hideLoading();
}

window.checkout = async function() {
    showLoading();
    try {
        const result = await backend.checkout();
        if (result) {
            cart = [];
            updateCartDisplay();
            alert('Thank you for your purchase!');
            toggleCart();
        }
    } catch (error) {
        console.error("Error during checkout:", error);
    }
    hideLoading();
}

function showLoading() {
    document.getElementById('loading-spinner').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading-spinner').classList.remove('active');
}

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});

// Initialize the app when the page loads
window.addEventListener('load', initializeApp);
