/*
* File: main.js
* Description: Main JavaScript file for the Exclusive Books website.
* This file contains all client-side interactivity, including accordions, modals, and animations.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Book Data ---
    // This data is embedded directly to avoid local file loading issues (CORS).
    const allBooksData = [
        {
            "title": "Summer Island",
            "author": "Kristin Hannah",
            "summary": "A heartwarming story about family, love, and the bonds that tie us together.",
            "review": "“A beautifully written novel that captures the essence of summer and the complexities of family relationships.” <strong>4.8/5 Stars</strong>",
            "price": "R400.00",
            "image": "_images/summer_island_bestseller.jpg"
        },
        {
            "title": "The Fallen Angel",
            "author": "Daniel Silva",
            "summary": "A gripping thriller that delves into the world of espionage and international intrigue.",
            "review": "“A masterful blend of suspense and action that keeps readers on the edge of their seats.” <strong>4.7/5 Stars</strong>",
            "price": "R320.00",
            "image": "_images/the_fallen_angel_bestseller.JPG"
        },
        {
            "title": "The Psychology of Money",
            "author": "Morgan Housel",
            "summary": "An insightful exploration of how our relationship with money shapes our lives and decisions.",
            "review": "“A thought-provoking book that challenges conventional wisdom about money and wealth.” <strong>4.6/5 Stars</strong>",
            "price": "R350.00",
            "image": "_images/the_psychology_of_money_bestseller.jpg"
        },
        {
            "title": "Atomic Habits",
            "author": "James Clear",
            "summary": "A practical guide to building good habits and breaking bad ones for lasting change.",
            "review": "“An essential read for anyone looking to improve their habits and achieve their goals.” <strong>4.9/5 Stars</strong>",
            "price": "R300.00",
            "image": "_images/atomic_habits_bestseller.jpg"
        },
        {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "summary": "A classic novel about the American Dream, wealth, and love during the Roaring Twenties.",
            "review": "“A timeless masterpiece that captures the glamour and disillusionment of an era.” <strong>4.5/5 Stars</strong>",
            "price": "R250.00",
            "image": "_images/the_great_gatsby_fiction.jpg"
        },
        {
            "title": "The lost bookshop",
            "author": "Evie Woods",
            "summary": "A magical story about a hidden bookshop and the secrets it holds.",
            "review": "“A charming and enchanting read for anyone who loves books and a touch of mystery.” <strong>4.6/5 Stars</strong>",
            "price": "R360.00",
            "image": "_images/the_lost_bookshop_fiction.jpg"
        },
        {
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "summary": "A powerful story of justice and racial inequality in the American South.",
            "review": "“A profound and moving novel that remains as relevant today as it was when first published.” <strong>4.8/5 Stars</strong>",
            "price": "R280.00",
            "image": "_images/how_to_kill_a_mockingbird_fiction.jpg"
        },
        {
            "title": "The Midnight Library",
            "author": "Matt Haig",
            "summary": "A novel about the choices that go into a life well-lived and the power of second chances.",
            "review": "“A beautifully written and imaginative story that will make you reflect on your own life.” <strong>4.7/5 Stars</strong>",
            "price": "R300.00",
            "image": "_images/the_midnight_library_fiction.jpg"
        },
        {
            "title": "Humankind",
            "author": "Rutger Bregman",
            "summary": "A compelling argument that humans, at their core, are naturally kind and cooperative—even in adversity.",
            "review": "“An uplifting, well-researched reminder of our potential for empathy—refreshing and inspiring in cynical times.” <strong>4/5 Stars</strong>",
            "price": "R370.00",
            "image": "_images/humankind_non_fiction.jpg"
        },
        {
            "title": "All the light we cannot see",
            "author": "Anthony Doerr",
            "summary": "A beautifully woven tale of a blind French girl and a German boy whose paths collide in occupied France during World War II.",
            "review": "“A moving, lyrical story that illuminates the power of hope and resilience in the darkest times.” <strong>4.7/5 Stars</strong>",
            "price": "R350.00",
            "image": "_images/all_the_light_we_cannot_see_non_fiction.jpg"
        },
        {
            "title": "The Hitchhiker's Guide to AI",
            "author": "Arthur Goldstuck",
            "summary": "Explores how AI is shaping Africa and how Africans are innovating with it.",
            "review": "“Goldstuck makes AI easy to understand with relatable examples, showing Africa’s unique role in the tech world.” <strong>4.5/5 Stars</strong>",
            "price": "R360.00",
            "image": "_images/the_hitchhiker's_guide_to_ai_non_fiction.jpg"
        },
        {
            "title": "Surrounded by idiots",
            "author": "Thomas Erikson",
            "summary": "A practical guide to understanding different personality types and improving communication.",
            "review": "“A fascinating read that offers valuable insights into human behavior and interaction.” <strong>4.2/5 Stars</strong>",
            "price": "R300.00",
            "image": "_images/surrounded_by_idiots_non_fiction.jpg"
        },
        {
            "title": "Where the Wild Things Are",
            "author": "Maurice Sendak",
            "summary": "A classic children's story about a young boy named Max who sails away to an island inhabited by Wild Things.",
            "review": "“A timeless adventure that celebrates imagination and the comfort of home.” <strong>4.9/5 Stars</strong>",
            "price": "R150.00",
            "image": "_images/where_the_wild_things_are_children.jpg"
        },
        {
            "title": "The Very Hungry Caterpillar",
            "author": "Eric Carle",
            "summary": "A beloved picture book that follows a caterpillar as it eats its way through a wide variety of foods.",
            "review": "“A beautifully illustrated and educational story that has captivated children for generations.” <strong>5/5 Stars</strong>",
            "price": "R120.00",
            "image": "_images/the_very_hungry_caterpilar_children.jpg"
        },
        {
            "title": "Goodnight Moon",
            "author": "Margaret Wise Brown",
            "summary": "A quiet and soothing bedtime story where a little bunny says goodnight to everything in its room.",
            "review": "“The perfect book to help little ones wind down and prepare for sleep.” <strong>4.8/5 Stars</strong>",
            "price": "R130.00",
            "image": "_images/goodnight_moon_children.jpg"
        },
        {
            "title": "Charlotte's Web",
            "author": "E.B. White",
            "summary": "A heartwarming tale of friendship between a pig named Wilbur and a spider named Charlotte.",
            "review": "“A beautiful story about friendship, life, and death that will stay with you long after you finish it.” <strong>4.9/5 Stars</strong>",
            "price": "R180.00",
            "image": "_images/charlotte's_web_children.jpg"
        },
        { "title": "Becoming", "author": "Michelle Obama", "summary": "An intimate, powerful, and inspiring memoir by the former First Lady of the United States.", "review": "“A deeply personal and reflective memoir that offers a unique window into the life of a remarkable woman.” <strong>4.9/5 Stars</strong>", "price": "R375.00", "image": "_images/becoming_autobiography.jpg" },
        { "title": "I Am Malala", "author": "Malala Yousafzai", "summary": "The remarkable story of a young girl who stood up for education and was shot by the Taliban.", "review": "“An incredibly brave and inspiring story that will move you to tears and fill you with hope.” <strong>4.8/5 Stars</strong>", "price": "R350.00", "image": "_images/i_am_malala_autobiography.jpg" },
        { "title": "Long Walk to Freedom", "author": "Nelson Mandela", "summary": "The autobiography of Nelson Mandela, a global icon and one of the most influential leaders of our time.", "review": "“A powerful and moving account of a life dedicated to the fight for freedom and justice.” <strong>5/5 Stars</strong>", "price": "R400.00", "image": "_images/long_walk_to_freedom_autobiography.jpg" },
        { "title": "The Diary of a Young Girl", "author": "Anne Frank", "summary": "The diary of a young Jewish girl who hid with her family during the Nazi occupation of the Netherlands.", "review": "“A poignant and powerful testament to the human spirit in the face of unimaginable adversity.” <strong>4.9/5 Stars</strong>", "price": "R320.00", "image": "_images/the_diary_of_a_young_girl_autobiography.jpg" },
        { "title": "Once Upon a Broken Heart", "author": "Stephanie Garber", "summary": "A whimsical and romantic fantasy about a girl who believes in true love and a prince who can't be trusted.", "review": "“A magical and enchanting story that will sweep you off your feet.” <strong>4.7/5 Stars</strong>", "price": "R320.00", "image": "_images/once_upon_a_broken_heart_booktok.jpg" },
        { "title": "The Love Hypothesis", "author": "Ali Hazelwood", "summary": "A fake relationship between two scientists leads to unexpected and hilarious consequences.", "review": "“A smart, funny, and swoon-worthy romance that will have you rooting for the main characters.” <strong>4.6/5 Stars</strong>", "price": "R300.00", "image": "_images/the_love_hypothesis_booktok.jpg" },
        { "title": "Shatter Me", "author": "Tahereh Mafi", "summary": "A thrilling dystopian novel about a girl with a lethal touch and the two boys who want to use her as a weapon.", "review": "“A captivating and action-packed story with a unique and compelling protagonist.” <strong>4.5/5 Stars</strong>", "price": "R280.00", "image": "_images/shatter_me_booktok.jpg" },
        { "title": "The Cruel Prince", "author": "Holly Black", "summary": "A mortal girl gets caught in a web of intrigue and danger in the High Court of Faerie.", "review": "“A dark and enchanting fantasy with a fierce and unforgettable heroine.” <strong>4.8/5 Stars</strong>", "price": "R310.00", "image": "_images/the_cruel_prince_booktok.jpg" },
        { "title": "Bhagavad Gita", "author": "Eknath Easwaran", "summary": "An ancient Indian scripture that offers profound insights into the nature of reality and the path to spiritual enlightenment.", "review": "“A timeless classic that continues to inspire and guide readers on their spiritual journey.” <strong>4.9/5 Stars</strong>", "price": "R200.00", "image": "_images/the_bhagvad_gita_religion.jpg" },
        { "title": "Quran", "author": "Muhammad Asad", "summary": "The central religious text of Islam, believed by Muslims to be a revelation from God.", "review": "“A sacred text that offers guidance, wisdom, and inspiration to millions of people around the world.” <strong>5/5 Stars</strong>", "price": "R250.00", "image": "_images/quran_religion.jpg" },
        { "title": "The Bible", "author": "Various Authors", "summary": "A collection of sacred texts or scriptures that are central to Judaism and Christianity.", "review": "“A foundational text that has shaped the course of history and continues to be a source of inspiration and guidance.” <strong>5/5 Stars</strong>", "price": "R300.00", "image": "_images/the_bible_religion.jpg" },
        { "title": "Tao Te Ching", "author": "Lao Tzu", "summary": "A classic Chinese text that offers profound wisdom on the art of living in harmony with the Tao.", "review": "“A timeless masterpiece that offers a path to inner peace and a deeper understanding of the universe.” <strong>4.8/5 Stars</strong>", "price": "R180.00", "image": "_images/tao_te_ching_religion.jpg" },
        { "title": "Einstein: His Life and Universe", "author": "Walter Isaacson", "summary": "A comprehensive biography of Albert Einstein, exploring his scientific achievements and personal life.", "review": "“A detailed and engaging portrayal of one of history’s greatest minds.” <strong>4.6/5 Stars</strong>", "price": "R450.00", "image": "_images/einstein_his_life_and_universe_biography.jpg" },
        { "title": "Napoleon: A Concise Biography", "author": "David A. Bell", "summary": "A concise biography of Napoleon Bonaparte, detailing his rise to power and military campaigns.", "review": "“A well-written and accessible overview of a complex historical figure.” <strong>4.3/5 Stars</strong>", "price": "R299.00", "image": "_images/napoleon_concise_biography.jpg" },
        { "title": "Elon Musk", "author": "Walter Isaacson", "summary": "Chronicles the life of the visionary entrepreneur behind Tesla, SpaceX, and other ventures.", "review": "“An insightful look into the mind of a modern innovator.” <strong>4.5/5 Stars</strong>", "price": "R500.00", "image": "_images/elon_musk_biography.jpg" },
        { "title": "Biography: An Historiography", "author": "Melanie Nolan", "summary": "Explores the evolution of biographical writing and its significance in understanding history.", "review": "“A fascinating exploration of the art and craft of biography.” <strong>4.4/5 Stars</strong>", "price": "R350.00", "image": "_images/biography_an_historiography.jpg" }
    ];

    // --- 1. Accordion for About Us Page ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const header = item.querySelector('h3');
            const content = item.querySelector('p');

            // Hide all content sections by default
            content.style.display = 'none';

            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                // Toggle active class for styling
                header.classList.toggle('active');

                // Toggle display of content
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
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

        // Always redirect to the global search page for a consistent user experience.
        // This ensures that a search for a book or event will search the entire site,
        // regardless of the page the user is currently on.
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
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

            // Use the embedded book data directly instead of fetching a file.
            try {
                const filteredBooks = allBooksData.filter(book => {
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
            } catch (error) {
                console.error('Error processing book data:', error);
                resultsContainer.innerHTML = '<p>There was an error displaying book data. Please try again later.</p>';
            }
        } else {
            resultsHeading.textContent = 'Please enter a search term.';
        }
    }

    // --- NEW: Global Sorting Logic for Category Pages ---
    // This logic works on any page with a sort dropdown and a book grid.
    const sortDropdown = document.getElementById('sort-by-price');
    const bookGrid = document.querySelector('.book-grid');
    const mainContent = document.querySelector('main'); // Get the main content area

    if (sortDropdown && bookGrid) {
        sortDropdown.addEventListener('change', (e) => {
            const sortValue = e.target.value;

            if (sortValue === 'default') {
                // A simple way to reset to the original order is to reload the page.
                window.location.reload();
                return;
            }

            // Create a mutable copy of all books to be sorted
            let sortedBooks = [...allBooksData];

            // Sort the entire book collection based on the selected option
            sortedBooks.sort((a, b) => {
                const priceA = parseFloat(a.price.replace('R', ''));
                const priceB = parseFloat(b.price.replace('R', ''));
                return sortValue === 'asc' ? priceA - priceB : priceB - priceA;
            });

            // Create a new, clean layout for the sorted results, similar to the search page
            if (mainContent) {
                mainContent.innerHTML = `
                    <section class="content-section">
                        <h2>All Books Sorted by Price</h2>
                        <div class="book-grid" id="sorted-results-grid">
                            <!-- Sorted books will be inserted here -->
                        </div>
                    </section>
                `;
                const newGrid = document.getElementById('sorted-results-grid');
                displayBooks(sortedBooks, newGrid);
            }
        });
    }

    // Helper function to display books on the search results page (search.html)
    function displayBooks(books, container) {
        container.innerHTML = ''; // Clear previous results
        books.forEach(book => {
            // The data-* attributes are crucial for the "Add to Cart" functionality to work correctly.
            // They store the book's details, which are read when the button is clicked.
            // The price is parsed to a number to ensure it's handled correctly in the cart logic.
            const priceValue = parseFloat(book.price.replace('R', ''));

            const bookCardHTML = `
                <div class="book-card" data-title="${book.title}" data-author="${book.author}" data-price="${priceValue}" data-image="${book.image}">
                    <img src="${book.image}" alt="${book.title}">
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p class="author">${book.author}</p>
                        <p class="summary">${book.summary}</p>
                        <p><strong>Review/Rating:</strong> ${book.review}</p>
                        <p class="price">${book.price}</p>
                        <a href="#" class="btn">Add to Cart</a>
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

    // --- 10. Enquiry Form Processing ---
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission (page reload)

            const name = document.getElementById('name').value;
            const enquiryType = document.getElementById('enquiry-type').value;
            const formResponseContainer = document.getElementById('form-response');

            let responseMessage = '';

            // Process the enquiry type to generate a dynamic response, like the example project
            switch (enquiryType) {
                case 'stock':
                    responseMessage = `
                        <h3>Thank you, ${name}!</h3>
                        <p>For stock availability, please include the book title and author in your message. Our team will check our inventory and get back to you within 2-3 business hours.</p>
                        <p>Reference: PROD-${Date.now()}</p>
                    `;
                    break;
                case 'order_status':
                    responseMessage = `
                        <h3>Thank you, ${name}!</h3>
                        <p>For questions about an online order, please include your order number in the message. Our support team will provide you with an update as soon as possible.</p>
                        <p>Reference: ORD-${Date.now()}</p>
                    `;
                    break;
                case 'loyalty':
                    responseMessage = `
                        <h3>Thank you for your interest, ${name}!</h3>
                        <p>We're happy to help with your loyalty program query. Our team will review your message and respond with information about your points and benefits shortly.</p>
                        <p>Reference: LOYAL-${Date.now()}</p>
                    `;
                    break;
                case 'event':
                    responseMessage = `
                        <h3>Thank you, ${name}!</h3>
                        <p>For more information about our events, please specify the event name or date in your message. Our events coordinator will get back to you with all the details.</p>
                        <p>Reference: EVENT-${Date.now()}</p>
                    `;
                    break;
            }

            // Hide the form and display the response message
            enquiryForm.style.display = 'none';
            formResponseContainer.innerHTML = responseMessage;
            formResponseContainer.style.display = 'block';
        });
    }

    // --- 11. Welcome Modal Logic ---
    const welcomeModal = document.getElementById('welcome-modal');
    if (welcomeModal) {
        const closeModalBtn = document.getElementById('modal-close-btn');
        const enterSiteBtn = document.getElementById('modal-enter-btn');

        // Function to close the modal and show the main content
        const closeModal = () => {
            welcomeModal.classList.remove('visible');
            // Find all hidden content and make it visible
            document.querySelectorAll('.content-hidden').forEach(el => {
                el.style.visibility = 'visible';
                el.style.opacity = '1';
                el.style.transition = 'opacity 0.5s ease-in';
            });
        };

        // Show modal only if it hasn't been shown in this session
        if (!sessionStorage.getItem('welcomeModalShown')) {
            // Hide content immediately if modal will be shown
            document.querySelectorAll('.content-hidden').forEach(el => el.style.transition = 'none');
            // Use a small delay to let the page render first
            setTimeout(() => {
                welcomeModal.classList.add('visible');
                sessionStorage.setItem('welcomeModalShown', 'true');
            }, 500);
        }

        // If the modal was already shown, just reveal the content immediately
        if (sessionStorage.getItem('welcomeModalShown')) {
            closeModal();
        }

        // Event listeners to close the modal
        closeModalBtn.addEventListener('click', closeModal);
        enterSiteBtn.addEventListener('click', closeModal);
        // Also close if user clicks on the dark overlay background
        welcomeModal.addEventListener('click', (e) => {
            if (e.target === welcomeModal) { closeModal(); }
        });
    }

    // --- 12. Contact Form Mailto Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const name = contactForm.querySelector('#name').value;
            const messageType = contactForm.querySelector('#message-type').value;

            // Check if the message type is a complaint
            if (messageType === 'Complaint') {
                // --- Logic to open email client for complaints ---
                const userEmail = contactForm.querySelector('#email').value;
                const subject = contactForm.querySelector('#subject').value;
                const message = contactForm.querySelector('#message').value;
                const recipientEmail = 'exclusivebooks@gmail.com';

                const emailSubject = `[${messageType}] - ${subject}`;
                const emailBody = `
Hello,

${message}

--------------------------------
From: ${name}
Email: ${userEmail}
                `;

                // Create and trigger the mailto link
                window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            } else {
                // --- Logic for all other message types (show on-page response) ---
                const formResponseContainer = document.getElementById('form-response');
                const responseMessage = `<h3>Thank you, ${name}!</h3><p>We have received your feedback and will get back to you shortly.</p>`;

                contactForm.style.display = 'none';
                formResponseContainer.innerHTML = responseMessage;
                formResponseContainer.style.display = 'block';
            }
        });
    }
});