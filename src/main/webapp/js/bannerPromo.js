/**
 * Inicializa el banner promocional
 * Este banner muestra información sobre nuevos productos o promociones especiales
 */
window.initBannerPromo = initBannerPromo;

function initBannerPromo() {
    console.log("Initializing promotional banner...");
    
    // Obtener el contenedor del banner
    const container = document.getElementById('banner-promo-container');
    if (!container) return;
    
    // Definir el contenido del banner
    const promoContent = {
        title: "NEW ARRIVAL!",
        subtitle: "'TORREZNATOR'",
        description: "Discover our new burger with crispy pork scratchings, fried egg and our 'Smoky Torrezno' sauce",
        image: "images/Menus/Torreznator_promo.png",
        imageAlt: "TORREZNATOR Burger"
    };
    
    // Generar el HTML del banner
    let html = `
        <div class="promo-banner">
            <div class="promo-container">
                <div class="promo-image">
                    <img src="${promoContent.image}" alt="${promoContent.imageAlt}">
                </div>
                <div class="promo-content">
                    <div class="promo-text">
                        <h2>${promoContent.title}</h2>
                        <h3>${promoContent.subtitle}</h3>
                        <p>${promoContent.description}</p>
                    </div>
                </div>
            </div>
        </div>`;
    
    // Insertar el HTML
    container.innerHTML = html;
    
    console.log("Promotional banner initialized successfully");
}