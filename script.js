document.addEventListener("DOMContentLoaded", function () {
    let cartCounter= JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartCounter);
    var modal = document.getElementById("myModal");
    var openModalButton = document.getElementById("openModalButton");
    var closeModalButton = document.getElementById("closeModalButton");
    var slideIndex = 0;

    // showSlides();

    if(openModalButton){
        openModalButton.onclick = function () {
            modal.style.display = "block";
        }
    }
    
    if(closeModalButton){
        closeModalButton.onclick = function () {
            modal.style.display = "none";
        }
    }
    
    // function showSlides() {
    //     var slides = document.getElementsByClassName("slideshow-image");
    //     if (slides.length === 0) {
    //         return; // No slides found, exit the function
    //     }
    
    //     for (var i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
    //     slideIndex++;
    //     if (slideIndex > slides.length) {
    //         slideIndex = 1;
    //     }
    //     slides[slideIndex - 1].style.display = "block";
    //     setTimeout(showSlides, 2000); // Change image every 2 seconds
    // }


    function updateCart() {
        console.log("Update Work")
        const cartList = document.getElementById("cartList");
        const totalAmount = document.getElementById("totalAmount");
        let total = 0;
    
        if (!cartList || !totalAmount) {
            console.log("Still Working...")
            return; // Return if the elements are not found yet
        }
    
        cartList.innerHTML = "";
        if(cartCounter.length==0){
            console.log("TRUE")
            const cartItem = document.createElement("li");
            cartItem.textContent = "Your Cart is Empty";
            cartList.appendChild(cartItem);
        }
        cartCounter.forEach(item => {
            
            const cartItem = document.createElement("li");
            cartItem.textContent = `${item.productName} - $${item.price.toFixed(2)}`;
            cartList.appendChild(cartItem);
    
            total += item.price;
            console.log("total",total);
        });
    
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }
    
   updateCart();
    const reviewForm = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");

    if(reviewForm){
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
        return 'Rating: '+stars;
    }
});

let cart = [];
function addToCart(productName, price) {
    cart.push({ productName, price });
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
        console.log("Cart",cart);
    });
});

function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

window.addEventListener("beforeunload", function () {
    saveCartToStorage();
});

$(document).ready(function(){
    $('.slideshow').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
    });
});

var gallery =new SimpleLightbox('.gallery a', {
    overlay:true,
    spinner:true,
    close:true,
    closeText:'X',
    swipeClose:true,
    animationSlide:true,
    animationSpeed: 250,
    preloading:true,
});
$('.gallery a').on('open.simplelightbox',function () {
    gallery.open();
});

function updateCart() {
    console.log("Update Work")
    const cartList = document.getElementById("cartList");
    const totalAmount = document.getElementById("totalAmount");
    let total = 0;

    if (!cartList || !totalAmount) {
        console.log("Still Working...")
        return; // Return if the elements are not found yet
    }

    cartList.innerHTML = "";
    if(cartCounter.length==0){
        console.log("TRUE")
        const cartItem = document.createElement("li");
        cartItem.textContent = "Your Cart is Empty";
        cartList.appendChild(cartItem);
    }
    cartCounter.forEach(item => {
        
        const cartItem = document.createElement("li");
        cartItem.textContent = `${item.productName} - $${item.price.toFixed(2)}`;
        cartList.appendChild(cartItem);

        total += item.price;
        console.log("total",total);
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
}
