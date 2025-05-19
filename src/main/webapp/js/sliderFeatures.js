/**
 * Inicializa el slider de texto para características del restaurante
 * Este slider muestra las características principales del restaurante
 */
window.initSliderFeatures = initSliderFeatures;

function initSliderFeatures() {
    console.log("Initializing features slider...");
    
    // Obtener el contenedor del slider
    const container = document.getElementById('slider-features-container');
    if (!container) return;
    
    // Definir las características que se mostrarán
    // Esto podría venir de una API en el futuro
    const features = [
        "DELICIOUS BURGERS",
        "BEST INGREDIENTS"
    ];
    
    // Generar el HTML del slider
    let html = `
        <div class="text-slider-container">
            <div class="text-slider">
                <div class="text-slider-content">`;
    
    // Añadir cada característica
    features.forEach((feature, index) => {
        html += `
                    <span>${feature}</span>`;
        
        // Añadir separador después de cada característica (excepto la última)
        if (index < features.length) {
            html += `
                    <span class="separator">•</span>`;
        }
    });
    
    html += `
                </div>
                <!-- Duplicate for seamless scrolling -->
                <div class="text-slider-content">`;
    
    // Duplicar el contenido para el desplazamiento continuo
    features.forEach((feature, index) => {
        html += `
                    <span>${feature}</span>`;
        
        // Añadir separador después de cada característica (excepto la última)
        if (index < features.length) {
            html += `
                    <span class="separator">•</span>`;
        }
    });
    
    html += `
                </div>
            </div>
        </div>`;
    
    // Insertar el HTML
    container.innerHTML = html;
    
    console.log("Features slider initialized successfully");
}