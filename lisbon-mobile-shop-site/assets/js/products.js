/* Products page logic */
const PRODUCTS = [
  // Accessories
  { id: "a1", name: "USB-C 30W Charger", category: "Accessories", price: 29, popularity: 96, img: "https://images.unsplash.com/photo-1609599006353-9bffc83d1f05?q=80&w=1600&auto=format&fit=crop" },
  { id: "a2", name: "Tempered Glass Screen Protector", category: "Accessories", price: 12, popularity: 90, img: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1600&auto=format&fit=crop" },
  { id: "a3", name: "Silicone Case (Various Models)", category: "Accessories", price: 15, popularity: 84, img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop" },
  { id: "a4", name: "Power Bank 20,000 mAh", category: "Accessories", price: 49, popularity: 88, img: "https://images.unsplash.com/photo-1609599006321-3df2a72a4c64?q=80&w=1600&auto=format&fit=crop" },
  // Gadgets
  { id: "g1", name: "Wireless Earbuds", category: "Gadgets", price: 59, popularity: 92, img: "https://images.unsplash.com/photo-1518441902112-f0d7d79d9c50?q=80&w=1600&auto=format&fit=crop" },
  { id: "g2", name: "Bluetooth Speaker", category: "Gadgets", price: 39, popularity: 86, img: "https://images.unsplash.com/photo-1523540939399-141cbff6a8c5?q=80&w=1600&auto=format&fit=crop" },
  // Phones - New
  { id: "n1", name: "Pixel 8 (New)", category: "Phones-New", price: 699, popularity: 93, img: "https://images.unsplash.com/photo-1696446702559-1b6ab2fa6b14?q=80&w=1600&auto=format&fit=crop" },
  { id: "n2", name: "iPhone 15 (New)", category: "Phones-New", price: 899, popularity: 97, img: "https://images.unsplash.com/photo-1698771787190-35fd6022b83e?q=80&w=1600&auto=format&fit=crop" },
  // Phones - Used
  { id: "u1", name: "iPhone 12 (Used - Grade A)", category: "Phones-Used", price: 349, popularity: 91, img: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1600&auto=format&fit=crop" },
  { id: "u2", name: "Samsung S21 (Used - Grade A)", category: "Phones-Used", price: 329, popularity: 89, img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1600&auto=format&fit=crop" },
  // Parts
  { id: "p1", name: "iPhone 12 Screen (OEM Grade)", category: "Parts", price: 119, popularity: 83, img: "https://images.unsplash.com/photo-1523626932777-94b820f8cbcd?q=80&w=1600&auto=format&fit=crop" },
  { id: "p2", name: "Samsung S21 Battery", category: "Parts", price: 69, popularity: 80, img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1600&auto=format&fit=crop" }
];

const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");

function renderProducts(list) {
  if (!grid) return;
  grid.innerHTML = list.map(p => `
    <article class="card" id="${p.id}">
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="card__body">
        <div class="row">
          <h3 style="margin:0">${p.name}</h3>
          <span class="badge">€${p.price}</span>
        </div>
        <p class="muted">${p.category.replace("-", " ")}</p>
        <div class="row">
          <button class="btn btn--primary" data-add="${p.id}">Add to Enquiry</button>
          <button class="btn" data-quote="${p.id}">Quick WhatsApp</button>
        </div>
      </div>
    </article>
  `).join("");
  // bind buttons
  grid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-add");
      const item = PRODUCTS.find(x => x.id === id);
      addToCart({ id: item.id, name: item.name, price: item.price, img: item.img });
    });
  });
  grid.querySelectorAll("[data-quote]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-quote");
      const item = PRODUCTS.find(x => x.id === id);
      const msg = `Hi! I'm interested in ${item.name}. Is it available?`;
      const url = "https://wa.me/" + CONFIG.whatsappNumber.replace(/\D/g, "") + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
    });
  });
}

function applyFilters() {
  const term = (searchInput?.value || "").toLowerCase().trim();
  const cat = categorySelect?.value || "All";
  const sort = sortSelect?.value || "popularity";
  let list = PRODUCTS.filter(p => {
    const inCat = cat === "All" || p.category === cat;
    const inTerm = p.name.toLowerCase().includes(term);
    return inCat && inTerm;
  });
  if (sort === "price-asc") list.sort((a,b) => a.price - b.price);
  else if (sort === "price-desc") list.sort((a,b) => b.price - a.price);
  else list.sort((a,b) => b.popularity - a.popularity);
  renderProducts(list);
}

document.addEventListener("DOMContentLoaded", () => {
  applyFilters();
  searchInput?.addEventListener("input", applyFilters);
  categorySelect?.addEventListener("change", applyFilters);
  sortSelect?.addEventListener("change", applyFilters);
  updateCartCount();
});
