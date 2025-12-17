// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Scroll Animations (IntersectionObserver) --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Toggle 'visible' class based on intersection status
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Remove to re-trigger animation
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-anim');
    animatedElements.forEach(el => observer.observe(el));


    /* --- 2. Theme Toggle (Dark/Light) --- */
    // Select ALL theme buttons (desktop & mobile)
    const themeButtons = document.querySelectorAll('.theme-btn');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    const updateIcons = (theme) => {
        const icon = theme === 'light' ? '🌙' : '☀';
        themeButtons.forEach(btn => btn.textContent = icon);
    };

    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        updateIcons('light');
    } else {
        htmlElement.removeAttribute('data-theme');
        updateIcons('dark');
    }

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                // Switch to Dark
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                updateIcons('dark');
            } else {
                // Switch to Light
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateIcons('light');
            }
        });
    });

    /* --- 3. Typing Effect --- */
    const typingSpan = document.querySelector('.typing-text');
    if (typingSpan) {
        const words = ["Mathematics", "Web Developer", "Electronics Engineer", "Content Editor"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; 
            } else {
                typingSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; 
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000);
    }

    /* --- 4. Gallery Carousel Auto-Scroll --- */
    const carousel = document.querySelector('.gallery-carousel');
    if (carousel) {
        let scrollAmount = 0;
        let scrollPerClick = 300; // rough width of item + gap
        let autoScrollInterval;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                carousel.scrollBy({ left: scrollPerClick, behavior: 'smooth' });
                // If reached end, reset to 0 (infinite loop effect logic simplified)
                // Note: accurate end detection depends on scrollWidth - clientWidth <= scrollLeft
                if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                }
            }, 3000);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        // Start auto scroll
        startAutoScroll();

        // Stop on hover/interaction
        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);
        carousel.addEventListener('touchstart', stopAutoScroll);
        carousel.addEventListener('touchend', startAutoScroll);
    }

    /* --- 5. Lightbox Logic --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption').textContent;
            
            if (img) { // Only if image exists
                lightboxImg.src = img.src;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
                
                // Stop body scroll
                document.body.style.overflow = 'hidden'; 
                // Stop carousel
                if (window.autoScrollInterval) clearInterval(window.autoScrollInterval); 
            }
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    // Close on click outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    /* --- 6. Mobile Menu Toggle --- */
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('menu-close');

    if (mobileMenu && menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah event bubbling
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    console.log('%c Hello Developer! ', 'background: #00f3ff; color: #000; font-weight: bold; border-radius: 5px;');
});
