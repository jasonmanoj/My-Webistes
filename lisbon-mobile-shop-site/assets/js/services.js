/* Services page logic */
const SERVICES = [
  { id: "s1", name: "Screen Replacement", eta: "Same-day", priceRange: "€79–€249", img: "https://images.unsplash.com/photo-1588422333073-3f4d5c2b8553?q=80&w=1600&auto=format&fit=crop" },
  { id: "s2", name: "Battery Replacement", eta: "1–2 hours", priceRange: "€49–€129", img: "https://images.unsplash.com/photo-1518288774672-b94e808873ff?q=80&w=1600&auto=format&fit=crop" },
  { id: "s3", name: "Charging Port Repair", eta: "Same-day", priceRange: "€59–€139", img: "https://images.unsplash.com/photo-1587825140400-8f8cd4a3c9fd?q=80&w=1600&auto=format&fit=crop" },
  { id: "s4", name: "Camera/Speaker Fix", eta: "Same-day", priceRange: "€49–€149", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1600&auto=format&fit=crop" },
  { id: "s5", name: "Water Damage Diagnosis", eta: "24–48 hours", priceRange: "From €39", img: "https://images.unsplash.com/photo-1518773350525-51994f3c7f51?q=80&w=1600&auto=format&fit=crop" },
  { id: "s6", name: "Board-level Repair", eta: "2–3 days", priceRange: "Quote only", img: "https://images.unsplash.com/photo-1581092921461-eab62e97a40d?q=80&w=1600&auto=format&fit=crop" }
];

const servicesGrid = document.getElementById("servicesGrid");

function renderServices() {
  if (!servicesGrid) return;
  servicesGrid.innerHTML = SERVICES.map(s => `
    <article class="card" id="${s.id}">
      <img src="${s.img}" alt="${s.name}" loading="lazy" />
      <div class="card__body">
        <div class="row">
          <h3 style="margin:0">${s.name}</h3>
          <span class="badge">${s.eta}</span>
        </div>
        <p class="muted">Estimated: ${s.priceRange}</p>
        <div class="row">
          <button class="btn btn--primary" data-quote="${s.id}">Request Quote</button>
        </div>
      </div>
    </article>
  `).join("");

  servicesGrid.querySelectorAll("[data-quote]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-quote");
      const svc = SERVICES.find(x => x.id === id);
      const msg = `Hi! I need a quote for ${svc.name}. Phone model: ____ . Issue details: ____`;
      const url = "https://wa.me/" + CONFIG.whatsappNumber.replace(/\D/g, "") + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
    });
  });
}

document.addEventListener("DOMContentLoaded", renderServices);
