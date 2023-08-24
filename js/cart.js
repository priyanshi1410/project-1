import Navbar from '../components/nav.js';

document.getElementById('navbar').innerHTML = Navbar()

const createQuantityDiv = () => {
    const quantityDiv = document.createElement("div");
    quantityDiv.id = "Quantitys";

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.addEventListener("click", () => {
        const quantityDisplay = quantityDiv.querySelector(".quantity-display");
        let currentQuantity = parseInt(quantityDisplay.textContent);
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityDisplay.textContent = currentQuantity;
            updateTotalPrice(quantityDiv);
            updateCartTotals();
        }
    });

    const quantityDisplay = document.createElement("span");
    quantityDisplay.className = "quantity-display";
    quantityDisplay.textContent = "1";

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", () => {
        const quantityDisplay = quantityDiv.querySelector(".quantity-display");
        let currentQuantity = parseInt(quantityDisplay.textContent);
        currentQuantity++;
        quantityDisplay.textContent = currentQuantity;
        updateTotalPrice(quantityDiv);
        updateCartTotals();
    });

    quantityDiv.append(minusButton, quantityDisplay, plusButton);
    return quantityDiv;
};

const updateTotalPrice = (quantityDiv) => {
    const priceElement = quantityDiv.parentNode.querySelector("h4");
    const quantityDisplay = quantityDiv.querySelector(".quantity-display");
    const totalElement = quantityDiv.parentNode.querySelector("h2");

    const price = parseFloat(priceElement.textContent);
    const quantity = parseInt(quantityDisplay.textContent);

    const totalPrice = price * quantity;
    totalElement.textContent = `${totalPrice.toFixed(2)}`;
};

const calculateCartTotal = () => {
    const totalElements = document.querySelectorAll("#box-3 h2");
    let totalPrice = 0;

    totalElements.forEach(totalElement => {
        const productTotal = parseFloat(totalElement.textContent);
        totalPrice += productTotal;
    });

    return totalPrice;
};

// Update the cart totals and proceed to checkout button
const updateCartTotals = () => {
    const cartSubtotalElement = document.querySelector("#subtotal table tr:nth-child(1) td:last-child");
    const cartTotalElement = document.querySelector("#subtotal table tr:last-child td:last-child strong");

    const cartSubtotal = calculateCartTotal();
    cartSubtotalElement.textContent = cartSubtotal.toFixed(2);
    cartTotalElement.textContent = cartSubtotal.toFixed(2);
};


const display = (data) => {
    document.getElementById("box-3").innerHTML = ''
    data.map((product) => {
        let img = document.createElement("img");
        img.src = product.image
        let title = document.createElement("h3");
        title.innerHTML = product.title
        let price = document.createElement("h4");
        price.innerHTML = product.price
        let category = document.createElement("p");
        category.innerHTML = product.category
        let btn1 = document.createElement("h5");
        btn1.innerHTML ="1"
        let rating = document.createElement("span");
        rating.innerHTML = product.rating.rate
        let total = document.createElement("h2");
        total.innerHTML = product.price
        if (product.rating.rate > 4) {
            rating.style.color = "green"
        }
        else if (product.rating.rate <= 4 && product.rating.rate >= 3) {
            rating.style.color = "#666666"
        }
        else {
            rating.style.color = "red"
        }
      
        let div = document.createElement("div");
        div.append(img, title, price, category, createQuantityDiv(), rating , total )
        document.getElementById("box-3").append(div);
    });
}
fetch(" http://localhost:3000/cart")
    .then(response => response.json())
    .then(data => {
        display(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

    const proceedToCheckout = () => {
   
        alert("Order placed successfully! Thank you for shopping with us.");
    
        document.getElementById("box-3").innerHTML = "";
    
        updateCartTotals();
    };
    
    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", proceedToCheckout);
    
    