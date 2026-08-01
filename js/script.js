// =========================
// FRIENDSHIP BOOK JS
// =========================

document.addEventListener("DOMContentLoaded", function(e){

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

 
document.querySelector(".book").addEventListener("click", function(e){

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



document.querySelector(".book").addEventListener("touchstart", function(e){

        touchStartX = e.changedTouches[0].screenX;


    });



  document.querySelector(".book").addEventListener("touchend", function(e){


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


// =========================
// PART 4A - PREMIUM CONTROLS
// =========================

// Keyboard Navigation

    document.querySelector(".book").addEventListener("keydown", function(e){

    if(e.key === "ArrowRight"){
        nextPage();
    }

    if(e.key === "ArrowLeft"){
        previousPage();
    }

});

// Mouse Wheel Navigation
let wheelLock = false;


document.querySelector(".book").addEventListener("wheel", function(e){
    if(wheelLock) return;

    wheelLock = true;

    setTimeout(() => {
        wheelLock = false;
    }, 500);

    if(e.deltaY > 0){
        nextPage();
    }else{
        previousPage();
    }

});

// Double Click = Next Page

document.querySelector(".book").addEventListener("dblclick", function(e){
    nextPage();

});

// Preload Images
window.addEventListener("load", () => {

    document.querySelectorAll("img").forEach(img => {

        const preload = new Image();
        preload.src = img.src;

    });

});

// Auto Focus
window.addEventListener("load", () => {
    window.focus();
});
// =========================
// PART 4B - FINAL PREMIUM
// =========================

// Background Music (First Click)
const music = document.getElementById("bgMusic");
let musicStarted = false;


document.querySelector(".book").addEventListener("click", function(e){
    if (!musicStarted && music) {

        music.play().catch(() => {});

        musicStarted = true;

    }

}, { once: true });


// Heart Burst Effect
function heartBurst() {

    for (let i = 0; i < 8; i++) {

        const heart = document.createElement("span");

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";
        heart.style.left = (45 + Math.random() * 10) + "%";
        heart.style.top = "55%";
        heart.style.fontSize = (18 + Math.random() * 20) + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "9999";
        heart.style.transition = "all 1.2s ease";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.style.transform =
                `translate(${(Math.random()-0.5)*300}px,-250px) scale(0) rotate(${Math.random()*360}deg)`;

            heart.style.opacity = "0";

        },20);

        setTimeout(() => {

            heart.remove();

        },1300);

    }

}


// Show Heart Burst On Every Page
const originalShowPage = showPage;

function showPage(index){

    originalShowPage(index);

    heartBurst();

    pages[index].scrollTop = 0;

}

// Photo Click Zoom
document.querySelectorAll(".gallery img").forEach(img => {

    img.addEventListener("click", function(){

        const overlay = document.createElement("div");

        overlay.style.position="fixed";
        overlay.style.left="0";
        overlay.style.top="0";
        overlay.style.width="100%";
        overlay.style.height="100%";
        overlay.style.background="rgba(0,0,0,.9)";
        overlay.style.display="flex";
        overlay.style.justifyContent="center";
        overlay.style.alignItems="center";
        overlay.style.zIndex="99999";

        const big=document.createElement("img");

        big.src=this.src;
        big.style.maxWidth="90%";
        big.style.maxHeight="90%";
        big.style.borderRadius="20px";
        big.style.boxShadow="0 0 40px white";

        overlay.appendChild(big);

        overlay.onclick=function(){

            overlay.remove();

        }

        document.body.appendChild(overlay);

    });

});


// Final Page Celebration
const originalNextPage = nextPage;

function nextPage(){

    originalNextPage();

    if(currentPage === pages.length - 1 && !window.confettiDone){

        confettiEffect();

        window.confettiDone = true;

    }

}
function confettiEffect(){

    for(let i=0;i<120;i++){

        const c=document.createElement("div");

        c.style.position="fixed";
        c.style.width="8px";
        c.style.height="8px";
        c.style.left=Math.random()*100+"vw";
        c.style.top="-20px";
        c.style.background=
        ["#FFD700","#ff4d88","#ffffff","#00e5ff","#7CFC00"][Math.floor(Math.random()*5)];

        c.style.zIndex="99999";
        c.style.borderRadius="50%";
        c.style.transition="all 3s linear";

        document.body.appendChild(c);

        setTimeout(()=>{

            c.style.transform=`translateY(110vh) rotate(${Math.random()*720}deg)`;

            c.style.opacity="0";

        },20);

        setTimeout(()=>{

            c.remove();

        },3200);

    }

}
// =========================
// PART 5A - ULTRA PREMIUM
// =========================

// Page Turn Sound
//const pageSound = new Audio("page-flip.mp3");
//pageSound.volume = 0.4;



// Cursor Sparkle Effect

document.querySelector(".book").addEventListener("mousemove", function(e){
    const star = document.createElement("div");

    star.innerHTML = "✨";

    star.style.position = "fixed";
    star.style.left = e.clientX + "px";
    star.style.top = e.clientY + "px";
    star.style.pointerEvents = "none";
    star.style.zIndex = "99999";
    star.style.fontSize = "14px";
    star.style.transition = "all .8s ease";

    document.body.appendChild(star);

    setTimeout(() => {

        star.style.transform = "translateY(-25px) scale(0)";
        star.style.opacity = "0";

    },20);

    setTimeout(() => {

        star.remove();

    },800);

});


// Random Floating Emoji
setInterval(() => {

    const emoji = document.createElement("div");

    emoji.innerHTML = ["❤️","🌸","✨","🦋","💕"][Math.floor(Math.random()*5)];

    emoji.style.position="fixed";
    emoji.style.left=Math.random()*100+"vw";
    emoji.style.bottom="-30px";
    emoji.style.fontSize=(18+Math.random()*20)+"px";
    emoji.style.pointerEvents="none";
    emoji.style.zIndex="9999";
    emoji.style.transition="all 8s linear";

    document.body.appendChild(emoji);

    setTimeout(()=>{

        emoji.style.transform="translateY(-120vh)";
        emoji.style.opacity="0";

    },20);

    setTimeout(()=>{

        emoji.remove();

    },8000);

},2500);




});
