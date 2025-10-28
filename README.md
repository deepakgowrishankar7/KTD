# KTD Dropshipping — Frontend Prototype

This is a static, responsive frontend prototype for KTD Dropshipping. It showcases a modern, mobile-friendly e-commerce landing page focused on trust, speed, and customer comfort.

Features
- Top navigation with search autocomplete and cart counter
- Hero with animated headline and media
- Category cards and product grid with quick view modal
- Why Choose Us section with animated icons
- Testimonials carousel (Swiper)
- Delivery & Replacement promise section
- Newsletter signup with incentive

Tech used
- HTML, Tailwind CSS (CDN), vanilla JavaScript
- AOS for scroll animations
- Swiper for carousels

How to run
1. Open `index.html` in your browser. For full functionality (some browsers block local video), serve via a static server.

Optional: run a simple static server (Python) from project root:
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000`.

Notes & next steps
- This is frontend-only. For production, add a backend (Node/Express or Flask), database (MongoDB/Firebase), and a payment gateway.
- Replace placeholder images, videos, and text with real assets and branding.
- Add accessibility improvements, tests, and performance optimizations.
