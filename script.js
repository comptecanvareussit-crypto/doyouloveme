// ============================================
// === STELLALOVE - VIDÉO EXTERNE !        ===
// === PLUS DE PROBLÈME DE POIDS !         ===
// ============================================

// 🎬 VIDÉO HÉBERGÉE SUR CLOUDINARY (GRATUIT)
const VIDEO_OUI = 'https://res.cloudinary.com/dem4x5gqf/video/upload/v1739361235/sample_meuf_hq9zfc.mp4';
const GIF_NON = 'https://media.tenor.com/47KEJ7yaVtoAAAAi/chihuahua-stare-at.gif';
const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/400x400/ffd9e2/a5384b?text=💕';
const IMAGE_FALLBACK = 'https://via.placeholder.com/400x400/ffd9e2/a5384b?text=StellaLove';

const imageZone = document.getElementById('imageZone');
const btnOui = document.getElementById('btnOui');
const btnNon = document.getElementById('btnNon');
const messageBox = document.getElementById('messageBox');
const messageTexte = document.getElementById('messageTexte');
const chatInput = document.getElementById('chatInput');
const chatBulle = document.getElementById('chatBulle');
const sousTitre = document.getElementById('sousTitre');
const body = document.body;

let compteurNon = 0;
let nonCliqueFinal = false;
let modeRefusActive = false;

function creerCoeur() {
    const coeur = document.createElement('div');
    coeur.className = 'coeur';
    if (modeRefusActive) {
        const coeursFroids = ['💙', '💚', '🤍', '💜', '🩵'];
        coeur.textContent = coeursFroids[Math.floor(Math.random() * coeursFroids.length)];
    } else {
        coeur.textContent = '❤️';
    }
    coeur.style.left = Math.random() * 100 + '%';
    coeur.style.animationDuration = (Math.random() * 3 + 4) + 's';
    coeur.style.fontSize = (Math.random() * 25 + 25) + 'px';
    document.body.appendChild(coeur);
    setTimeout(() => coeur.remove(), 7000);
}

function activerModeRefus() {
    modeRefusActive = true;
    body.classList.add('mode-refus');
    sousTitre.innerHTML = '✨ Réponse acceptée, c’est doux aussi ✨';
}

function desactiverModeRefus() {
    modeRefusActive = false;
    body.classList.remove('mode-refus');
    sousTitre.innerHTML = '✨ La réponse est dans ton cœur ✨';
}

function fuirBouton() {
    if (compteurNon < 3) {
        const maxX = window.innerWidth - btnNon.offsetWidth - 15;
        const maxY = window.innerHeight - btnNon.offsetHeight - 15;
        const x = Math.max(8, Math.min(maxX, Math.random() * maxX));
        const y = Math.max(8, Math.min(maxY, Math.random() * maxY));
        btnNon.style.position = 'fixed';
        btnNon.classList.add('btn-non-bouge');
        btnNon.style.left = x + 'px';
        btnNon.style.top = y + 'px';
        compteurNon++;
        messageBox.style.display = 'block';
        if (compteurNon === 1) {
            messageTexte.innerHTML = '🤔 Attrapé ! Mais… est-ce que tu es VRAIMENT sûre ? 💕';
            btnNon.innerHTML = '🏃 NON... attrape !';
        } else if (compteurNon === 2) {
            messageTexte.innerHTML = '😢 Encore NON ?… Tu es vraiment certaine ? Clique sur OUI, allez… 💘';
            btnNon.innerHTML = '🏃💨 trop lent !';
        } else if (compteurNon === 3) {
            messageTexte.innerHTML = '🥺 Dernière chance… Vraiment, vraiment NON ? Je vais arrêter de courir…';
            btnNon.innerHTML = '💨🏃 vite vite !';
        }
    }
}

function playVideo() {
    imageZone.innerHTML = '';
    const video = document.createElement('video');
    video.src = VIDEO_OUI;
    video.autoplay = true;
    video.loop = true;
    video.muted = false;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', '');
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.volume = 1.0;
    
    video.onerror = function() {
        imageZone.innerHTML = `<img src="${IMAGE_FALLBACK}" alt="Fallback" style="width:100%; height:100%; object-fit:cover;">`;
    };
    
    imageZone.appendChild(video);
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            video.muted = true;
            video.play().then(() => {
                setTimeout(() => {
                    video.muted = false;
                    video.volume = 1.0;
                }, 100);
            }).catch(() => {
                imageZone.innerHTML = `<img src="${IMAGE_FALLBACK}" alt="Fallback" style="width:100%; height:100%; object-fit:cover;">`;
            });
        });
    }
}

