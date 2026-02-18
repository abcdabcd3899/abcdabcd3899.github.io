document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links');
    const sections = Array.from(document.querySelectorAll('h2[id]'));

    // --- Mobile Menu Toggle ---
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Smooth Scrolling & Link Handling ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Create full URLs to compare paths
            const currentUrl = new URL(window.location.href);
            const targetUrl = new URL(href, window.location.origin);

            // If it's a link to a section on the current page
            if (targetUrl.pathname === currentUrl.pathname && targetUrl.hash) {
                e.preventDefault();
                const targetElement = document.querySelector(targetUrl.hash);
                if (targetElement) {
                    const offset = 60; // Height of the navbar
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = targetElement.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // For links to other pages, the default browser action will trigger navigation.
            
            // Close mobile menu if it's open after a click
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Active Link Highlighting on Scroll ---
    function setActiveLink() {
        const scrollPosition = window.pageYOffset;
        
        // Handle publications page separately
        if (window.location.pathname.includes('publications')) {
             navLinks.forEach(link => {
                if (link.getAttribute('href').includes('publications')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            return;
        }

        // Handle homepage sections
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70; // 60px navbar height + 10px buffer
            if (scrollPosition >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            const linkHash = new URL(linkHref, window.location.href).hash;

            if (linkHash === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Add event listener for scroll and run on load
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
});