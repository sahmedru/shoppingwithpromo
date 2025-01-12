// -----------Load API Data Start-----------//
const loadProducts = fetch('products.json')
  .then((response)=>response.json())
  .then((data)=>{showProducts(data)});

// -----------Load API Data End-----------//

// -----------Show All Products In UI-----//
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
      <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p>Price: $ ${product.price}</p>
      <p>Rating:  ${product.rating.rate}</p>
      <p>Reviews:  ${product.rating.count}</p>

      <button style="background-color: #FF136F
      ";
      onclick="addToCart(${product.id},${product.price})"
      id="addToCart-btn"
      class="buy-now btn btn-primary">add to cart</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
let cartItems = {};
const addToCart = (id, price) => {
  // count = count + 1;
  count += 1;
  updatePrice("price", price);
  updateTaxandCharge();
  document.getElementById("total-Products").innerText = count;
  CartDetails();
};

const CartDetails = () => {
  const cartDetailsContainer = document.getElementById("CartDetails");
  cartDetailsContainer.innerHTML += "";
  for (const id in cartItems) {
    const product = cartItems[id];
    const div = document.createElement("div");
    div.classList.add("cart-details");
    div.innerHTML = `
      <div class="cart-details">
      <table>
        <tr>
          <td><img class="cart-image" src="${product.image}" alt="${product.title}"></td>
          <td>${product.title}</td>
          <td>${(product.price).toFixed(2)}</td>
          <button class="" onclick="removeFromCart(${id}, ${product.price})">Delete</button>
        </tr>
      </table>
      </div>
    `;
    cartDetailsContainer.appendChild(div);
  }
};



// Price, Delivery, Tax update
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// Set InnerTex400px;
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// Main Price / Update Price
const updatePrice = (id, value) => {
  const convertOldPrice = getInputValue(id);
  const converPrice = parseFloat(value);
  const total = parseFloat(convertOldPrice + converPrice).toFixed(2);
  document.getElementById(id).innerText = total;
};

// Update Delivery charge, Tax

const updateTaxandCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 80);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};



// Grand Total
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

function discount() {
  const promoCodeInput = document.getElementById("promo").value;
  let promoDiscount = 0; // Default to no discount

  // Example promo code logic
  if (promoCodeInput === "ostad5") {
    promoDiscount = updateTotal() * 0.05;
  }
  if (promoCodeInput === "ostad10") {
    promoDiscount = updateTotal() * 0.1;
  }

  // Apply the discount to the total
  grandTotal = updateTotal() - promoDiscount;
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

loadProducts();
