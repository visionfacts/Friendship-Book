// =========================
// FRIENDSHIP BOOK JS
// =========================

document.addEventListener("DOMContentLoaded", function () {


    const pages = document.querySelectorAll(".page");

    let currentPage = 0;


    // Show Page
    function showPage(index) {

        pages.forEach((page, i) => {

            if (i === index) {

                page.classList.add("active");

            } else {

                page.classList.remove("active");

            }

        });

    }



    // Next Page
    function nextPage() {

        if (currentPage < pages.length - 1) {

            currentPage++;

            showPage(currentPage);

        }

    }



    // Previous Page
    function previousPage() {

        if (currentPage > 0) {

            currentPage--;

            showPage(currentPage);

        }

    }



    // Click Next / Previous

    document.addEventListener("click", function(e) {


        let screenWidth = window.innerWidth;


        if (e.clientX > screenWidth / 2) {


            nextPage();


        } else {


            previousPage();


        }


    });



    // =========================
    // MOBILE SWIPE
    // =========================


    let touchStartX = 0;

    let touchEndX = 0;



    document.addEventListener("touchstart", function(e) {


        touchStartX = e.changedTouches[0].screenX;


    });



    document.addEventListener("touchend", function(e) {


        touchEndX = e.changedTouches[0].screenX;


        handleSwipe();


    });



    function handleSwipe() {


        // Swipe Left = Next Page

        if (touchStartX - touchEndX > 50) {


            nextPage();


        }



        // Swipe Right = Previous Page

        if (touchEndX - touchStartX > 50) {


            previousPage();


        }


    }



    // Start Book From Page 1

    showPage(currentPage);



});
