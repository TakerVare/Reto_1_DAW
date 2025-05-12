/**
 * BurWeb - Back to Top Component
 * Componente para volver al inicio de la página
 */

function initBackToTop() {
    // Crear el botón de "Volver arriba"
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    // Añadir el botón al body
    document.body.appendChild(backToTopButton);
    
    // Función para mostrar/ocultar el botón según el scroll
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Añadir evento para mostrar/ocultar el botón
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Añadir evento de clic para volver arriba
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Verificar el scroll inicial
    toggleBackToTopButton();
    
    console.log('Botón "Back to Top" inicializado');
}

// Exponer la función
window.initBackToTop = initBackToTop;