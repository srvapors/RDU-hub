document.addEventListener("DOMContentLoaded", function() {
    // --- Define the current page's path ---
    const currentPage = window.location.pathname;

    // --- Fetch and inject the header ---
    fetch('/RDU-hub/_header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // --- Logic to set the 'active' class on the correct nav link ---
            const navLinks = document.querySelectorAll('#main-nav a');
            navLinks.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                if (currentPage === linkPath) {
                    link.classList.add('active');
                }
            });

            // --- Re-attach the hamburger menu functionality ---
            const menuButton = document.getElementById('menu-button');
            const mainNav = document.getElementById('main-nav');
            if (menuButton && mainNav) {
                menuButton.addEventListener('click', () => {
                    mainNav.classList.toggle('open');
                });
            }
        });

    // --- Fetch and inject the footer ---
    fetch('/RDU-hub/_footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});
