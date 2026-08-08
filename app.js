function createLocalSvgFallback(photoName, note) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2d3436" />
        <stop offset="100%" stop-color="#0984e3" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg)"/>
    <rect x="40" y="40" width="720" height="520" rx="20" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-dasharray="12 12"/>
    <text x="400" y="240" font-size="80" text-anchor="middle">📸</text>
    <text x="400" y="340" font-family="-apple-system, sans-serif" font-weight="800" font-size="32" fill="#ffffff" text-anchor="middle">${photoName}</text>
    <text x="400" y="400" font-family="-apple-system, sans-serif" font-weight="600" font-size="22" fill="#ffeaa7" text-anchor="middle">Add ${photoName} to images/</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

const PRESET_PHOTOS = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo3.jpg',
  'images/photo4.jpg',
  'images/photo5.jpg',
  'images/photo6.jpg',
  'images/photo7.jpg',
  'images/photo8.jpg',
  'images/photo9.jpg',
  'images/photo10.jpg',
  'images/photo11.jpg',
  'images/photo12.jpg',
  'images/photo13.jpg',
  'images/photo14.jpg',
  'images/photo15.jpg'
];

const MEMORY_WALL_COLUMNS = [
  [
    {
      type: 'photo',
      photo: PRESET_PHOTOS[0],
      note: 'Happy birthday, Angeline Nashleah Dataya! Wishing u all the happiness and blessings nga imong deserve, and always remember nga naa rako diri always got ur back. love u!🥳💕',
      sender: 'From Lian',
      rotation: -3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[1],
      note: 'Happy birthday lil nash HHAHAHA',
      sender: 'From Rhenz',
      rotation: 4
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[2],
      note: 'Happy birthday, Nash! thank u for being a good friend kahit may saltik ka minsan HAHAHA, I hope you enjoy your day and always stay happy',
      sender: 'From Lawrence',
      rotation: -2
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[3],
      note: 'HAPPY BIRTHDAY VIOLETTTTTT, I HOPE LIFE BECOMES KINDER AND FAIRER TO YOU. MORE SAFE RIDES TO COME, ILOVEYOU!💜',
      sender: 'From Abby',
      rotation: 3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[4],
      note: 'Nash unta di ka mag early out ug very sayo ha happy bdayyy',
      sender: 'From Cyrick',
      rotation: -3
    }
  ],

  [
    {
      type: 'photo',
      photo: PRESET_PHOTOS[5],
      note: 'Happy Birthday Nash, your beautiful the way you are dont let others say otherwise love u 🫶',
      sender: 'From Enzo',
      rotation: 3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[6],
      note: 'hbd nash! i want you to know that you’re such a good friend to us, sister to your siblings, and daughter to your parents.',
      sender: 'From Samantha',
      rotation: -4
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[7],
      note: 'happy birthday nash lahams na lahams kita',
      sender: 'From Rhianne',
      rotation: 2
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[8],
      note: 'Happiest birthday my soulmate, thank you for always showing up, grateful for you always and forever! Ilysm! 🫶🏻',
      sender: 'Angel Baby',
      rotation: -3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[9],
      note: 'Happy Birthday ',
      sender: 'From Eij',
      rotation: 4
    }
  ],

  [
    {
      type: 'photo',
      photo: PRESET_PHOTOS[10],
      note: 'happy birthday to my yolo friend! so grateful to have you in my life, never expected us to get this close but i’m glad na we did 💋 enjoy nash, u deserve all the happiness love u!',
      sender: 'From Zaira',
      rotation: -3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[11],
      note: 'Happy birthday, prinsesa ng wilab! Enjoy your day and study hard tapos ingat pirmi sa dalan.',
      sender: 'From pinaka pogi sa wilab, gean',
      rotation: 4
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[12],
      note: 'Happy birthday Nashleah, I wish you the best of your day and i hope that youll have a great day today.',
      sender: 'From Osama Bin Laden Joseph',
      rotation: -2
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[13],
      note: 'Happybirthday nash unta di na mawala imong pagka jejemon, more bdays to come😊🥶🥳🤩🤑',
      sender: 'From jether',
      rotation: 3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[14],
      note: 'Happy birthday, Nash bayolet! Wishing you good health, happiness, and success in everything you do. ',
      sender: 'From Beng',
      rotation: -4
    }
  ]
];

let isMotionPaused = false;
let isAudioPlaying = true;
let isStraightView = false;
let audioCtx = null;
let musicInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  renderMemoryWallColumns();
  initConfettiCanvas();
  initDockControls();
  initAudioSynthesizer();
  initAddCardModal();
  initLightboxModal();

  setTimeout(() => launchConfettiBurst(80), 500);
});


function renderMemoryWallColumns() {
  const stage = document.getElementById('collageWallStage');
  if (!stage) return;

  stage.innerHTML = '';

  MEMORY_WALL_COLUMNS.forEach((colItems, colIdx) => {
    const track = document.createElement('div');
    track.className = `scroll-track scroll-track-${colIdx}`;
    track.id = `scrollTrack_${colIdx}`;

    for (let seqIdx = 0; seqIdx < 3; seqIdx++) {
      const sequence = document.createElement('div');
      sequence.className = 'track-sequence';

      colItems.forEach((item, itemIdx) => {
        const cardEl = createCardElement(item, colIdx, itemIdx);
        sequence.appendChild(cardEl);
      });

      track.appendChild(sequence);
    }

    stage.appendChild(track);
  });
}

