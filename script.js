document.addEventListener("DOMContentLoaded", function () {
    let cartCounter= JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartCounter);
    var modal = document.getElementById("myModal");
    var openModalButton = document.getElementById("openModalButton");
    var closeModalButton = document.getElementById("closeModalButton");
    var slideIndex = 0;

    showSlides();

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
    
    function showSlides() {
        var slides = document.getElementsByClassName("slideshow-image");
        if (slides.length === 0) {
            return; // No slides found, exit the function
        }
    
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }


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
});

let cart = [];
function addToCart(productName, price) {
    cart.push({ productName, price });
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

