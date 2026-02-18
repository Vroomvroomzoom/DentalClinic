# 🦷 BrightSmile Dental — Clinic Website

A modern, single-page dental clinic website built with vanilla HTML, CSS, and JavaScript. Designed for local SEO, mobile-first UX, privacy compliance, and easy customization.

## ✨ Features

- **Responsive design** — pill-shaped mobile action bar, full-screen hamburger menu, adaptive layouts
- **SEO-ready** — JSON-LD structured data, Open Graph tags, semantic HTML, meta descriptions
- **Privacy-focused** — 100% static, no cookies, no external trackers, all fonts & assets self-hosted
- **Security hardened** — Content Security Policy, referrer policy, MIME-type sniffing prevention, no inline scripts
- **Interactive elements** — before/after comparison sliders, FAQ accordion, scroll-reveal animations, animated stats counters
- **Live clinic status** — dynamic "Open Now" / "Closed" badge with pulsing green/red indicator based on business hours
- **Smart navigation** — OS-aware "Get Directions" (Apple Maps on iOS, device default on Android, Google Maps fallback on desktop)
- **Quick contact** — WhatsApp float (desktop), call/directions/WhatsApp pill bar (mobile)
- **Privacy policy** — transparent third-party service disclosures (WhatsApp, Instagram, Google Maps, Apple Maps, device map apps)

## 🛠 Tech Stack

| Layer   | Technology |
|---------|------------|
| Markup  | HTML5 (semantic) |
| Styling | Vanilla CSS with custom properties |
| Logic   | Vanilla JavaScript (ES6+) |
| Fonts   | [Poppins](fonts/) (self-hosted) |
| Icons   | [Font Awesome 6](css/fontawesome.min.css) (self-hosted) |

> **Zero external dependencies** — no CDN calls, no third-party scripts, no build tools.

## 📁 Project Structure

```
DentalClinic/
├── index.html        # Single-page site (all sections)
├── privacy.html      # Privacy Policy page
├── css/
│   ├── style.css     # All styles, variables, and media queries
│   └── fontawesome.min.css # Local icon styles
├── js/
│   └── main.js       # Menu, sliders, FAQ, scroll, directions, clinic status
├── fonts/            # Local Poppins font files (.woff2)
├── webfonts/         # Local FontAwesome font files (.woff2, .ttf)
├── images/           # Site assets
├── favicon.svg       # SVG favicon
├── og-image.png      # Open Graph share image
└── README.md
```

## 🔒 Security

The site includes the following security measures via `<meta>` tags:

| Header | Purpose |
|--------|---------|
| `Content-Security-Policy` | Restricts script/style/font/image sources to `'self'` only |
| `X-Content-Type-Options` | Prevents MIME-type sniffing (`nosniff`) |
| `Referrer-Policy` | Limits referrer leakage (`strict-origin-when-cross-origin`) |

**When deploying**, also configure these at the server level:

- `X-Frame-Options: DENY` — prevents clickjacking
- `Permissions-Policy` — restricts camera, mic, geolocation access
- `Strict-Transport-Security` — enforces HTTPS (HSTS)

## ⚙️ Customization Checklist

Before deploying, update these placeholder values:

- [ ] Clinic name, phone number, and address in `index.html`
- [ ] Coordinates in `index.html` (schema markup) and `js/main.js` (directions)
- [ ] Instagram and Facebook URLs (replace `YOUR_USERNAME`)
- [ ] WhatsApp number (replace `1234567890`)
- [ ] Business hours in `js/main.js` → `updateClinicStatus()` (if different from Mon–Fri 9–6, Sat 10–2)
- [ ] `og:image` URL — use absolute URL with your domain
- [ ] Privacy policy effective date in `privacy.html`

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

> **Remember:** Configure server-level security headers (`X-Frame-Options`, `Permissions-Policy`, `HSTS`) at your hosting provider.

## 📄 License

MIT
