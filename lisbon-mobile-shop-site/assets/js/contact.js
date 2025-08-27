/* Contact page logic: render enquiry list, send via email or WhatsApp */
function renderEnquiry() {
  const container = document.getElementById("enquiryList");
  if (!container) return;
  const items = getCart();
  if (items.length === 0) {
    container.innerHTML = `<p class="muted">Your enquiry list is empty. Add items from the <a class="link" href="products.html">Products</a> page.</p>`;
    return;
  }
  container.innerHTML = items.map(it => `
    <div class="list-item">
      <img src="${it.img}" alt="${it.name}" />
      <div>
        <h4>${it.name}</h4>
        <p>Qty: ${it.qty} • Unit €${it.price} • Subtotal €${(it.price * it.qty).toFixed(2)}</p>
      </div>
      <div class="row">
        <button class="btn" data-minus="${it.id}">−</button>
        <button class="btn" data-plus="${it.id}">＋</button>
        <button class="btn btn--ghost" data-remove="${it.id}">Remove</button>
      </div>
    </div>
  `).join("");

  container.querySelectorAll("[data-minus]").forEach(b => b.addEventListener("click", () => adjQty(b.getAttribute("data-minus"), -1)));
  container.querySelectorAll("[data-plus]").forEach(b => b.addEventListener("click", () => adjQty(b.getAttribute("data-plus"), +1)));
  container.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => { removeFromCart(b.getAttribute("data-remove")); renderEnquiry(); }));
}
function adjQty(id, delta){
  const items = getCart();
  const idx = items.findIndex(i => i.id === id);
  if (idx >= 0) {
    items[idx].qty = Math.max(1, (items[idx].qty || 1) + delta);
    setCart(items); renderEnquiry();
  }
}

function buildSummary() {
  const items = getCart();
  if (items.length === 0) return "No items listed.";
  const total = items.reduce((s,i)=> s + i.price * (i.qty || 1), 0);
  const lines = items.map(i => `• ${i.name} — Qty ${i.qty} — €${i.price} (Subtotal €${(i.price*(i.qty||1)).toFixed(2)})`);
  return `Enquiry Items:\n${lines.join("\n")}\n\nEstimated total (non-binding): €${total.toFixed(2)}\n`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderEnquiry();
  updateCartCount();

  document.getElementById("clearEnquiry")?.addEventListener("click", () => { clearCart(); renderEnquiry(); });

  const form = document.getElementById("enquiryForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = `Enquiry from ${data.name}`;
    const body = `${buildSummary()}\nContact:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\n\nMessage:\n${data.message || "-"}`;
    const mailto = `mailto:${CONFIG.shopEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });

  const wa = document.getElementById("sendWhatsApp");
  wa?.addEventListener("click", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(document.getElementById("enquiryForm")).entries());
    const text = `${buildSummary()}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\nMessage: ${data.message || "-"}`;
    const url = "https://wa.me/" + CONFIG.whatsappNumber.replace(/\D/g, "") + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  });
});
