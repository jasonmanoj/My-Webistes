/* Lisbon Mobile Shop — App JS (nav/footer, config, cart/enquiry, helpers) */

const CONFIG = {
  shopName: "Lisbon Mobile Shop",
  shopEmail: "hello@example.com",
  whatsappNumber: "+351900000000", // Replace with your WhatsApp number
  address: "Lisbon, Portugal",
  googleMapsEmbed: "https://www.google.com/maps?q=Lisbon&output=embed"
};

// Render Nav & Footer on every page
function renderShell() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.innerHTML = `
      <header class="site-nav">
        <div class="container navbar">
          <a class="brand" href="index.html">
            <span class="logo"></span>
            <span class="name">${CONFIG.shopName}</span>
          </a>
          <nav class="nav-links">
            <a href="products.html">Products</a>
            <a href="services.html">Services</a>
            <a href="contact.html">Contact</a>
            <form action="search.html" method="GET" style="display:flex;gap:8px;align-items:center">
              <input name="q" class="input" placeholder="Search..." style="min-width:200px" />
            </form>
            <span class="cart-pill">Enquiry <span id="cartCount" class="badge">0</span></span>
          </nav>
        </div>
      </header>
    `;
  }
  if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <footer>
        <div class="container footer-inner">
          <div>© ${year} ${CONFIG.shopName} — ${CONFIG.address}</div>
          <nav>
            <a href="privacy.html">Privacy</a>
          </nav>
        </div>
      </footer>
    `;
  }
  // Map embed on home
  const map = document.getElementById("map-frame");
  if (map) map.src = CONFIG.googleMapsEmbed;
}
document.addEventListener("DOMContentLoaded", renderShell);

// Enquiry Cart (localStorage)
const CART_KEY = "lms_enquiry_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartCount();
}
function updateCartCount() {
  const count = getCart().reduce((acc, it) => acc + (it.qty || 1), 0);
  const pill = document.getElementById("cartCount");
  if (pill) pill.textContent = count;
  const enquiryCount = document.getElementById("enquiryCount");
  if (enquiryCount) enquiryCount.textContent = count;
}
function addToCart(product) {
  const items = getCart();
  const idx = items.findIndex((i) => i.id === product.id);
  if (idx >= 0) items[idx].qty = (items[idx].qty || 1) + 1;
  else items.push({ ...product, qty: 1 });
  setCart(items);
  toast("Added to enquiry list");
}
function removeFromCart(id) {
  const items = getCart().filter((i) => i.id !== id);
  setCart(items);
}
function clearCart(){
  setCart([]);
}

document.addEventListener("DOMContentLoaded", updateCartCount);

// Toast helper
let toastTimeout;
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.style.position = "fixed";
    t.style.bottom = "20px";
    t.style.right = "20px";
    t.style.padding = "10px 14px";
    t.style.background = "rgba(0,0,0,.8)";
    t.style.border = "1px solid rgba(255,255,255,.2)";
    t.style.borderRadius = "10px";
    t.style.color = "#fff";
    t.style.zIndex = "9999";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => (t.style.opacity = "0"), 1600);
}

// Quick WhatsApp on home
document.addEventListener("DOMContentLoaded", () => {
  const quick = document.getElementById("whatsapp-quick");
  if (quick) {
    quick.addEventListener("click", (e) => {
      e.preventDefault();
      const url = "https://wa.me/" + CONFIG.whatsappNumber.replace(/\D/g, "") +
        "?text=" + encodeURIComponent("Hi! I’d like a quick quote. My phone model is ____ and the issue is ____.");
      window.open(url, "_blank");
    });
  }
});
