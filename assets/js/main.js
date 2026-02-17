const nav = document.querySelector('.organism-nav');
const toggle = document.querySelector('.nav-toggle');

if (nav) {
    let lastScrollY = window.scrollY;

    // Lógica para el botón Hamburguesa
    if (toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('is-open');
            // Evitamos que el fondo se mueva cuando el menú está abierto
            document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
        });
    }

    // Lógica de Scroll (Hide/Show)
    window.addEventListener('scroll', () => {
        // Si el menú móvil está abierto, no hacemos nada con el scroll
        if (nav.classList.contains('is-open')) return;

        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.classList.add('is-hidden');
        } else {
            nav.classList.remove('is-hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}