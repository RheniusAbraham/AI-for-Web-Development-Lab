// DOM Manipulation and Event Handling for Guitar E-commerce

// Product Data
const products = [
{
id: 1,
name: "Fender Stratocaster",
price: 1499,
category: "electric",
image: "https://images.unsplash.com/photo-1558098329-a70b1688d025?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
description: "American Professional II series with maple neck",
rating: 4.8,
brand: "Fender"
},
{
id: 2,
name: "Gibson Les Paul",
price: 2499,
category: "electric",
image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
description: "Standard 50s model with humbucker pickups",
rating: 4.9,
brand: "Gibson"
},
{
id: 3,
name: "Taylor 814ce",
price: 3299,
category: "acoustic",
image: "https://images.unsplash.com/photo-1573639470274-8e42d2492c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
description: "Grand Auditorium acoustic-electric",
rating: 4.7,
brand: "Taylor"
},
{
id: 4,
name: "PRS Custom 24",
price: 4199,
category: "electric",
image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
description: "10-top flame maple with bird inlays",
rating: 4.9,
brand: "PRS"
},
{
id: 5,
name: "Martin D-28",
price: 2899,
category: "acoustic",
image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
description: "Classic dreadnought acoustic",
rating: 4.6,
brand: "Martin"
},
{
id: 6,
name: "Yamaha FG800",
price: 199,
category: "acoustic",
image: "https://images.unsplash.com/photo-1556449895-a33c9dba6c3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
description: "Great beginner acoustic guitar",
rating: 4.5,
brand: "Yamaha"
}
];

const brands = [
{ name: "Fender", icon: "bi-music-note-list" },
{ name: "Gibson", icon: "bi-music-note" },
{ name: "Taylor", icon: "bi-music-player" },
{ name: "PRS", icon: "bi-soundwave" },
{ name: "Martin", icon: "bi-vinyl" },
{ name: "Yamaha", icon: "bi-speaker" }
];

// Shopping Cart
let cart = [];
let visitorCount = 0;

// DOM Elements using different methods
let cartCountElement;
let cartModal;
let productsContainer;
let brandsContainer;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
// Using getElementById
cartCountElement = document.getElementById('cart-count');
cartModal = document.getElementById('cart-modal');
productsContainer = document.getElementById('products-container');
brandsContainer = document.getElementById('brands-container');

// Using getElementsByClassName
const navLinks = document.getElementsByClassName('nav-link');
for (let link of navLinks) {
link.addEventListener('click', function(e) {
e.preventDefault();
// Highlight active link
Array.from(navLinks).forEach(l => l.classList.remove('active'));
this.classList.add('active');
});
}

// Using getElementsByTagName
const allButtons = document.getElementsByTagName('button');
Array.from(allButtons).forEach(button => {
button.addEventListener('mouseenter', function() {
this.style.transform = 'scale(1.05)';
});
button.addEventListener('mouseleave', function() {
this.style.transform = 'scale(1)';
});
});

// Using querySelector
const mainTitle = document.querySelector('#main-title');
mainTitle.addEventListener('click', function() {
this.textContent = "🎸 " + this.textContent + " 🎸";
});

// Initialize components
loadProducts();
loadBrands();
updateVisitorCount();
updateStatistics();

// Initialize custom guitar
updateCustomGuitar();
});

// DOM Method 1: getElementById - Update visitor count
function updateVisitorCount() {
visitorCount++;
const visitorElement = document.getElementById('visitor-count');
if (visitorElement) {
visitorElement.textContent = visitorCount;
}
}

// DOM Method 2: getElementsByClassName - Load products
function loadProducts() {
productsContainer.innerHTML = '';

products.forEach(product => {
const productCard = createProductCard(product);
productsContainer.appendChild(productCard);
});

updateStatistics();
}

// DOM Method 3: querySelectorAll - Search products
function searchProducts() {
const searchInput = document.getElementById('search-input');
const searchTerm = searchInput.value.toLowerCase();

const allProductCards = document.querySelectorAll('.product-card');

allProductCards.forEach(card => {
const title = card.querySelector('.card-title').textContent.toLowerCase();
const description = card.querySelector('.card-text').textContent.toLowerCase();

if (title.includes(searchTerm) || description.includes(searchTerm)) {
card.style.display = 'block';
card.classList.add('added-to-cart');
setTimeout(() => card.classList.remove('added-to-cart'), 300);
} else {
card.style.display = 'none';
}
});
}

