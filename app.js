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
      note: 'Card 1: Roller coaster screaming fun at the theme park! Best day ever!',
      sender: 'From Leo & Sam',
      rotation: 3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[6],
      note: 'Card 2: The giant 5-scoop ice cream sundae victory challenge!',
      sender: 'From Uncle Dave',
      rotation: -4
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[7],
      note: 'Card 3: Space astronaut costume day! Ready for moon launch at 10!',
      sender: 'From Mom',
      rotation: 2
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[8],
      note: 'Card 4: Unwrapping the giant birthday surprise present! Hope you love it!',
      sender: 'From Dad',
      rotation: -3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[9],
      note: 'Card 5: Late night pepperoni pizza feast celebration with the whole crew!',
      sender: 'From Mom & Dad',
      rotation: 4
    }
  ],

  [
    {
      type: 'photo',
      photo: PRESET_PHOTOS[10],
      note: 'Card 1: Stargazing campsite night under the Milky Way! Reach for the stars!',
      sender: 'From Uncle Mark',
      rotation: -3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[11],
      note: 'Card 2: Beach wave jumping competition into the ocean! 10/10 jump form!',
      sender: 'From Cousin Sam',
      rotation: 4
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[12],
      note: 'Card 3: Party lights, music jam, and dancing till sunset! Happy 10th!',
      sender: 'From Coach Mike',
      rotation: -2
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[13],
      note: 'Card 4: Sparkler fireworks lighting up the night for your special day!',
      sender: 'From Grandma & Grandpa',
      rotation: 3
    },
    {
      type: 'photo',
      photo: PRESET_PHOTOS[14],
      note: 'Card 5: Hitting the all-time high score at the retro arcade! Gamer champion!',
      sender: 'From Sam',
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


function playCelebrationChime() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (!audioCtx) return;

    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      const now = audioCtx.currentTime + idx * 0.08;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    });
  } catch (err) {}
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

