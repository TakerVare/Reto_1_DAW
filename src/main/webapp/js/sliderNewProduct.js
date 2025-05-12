/**
 * Inicializa el slider de texto para nuevos productos
 * Este slider muestra el texto "NEW" con el nombre del nuevo producto
 */
window.initSliderNewProduct = initSliderNewProduct;

function initSliderNewProduct() {
    console.log("Initializing 'NEW' product slider...");
    
    // Obtener el contenedor del slider
    const container = document.getElementById('slider-new-product-container');
    if (!container) return;
    
    // Definir el contenido del slider
    // Esto podría venir de una API en el futuro
    const productName = "TORREZNATOR";
    
    // Generar el HTML del slider
    let html = `
        <div class="text-slider-container new-slider">
            <div class="text-slider">
                <div class="text-slider-content">
                    <span>"NEW"</span>
                    <span class="separator">•</span>
                    <span>${productName}</span>
                    <span class="separator">•</span>
                </div>
                <!-- Duplicate for seamless scrolling -->
                <div class="text-slider-content">
                    <span>"NEW"</span>
                    <span class="separator">•</span>
                    <span>${productName}</span>
                    <span class="separator">•</span>
                </div>
            </div>
        </div>`;
    
    // Insertar el HTML
    container.innerHTML = html;
    
    console.log("New product slider initialized successfully");
}