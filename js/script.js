// ===============================
// 1314 Endlessly ❤️
// Friendship Book
// Final script.js (Part 2)
// ===============================

// Open Book
function openBook() {
    window.location.href = "book.html";
}

// All Pages
const pages = document.querySelectorAll(".page");

// Current Page
let currentPage = 0;

// Show Page
function showPage() {

    pages.forEach((page) => {
        page.classList.remove("active");
    });

    pages[currentPage].classList.add("active");

}

// Next Page
function nextPage() {

    if (currentPage < pages.length - 1) {

        currentPage++;

        showPage();

    }

}

// Previous Page
function prevPage() {

    if (currentPage > 0) {

        currentPage--;

        showPage();

    }

}

// Keyboard Support
document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowRight") {

        nextPage();

    }

    if (event.key === "ArrowLeft") {

        prevPage();

    }

});

// Touch Swipe Support (Basic)
let startX = 0;

document.addEventListener("touchstart", function (e) {

    startX = e.changedTouches[0].screenX;

});

document.addEventListener("touchend", function (e) {

    let endX = e.changedTouches[0].screenX;

    if (startX - endX > 50) {

        nextPage();

    }

    if (endX - startX > 50) {

        prevPage();

    }

});

// Load First Page
if (pages.length > 0) {

    showPage();

          }
