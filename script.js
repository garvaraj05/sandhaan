const glow = document.getElementById('glow');
const title = document.getElementById('title');
const about = document.querySelector('#about');
const spiderman = document.querySelector('.spiderman-img');
const isTouchDevice =
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(max-width: 768px)').matches;

let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

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

// intro video
const intro = document.getElementById('intro-video');
const video = document.getElementById('introVid');

document.body.style.overflow = 'hidden';

video.onended = () => {
  // thoda delay for cinematic feel
  setTimeout(() => {
    intro.classList.add('hide');
  }, 100);

  setTimeout(() => {
    intro.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 700);
};

// function renderCategories() {
//     const container = document.getElementById('categories-container');
//     if (!container) return;
//     const categories = ["All", ...new Set(EVENTS.map(e => e.category))];
//     container.innerHTML = categories.map(cat => `
//         <button onclick="filterEvents('${cat}')" class="category-btn px-6 py-2 font-comic text-xl transition-all comic-border ${cat === 'All' ? 'bg-spidey-red text-white' : 'bg-white/5 text-gray-400 border-white/20 hover:border-white'}">
//             ${cat.toUpperCase()}
//         </button>
//     `).join('');
// }

// let currentFilter = "All";
// window.filterEvents = (cat) => {
//     const container = document.getElementById('events-grid');
//     if (!container) return;

//     // Fade out
//     container.style.opacity = '0';
//     container.style.transform = 'translateY(20px)';
//     container.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

//     setTimeout(() => {
//         currentFilter = cat;
//         const btns = document.querySelectorAll('.category-btn');
//         btns.forEach(btn => {
//             if (btn.innerText.trim() === cat.toUpperCase()) {
//                 btn.classList.add('bg-spidey-red', 'text-white');
//                 btn.classList.remove('bg-white/5', 'text-gray-400', 'border-white/20');
//             } else {
//                 btn.classList.remove('bg-spidey-red', 'text-white');
//                 btn.classList.add('bg-white/5', 'text-gray-400', 'border-white/20');
//             }
//         });

//         renderEventsGrid();

//         // Fade in
//         requestAnimationFrame(() => {
//             container.style.opacity = '1';
//             container.style.transform = 'translateY(0)';
//         });
//     }, 300);
// };

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
            <div onclick="openModal('${event.id}', event)" class="event-card relative bg-spidey-black comic-border border-spidey-blue group cursor-pointer reveal-on-scroll opacity-0 overflow-hidden" data-animation="animate-scaleIn">
              <img src="./assets/box.png" alt="" class="event-card-frame" aria-hidden="true">
              <div class="event-card-tint" aria-hidden="true"></div>
              <div class="relative z-10 h-56 overflow-hidden">
                    <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-4 right-4 bg-spidey-red text-white px-3 py-1 font-comic text-lg comic-shadow">
                        ${event.category}
                    </div>
                </div>
              <div class="relative z-10 p-6 space-y-4">
                    <h3 class="text-3xl text-white group-hover:text-spidey-red transition-colors">${event.title}</h3>
                    <div class="flex flex-col gap-2 text-gray-400 font-medium">
                        <div class="flex items-center gap-2">
                            <i data-lucide="calendar" class="w-5 h-5 text-spidey-blue"></i>
                            <span>${event.date}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i data-lucide="map-pin" class="w-5 h-5 text-spidey-blue"></i>
                            <span>Main Auditorium / Lab 101</span>
                        </div>
                    </div>
                    <p class="text-gray-400 line-clamp-3">${event.description}</p>
                    <button class="w-full py-3 bg-spidey-blue text-white font-comic text-2xl comic-border border-white hover:bg-spidey-red hover:border-spidey-red transition-all mt-4">
                        VIEW DETAILS
                    </button>
                </div>
            </div>
        `,
      )
      .join('');
    lucide.createIcons();
    setupScrollReveal();
  }
}

// ===== FEATURED EVENTS RENDER =====
function renderFeaturedEvents() {
  const container = document.getElementById('featured-events-container');
  if (!container) return;

  // sirf first 3 events
  const featured = EVENTS.slice(0, 3);

  container.innerHTML = featured
    .map(
      (event) => `
      <a href="./events.html" class="event-box-card" aria-label="View ${event.title} in Events">
        <img src="./assets/box.png" alt="${event.title}" class="event-box-image">
      </a>
    `,
    )
    .join('');
}
window.addEventListener('DOMContentLoaded', () => {
  renderFeaturedEvents();
});

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

const aboutVideoTrigger = document.getElementById('about-video-trigger');
const aboutVideoModal = document.getElementById('about-video-modal');
const aboutVideoClose = document.getElementById('about-video-close');
const aboutVideoFrame = document.getElementById('about-video-frame');
const ABOUT_VIDEO_URL =
  'https://www.youtube.com/embed/OTC28uHxvHM?autoplay=1&rel=0';

function openAboutVideo() {
  if (!aboutVideoModal || !aboutVideoFrame) return;
  aboutVideoFrame.src = ABOUT_VIDEO_URL;
  aboutVideoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeAboutVideo() {
  if (!aboutVideoModal || !aboutVideoFrame) return;
  aboutVideoModal.classList.remove('active');
  aboutVideoFrame.src = '';
  document.body.style.overflow = 'auto';
}

if (aboutVideoTrigger) {
  aboutVideoTrigger.addEventListener('click', openAboutVideo);
}

if (aboutVideoClose) {
  aboutVideoClose.addEventListener('click', closeAboutVideo);
}

if (aboutVideoModal) {
  aboutVideoModal.addEventListener('click', (event) => {
    if (event.target.classList.contains('about-video-overlay')) {
      closeAboutVideo();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAboutVideo();
  }
});
