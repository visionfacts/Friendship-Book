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
        const threshold = 50; // Minimum swipe distance in px
        if (touchEndX < touchStartX - threshold) {
            // Swiped Left -> Go Next
            changePage(1);
        } else if (touchEndX > touchStartX + threshold) {
            // Swiped Right -> Go Prev
            changePage(-1);
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
