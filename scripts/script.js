// Retrieve the cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let total = 0;

    // Clear previous cart content
    cartItems.innerHTML = '';


    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <tr >
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>${item.price.toFixed(2)} جنيه</td>
                <td>${itemTotal.toFixed(2)} جنيه</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">حذف</button></td>
            </tr>`;
    });

    totalPriceElement.textContent = total.toFixed(2);
}

//  update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove item if quantity goes to 0
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();

}


function checkout() {

    alert('جارِ إتمام عملية الشراء...');
    localStorage.removeItem('cart');
    cart = [];
    displayCart();
}

// Display cart items when the page loads
document.addEventListener("DOMContentLoaded", displayCart);