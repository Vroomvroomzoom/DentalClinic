# 🦷 BrightSmile Dental — Clinic Website

A modern, single-page dental clinic website built with vanilla HTML, CSS, and JavaScript. Designed for local SEO, mobile-first UX, and easy customization.

## ✨ Features

- **Responsive design** — pill-shaped mobile action bar, full-screen hamburger menu, adaptive layouts
- **SEO-ready** — JSON-LD structured data, Open Graph tags, semantic HTML, meta descriptions
- **Interactive elements** — before/after comparison sliders, FAQ accordion, scroll-reveal animations
- **Smart navigation** — OS-aware "Get Directions" (Apple Maps / Google Maps / Android intent)
- **Quick contact** — WhatsApp float (desktop), call/directions/WhatsApp pill bar (mobile)

## 🛠 Tech Stack

| Layer   | Technology |
|---------|------------|
| Markup  | HTML5 (semantic) |
| Styling | Vanilla CSS with custom properties |
| Logic   | Vanilla JavaScript (ES6+) |
| Fonts   | [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts |
| Icons   | [Font Awesome 6](https://fontawesome.com/) |

## 📁 Project Structure

```
DentalClinic/
├── index.html        # Single-page site (all sections)
├── css/
│   └── style.css     # All styles, variables, and media queries
├── js/
│   └── main.js       # Menu toggle, sliders, FAQ, scroll, directions
├── favicon.svg       # SVG favicon (tooth icon)
├── og-image.png      # Open Graph share image (1200×630)
└── README.md
```

## 🚀 Getting Started

No build tools or dependencies required — just open the file:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/DentalClinic.git
cd DentalClinic

# Open in browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or use a local server for development:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx -y serve .
```

## ⚙️ Customization

Before deploying, update the following placeholder values:

| What | Where | Placeholder |
|------|-------|-------------|
| Clinic name | `index.html` (title, logo, footer) | `Bright Smile Dental` |
| Location | `index.html` (title, hero, meta tags) | `[Location]` / `[Your City]` |
| Phone number | `index.html` (nav, contact, pill bar) | `+15551234567` |
| WhatsApp number | `index.html` (contact, footer, float) | `1234567890` |
| Address | `index.html` (contact, Schema.org) | `123 Dental Avenue` |
| Coordinates | `index.html` + `js/main.js` | `40.758895, -73.987319` |
| Instagram | `index.html` (nav, footer, Schema.org) | `YOUR_USERNAME` |
| Email | `index.html` (contact section) | `info@brightsmiledental.com` |
| Doctor info | `index.html` (about section) | `Dr. Emily Smith` |

## 🌐 Deployment

This is a static site — deploy to any hosting provider:

- **GitHub Pages** — push to `main`, enable Pages in repo settings
- **Netlify / Vercel** — drag-and-drop the project folder or connect the repo
- **Traditional hosting** — upload all files via FTP

## 📄 License

MIT