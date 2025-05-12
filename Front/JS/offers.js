/**
 * BurWeb - Offers Component
 * Muestra las ofertas disponibles desde offers.json
 */

// Al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes comunes
    if (typeof initCommonComponents === 'function') {
        initCommonComponents();
    }
    
    // Cargar ofertas
    loadOffers();
});

/**
 * Carga las ofertas desde el archivo JSON
 */
async function loadOffers() {
    const offersContainer = document.getElementById('offers-container');
    
    try {
        // Cargar ofertas desde el archivo
        const response = await fetch('./mockup/offers.json');
        
        if (!response.ok) {
            throw new Error(`Error cargando ofertas: ${response.status}`);
        }
        
        const offers = await response.json();
        console.log('Ofertas cargadas:', offers);
        
        // Si no hay ofertas, mostrar mensaje
        if (!offers || offers.length === 0) {
            offersContainer.innerHTML = `
                <div class="no-offers">
                    <i class="fas fa-info-circle"></i>
                    <h2>No offers available</h2>
                    <p>Check back later for new promotions!</p>
                </div>
            `;
            return;
        }
        
        // Limpiar el contenedor de carga
        offersContainer.innerHTML = '';
        
        // Mostrar las ofertas
        offers.forEach(offer => {
            // Convertir fechas de string a objetos Date
            const startDate = new Date(offer.start_date);
            const endDate = new Date(offer.end_date);
            
            // Formatear fechas para mostrar
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            
            // Verificar si la oferta está activa
            const now = new Date();
            const isActive = now >= startDate && now <= endDate;
            
            // Extraer el monto mínimo si existe en el nombre
            const minAmountMatch = offer.name.match(/Over €(\d+)/i);
            const minAmount = minAmountMatch ? minAmountMatch[1] : null;
            
            // Crear tarjeta de oferta
            const offerCard = document.createElement('div');
            offerCard.className = 'offer-card';
            
            // Añadir contenido a la tarjeta
            offerCard.innerHTML = `
                ${isActive ? '<div class="offer-badge">Active</div>' : ''}
                <div class="offer-header">
                    <h2>${minAmount ? `On Orders Over €${minAmount}` : 'Special Offer'}</h2>
                </div>
                <div class="offer-body">
                    <div class="offer-discount">${offer.discount}%</div>
                    <p class="offer-description">${offer.name}</p>
                    <div class="offer-dates">
                        <span>From: ${formattedStartDate}</span>
                        <span>To: ${formattedEndDate}</span>
                    </div>
                    <a href="products.html" class="offer-button">Shop Now</a>
                </div>
            `;
            
            // Añadir la tarjeta al contenedor
            offersContainer.appendChild(offerCard);
        });
        
    } catch (error) {
        console.error('Error loading offers:', error);
        offersContainer.innerHTML = `
            <div class="no-offers">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Error loading offers</h2>
                <p>There was a problem loading the current offers. Please try again later.</p>
            </div>
        `;
    }
}

/**
 * Formatea una fecha a formato legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada (e.g., "Jan 01, 2025")
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}