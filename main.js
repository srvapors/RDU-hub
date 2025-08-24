document.addEventListener("DOMContentLoaded", function() {
    // --- Define the current page's path ---
    const currentPage = window.location.pathname;

    // --- Fetch and inject the header ---
    fetch('/RDU-hub/header.html')
        .then(response => response.ok ? response.text() : Promise.reject('Header not found'))
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // --- Logic to set the 'active' class on the correct nav link ---
            const navLinks = document.querySelectorAll('#main-nav a');
            navLinks.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                // Check if the current page path ends with the link's path
                // This handles both the root (index.html) and subpages correctly
                if (currentPage.endsWith(linkPath.substring(linkPath.lastIndexOf('/') + 1)) || (currentPage.endsWith('/RDU-hub/') && linkPath.endsWith('index.html'))) {
                    // A special check for the blog index page
                    if (currentPage.endsWith('blog.html') && linkPath.endsWith('blog.html')) {
                        link.classList.add('active');
                    } else if (!currentPage.includes('/blog/') && !linkPath.includes('/blog/')) {
                         link.classList.add('active');
                    } else if (currentPage.includes('/blog/') && link.getAttribute('href').includes('blog/blog.html')) {
                        link.classList.add('active');
                    }
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
        })
        .catch(error => console.error('Error fetching header:', error));

    // --- Fetch and inject the footer ---
    fetch('/RDU-hub/footer.html')
        .then(response => response.ok ? response.text() : Promise.reject('Footer not found'))
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching footer:', error));
});
