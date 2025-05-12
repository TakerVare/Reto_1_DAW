// Función para inicializar el menú hamburguesa
function initBurgerMenu() {
    const navBurgerMenu = document.querySelector('.nav_burger_menu');
    const navMenu = document.querySelector('.nav_menu');
    let hamburger = document.querySelector('.hamburger');
    
    // Si no existe el elemento hamburguesa, lo creamos
    if (!hamburger && navBurgerMenu) {
        const newHamburger = document.createElement('button');
        newHamburger.classList.add('hamburger');
        newHamburger.innerHTML = '<div></div><div></div><div></div>';
        navBurgerMenu.appendChild(newHamburger);
        
        // Actualizar referencia
        hamburger = newHamburger;
    }
    
    // Función para alternar el menú
    window.toggleMenu = function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    }
    
    // Evento de clic para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (navMenu && hamburger) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('open')) {
                toggleMenu();
            }
        }
    });
    
    // Ajustar navegación al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (navMenu && hamburger && window.innerWidth > 768 && navMenu.classList.contains('open')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });
}

// Añadimos un event listener para manejar clics fuera de los menús
document.addEventListener('click', function(event) {
    // Menú de usuario
    const userIcon = document.getElementById('nav_user_icon');
    const userMenu = document.querySelector('.card_user_menu');
    
    // Si el clic no fue dentro del menú de usuario ni en el icono, ocultarlo
    if (userMenu && !userMenu.classList.contains('hidden') && 
        !userMenu.contains(event.target) && 
        (userIcon && !userIcon.contains(event.target))) {
        userMenu.classList.add('hidden');
    }
    
    // Menú de carrito
    const cartIcon = document.querySelector('.fas.fa-shopping-cart');
    const cartMenu = document.querySelector('.shopping_cart_menu');
    
    if (cartMenu && !cartMenu.classList.contains('hidden') && 
        !cartMenu.contains(event.target) && 
        (cartIcon && !cartIcon.contains(event.target))) {
        cartMenu.classList.add('hidden');
    }
});