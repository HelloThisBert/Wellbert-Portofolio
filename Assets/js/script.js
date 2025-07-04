document.addEventListener("DOMContentLoaded", () => {
    const arrowparts = document.querySelectorAll(".arrow");

    // Removed unused variables isOpen and isAnimating

    
    let currentScroll = window.pageYOffset;
    let isScrollingDown = true;
    
    // Inisialisasi marquee sekali saja
    let marqueeTween = gsap.to(".marquee__part", {
        xPercent: -100,
        repeat: -1,
        duration: 5,
        ease: "linear",
    })
    .totalProgress(0.5) // Set initial progress to 50%
    gsap.set(".marquee__inner", { xPercent: -50 });
    
    // Event arrow untuk mengubah arah marquee (misal: reverse)
    arrowparts.forEach(arrow => {
        arrow.addEventListener("click", () => {
            marqueeTween.reversed(!marqueeTween.reversed());
        });
    });
    gsap.set(".marquee__inner", { xPercent: -50});
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > currentScroll) {
            isScrollingDown = true;
        } else {
            isScrollingDown = false;
            }

            gsap.to(marqueeTween, { timeScale: isScrollingDown ? 1 : -1 });

            arrowparts.forEach(arrow => {
                if (isScrollingDown) {
                    arrow.classList.remove("active");
                } else {
                    arrow.classList.add("active");
                }
            });
            currentScroll = window.pageYOffset;
        }, { passive: true });
    });

const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Open menu
if(navToggle){
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.add('show-menu');
        document.body.classList.add('menu-open');
    });
}

// Close menu
if(navClose){
    navClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    });
}

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    });
});



// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    }
});