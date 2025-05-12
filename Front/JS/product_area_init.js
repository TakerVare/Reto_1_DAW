/**
 * BurWeb - Product Area Initialization
 * Script de inicialización del área de productos
 */

window.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes comunes primero (si existe)
    if (typeof initCommonComponents === 'function') {
        initCommonComponents();
    }
    
    console.log('Inicializando componentes de productos...');
    
    // Inicializar la cuadrícula de categorías
    if (typeof initGridCategory === 'function') {
        initGridCategory();
    } else {
        console.error('La función initGridCategory no está definida. Verifica que el archivo gridCategory.js se haya cargado correctamente.');
    }
    
    // Verificar que la función initGridProducts esté disponible
    if (typeof initGridProducts === 'function') {
        // Inicializar el grid de productos dinámico
        initGridProducts().then(() => {
            // Después de cargar los productos, verificar si hay un parámetro de categoría
            const urlParams = new URLSearchParams(window.location.search);
            const categoryId = urlParams.get('category');
            
            if (categoryId) {
                // Buscar la sección correspondiente y desplazarse a ella
                scrollToCategory(categoryId);
            }
        });
    } else {
        console.error('La función initGridProducts no está definida. Verifica que el archivo gridProducts.js se haya cargado correctamente.');
    }
    
    // Inicializar el botón "Back to Top"
    if (typeof initBackToTop === 'function') {
        initBackToTop();
    } else {
        console.error('La función initBackToTop no está definida. Verifica que el archivo backToTop.js se haya cargado correctamente.');
    }
});

// Función para desplazarse a la categoría específica
function scrollToCategory(categoryId) {
    // Convertir a número si es necesario
    const catId = parseInt(categoryId);
    
    // Buscar el mapeo de categoría a nombre de sección
    const mapping = categoryMapping[catId];
    
    if (mapping) {
        // Buscar la sección por el sectionKey
        const productGrid = document.querySelector(`.${mapping.sectionKey}-grid`);
        
        if (productGrid) {
            // Obtener la sección padre
            const menuSection = productGrid.closest('.menu-section');
            
            if (menuSection) {
                // Esperar un momento para que todo se renderice completamente
                setTimeout(() => {
                    // Desplazarse a la sección
                    menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Resaltar brevemente la sección para mejor UX
                    menuSection.classList.add('active');
                    setTimeout(() => {
                        menuSection.classList.remove('active');
                    }, 2000);
                }, 500);
            }
        }
    }
}