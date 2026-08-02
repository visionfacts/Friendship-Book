// Function to navigate from Index page to Book page
function openBook() {
    window.location.href = "book.html";
}

// Global PageFlip Instance variable
let pageFlip;

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize PageFlip book if on book.html
    const bookElem = document.getElementById('book');
    if (bookElem && typeof St !== 'undefined') {
        pageFlip = new St.PageFlip(bookElem, {
            width: 360,
            height: 520,
            size: 'fixed',
            minWidth: 300,
            maxWidth: 450,
            minHeight: 420,
            maxHeight: 600,
            showCover: true,
            maxShadowOpacity: 0.6,
            mobileScrollSupport: false
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        // Button Click handlers
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                pageFlip.flipPrev();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                pageFlip.flipNext();
            });
        }

        // Keyboard Arrow Key Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                pageFlip.flipPrev();
            } else if (e.key === 'ArrowRight') {
                pageFlip.flipNext();
            }
        });
    }

    // 2. Initialize Floating Heart & Butterfly Particles
    initParticles();
});

// Audio Play / Pause Functionality
let isMusicPlaying = false;
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');

    if (!bgMusic || !musicBtn) return;

    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.innerText = '🎵 Play Music';
        isMusicPlaying = false;
    } else {
        bgMusic.play().then(() => {
            musicBtn.innerText = '🔊 Music: On';
            isMusicPlaying = true;
        }).catch(err => {
            console.log("Audio playback error:", err);
        });
    }
}

// Particle Generator Function
function initParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;

    const icons = ['❤️', '💖', '✨', '🦋', '🌸', '🤍', '💕'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerText = icons[Math.floor(Math.random() * icons.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.fontSize = (Math.random() * 14 + 14) + 'px';
        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 8000);
    }

    setInterval(createParticle, 450);
}
