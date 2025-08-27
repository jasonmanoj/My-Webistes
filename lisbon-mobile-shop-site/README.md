# Lisbon Mobile Shop — Website (Full Version)
A sleek, mobile-first website for a Lisbon-based mobile accessories & repair shop. Includes product showcase with search/filters, enquiry cart (quote list), repair services with WhatsApp quotes, a site-wide search, and SEO files.

## Features
- **Pages**: Home, Products, Services, Contact, Privacy, Search
- **Products**: Search, Category filter, Sorting
- **Enquiry cart**: Users add items (localStorage), then send enquiry via Email/WhatsApp
- **Services**: Quick WhatsApp quote buttons
- **Site-wide Search**: Navbar search goes to `/search.html?q=...`
- **SEO**: Meta tags, canonical, robots.txt, sitemap.xml, JSON-LD (LocalBusiness + WebSite/SearchAction)
- **Modern UI**: Dark theme, responsive cards, sticky nav

## Quick Start (Local)
1. Unzip this folder.
2. Serve locally (choose one):
   - Node: `npx http-server -p 5173` or `npx serve .`
   - VS Code: Install **Live Server** and click “Go Live”
3. Visit the local URL to preview.

## Configure
Edit `assets/js/app.js`:
```js
const CONFIG = {
  shopName: "Lisbon Mobile Shop",
  shopEmail: "hello@example.com",
  whatsappNumber: "+351900000000", // your number with country code
  address: "Lisbon, Portugal",
  googleMapsEmbed: "https://www.google.com/maps?q=Lisbon&output=embed" // replace with a proper embed
};
```

Update `robots.txt`, `sitemap.xml`, and canonical links (`index.html`, etc.) with your real domain.

## Deploy
- **Netlify**: Drag-and-drop or connect a repo.
- **Vercel**: Deploy as static site.
- **GitHub Pages**: Push and enable Pages on main branch.

## Next Upgrades
- Portuguese translation (i18n with language switcher)
- Product schema (JSON-LD) with price/availability
- Form backend (Netlify Forms/Formspree)
- Full e-commerce with Stripe checkout
