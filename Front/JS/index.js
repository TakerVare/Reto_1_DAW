document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav_menu');
    
    // Si no existe el menú hamburguesa, crearlo
    if (!hamburger) {
        const newHamburger = document.createElement('button');
        newHamburger.classList.add('hamburger');
        newHamburger.innerHTML = '<div></div><div></div><div></div>';
        document.querySelector('.header').appendChild(newHamburger);
        
        // Actualizar la referencia
        hamburger = newHamburger;
    }
    
    // Función para alternar el menú
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    }
    
    // Evento de clic para el botón hamburguesa
    hamburger.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav_menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
    
    // Ajustar navegación al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });
});