// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');

    if (mobileMenuBtn && navMenu) {
        function toggleMenu() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) toggleMenu();
            });
        });
    }

    // Scroll Header Effect
    const header = document.querySelector('.glass-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.padding = '0';
            header.style.background = 'var(--glass-bg)';
        }
    });

    // Render Projects
    const galleryContainer = document.getElementById('projects-gallery-container');
    if (galleryContainer) {
        renderProjects(galleryContainer);
    }
});

const currentSlide = {};

function moveCarousel(projectId, direction) {
    const inner = document.getElementById(`carousel-inner-${projectId}`);
    if (!inner) return;

    if (typeof currentSlide[projectId] === 'undefined') {
        currentSlide[projectId] = 0;
    }
    
    const totalImages = inner.children.length;
    currentSlide[projectId] += direction;
    
    if (currentSlide[projectId] < 0) currentSlide[projectId] = totalImages - 1;
    if (currentSlide[projectId] >= totalImages) currentSlide[projectId] = 0;
    
    const percentage = -(currentSlide[projectId] * 100);
    inner.style.transform = `translateX(${percentage}%)`;
}

function renderProjects(container) {
    if (typeof proyectosData === 'undefined' || proyectosData.length === 0) {
        container.innerHTML = `
            <div class="no-projects">
                <p>Aún no hay proyectos cargados. Vuelve pronto para ver nuestras obras.</p>
            </div>
        `;
        return;
    }

    let htmlContent = '';
    const whatsappMessage = "Hola Animar, me interesa hablar sobre un proyecto de construcción.";
    const wppLink = `https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMessage)}`;

    proyectosData.forEach(project => {
        let imagesHtml = '';
        if (project.images && project.images.length > 0) {
            imagesHtml = `
                <div class="project-carousel">
                    <div class="carousel-inner" id="carousel-inner-${project.id}">`;
            
            project.images.forEach(img => {
                imagesHtml += `<img src="${img}" alt="${project.title}" loading="lazy" />`;
            });
            
            imagesHtml += `
                    </div>
                    <button class="carousel-btn prev" aria-label="Anterior" onclick="moveCarousel(${project.id}, -1)">&#10094;</button>
                    <button class="carousel-btn next" aria-label="Siguiente" onclick="moveCarousel(${project.id}, 1)">&#10095;</button>
                </div>
            `;
        }

        htmlContent += `
            <div class="project-item">
                <div class="project-info">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <a href="${wppLink}" target="_blank" class="btn-primary wpp-small">Me interesa un proyecto similar</a>
                </div>
                ${imagesHtml}
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}
