// this js file is fo events page and about page

const glow = document.getElementById('glow');
const title = document.getElementById('title');
const about = document.querySelector('#about');
const spiderman = document.querySelector('.spiderman-img');
const hoverEffectCtor = window.hoverEffect || window.HoverEffect;
const isTouchDevice =
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(max-width: 768px)').matches;

let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

function initAboutHoverEffect() {
  const supportsHoverPointer = !window.matchMedia('(pointer: coarse)').matches;
  if (typeof hoverEffectCtor !== 'function' || !supportsHoverPointer) {
    return;
  }

  const hoverTargets = ['.js-about-us-hover', '.js-about-sandhaan-hover'];

  hoverTargets.forEach((selector) => {
    const hoverTarget = document.querySelector(selector);
    if (!hoverTarget) return;

    new hoverEffectCtor({
      parent: hoverTarget,
      intensity: 0.3,
      image1: hoverTarget.dataset.image1,
      image2: hoverTarget.dataset.image2,
      displacementImage: hoverTarget.dataset.displacementImage,
    });

    const fallback = hoverTarget.querySelector(`${selector}-fallback`);
    if (fallback) {
      fallback.style.opacity = '0';
    }
  });
}

window.addEventListener('load', initAboutHoverEffect);

// MOUSE MOVE
document.addEventListener('mousemove', (e) => {
  if (!glow || isTouchDevice) return;

  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';

  mouseX = (window.innerWidth / 2 - e.clientX) / 40;
  mouseY = (window.innerHeight / 2 - e.clientY) / 40;

  if (title) {
    title.style.transform = `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
  }
});
// SCROLL + ANIMATION
function animate() {
  if (!about || !spiderman) return;

  const rect = about.getBoundingClientRect();
  const progress = Math.min(Math.max(1 - rect.top / window.innerHeight, 0), 1);

  scrollY += (-100 * progress - scrollY) * 0.08;

  spiderman.style.transform = `
        translateY(${scrollY}px)
        rotateY(${mouseX}deg)
        rotateX(${mouseY}deg)
        scale(${0.9 + progress * 0.1})
    `;

  requestAnimationFrame(animate);
}

animate();

// WEB SHOOT
document.addEventListener('click', (e) => {
  if (isTouchDevice) return;

  const web = document.createElement('div');
  web.className = 'web-shot';

  web.style.left = e.clientX + 'px';
  web.style.top = e.clientY + 'px';

  document.body.appendChild(web);

  setTimeout(() => web.remove(), 800);
});
/**
 * Standalone Events Page Logic
 * Consolidates rendering, filtering, and modal logic.
 */

// Initialize Lucide Icons
lucide.createIcons();

// --- Global State ---
let currentFilter = 'All';
let lastClickedCard = null;
let scrollObserver = null;

// --- Rendering Functions ---

function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  const categories = ['All', ...new Set(EVENTS.map((e) => e.category))];
  container.innerHTML = categories
    .map(
      (cat) => `
        <button onclick="filterEvents('${cat}')" class="category-btn px-6 py-2 font-comic text-xl transition-all comic-border ${cat === 'All' ? 'bg-spidey-red text-white' : 'bg-white/5 text-gray-400 border-white/20 hover:border-white'}">
            ${cat.toUpperCase()}
        </button>
    `,
    )
    .join('');
}

function renderEventsGrid() {
  const container = document.getElementById('events-grid');
  const noEvents = document.getElementById('no-events');
  if (!container) return;

  const filtered =
    currentFilter === 'All'
      ? EVENTS
      : EVENTS.filter((e) => e.category === currentFilter);

  if (filtered.length === 0) {
    container.innerHTML = '';
    noEvents.classList.remove('hidden');
  } else {
    noEvents.classList.add('hidden');
    container.innerHTML = filtered
      .map(
        (event, idx) => `
        <button onclick="openModal('${event.id}', event)" class="event-box-card reveal-on-scroll opacity-0" data-animation="animate-scaleIn" aria-label="Open ${event.title}">
          <img src="./assets/box.png" alt="${event.title}" class="event-box-image">
        </button>
      `,
      )
      .join('');

    lucide.createIcons();
    setupScrollReveal();
  }
}

// --- Filtering Logic ---

window.filterEvents = (cat) => {
  const container = document.getElementById('events-grid');
  if (!container) return;

  // Fade out
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  container.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

  setTimeout(() => {
    currentFilter = cat;
    const btns = document.querySelectorAll('.category-btn');
    btns.forEach((btn) => {
      if (btn.innerText.trim() === cat.toUpperCase()) {
        btn.classList.add('bg-spidey-red', 'text-white');
        btn.classList.remove('bg-white/5', 'text-gray-400', 'border-white/20');
      } else {
        btn.classList.remove('bg-spidey-red', 'text-white');
        btn.classList.add('bg-white/5', 'text-gray-400', 'border-white/20');
      }
    });

    renderEventsGrid();

    // Fade in
    requestAnimationFrame(() => {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    });
  }, 300);
};

// --- Scroll Reveal Logic ---

function setupScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  };

  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationClass = entry.target.getAttribute('data-animation');
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add(animationClass);
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
  }

  document.querySelectorAll('.reveal-on-scroll.opacity-0').forEach((el) => {
    scrollObserver.observe(el);
  });
}

// --- Modal Logic ---

window.openModal = (id, event) => {
  const eventData = EVENTS.find((e) => e.id === id);
  if (!eventData) return;

  const modal = document.getElementById('event-modal');
  const modalBody = document.getElementById('modal-body');
  const modalContent = document.getElementById('modal-content');
  const overlay = document.getElementById('modal-overlay');

  lastClickedCard = event ? event.currentTarget : null;

  modalBody.innerHTML = `
        <div class="lg:w-1/2 h-64 lg:h-full relative overflow-hidden">
            <img src="${eventData.image}" alt="${eventData.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-spidey-black via-transparent to-transparent lg:hidden"></div>
        </div>

        <div class="lg:w-1/2 p-8 md:p-12 space-y-8">
            <div>
                
                <h2 class="text-5xl md:text-7xl text-white mt-2">${eventData.title}</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex items-center gap-3 text-gray-300">
                    <i data-lucide="calendar" class="w-6 h-6 text-spidey-blue"></i>
                    <span class="text-xl">${eventData.date}</span>
                </div>
                <div class="flex items-center gap-3 text-gray-300">
                    <i data-lucide="map-pin" class="w-6 h-6 text-spidey-blue"></i>
                    <span class="text-xl">${eventData.location}</span>
                </div>
            </div>

            <div class="space-y-4">
                <h4 class="text-3xl text-spidey-red flex items-center gap-2">
                    <i data-lucide="info" class="w-6 h-6"></i> MISSION INTEL
                </h4>
                <p class="text-gray-300 text-lg leading-relaxed">${eventData.fullDescription}</p>
            </div>

            <div class="space-y-4">
                <h4 class="text-3xl text-spidey-blue flex items-center gap-2">
                    <i data-lucide="clock" class="w-6 h-6"></i> SCHEDULE
                </h4>
                <ul class="space-y-3">
                    ${eventData.schedule
                      .map(
                        (item) => `
                        <li class="flex items-center gap-3 text-gray-400 text-lg">
                            <div class="w-2 h-2 bg-spidey-red rounded-full"></div>
                            ${item}
                        </li>
                    `,
                      )
                      .join('')}
                </ul>
            </div>

            <button class="w-full py-5 bg-spidey-red text-white font-comic text-3xl comic-border border-white hover:scale-[1.02] transition-all mt-8">
                REGISTER FOR MISSION
            </button>
        </div>
    `;

  lucide.createIcons();

  if (lastClickedCard) {
    // FLIP: First
    const first = lastClickedCard.getBoundingClientRect();

    // Set initial modal state
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modal.style.visibility = 'hidden';
    modalContent.style.opacity = '1';

    // Force layout
    modal.offsetHeight;

    // FLIP: Last
    const last = modalContent.getBoundingClientRect();

    // FLIP: Invert
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;

    modalContent.style.transition = 'none';
    modalContent.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
    modalContent.style.transformOrigin = 'top left';

    overlay.style.opacity = '0';

    // FLIP: Play
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.style.visibility = 'visible';
        modalContent.style.transition =
          'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
        modalContent.style.transform = 'none';
        overlay.style.opacity = '1';

        setTimeout(() => {
          modalContent.style.overflowY = 'auto';
        }, 600);
      });
    });
  } else {
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modal.style.visibility = 'visible';
    modalContent.style.opacity = '1';
    overlay.style.opacity = '1';
    modalContent.style.overflowY = 'auto';
  }

  document.body.style.overflow = 'hidden';
  modalContent.style.overflowY = 'hidden';
};

const closeModal = () => {
  const modal = document.getElementById('event-modal');
  const modalContent = document.getElementById('modal-content');
  const overlay = document.getElementById('modal-overlay');

  modalContent.style.overflowY = 'hidden';

  if (lastClickedCard) {
    const first = modalContent.getBoundingClientRect();
    const last = lastClickedCard.getBoundingClientRect();

    const deltaX = last.left - first.left;
    const deltaY = last.top - first.top;
    const deltaW = last.width / first.width;
    const deltaH = last.height / first.height;

    modalContent.style.transition =
      'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
    modalContent.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
    modalContent.style.opacity = '0';
    overlay.style.opacity = '0';

    setTimeout(() => {
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';
      modalContent.style.transform = '';
      document.body.style.overflow = 'auto';
    }, 500);
  } else {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    document.body.style.overflow = 'auto';
  }
};

// --- Initialization ---

function init() {
  renderCategories();
  renderEventsGrid();

  document.getElementById('close-modal').addEventListener('click', closeModal);
  document
    .getElementById('modal-overlay')
    .addEventListener('click', closeModal);
}

document.addEventListener('DOMContentLoaded', init);

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

let isOpen = false;

menuBtn.addEventListener('click', () => {
  isOpen = !isOpen;

  if (isOpen) {
    // OPEN
    mobileMenu.classList.remove(
      'opacity-0',
      '-translate-y-10',
      'pointer-events-none',
    );
    menuBtn.innerHTML = `<i data-lucide="x" class="w-7 h-7"></i>`;
  } else {
    // CLOSE
    mobileMenu.classList.add(
      'opacity-0',
      '-translate-y-10',
      'pointer-events-none',
    );
    menuBtn.innerHTML = `<i data-lucide="menu" class="w-7 h-7"></i>`;
  }

  lucide.createIcons();
});

// about page js
const counters = document.querySelectorAll('.counter');

const runCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;

  const update = () => {
    const increment = target / 100;

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      // FINAL VALUE WITH +
      counter.innerText = target.toLocaleString() + '+';
    }
  };

  update();
};

// scroll trigger
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 },
);

counters.forEach((counter) => observer.observe(counter));
