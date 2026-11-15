/* Portfolio motion and responsive navigation */
(() => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fade-up {
            from { opacity: 0; transform: translateY(22px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes soft-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        @keyframes menu-in {
            from { opacity: 0; transform: translateY(-8px) scale(.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .motion-reveal {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity .65s ease, transform .65s cubic-bezier(.2,.7,.2,1);
            transition-delay: var(--reveal-delay, 0ms);
        }
        .motion-reveal.is-visible { opacity: 1; transform: translateY(0); }
        .hero-content > * { animation: fade-up .7s both; }
        .hero-content > *:nth-child(1) { animation-delay: .08s; }
        .hero-content > *:nth-child(2) { animation-delay: .16s; }
        .hero-content > *:nth-child(3) { animation-delay: .24s; }
        .hero-content > *:nth-child(4) { animation-delay: .32s; }
        .hero-content > *:nth-child(5) { animation-delay: .4s; }
        .hero-image { animation: fade-up .9s .18s both; }
        .profile-avatar { animation: soft-float 6s ease-in-out 1s infinite; }
        .card, .project-card, .hobby-card, .btn, .social-links a, .filter-btn {
            transition: transform .28s ease, box-shadow .28s ease, background-color .28s ease, color .28s ease;
        }
        .nav-links.open { animation: menu-in .22s ease-out both; }
        .hamburger i { transition: transform .25s ease; }
        .hamburger[aria-expanded="true"] i { transform: rotate(90deg); }
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                scroll-behavior: auto !important;
                animation-duration: .01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: .01ms !important;
            }
            .motion-reveal { opacity: 1; transform: none; }
        }
    `;
    document.head.appendChild(style);

    const menuButton = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton && navLinks) {
        menuButton.setAttribute('role', 'button');
        menuButton.setAttribute('tabindex', '0');
        menuButton.setAttribute('aria-label', 'Toggle navigation menu');
        menuButton.setAttribute('aria-controls', 'primary-navigation');
        menuButton.setAttribute('aria-expanded', 'false');
        navLinks.id = navLinks.id || 'primary-navigation';

        const setMenuOpen = (open) => {
            navLinks.classList.toggle('open', open);
            menuButton.setAttribute('aria-expanded', String(open));
            menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        };

        menuButton.addEventListener('click', () => {
            setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
        });
        menuButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
            }
        });
        navLinks.addEventListener('click', (event) => {
            if (event.target.closest('a')) setMenuOpen(false);
        });
        document.addEventListener('click', (event) => {
            if (!menuButton.contains(event.target) && !navLinks.contains(event.target)) setMenuOpen(false);
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
                menuButton.focus();
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) setMenuOpen(false);
        });
    }

    const revealTargets = document.querySelectorAll(
        'main > *, body > section, .page-header, .overview-section, .multimedia-section, .about-text-card, .education-box, .skills-box, .hobby-card, .project-card, .planner-card, .contact-info-card, .contact-form-card, footer'
    );
    revealTargets.forEach((element, index) => {
        element.classList.add('motion-reveal');
        if (element.matches('.card, .hobby-card, .project-card')) {
            element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
        }
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
        revealTargets.forEach((element) => observer.observe(element));
    } else {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
    }
})();