btnOui.addEventListener('click', function() {
    playVideo();
    messageBox.style.display = 'block';
    messageTexte.innerHTML = '💖✨ OUI !!! Tu as dit OUI !!! ✨💖<br>C’est le plus beau jour, je t’aime ! 💕';
    btnNon.classList.add('btn-non-cache');
    btnNon.style.position = 'relative';
    btnNon.style.left = '0';
    btnNon.style.top = '0';
    btnNon.classList.remove('btn-non-bouge');
    compteurNon = 0;
    nonCliqueFinal = false;
    if (modeRefusActive) desactiverModeRefus();
    for (let i = 0; i < 12; i++) setTimeout(creerCoeur, i * 40);
    chatBulle.innerHTML = '❤️ OUI !!! ❤️';
});

btnNon.addEventListener('touchstart', function(e) {
    e.preventDefault();
    if (!btnNon.classList.contains('btn-non-cache')) fuirBouton();
});

btnNon.addEventListener('click', function(e) {
    e.preventDefault();
    if (btnNon.classList.contains('btn-non-cache')) return;
    
    if (compteurNon >= 3) {
        if (!nonCliqueFinal) {
            nonCliqueFinal = true;
            imageZone.innerHTML = `<img src="${GIF_NON}" alt="NON" style="width:100%; height:100%; object-fit:cover;">`;
            messageBox.style.display = 'block';
            messageTexte.innerHTML = '🐕 Non, je comprends… C’est doux quand même. 💕';
            activerModeRefus();
            chatBulle.innerHTML = '💙 C’est doux… 💙';
        }
    } else {
        messageBox.style.display = 'block';
        if (compteurNon === 1) messageTexte.innerHTML = '🤔 Attrapé ! Mais… est-ce que tu es VRAIMENT sûre ? 💕';
        else if (compteurNon === 2) messageTexte.innerHTML = '😢 Encore NON ?… Tu es vraiment certaine ? Clique sur OUI, allez… 💘';
    }
    
    btnNon.style.position = 'relative';
    btnNon.style.left = '0';
    btnNon.style.top = '0';
    btnNon.classList.remove('btn-non-bouge');
    btnNon.innerHTML = '🏃 NON';
});

btnNon.addEventListener('mouseover', function() {
    if (window.innerWidth > 800 && compteurNon < 3 && !btnNon.classList.contains('btn-non-cache')) fuirBouton();
});

chatInput.addEventListener('input', function() {
    const txt = this.value.toLowerCase();
    if (txt.includes('non')) {
        chatBulle.innerHTML = '😤 Attrape NON alors !';
        if (compteurNon < 3 && !btnNon.classList.contains('btn-non-cache')) fuirBouton();
    } else if (txt.includes('oui')) {
        chatBulle.innerHTML = '✨ OUI !!! ✨';
        playVideo();
        messageBox.style.display = 'block';
        messageTexte.innerHTML = '🥰 Tu as écrit OUI !!! Je suis trop heureux ! 🥰';
        btnNon.classList.add('btn-non-cache');
        btnNon.style.position = 'relative';
        btnNon.style.left = '0';
        btnNon.style.top = '0';
        btnNon.classList.remove('btn-non-bouge');
        btnNon.innerHTML = '🏃 NON';
        compteurNon = 0;
        nonCliqueFinal = false;
        if (modeRefusActive) desactiverModeRefus();
    }
});

setInterval(creerCoeur, 600);
setTimeout(() => {
    messageBox.style.display = 'block';
    messageTexte.innerHTML = '💌 Une question… une réponse. Prêt(e) ? 💌';
}, 500);

window.addEventListener('touchstart', function(e) {
    if (e.target.tagName !== 'INPUT') e.preventDefault();
}, { passive: false });

window.addEventListener('load', function() {
    imageZone.innerHTML = `<img src="${IMAGE_PLACEHOLDER}" alt="StellaLove" style="width:100%; height:100%; object-fit:cover;">`;
});
