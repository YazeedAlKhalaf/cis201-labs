const sections = {
  Fatayer: [
    {
      name: "Chicken Jalapeno",
      price: 20,
      imageUrl: "images/chicken-jalapeno.webp",
    },
    {
      name: "Chicken Jalapeno",
      price: 22,
      imageUrl: "images/chicken-jalapeno.webp",
    },
  ],
  "Fatayer 2": [
    {
      name: "Chicken Jalapeno 2",
      price: 40,
      imageUrl: "images/chicken-jalapeno.webp",
    },
  ],
};

let cart = [];

function populateNavMenus() {
  const mobileMenu = document.getElementById("mobileMenu");
  const desktopMenu = document.getElementById("desktopMenuList");

  Object.keys(sections).forEach((section) => {
    const listItemMobile = document.createElement("li");
    listItemMobile.className = "nav-item";
    listItemMobile.innerHTML = `<a class="nav-link" href="#">${section}</a>`;
    mobileMenu.appendChild(listItemMobile);

    const listItemDesktop = listItemMobile.cloneNode(true);
    desktopMenu.appendChild(listItemDesktop);

    listItemMobile
      .querySelector("a")
      .addEventListener("click", () => loadItems(section));
    listItemDesktop
      .querySelector("a")
      .addEventListener("click", () => loadItems(section));
  });
}

function loadItems(section) {
  const itemsContainer = document.querySelector(".items-body");
  itemsContainer.innerHTML = "";

  sections[section].forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    itemElement.innerHTML = `
            <img class="item-image" src="${item.imageUrl}" alt="${item.name}" />
            <div class="item-content">
                <p class="text-title on-secondary">${item.name}</p>
                <div class="item-row">
                    <p>${item.price} SR</p>
                    <button class="btn btn-primary primary add-to-cart-btn" onclick="addToCart('${item.name}', ${item.price})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    itemsContainer.appendChild(itemElement);
  });
}

function addToCart(itemName, price) {
  const existingItem = cart.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.count++;
  } else {
    cart.push({ name: itemName, price, count: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("li");
    cartItemElement.className = "cart-item";
    cartItemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${
      item.name
    }" style="width: 50px; height: 50px;" />
            <span>${item.name}</span>
            <button onclick="incrementItemCount(${index})">+</button>
            <span>${item.count}</span>
            <button onclick="decrementItemCount(${index})">-</button>
            <span>${item.price * item.count} SR</span>
            <button onclick="removeItemFromCart(${index})">Remove</button>
        `;
    cartItemsContainer.appendChild(cartItemElement);
  });

  updateTotalPrice();
  updateTotalItemsNumber();
}

function incrementItemCount(index) {
  cart[index].count++;
  updateCartUI();
}

function decrementItemCount(index) {
  if (cart[index].count > 1) {
    cart[index].count--;
  } else {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function removeItemFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateTotalItemsNumber() {
  const totalItemsNumberElement = document.getElementById("cartCount");
  const totalItemsNumber = cart.reduce((total, item) => total + item.count, 0);
  totalItemsNumberElement.textContent = totalItemsNumber;
}

function updateTotalPrice() {
  const totalPriceElement = document.getElementById("total-price");
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );
  totalPriceElement.textContent = `${totalPrice} SR`;
}

function toggleCart() {
  const cartElement = document.getElementById("cart");
  cartElement.style.display =
    cartElement.style.display === "block" ? "none" : "block";
}

populateNavMenus();
loadItems("Fatayer");
