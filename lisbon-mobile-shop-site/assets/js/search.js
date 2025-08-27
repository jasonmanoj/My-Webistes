/* Simple site-wide search */
function qParam(name){
  const u = new URL(window.location.href);
  return u.searchParams.get(name) || "";
}
function render(items){
  const grid = document.getElementById("searchResults");
  if (!grid) return;
  if (!items.length){
    grid.innerHTML = '<p class="muted">No results. Try another term.</p>';
    return;
  }
  grid.innerHTML = items.map(x => `
    <article class="card">
      <a href="${x.url}" style="text-decoration:none;color:inherit">
        <img src="${x.img}" alt="${x.title}" loading="lazy" />
        <div class="card__body">
          <div class="row">
            <h3 style="margin:0">${x.title}</h3>
            <span class="badge">${x.type}</span>
          </div>
          <p class="muted">${x.category}</p>
        </div>
      </a>
    </article>
  `).join("");
}
function doSearch(term){
  term = term.toLowerCase().trim();
  const results = window.SEARCH_INDEX.filter(x => 
    x.title.toLowerCase().includes(term) || x.category.toLowerCase().includes(term)
  );
  render(results);
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("globalSearchInput");
  const term = qParam("q");
  if (input){ input.value = term; input.addEventListener("input", e => doSearch(e.target.value)); }
  doSearch(term);
});
