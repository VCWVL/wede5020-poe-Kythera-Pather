/*
* File: main.js
* Description: Main JavaScript file for the Exclusive Books website.
* This file contains all client-side interactivity, including accordions, modals, and animations.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Accordion for About Us Page ---
    const aboutBlocks = document.querySelectorAll('.about-block');
    if (aboutBlocks.length > 0) {
        aboutBlocks.forEach((block, index) => {
            const header = block.querySelector('h3');
            const content = block.querySelectorAll('p, .team-grid');

            // Hide all content sections except the first one
            if (index > 0) {
                content.forEach(c => c.style.display = 'none');
            } else {
                header.classList.add('active'); // Mark the first one as active
            }

            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                // Toggle active class for styling
                header.classList.toggle('active');

                // Toggle display of content
                content.forEach(c => {
                    c.style.display = c.style.display === 'none' ? 'block' : 'none';
                });
            });
        });
    }

    // --- 2. Image Lightbox/Modal ---
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.display = 'none';
    document.body.appendChild(lightbox);

    const imagesToLightbox = document.querySelectorAll('.book-card img, .event-card img');
    imagesToLightbox.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', e => {
            lightbox.style.display = 'flex';
            const img = document.createElement('img');
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.style.display = 'none';
    });

    // --- 3. Interactive Calendar on Events Page ---
    const eventDateButton = document.querySelector('.calendar-picker .btn');
    if(eventDateButton) {
        eventDateButton.addEventListener('click', () => {
            const dateInput = document.getElementById('event-date');
            if (dateInput.value) {
                alert(`Checking for events on: ${new Date(dateInput.value).toLocaleDateString()}`);
            } else {
                alert('Please select a date first.');
            }
        });
    }

    // --- 4. Scroll Animations ---
    const animatedElements = document.querySelectorAll('.content-section, .book-card, .event-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.classList.add('fade-in-hidden');
        observer.observe(el);
    });

    // Helper function to create a "No Results" message
    function createNoResultsMessage(container) {
        let message = container.querySelector('.no-results-message');
        if (!message) {
            message = document.createElement('p');
            message.className = 'no-results-message'; // Add a class for easier selection
            message.textContent = 'No items match your filter.';
            message.style.display = 'none';
            message.style.textAlign = 'center';
            container.appendChild(message);
        }
        return message;
    }

    // Helper function to apply local filtering to a grid
    function applyLocalFilter(searchTerm, gridSelector, cardSelector, textSelectors, noResultsMessageElement) {
        const grid = document.querySelector(gridSelector);
        if (!grid) return;

        const cards = grid.querySelectorAll(cardSelector);
        let visibleCount = 0;

        cards.forEach(card => {
            let match = false;
            for (const selector of textSelectors) {
                const textElement = card.querySelector(selector);
                if (textElement && textElement.textContent.toLowerCase().includes(searchTerm)) {
                    match = true;
                    break;
                }
            }
            card.style.display = match ? 'flex' : 'none';
            if (match) visibleCount++;
        });

        if (noResultsMessageElement) {
            noResultsMessageElement.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // --- 5. Dynamic Content Filtering (Books & Events) ---
    const bookFilterInput = document.getElementById('book-filter');
    if (bookFilterInput) {
        const bookGrid = document.querySelector('.book-grid');
        const noResultsMessage = createNoResultsMessage(bookGrid.parentElement);
        bookFilterInput.addEventListener('input', (e) => {
            applyLocalFilter(e.target.value.toLowerCase(), '.book-grid', '.book-card', ['h3', '.author'], noResultsMessage);
        });
    }

    const eventFilterInput = document.getElementById('event-filter');
    if (eventFilterInput) {
        const eventsGrid = document.querySelector('.events-grid');
        const noResultsMessage = createNoResultsMessage(eventsGrid.parentElement);
        eventFilterInput.addEventListener('input', (e) => {
            applyLocalFilter(e.target.value.toLowerCase(), '.events-grid', '.event-card', ['h3', 'p:nth-of-type(3)'], noResultsMessage);
        });
    }

    // --- 6. Header Search Bar Functionality ---
    const headerSearchInput = document.getElementById('header-search-input');
    const headerSearchButton = document.getElementById('header-search-button');

    const performSearch = () => {
        const query = headerSearchInput.value.trim();

        if (!query) {
            alert('Please enter a search term.');
            return;
        }

        const currentPage = window.location.pathname;

        // Check if current page is an events page
        if (currentPage.endsWith('events.html')) {
            // If on events page, apply local filter and pre-fill local input
            const eventFilterInput = document.getElementById('event-filter');
            const eventsGrid = document.querySelector('.events-grid');
            const noResultsMessage = createNoResultsMessage(eventsGrid.parentElement);

            if (eventFilterInput) {
                eventFilterInput.value = query; // Pre-fill local filter
            }
            applyLocalFilter(query.toLowerCase(), '.events-grid', '.event-card', ['h3', 'p:nth-of-type(3)'], noResultsMessage);

        } else if (currentPage.endsWith('index.html') ||
                   currentPage.endsWith('fiction.html') ||
                   currentPage.endsWith('non-fiction.html') ||
                   currentPage.endsWith('children.html') ||
                   currentPage.endsWith('autobiographies.html') ||
                   currentPage.endsWith('bookTok.html') ||
                   currentPage.endsWith('religion.html') ||
                   currentPage.endsWith('biography.html') ||
                   currentPage === '/') { // Handle root path for index.html
            // If on a book category page or index, apply local filter and pre-fill local input
            const bookFilterInput = document.getElementById('book-filter');
            const bookGrid = document.querySelector('.book-grid');
            const noResultsMessage = createNoResultsMessage(bookGrid.parentElement);

            if (bookFilterInput) {
                bookFilterInput.value = query; // Pre-fill local filter
            }
            applyLocalFilter(query.toLowerCase(), '.book-grid', '.book-card', ['h3', '.author'], noResultsMessage);

        } else {
            // For all other pages, redirect to the global search.html
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    };

    if (headerSearchButton) {
        headerSearchButton.addEventListener('click', performSearch);
    }
    if (headerSearchInput) {
        headerSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    // --- 7. Search Results Page Logic ---
    // Check if we are on the search.html page
    if (window.location.pathname.endsWith('search.html')) {
        const resultsContainer = document.getElementById('search-results-container');
        const resultsHeading = document.getElementById('search-results-heading');
        const noResultsMessage = document.getElementById('no-results-message');

        const params = new URLSearchParams(window.location.search);
        const query = params.get('q');

        if (query) {
            resultsHeading.textContent = `Search Results for: "${query}"`;
            // Pre-fill the search bar on the results page
            if(headerSearchInput) headerSearchInput.value = query;

            // Fetch the book data and perform the search
            fetch('js/books.json')
                .then(response => response.json())
                .then(books => {
                    const filteredBooks = books.filter(book => {
                        const searchTerm = query.toLowerCase();
                        const title = book.title.toLowerCase();
                        const author = book.author.toLowerCase();
                        return title.includes(searchTerm) || author.includes(searchTerm);
                    });

                    if (filteredBooks.length > 0) {
                        displayBooks(filteredBooks, resultsContainer);
                    } else {
                        noResultsMessage.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error fetching book data:', error);
                    resultsContainer.innerHTML = '<p>There was an error loading book data. Please try again later.</p>';
                });
        } else {
            resultsHeading.textContent = 'Please enter a search term.';
        }
    }

    // Helper function to display books on the search results page (search.html)
    // This function remains unchanged as it's specific to search.html's dynamic content loading.
    function displayBooks(books, container) {
        container.innerHTML = ''; // Clear previous results
        books.forEach(book => {
            const bookCardHTML = `
                <div class="book-card">
                    <img src="${book.image}" alt="${book.title}">
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p class="author">${book.author}</p>
                        <p class="price">${book.price}</p>
                        <a href="cart.html" class="btn">Add to Cart</a>
                    </div>
                </div>`;
            container.innerHTML += bookCardHTML;
        });
    }

    // --- 8. Shopping Cart Functionality ---

    // Add to Cart button listener
    document.body.addEventListener('click', function(e) {
        if (e.target && (e.target.matches('.btn[href="#"]') || e.target.matches('.btn[href="cart.html"]'))) {
            e.preventDefault(); // Prevent page jump
            const card = e.target.closest('.book-card');
            if (card) {
                const book = {
                    title: card.dataset.title,
                    author: card.dataset.author,
                    price: parseFloat(card.dataset.price), // Now that data-price is guaranteed numeric
                    image: card.dataset.image,
                    quantity: 1
                };
                addToCart(book);
            }
        }
    });

    function addToCart(book) {
        console.log('Attempting to add to cart:', book); // Debugging line
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        
        // Check if book is already in cart
        const existingBookIndex = cart.findIndex(item => item.title === book.title);

        if (existingBookIndex > -1) {
            // If it exists, increment quantity
            cart[existingBookIndex].quantity += 1;
        } else {
            // If not, add it to the cart
            cart.push(book);
        }

        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        alert(`"${book.title}" has been added to your cart.`);
    }

    // Display Cart Items on cart.html
    if (window.location.pathname.endsWith('cart.html')) {
        const cartTableBody = document.querySelector('.styled-table tbody');
        const cartSummary = document.querySelector('.cart-summary');
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

        function displayCart() {
            cartTableBody.innerHTML = ''; // Clear existing rows
            let grandTotal = 0;

            if (cart.length === 0) {
                cartTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Your cart is empty.</td></tr>';
                cartSummary.innerHTML = '<h3>Total Amount: R0.00</h3>';
                return;
            }

            cart.forEach((item, index) => {
                const total = item.price * item.quantity;
                grandTotal += total;

                const row = `
                    <tr>
                        <td><img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto; margin-right: 10px;">${item.title}</td>
                        <td>${item.author}</td>
                        <td>R${item.price.toFixed(2)}</td>
                        <td>${item.quantity}</td>
                        <td>R${total.toFixed(2)}</td>
                        <td><button class="btn-remove" data-index="${index}">Remove</button></td>
                    </tr>
                `;
                cartTableBody.innerHTML += row;
            });

            cartSummary.querySelector('h3').textContent = `Total Amount: R${grandTotal.toFixed(2)}`;
        }

        // Handle item removal
        cartTableBody.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('btn-remove')) {
                const itemIndex = parseInt(e.target.dataset.index, 10);
                cart.splice(itemIndex, 1); // Remove item from array
                localStorage.setItem('shoppingCart', JSON.stringify(cart)); // Update localStorage
                displayCart(); // Re-render the cart
            }
        });

        // Handle clear cart
        const clearCartButton = document.getElementById('clear-cart-btn');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear your cart?')) {
                    cart = [];
                    localStorage.removeItem('shoppingCart');
                    displayCart();
                }
            });
        }

        displayCart();
    }

    // --- 9. Proceed to Checkout Page Logic ---
    if (window.location.pathname.endsWith('proceedCheckout.html')) {
        const checkoutItemsContainer = document.getElementById('checkout-items-container');
        const checkoutTotalElement = document.getElementById('checkout-total');
        const confirmPurchaseBtn = document.getElementById('confirm-purchase-btn');
        const purchaseConfirmationMessage = document.getElementById('purchase-confirmation-message');

        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

        function displayCheckoutSummary() {
            checkoutItemsContainer.innerHTML = ''; // Clear previous items
            let grandTotal = 0;

            if (cart.length === 0) {
                checkoutItemsContainer.innerHTML = '<p style="text-align: center;">Your cart is empty. Please add items before proceeding to checkout.</p>';
                checkoutTotalElement.textContent = 'R0.00';
                confirmPurchaseBtn.style.display = 'none'; // Hide confirm button if cart is empty
                return;
            }

            cart.forEach(item => {
                const total = item.price * item.quantity;
                grandTotal += total;

                const itemDiv = `
                    <div class="checkout-item">
                        <img src="${item.image}" alt="${item.title}" style="width: 70px; height: auto; margin-right: 15px;">
                        <div class="item-details">
                            <h4>${item.title}</h4>
                            <p>${item.author}</p>
                            <p>Price: R${item.price.toFixed(2)}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                        <div class="item-total">
                            R${total.toFixed(2)}
                        </div>
                    </div>
                `;
                checkoutItemsContainer.innerHTML += itemDiv;
            });

            checkoutTotalElement.textContent = `R${grandTotal.toFixed(2)}`;
            confirmPurchaseBtn.style.display = 'block'; // Show confirm button
        }

        if (confirmPurchaseBtn) {
            confirmPurchaseBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to confirm your purchase?')) {
                    localStorage.removeItem('shoppingCart'); // Clear the cart
                    cart = []; // Empty the local cart array
                    displayCheckoutSummary(); // Update display to show empty cart
                    purchaseConfirmationMessage.style.display = 'block'; // Show success message
                    confirmPurchaseBtn.style.display = 'none'; // Hide confirm button
                    // Optionally, redirect after a short delay
                    setTimeout(() => {
                        alert('Thank you for your purchase! Your order has been placed.');
                        window.location.href = 'index.html'; // Redirect to home page
                    }, 3000);
                }
            });
        }

        displayCheckoutSummary();
    }
});