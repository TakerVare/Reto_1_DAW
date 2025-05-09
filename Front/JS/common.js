
/**
 * BurWeb - Inicialización de componentes comunes
 * Este script inicializa los componentes compartidos por todas las páginas
 */

window.initCommonComponents = function() {
    console.log("Inicializando componentes comunes...");
    
    // Inicializar componentes de navegación
    if (typeof window.initNavMenu === 'function') initNavMenu();
    if (typeof window.initNavUser === 'function') initNavUser();
    if (typeof window.initBurgerMenu === 'function') initBurgerMenu();
    if (typeof window.initShoppingCart === 'function') initShoppingCart();
    if (typeof window.initFooter === 'function') initFooter();
    
    console.log("Componentes comunes inicializados correctamente");
};

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.initCommonComponents();
});