// Filter products by price
function filterProducts() {
const filterSelect = document.getElementById('price-filter');
const filterValue = filterSelect.value;

productsContainer.innerHTML = '';

let filteredProducts = [...products];

if (filterValue === '0-1000') {
filteredProducts = products.filter(p => p.price < 1000);
} else if (filterValue === '1000-3000') {
filteredProducts = products.filter(p => p.price >= 1000 && p.price <= 3000);
} else if (filterValue === '3000+') {
filteredProducts = products.filter(p => p.price > 3000);
}

filteredProducts.forEach(product => {
const productCard = createProductCard(product);
productsContainer.appendChild(productCard);
});
}

// Sort products
function sortProducts() {
const sortSelect = document.getElementById('sort-by');
const sortValue = sortSelect.value;

let sortedProducts = [...products];

if (sortValue === 'price-low') {
sortedProducts.sort((a, b) => a.price - b.price);
} else if (sortValue === 'price-high') {
sortedProducts.sort((a, b) => b.price - a.price);
} else if (sortValue === 'name') {
sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
}

productsContainer.innerHTML = '';
sortedProducts.forEach(product => {
const productCard = createProductCard(product);
productsContainer.appendChild(productCard);
});
}

// Create product card element
function createProductCard(product) {
const col = document.createElement('div');
col.className = 'col-md-6 col-lg-4';

col.innerHTML = `
<div class="card product-card h-100">
<img src="${product.image}" class="card-img-top" alt="${product.name}">
<div class="card-body d-flex flex-column">
<span class="badge bg-warning mb-2">${product.brand}</span>
<h5 class="card-title">${product.name}</h5>
<div class="product-rating">
${generateStars(product.rating)}
<small class="text-muted ms-2">${product.rating}/5</small>
</div>
<p class="card-text">${product.description}</p>
<div class="mt-auto">
<div class="d-flex justify-content-between align-items-center mb-3">
<h4 class="text-primary">$${product.price.toLocaleString()}</h4>
<span class="badge bg-info">${product.category}</span>
</div>
<div class="quantity-control">
<button class="btn btn-sm btn-outline-secondary quantity-minus" onclick="decreaseQuantity(${product.id})">-</button>
<input type="number" class="form-control text-center quantity-input"
id="qty-${product.id}" value="1" min="1"
onchange="updateQuantity(${product.id})">
<button class="btn btn-sm btn-outline-secondary quantity-plus" onclick="increaseQuantity(${product.id})">+</button>
</div>
<button class="btn btn-primary w-100 mt-2" onclick="addToCart(${product.id})">
<i class="bi bi-cart-plus"></i> Add to Cart
</button>
</div>
</div>
</div>
`;

return col;
}

// Generate star ratings
function generateStars(rating) {
let stars = '';
const fullStars = Math.floor(rating);
const hasHalfStar = rating % 1 >= 0.5;

for (let i = 1; i <= 5; i++) {
if (i <= fullStars) {
stars += '<i class="bi bi-star-fill text-warning"></i>';
} else if (i === fullStars + 1 && hasHalfStar) {
stars += '<i class="bi bi-star-half text-warning"></i>';
} else {
stars += '<i class="bi bi-star text-warning"></i>';
}
}

return stars;
}

// Load brands
function loadBrands() {
brandsContainer.innerHTML = '';

brands.forEach(brand => {
const col = document.createElement('div');
col.className = 'col-6 col-md-4 col-lg-2';
col.innerHTML = `
<div class="brand-logo" onclick="filterByBrand('${brand.name}')">
<i class="bi ${brand.icon}"></i>
<h5>${brand.name}</h5>
</div>
`;
brandsContainer.appendChild(col);
});
}

// Filter by brand
function filterByBrand(brandName) {
const filteredProducts = products.filter(p => p.brand === brandName);

productsContainer.innerHTML = '';
filteredProducts.forEach(product => {
const productCard = createProductCard(product);
productsContainer.appendChild(productCard);
});

// Show notification
showNotification(`Showing ${brandName} guitars`, 'info');
}

// Cart Functions
function addToCart(productId) {
const product = products.find(p => p.id === productId);
const quantityInput = document.getElementById(`qty-${productId}`);
const quantity = parseInt(quantityInput.value) || 1;

// Check if product already in cart
const existingItem = cart.find(item => item.id === productId);

if (existingItem) {
existingItem.quantity += quantity;
} else {
cart.push({
...product,
quantity: quantity
});
}

updateCart();
showNotification(`${product.name} added to cart!`, 'success');

// Animation feedback
const button = document.querySelector(`button[onclick="addToCart(${productId})"]`);
button.classList.add('added-to-cart');
setTimeout(() => button.classList.remove('added-to-cart'), 300);
}

function updateCart() {
// Update cart count
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
cartCountElement.textContent = totalItems;

// Update cart modal
updateCartModal();

// Update statistics
updateStatistics();
}

