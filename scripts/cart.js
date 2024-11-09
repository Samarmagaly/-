let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(button) {
    // Get the closest card element from the button
    const card = button.closest('.card');

    const productName = card.querySelector('.productName').textContent.trim();
    const productPrice = parseFloat(card.querySelector('.productPrice').textContent.trim());

    //  product already exists 
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        //  increase the quantity
        existingProduct.quantity++;
    } else {

        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("تمت إضافة المنتج إلى العربة!");
}


// search
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');

// Show/hide search bar 
searchIcon.addEventListener('click', function(event) {
    event.preventDefault();
    searchBar.style.display = searchBar.style.display === 'none' || searchBar.style.display === '' ? 'block' : 'none';
    if (searchBar.style.display === 'block') searchBar.focus(); // Focus input if shown
});


function clearHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach((highlight) => {
        highlight.classList.remove('highlight');
        highlight.outerHTML = highlight.innerText; // Restore original text
    });
}


document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value;
    clearHighlights();

    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'g'); // Regular expression to match Arabic characters
        document.querySelectorAll('h4').forEach(header => {
            const originalText = header.innerHTML;
            const newText = originalText.replace(regex, (match) => `<span class="highlight">${match}</span>`);
            header.innerHTML = newText; // Replace HTML with highlighted text
        });
    }
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'g');
        characters
        document.querySelectorAll('p').forEach(paragraph => {
            const originalText = paragraph.innerHTML;
            const newText = originalText.replace(regex, (match) => `<span class="highlight">${match}</span>`);
            paragraph.innerHTML = newText;
        });
    } else {
        alert('لا توجد هذه الكلمه')
    }
});