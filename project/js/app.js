let cart = [];

function closeNavbar() {
  var navbarToggler = document.querySelector(".navbar-toggler");
  var mobileNav = document.querySelector("#mobileNav");

  if (navbarToggler.getAttribute("aria-expanded") === "true") {
    navbarToggler.click();
  }
}

function populateNavMenus() {
  const mobileMenu = document.getElementById("mobileMenu");
  const desktopMenu = document.getElementById("desktopMenuList");

  Object.keys(sections).forEach((section) => {
    const listItemMobile = document.createElement("li");
    listItemMobile.className = "nav-item";
    listItemMobile.innerHTML = `<a class="on-primary text-title nav-item-link" href="#">${section}</a>`;
    mobileMenu.appendChild(listItemMobile);

    const listItemDesktop = listItemMobile.cloneNode(true);
    desktopMenu.appendChild(listItemDesktop);

    listItemMobile.querySelector("a").addEventListener("click", () => {
      loadItems(section);
      closeNavbar();
    });
    listItemDesktop
      .querySelector("a")
      .addEventListener("click", () => loadItems(section));
  });
}

function loadItems(section) {
  document.getElementById("selected-section").textContent = section;

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
                    <p class="text-body">${item.price} SR</p>
                    <button class="btn btn-primary primary add-to-cart-btn" onclick="addToCart('${item.name}', ${item.price}, '${item.imageUrl}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    itemsContainer.appendChild(itemElement);
  });
}

function addToCart(itemName, price, imageUrl) {
  const existingItem = cart.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.count++;
  } else {
    cart.push({ name: itemName, price: price, count: 1, imageUrl: imageUrl });
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
<div class="cart-item-wrapper">
  <div style="display: flex; flex-direction: row; align-items: center;">
    <img
      src="${item.imageUrl}"
      alt="${item.name}"
      style="width: 60px; height: 60px; border-radius: 1rem;"
    />
    
    <div style="padding-left: 1rem">
      <span class="text-title">${item.name}</span>
      <br />
      <span class="cart-item-price text-body">
        ${item.price * item.count} SR
      </span>
    </div>
  </div>
  
  <div>
    <button
      class="cart-item-button"
      onclick="decrementItemCount(${index})"
    >
      -
    </button>
    <span class="cart-item-number">${item.count}</span>
    <button
      class="cart-item-button title-display"
      onclick="incrementItemCount(${index})"
    >
      +
    </button>
    <button
      class="cart-item-remove-btn"
      onclick="removeItemFromCart(${index})"
    >
      <img src="images/trash-solid.svg" alt="delete item" />
    </button>
  </div>
</div>
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
