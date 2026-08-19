// Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  }));

  // ===== Slider =====
  const slidesEl = document.getElementById('slides');
  const slideCount = slidesEl.children.length;
  let current = 0;
  const dotsWrap = document.getElementById('dots');
  for(let i=0;i<slideCount;i++){
    const d = document.createElement('button');
    if(i===0) d.classList.add('active');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }
  function update(){
    slidesEl.style.transform = `translateX(${current * 100}%)`;
    [...dotsWrap.children].forEach((d,i)=>d.classList.toggle('active', i===current));
  }
  function goTo(i){ current = (i + slideCount) % slideCount; update(); }
  document.getElementById('prevBtn').addEventListener('click', ()=>goTo(current-1));
  document.getElementById('nextBtn').addEventListener('click', ()=>goTo(current+1));
  let autoSlide = setInterval(()=>goTo(current+1), 5500);
  const sliderEl = document.getElementById('slider');
  sliderEl.addEventListener('mouseenter', ()=>clearInterval(autoSlide));
  sliderEl.addEventListener('mouseleave', ()=>autoSlide=setInterval(()=>goTo(current+1),5500));

  // touch swipe
  let touchStartX = 0;
  sliderEl.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, {passive:true});
  sliderEl.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if(diff > 50) goTo(current-1);
    else if(diff < -50) goTo(current+1);
  }, {passive:true});

  // note: because layout is RTL, translateX direction is inverted visually which matches "prev/next" arrow icons used above (‹ ›).

  // ===== Category filters (cafe menu) =====
  function setupFilters(filterWrapId, groupSelector){
    const wrap = document.getElementById(filterWrapId);
    wrap.querySelectorAll('.filter-pill').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        wrap.querySelectorAll('.filter-pill').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll(groupSelector).forEach(g=>g.classList.remove('active'));
        document.getElementById(btn.dataset.target).classList.add('active');
      });
    });
  }
  setupFilters('cafeFilters', '#cafe-menu .menu-group');
  setupFilters('restFilters', '#restaurant .menu-group');

  // ===== Scroll reveal =====
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el=>io.observe(el));