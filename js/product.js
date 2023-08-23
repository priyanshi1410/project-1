import Navbar from '../components/nav.js';

document.getElementById('navbar').innerHTML = Navbar()


const display = (data) => {
    document.getElementById("box-2").innerHTML=''
    data.map((product) => {
        let img = document.createElement("img");
        img.src = product.image
        let title = document.createElement("h3");
        title.innerHTML = product.title
        let price = document.createElement("h4");
        price.innerHTML = product.price
        let category = document.createElement("p");
        category.innerHTML = product.category
        let rating = document.createElement("span");
        rating.innerHTML = product.rating.rate
        if (product.rating.rate > 4) {
            rating.style.color = "green"
        }
        else if (product.rating.rate <= 4 && product.rating.rate >= 3) {
            rating.style.color = "#666666"
        }
        else {
            rating.style.color = "red"
        }
        let btn = document.createElement("button");
        btn.innerHTML = "Buy Now"
        btn.addEventListener("click",()=>{
            let loggedIn = localStorage.getItem("loggedIn");
            if(loggedIn){
                fetch("http://localhost:3000/cart", {
                        method: "POST",
                        headers: { "content-Type": "application/json" },
                        body: JSON.stringify(product),
                    });
            }
            else{
                alert("first the login")
                setTimeout(()=>{
                    window.location.href="/pages/login.html";
                },1000)
            }
        })
        let div = document.createElement("div");
        div.append(img, title, price, category, rating, btn)
        document.getElementById("box-2").append(div);
    });
}

let products;

fetch("http://localhost:3000/product")
    .then((response) => response.json())
    .then((response) => {
        products = response; 
        display(products);
    });

// Sorting by price
const handlelth = () => {
    let sorting = products.sort((a, b) => a.price - b.price); 
    display(sorting);
};
document.getElementById("lth").addEventListener("click", handlelth);
const hendlehtl = () => {
    let sorting = products.sort((a, b) => b.price - a.price);
    display(sorting);
}

document.getElementById("htl").addEventListener("click", hendlehtl);

// filter products by category 

const handleCategory = (cat) => {
    let data = products.filter((value) => value.category == cat)
    display(data);
}

document.getElementById("men's clothing").addEventListener("click", () => handleCategory("men's clothing"));

document.getElementById("jewelery").addEventListener("click", () => handleCategory("jewelery"));

// Search by category
const find = () => {
    let value = document.getElementById("value").value.toLowerCase();
    let data = products.filter((val) => val.title.toLowerCase().includes(value));
    display(data);
};

document.getElementById("value").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        find();
    }
});

document.getElementById("search").addEventListener("click", find);
