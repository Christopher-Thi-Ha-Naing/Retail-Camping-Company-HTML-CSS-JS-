document.addEventListener("DOMContentLoaded", function () {
    let cartCounter = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartCounter);
    var modal = document.getElementById("myModal");
    var openModalButton = document.getElementById("openModalButton");
    var closeModalButton = document.getElementById("closeModalButton");
    var slideIndex = 0;

    if (openModalButton) {
        openModalButton.onclick = function () {
            modal.style.display = "block";
        };
    }

    if (closeModalButton) {
        closeModalButton.onclick = function () {
            modal.style.display = "none";
        };
    }

    function updateCart() {
        console.log("Update Work");
        const cartList = document.getElementById("cartList");
        const totalAmount = document.getElementById("totalAmount");
        let total = 0;

        if (!cartList || !totalAmount) {
            console.log("Still Working...");
            return;
        }

        cartList.innerHTML = "";
        if (cartCounter.length == 0) {
            console.log("TRUE");
            const cartItem = document.createElement("li");
            cartItem.textContent = "Your Cart is Empty";
            cartList.appendChild(cartItem);
        }
        cartCounter.forEach(item => {

            const cartItem = document.createElement("li");
            cartItem.textContent = `${item.productName} - $${item.price.toFixed(2)}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove Item";
            removeButton.classList.add("remove-from-cart");
            removeButton.setAttribute("data-product-name", item.productName);

            cartItem.appendChild(removeButton);
            cartList.appendChild(cartItem);

            total += item.price;
            console.log("total", total);
        });

        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    updateCart();
    const reviewForm = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");

    if (reviewForm) {
        reviewForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const productName = reviewForm.querySelector("#productName").value;
            const rating = parseInt(reviewForm.querySelector("#rating").value);
            const review = reviewForm.querySelector("#review").value;

            if (productName && rating && review) {
                const reviewCard = document.createElement("div");
                reviewCard.className = "review-card";
                reviewCard.innerHTML = `
                    <h3>${productName}</h3>
                    <div class="rating">${getStarRating(rating)}</div>
                    <p>${review}</p>
                `;

                reviewsList.appendChild(reviewCard);

                // Clear the form fields
                reviewForm.reset();
            }
        });
    }

    function getStarRating(count) {
        const stars = '⭐'.repeat(count);
        return 'Rating: ' + stars;
    }

    let cart = [];

    function addToCart(productName, price) {
        cartCounter.push({ productName, price });
        saveCartToStorage();
        updateCart();
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productContainer = button.closest(".product-item");
            const productName = productContainer.querySelector("h3").textContent;
            const price = parseFloat(productContainer.querySelector(".price").textContent.replace("$", ""));

            addToCart(productName, price);
            console.log("Cart", cartCounter);
        });
    });

    function saveCartToStorage() {
        localStorage.setItem("cart", JSON.stringify(cartCounter));
    }

    window.addEventListener("beforeunload", function () {
        saveCartToStorage();
    });

    $(document).ready(function () {
        $('.slideshow').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true,
        });
    });

    var gallery = new SimpleLightbox('.gallery a', {
        overlay: true,
        spinner: true,
        close: true,
        closeText: 'X',
        swipeClose: true,
        animationSlide: true,
        animationSpeed: 250,
        preloading: true,
    });

    $('.gallery a').on('open.simplelightbox', function () {
        gallery.open();
    });

    function removeFromCart(productName) {
        const index = cartCounter.findIndex(item => item.productName === productName);
        if (index !== -1) {
            cartCounter.splice(index, 1);
            saveCartToStorage();
            updateCart();
    
            // Reattach event listeners for removing items from the cart
            const removeButtons = document.querySelectorAll(".remove-from-cart");
            removeButtons.forEach(button => {
                button.removeEventListener("click", removeItemListener); // Remove the listener
            });
            removeButtons.forEach(button => {
                button.addEventListener("click", removeItemListener); // Add the listener back
            });
        }
    }
    
    // Add event listener for removing items from the cart
    const removeItemListener = function () {
        const productName = this.dataset.productName;
        removeFromCart(productName);
    };
    
    // Attach initial event listeners
    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach(button => {
        button.addEventListener("click", removeItemListener);
    });

    const clearCartButton = document.getElementById("clearCartButton");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", function () {
            clearCart();
        });
    }

    function clearCart() {
        cartCounter = [];
        saveCartToStorage();
        updateCart();
    }
    $('.add-to-cart').alertOnClick({
        'fullscreen': false,
        'closeBtn':true,
        'closeOnEsc':true,
        'closeOnClick':true,
        'content': 'Item added to Basket',
        'size': false,
        'theme': 'black',
        'animationTimeout': 600,
        'btns': [{'text':'OK', 'closeAlert':true, 'theme': 'green' },],
    });
    
});
