# 🦷 BrightSmile Dental — Clinic Website

A modern, single-page dental clinic website built with vanilla HTML, CSS, and JavaScript. Designed for local SEO, mobile-first UX, and easy customization.

## ✨ Features

- **Responsive design** — pill-shaped mobile action bar, full-screen hamburger menu, adaptive layouts
- **SEO-ready** — JSON-LD structured data, Open Graph tags, semantic HTML, meta descriptions
- **Privacy-focused** — 100% static, no cookies, no external trackers, local fonts & assets
- **Interactive elements** — before/after comparison sliders, FAQ accordion, scroll-reveal animations
- **Smart navigation** — OS-aware "Get Directions" (Apple Maps / Google Maps / Android intent)
- **Quick contact** — WhatsApp float (desktop), call/directions/WhatsApp pill bar (mobile)

## 🛠 Tech Stack

| Layer   | Technology |
|---------|------------|
| Markup  | HTML5 (semantic) |
| Styling | Vanilla CSS with custom properties |
| Logic   | Vanilla JavaScript (ES6+) |
| Fonts   | [Poppins](fonts/) (Locally hosted) |
| Icons   | [Font Awesome 6](css/fontawesome.min.css) (Locally hosted) |

## 📁 Project Structure

```
DentalClinic/
├── index.html        # Single-page site (all sections)
├── privacy.html      # Privacy Policy page
├── css/
│   ├── style.css     # All styles, variables, and media queries
│   └── fontawesome.min.css # Local icon styles
├── js/
│   └── main.js       # Menu toggle, sliders, FAQ, scroll, directions
├── fonts/            # Local Poppins font files
├── webfonts/         # Local FontAwesome font files
├── images/           # Site assets (optimized)
├── favicon.svg       # SVG favicon (tooth icon)
├── og-image.png      # Open Graph share image
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

## 🌐 Deployment

This is a static site — deploy to any hosting provider:

- **GitHub Pages** — push to `main`, enable Pages in repo settings
- **Netlify / Vercel** — drag-and-drop the project folder or connect the repo
- **Traditional hosting** — upload all files via FTP

## 📄 License

MIT
