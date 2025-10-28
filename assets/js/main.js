// Basic interactions for KTD Dropshipping prototype
document.addEventListener('DOMContentLoaded', function(){
  if (window.AOS) {
    AOS.init({duration:600, once:true});
  }

  // Simple Swiper init for testimonials
  if(window.Swiper){
    new Swiper('.swiper-container', {loop:true, autoplay:{delay:3500}, slidesPerView:1, spaceBetween:16});
  }

  // Search autocomplete (static demo suggestions)
  const search = document.getElementById('search');
  const ac = document.getElementById('autocomplete');
  const suggestions = ['Headphones','Travel Pillow','LED Lamp','Portable Blender','Smart Camera','Yoga Mat'];

  if (search) {
    search.addEventListener('input', function(){
      const q = this.value.trim().toLowerCase();
      if(!q){ if(ac){ ac.classList.add('hidden'); ac.innerHTML=''; } return; }
      const matches = suggestions.filter(s=>s.toLowerCase().includes(q));
      if(ac){ ac.innerHTML = matches.map(m=>`<button class="hover:bg-gray-50" type="button">${m}</button>`).join(''); ac.classList.remove('hidden'); }
    });

    // Enter key on search input should go to search results page
    search.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        e.preventDefault();
        const q = this.value.trim();
        if(q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
      }
    });
  }

  // On suggestion click, navigate to search results page
  if (ac) {
    ac.addEventListener('click', function(e){
      if(e.target.tagName === 'BUTTON'){
        const q = e.target.textContent.trim();
        window.location.href = `search.html?q=${encodeURIComponent(q)}`;
      }
    });
  }

  // Enter key on search input should go to search results page
  search.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
      e.preventDefault();
      const q = this.value.trim();
      if(q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
    }
  });

  // Quick view modal (attach when elements exist)
  const qv = document.getElementById('quickViewModal');
  const qvClose = document.getElementById('qvClose');
  if (qv) {
    document.addEventListener('click', function handler(e){
      const btn = e.target.closest('.quick-view-btn');
      if(!btn) return;
      const card = btn.closest('.product-card');
      if(!card) return;
      const img = card.querySelector('img')?.src || '';
      const title = card.querySelector('h4')?.textContent || '';
      const price = card.querySelector('.text-teal-600')?.textContent || '';
      qv.querySelector('#qv-img') && (qv.querySelector('#qv-img').src = img);
      qv.querySelector('#qv-title') && (qv.querySelector('#qv-title').textContent = title);
      qv.querySelector('#qv-price') && (qv.querySelector('#qv-price').textContent = price);
      qv.querySelector('#qv-desc') && (qv.querySelector('#qv-desc').textContent = (card.querySelector('.text-xs') ? card.querySelector('.text-xs').textContent : ''));
      qv.classList.add('modal-open');
    });

    if (qvClose) qvClose.addEventListener('click', ()=> qv.classList.remove('modal-open'));
    qv.addEventListener('click', (e)=>{ if(e.target === qv) qv.classList.remove('modal-open') });
  }

  // Add to cart demo interaction (persist to localStorage so cart page can read items)
  const cartCount = document.getElementById('cartCount');
  // load existing cart from localStorage
  let cart = [];
  try{ cart = JSON.parse(localStorage.getItem('ktd_cart') || '[]') }catch(e){ cart = []; }
  let count = cart.length;
  if(cartCount) cartCount.textContent = count;

  // Use event delegation for add-to-cart buttons (handles dynamically injected buttons)
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.add-cart-btn, #qvAdd');
    if(!btn) return;

    // determine product data
    let title = 'Product', price = '₹0', img = '';
    const card = btn.closest('.product-card');
    if(card){
      const h = card.querySelector('h4');
      title = h ? h.textContent : title;
      const p = card.querySelector('.text-teal-600');
      price = p ? p.textContent : price;
      const im = card.querySelector('img');
      img = im ? im.src : '';
    } else if(document.getElementById('qv-img')){
      const qvImg = document.getElementById('qv-img');
      const qvTitle = document.getElementById('qv-title');
      const qvPrice = document.getElementById('qv-price');
      img = qvImg ? qvImg.src : img;
      title = qvTitle ? qvTitle.textContent : title;
      price = qvPrice ? qvPrice.textContent : price;
    }

    const item = { id: Date.now().toString(), title, price, img, qty: 1 };
    cart.push(item);
    localStorage.setItem('ktd_cart', JSON.stringify(cart));
    count = cart.length;
    if(cartCount) cartCount.textContent = count;

    // small toast
    const t = document.createElement('div'); t.className='toast'; t.textContent='Added to cart'; document.body.appendChild(t);
    setTimeout(()=> t.remove(),1500);
  });

  // Newsletter demo submit
  const newsletterForm = document.getElementById('newsletterForm');
  if(newsletterForm){
    newsletterForm.addEventListener('submit', function(e){
      e.preventDefault();
      const emailEl = document.getElementById('newsletterEmail');
      const email = emailEl ? emailEl.value : '';
      alert(`Thanks! ${email} — ₹500 off code sent to your inbox.`);
      this.reset();
    });
  }

  // Sticky header small effect on scroll
  const header = document.getElementById('site-header');
  if(header){
    window.addEventListener('scroll', ()=>{
      if(window.scrollY > 40) header.classList.add('shadow-md', 'bg-white/90');
      else header.classList.remove('shadow-md','bg-white/90');
    });
  }

  // Mobile menu toggle (for small screens)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(mobileMenuBtn && mobileMenu){
    mobileMenuBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));
  }

  // Hero video fallback: if video fails, hide it and reveal the fallback image
  const heroVideo = document.getElementById('heroVideo');
  const heroFallback = document.getElementById('heroFallback');
  if(heroVideo && heroFallback){
    // If the video throws an error, show the fallback
    heroVideo.addEventListener('error', ()=>{
      heroVideo.style.display = 'none';
      heroFallback.classList.remove('hidden');
    });

    // Also handle cases where playback is blocked (autoplay blocked) — show poster/fallback
    heroVideo.addEventListener('suspend', ()=>{
      // don't be aggressive — only show fallback if poster isn't visible in the browser
      // fallback: if video has no dimensions or failed to fetch, reveal image
      if(heroVideo.readyState === 0){
        heroVideo.style.display = 'none';
        heroFallback.classList.remove('hidden');
      }
    });
  }
});