function updateCartModal() {
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

if (cart.length === 0) {
cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
cartTotal.textContent = '$0.00';
return;
}

let itemsHTML = '';
let total = 0;

cart.forEach(item => {
const itemTotal = item.price * item.quantity;
total += itemTotal;

itemsHTML += `
<div class="cart-item">
<img src="${item.image}" class="cart-item-img" alt="${item.name}">
<div class="cart-item-details">
<div class="cart-item-title">${item.name}</div>
<div class="cart-item-price">$${item.price.toLocaleString()} × ${item.quantity}</div>
<div class="cart-item-quantity">
<button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
<input type="number" class="quantity-input" value="${item.quantity}"
onchange="updateCartItemQuantity(${item.id}, this.value)">
<button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
<button class="remove-btn" onclick="removeFromCart(${item.id})">
<i class="bi bi-trash"></i>
</button>
</div>
</div>
</div>
`;
});

cartItems.innerHTML = itemsHTML;
cartTotal.textContent = `$${total.toLocaleString()}`;
}

function toggleCart() {
cartModal.classList.toggle('show');
}

function updateCartItemQuantity(productId, newQuantity) {
newQuantity = parseInt(newQuantity);
if (newQuantity < 1) {
removeFromCart(productId);
return;
}

const item = cart.find(item => item.id === productId);
if (item) {
item.quantity = newQuantity;
updateCart();
}
}

function removeFromCart(productId) {
cart = cart.filter(item => item.id !== productId);
updateCart();
showNotification('Item removed from cart', 'warning');
}

function checkout() {
if (cart.length === 0) {
showNotification('Your cart is empty!', 'error');
return;
}

const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// Using confirm dialog
if (confirm(`Proceed to checkout with total: $${total.toLocaleString()}?`)) {
showNotification('Order placed successfully!', 'success');
cart = [];
updateCart();
toggleCart();
}
}

// Custom Guitar Functions
function updateCustomGuitar() {
const guitarName = document.getElementById('guitar-name').value || "My Custom Guitar";
const bodyColor = document.getElementById('body-color').value;
const woodType = document.getElementById('wood-type').value;
const pickupType = document.querySelector('input[name="pickup-type"]:checked').value;

// Calculate price
let basePrice = 1200;
let addonsPrice = 0;

// Add-ons
const caseChecked = document.getElementById('case').checked;
const strapChecked = document.getElementById('strap').checked;
const setupChecked = document.getElementById('setup').checked;

if (caseChecked) addonsPrice += 150;
if (strapChecked) addonsPrice += 50;
if (setupChecked) addonsPrice += 100;

// Wood type adjustments
if (woodType === 'maple') basePrice += 200;
if (woodType === 'ash') basePrice += 150;

const totalPrice = basePrice + addonsPrice;

// Update display
document.getElementById('custom-guitar-name').textContent = guitarName;
document.getElementById('custom-guitar-specs').textContent =
`${woodType.charAt(0).toUpperCase() + woodType.slice(1)} body with ${pickupType === 'single-coil' ? 'Single Coil' : 'Humbucker'} pickups`;
document.getElementById('custom-guitar-price').textContent = `$${totalPrice.toLocaleString()}`;

// Update visual
const guitarBody = document.querySelector('.guitar-body');
guitarBody.style.backgroundColor = bodyColor;

// Store custom guitar data
window.customGuitar = {
name: guitarName,
price: totalPrice,
specs: document.getElementById('custom-guitar-specs').textContent,
color: bodyColor,
wood: woodType,
pickup: pickupType,
addons: {
case: caseChecked,
strap: strapChecked,
setup: setupChecked
}
};
}

function addCustomToCart() {
if (!window.customGuitar) {
updateCustomGuitar();
}

cart.push({
id: Date.now(), // Unique ID
name: window.customGuitar.name,
price: window.customGuitar.price,
image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
description: window.customGuitar.specs,
quantity: 1,
isCustom: true
});

updateCart();
showNotification('Custom guitar added to cart!', 'success');
}

// Form Validation
function validateForm() {
let isValid = true;

// Reset errors
document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
document.querySelectorAll('.text-danger').forEach(el => el.classList.add('d-none'));

// Validate name
const name = document.getElementById('name');
const nameError = document.getElementById('name-error');
if (!name.value.trim()) {
name.classList.add('error');
nameError.classList.remove('d-none');
isValid = false;
}

// Validate email
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email.value.match(emailRegex)) {
email.classList.add('error');
emailError.classList.remove('d-none');
isValid = false;
}

// Validate message
const message = document.getElementById('message');
const messageError = document.getElementById('message-error');
if (!message.value.trim()) {
message.classList.add('error');
messageError.classList.remove('d-none');
isValid = false;
}

if (isValid) {
document.getElementById('form-success').classList.remove('d-none');
setTimeout(() => {
document.getElementById('contact-form').reset();
document.getElementById('form-success').classList.add('d-none');
}, 3000);
}

