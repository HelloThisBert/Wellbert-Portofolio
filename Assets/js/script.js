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

const radios = document.querySelectorAll('input[name="tab"]');
  const contents = document.querySelectorAll('.tabcontent');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const value = radio.value;

      contents.forEach(content => {
        content.classList.remove('active');
        if (content.id === value) {
          content.classList.add('active');
        }
      });
    });
  });

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
    }
});

        gsap.registerPlugin(ScrollTrigger);

        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Portfolio Animation Started');

            // Get all elements
            const projectRows = document.querySelectorAll('.project-row');
            const projectContents = document.querySelectorAll('.project-content');
            const projectImages = document.querySelectorAll('.project-image');
            const techItems = document.querySelectorAll('.tech-item');
            const visitButtons = document.querySelectorAll('.visit-button');

            // Initialize elements
            function initializeElements() {
                console.log('🎬 Initializing elements...');

                // Set initial states
                gsap.set(projectContents, { 
                    opacity: 0, 
                    x: -50 
                });

                gsap.set(projectImages, { 
                    opacity: 0, 
                    x: 50 
                });

                gsap.set(techItems, { 
                    opacity: 0, 
                    y: 30 
                });

                gsap.set(visitButtons, { 
                    opacity: 0, 
                    y: 20 
                });
            }

            // Create animations for each project row
            projectRows.forEach((row, index) => {
                const content = row.querySelector('.project-content');
                const image = row.querySelector('.project-image');
                const techItemsInRow = row.querySelectorAll('.tech-item');
                const visitButtonInRow = row.querySelector('.visit-button');

                // Create timeline for each row
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Animate content and image simultaneously
                tl.to(content, {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out"
                })
                .to(image, {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.8")
                .to(techItemsInRow, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.4")
                .to(visitButtonInRow, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.2");
            });

            // Enhanced hover animations
            techItems.forEach(tech => {
                tech.addEventListener('mouseenter', () => {
                    gsap.to(tech, { 
                        scale: 1.05, 
                        y: -2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                tech.addEventListener('mouseleave', () => {
                    gsap.to(tech, { 
                        scale: 1, 
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });

            // Visit button hover animations
            document.querySelectorAll('.btn-visit').forEach(btn => {
                const arrow = btn.querySelector('i');

                btn.addEventListener('mouseenter', () => {
                    gsap.to(btn, { 
                        scale: 1.02, 
                        y: -2,
                        duration: 0.3 
                    });
                    if (arrow) {
                        gsap.to(arrow, { 
                            x: 4, 
                            duration: 0.3 
                        });
                    }
                });

                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, { 
                        scale: 1, 
                        y: 0,
                        duration: 0.3 
                    });
                    if (arrow) {
                        gsap.to(arrow, { 
                            x: 0, 
                            duration: 0.3 
                        });
                    }
                });
            });

            // Image frame hover animations
            document.querySelectorAll('.image-frame').forEach(frame => {
                const mockup = frame.querySelector('.image-mockup');
                const arrow = frame.querySelector('.frame-arrow');

                frame.addEventListener('mouseenter', () => {
                    if (mockup) {
                        gsap.to(mockup, { 
                            y: -10, 
                            rotateX: 10, 
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                });

                frame.addEventListener('mouseleave', () => {
                    if (mockup) {
                        gsap.to(mockup, { 
                            y: 0, 
                            rotateX: 0, 
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                });
            });

            // Initialize everything
            initializeElements();

            // Resize handler
            window.addEventListener('resize', () => {
                ScrollTrigger.refresh();
            });

            console.log('✅ Portfolio Animation Complete');
        });