function createCardElement(item, colIdx, itemIdx) {
  const card = document.createElement('div');
  card.className = 'memory-card';

  if (item.rotation) {
    card.style.transform = `rotate(${item.rotation}deg)`;
  }

  const cardNum = colIdx * 5 + itemIdx + 1;
  const fallbackSvg = createLocalSvgFallback(`photo${cardNum}.jpg`, item.note);

  const photoUrlWithCacheBuster = `${item.photo}?v=${Date.now()}`;

  const cardHTML = `
    <div class="card-photo-wrapper">
      <img src="${photoUrlWithCacheBuster}" alt="10th Birthday Photo Memory" class="card-photo-img" loading="lazy" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
    </div>
    <p class="card-note-text">"${escapeHTML(item.note)}"</p>
    <span class="card-sender-tag">— ${escapeHTML(item.sender)}</span>
  `;

  card.innerHTML = cardHTML;

  card.addEventListener('click', (e) => {
    e.stopPropagation();
    const currentImgSrc = card.querySelector('.card-photo-img')?.src || item.photo;
    openCardInLightbox({
      ...item,
      photo: currentImgSrc
    });
  });

  return card;
}

let confettiParticles = [];
let confettiCanvas, ctx;

function initConfettiCanvas() {
  confettiCanvas = document.getElementById('confettiCanvas');
  if (!confettiCanvas) return;

  ctx = confettiCanvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  requestAnimationFrame(updateAndDrawConfetti);
}

function resizeCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function launchConfettiBurst(count = 100) {
  const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#a29bfe', '#ff7675', '#f1c40f', '#00cec9'];

  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 0.4),
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 7,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 8,
      opacity: 1
    });
  }
}

function updateAndDrawConfetti() {
  if (!ctx || !confettiCanvas) return;

  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.vRotation;
    p.opacity -= 0.005;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    if (p.opacity <= 0 || p.y > window.innerHeight) {
      confettiParticles.splice(i, 1);
    }
  }

  requestAnimationFrame(updateAndDrawConfetti);
}

/* ==========================================================================
   3. BOTTOM DOCK CONTROLS & MOTION TOGGLE
   ========================================================================== */
function initDockControls() {
  const toggleMotionBtn = document.getElementById('toggleMotionBtn');
  const motionIcon = document.getElementById('motionIcon');
  const motionLabel = document.getElementById('motionLabel');
  const celebrateBtn = document.getElementById('celebrateBtn');
  const angleToggleBtn = document.getElementById('angleToggleBtn');
  const stage = document.getElementById('collageWallStage');

  
}


function initAudioSynthesizer() {
  const toggleSoundBtn = document.getElementById('toggleSoundBtn');
  

  if (toggleSoundBtn) {
    toggleSoundBtn.addEventListener('click', () => {
      isAudioPlaying = !isAudioPlaying;

     
    });
  }

}


function initLightboxModal() {
  const cardLightbox = document.getElementById('cardLightbox');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  if (closeLightboxBtn && cardLightbox) {
    closeLightboxBtn.addEventListener('click', () => {
      cardLightbox.classList.remove('active');
    });
  }

  if (cardLightbox) {
    cardLightbox.addEventListener('click', (e) => {
      if (e.target === cardLightbox) {
        cardLightbox.classList.remove('active');
      }
    });
  }
}

function openCardInLightbox(item) {
  const cardLightbox = document.getElementById('cardLightbox');
  const content = document.getElementById('lightboxCardContent');
  if (!cardLightbox || !content) return;

  const html = `
    <div style="width:100%; border-radius:12px; overflow:hidden; margin-bottom:16px;">
      <img src="${item.photo}" style="width:100%; max-height:380px; object-fit:cover; display:block;" />
    </div>
    <p style="font-family:'Caveat', cursive; font-size:1.65rem; font-weight:700; color:#1e293b; margin-bottom:8px; line-height:1.3;">"${escapeHTML(item.note)}"</p>
    <span style="font-family:'Caveat', cursive; font-size:1.3rem; color:#64748b; display:block; text-align:right;">— ${escapeHTML(item.sender)}</span>
  `;

  content.innerHTML = html;
  cardLightbox.classList.add('active');
  launchConfettiBurst(40);
}

function initAddCardModal() {
  const addCardBtn = document.getElementById('addCardBtn');
  const addCardModal = document.getElementById('addCardModal');
  const closeAddModalBtn = document.getElementById('closeAddModalBtn');
  const submitNewCardBtn = document.getElementById('submitNewCardBtn');


}


function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const item = document.createElement('div');
  item.className = 'toast-item';
  item.textContent = msg;

  container.appendChild(item);

  setTimeout(() => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.3s ease';
    setTimeout(() => item.remove(), 300);
  }, 2200);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