return false; // Prevent form submission for demo
}

// Character counter
function updateCharCount() {
const feedback = document.getElementById('feedback');
const charCount = document.getElementById('char-count');
const maxLength = 500;

const currentLength = feedback.value.length;
charCount.textContent = `${currentLength} characters`;

if (currentLength > maxLength) {
feedback.value = feedback.value.substring(0, maxLength);
charCount.textContent = `${maxLength} characters (max)`;
charCount.style.color = '#dc3545';
} else if (currentLength > maxLength * 0.9) {
charCount.style.color = '#ffc107';
} else {
charCount.style.color = '#6c757d';
}
}

function submitFeedback() {
const feedback = document.getElementById('feedback');
if (feedback.value.trim()) {
showNotification('Thank you for your feedback!', 'success');
feedback.value = '';
updateCharCount();
} else {
showNotification('Please enter feedback first', 'error');
}
}

// Theme switching
function changeTheme(theme) {
document.body.className = '';
document.body.classList.add(`${theme}-theme`);

// Update copyright year
const copyright = document.getElementById('copyright-text');
const year = new Date().getFullYear();
copyright.textContent = `© ${year} StrumShop. All rights reserved.`;

showNotification(`Theme changed to ${theme}`, 'info');
}

// Navigation
function showSection(sectionId) {
const section = document.getElementById(sectionId);
if (section) {
section.scrollIntoView({ behavior: 'smooth' });
}
}

function goToHome() {
window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update statistics
function updateStatistics() {
const totalProducts = products.length;
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
const avgPrice = totalPrice / totalProducts;
const minPrice = Math.min(...products.map(p => p.price));
const maxPrice = Math.max(...products.map(p => p.price));

document.getElementById('total-products').textContent = totalProducts;
document.getElementById('avg-price').textContent = `$${Math.round(avgPrice).toLocaleString()}`;
document.getElementById('min-price').textContent = `$${minPrice.toLocaleString()}`;
document.getElementById('max-price').textContent = `$${maxPrice.toLocaleString()}`;
}

// Social media follow
function followSocial(platform) {
const messages = {
facebook: "Following us on Facebook!",
instagram: "Following us on Instagram!",
twitter: "Following us on Twitter!",
youtube: "Subscribed on YouTube!"
};
showNotification(messages[platform], 'info');
}

// Helper functions
function showNotification(message, type) {
// Create notification element
const notification = document.createElement('div');
notification.className = `notification notification-${type}`;
notification.innerHTML = `
<div class="notification-content">
<i class="bi ${getNotificationIcon(type)}"></i>
<span>${message}</span>
</div>
`;

// Add styles
notification.style.cssText = `
position: fixed;
top: 100px;
right: 20px;
background: ${getNotificationColor(type)};
color: white;
padding: 15px 20px;
border-radius: 5px;
box-shadow: 0 5px 15px rgba(0,0,0,0.2);
z-index: 10000;
animation: slideInRight 0.3s ease;
`;

// Add to body
document.body.appendChild(notification);

// Remove after 3 seconds
setTimeout(() => {
notification.style.animation = 'slideOutRight 0.3s ease';
setTimeout(() => {
document.body.removeChild(notification);
}, 300);
}, 3000);

// Add CSS animations if not already present
if (!document.getElementById('notification-styles')) {
const style = document.createElement('style');
style.id = 'notification-styles';
style.textContent = `
@keyframes slideInRight {
from { transform: translateX(100%); opacity: 0; }
to { transform: translateX(0); opacity: 1; }
}
@keyframes slideOutRight {
from { transform: translateX(0); opacity: 1; }
to { transform: translateX(100%); opacity: 0; }
}
`;
document.head.appendChild(style);
}
}

function getNotificationIcon(type) {
const icons = {
success: 'bi-check-circle',
error: 'bi-x-circle',
warning: 'bi-exclamation-triangle',
info: 'bi-info-circle'
};
return icons[type] || 'bi-info-circle';
}

function getNotificationColor(type) {
const colors = {
success: '#198754',
error: '#dc3545',
warning: '#ffc107',
info: '#0dcaf0'
};
return colors[type] || '#0dcaf0';
}

// Quantity controls for products
function increaseQuantity(productId) {
const input = document.getElementById(`qty-${productId}`);
input.value = parseInt(input.value) + 1;
}

function decreaseQuantity(productId) {
const input = document.getElementById(`qty-${productId}`);
if (input.value > 1) {
input.value = parseInt(input.value) - 1;
}
}

function updateQuantity(productId) {
const input = document.getElementById(`qty-${productId}`);
if (input.value < 1) {
input.value = 1;
}
}