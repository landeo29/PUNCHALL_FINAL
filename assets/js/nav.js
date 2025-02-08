document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const colorModeSelect = document.getElementById('colorMode');

    // Alterna el menú hamburguesa
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Asegura que la clase scrolled no cause movimientos innecesarios
    const updateNavbarState = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateNavbarState);

// Evita aplicar estilos conflictivos en modos de color
    const changeColorMode = (mode) => {
        // Limpia todas las clases de modo de color primero
        document.body.classList.remove('deuteranopia', 'protanopia', 'tritanopia', 'normal');

        // Agrega el nuevo modo si no es 'normal'
        if (mode && mode !== 'normal') {
            document.body.classList.add(mode);
        }

        // Asegura la posición de la barra de navegación
        requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.position = 'fixed';
                navbar.style.top = '10px';
                navbar.style.left = '20px';
                navbar.style.right = '20px';
            }
        });
    };

    // Maneja el cambio de modo de color
    if (colorModeSelect) {
        colorModeSelect.addEventListener('change', (e) => {
            const selectedMode = e.target.value;
            changeColorMode(selectedMode);
        });
    }

    // Asegura el estado inicial
    updateNavbarState();
});
