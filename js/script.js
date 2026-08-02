// Function to navigate from Index page to Book page
function openBook() {
    window.location.href = "book.html";
}

// Current Active Page Index (0-indexed)
let currentPageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize Page Switcher if on book.html
    const pages = document.querySelectorAll('.book-page');
    if (pages.length > 0) {
        updatePageVisibility();
    }

    // 2. Initialize Particles
    initParticles();

    // 3. Enable Touch Swipe Support for Mobile
    initSwipeSupport();
});

// Function to Change Page (-1 for Previous, +1 for Next)
function changePage(direction) {
    const pages = document.querySelectorAll('.book-page');
    if (pages.length === 0) return;

    let newIndex = currentPageIndex + direction;

    if (newIndex >= 0 && newIndex < pages.length) {
        currentPageIndex = newIndex;
        updatePageVisibility();
        // Scroll smoothly to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Update Page Visibility and Button States
function updatePageVisibility() {
    const pages = document.querySelectorAll('.book-page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (pages.length === 0) return;

    // Hide all pages, show only active page
    pages.forEach((page, index) => {
        if (index === currentPageIndex) {
            page.classList.add('active-page');
        } else {
            page.classList.remove('active-page');
        }
    });

    // Update Previous Button State
    if (prevBtn) {
        if (currentPageIndex === 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.4';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
        }
    }

    // Update Next Button State (Changes to "The End ❤️" on final page)
    if (nextBtn) {
        if (currentPageIndex === pages.length - 1) {
            nextBtn.innerText = 'The End ❤️';
            nextBtn.style.background = 'linear-gradient(45deg, #e91e63, #c2185b)';
            nextBtn.style.color = '#fff';
        } else {
            nextBtn.innerText = 'Next ➡️';
            nextBtn.style.background = 'linear-gradient(45deg, #d4af37, #b8860b)';
            nextBtn.style.color = '#2b0821';
        }
    }
}

// Open Secret Pulsing Heart on Page 10 & Trigger Party Burst
function openSecretHeart(container) {
    const secretMsg = document.getElementById('secretMsg');
    if (!secretMsg) return;

    // Reveal Secret Message
    secretMsg.style.display = 'block';

    // Get click coordinates for Party Flower/Emoji burst
    const rect = container.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    triggerEmojiConfetti(x, y);
}

// Emoji & Flower Confetti Party Burst
function triggerEmojiConfetti(x, y) {
    const emojis = ['🌸', '✨', '💖', '🎉', '🦋', '💐', '🥳', '🤍', '⭐', '🌺', '💕'];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.classList.add('confetti-particle');
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.fontSize = (Math.random() * 18 + 18) + 'px';

        // Random burst direction angles
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 180 + 70;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 40; // upward trajectory

        p.style.setProperty('--tx', tx + 'px');
        p.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(p);

        setTimeout(() => {
            p.remove();
        }, 1400);
    }
}

// Mobile Touch Swipe Support
function initSwipeSupport() {
    const stage = document.querySelector('.book-stage');
    if (!stage) return;

    let touchStartX = 0;
    let touchEndX = 0;

    stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            changePage(1); // Swipe Left -> Next
        } else if (touchEndX > touchStartX + threshold) {
            changePage(-1); // Swipe Right -> Prev
        }
    }
}

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

// Background Particles
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
