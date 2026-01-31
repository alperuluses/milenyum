const navSlide = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    const toggleMenu = () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Hamburger Animation
        hamburger.classList.toggle('toggle');
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if menu is active before toggling to avoid issues if desktop view somehow triggers this (though click listeners shouldn't hurt)
            if (nav.classList.contains('nav-active')) {
                toggleMenu();
            }
        });
    });
}

navSlide();
