// =========================
// FRIENDSHIP BOOK JS
// =========================

const pages = document.querySelectorAll(".page");

let currentPage = 0;


// Show first page
function showPage(index) {

    pages.forEach((page, i) => {

        if (i === index) {
            page.classList.add("active");
        } 
        else {
            page.classList.remove("active");
        }

    });

}


// Next page
function nextPage() {

    if (currentPage < pages.length - 1) {

        currentPage++;
        showPage(currentPage);

    }

}


// Previous page
function previousPage() {

    if (currentPage > 0) {

        currentPage--;
        showPage(currentPage);

    }

}


// Click next / previous
document.addEventListener("click", function(e){

    let screenWidth = window.innerWidth;

    if(e.clientX > screenWidth / 2){

        nextPage();

    } 
    else {

        previousPage();

    }

});


// Mobile swipe support

let touchStartX = 0;
let touchEndX = 0;


document.addEventListener("touchstart", function(e){

    touchStartX = e.changedTouches[0].screenX;

});


document.addEventListener("touchend", function(e){

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe(){

    if(touchStartX - touchEndX > 50){

        nextPage();

    }


    if(touchEndX - touchStartX > 50){

        previousPage();

    }

}


// Start book
showPage(currentPage);
