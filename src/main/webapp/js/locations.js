/**
 * BurWeb - Locations Page JavaScript
 * Loads and displays shop location information from JSON data
 */

// When the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load common components if available
    if (typeof initCommonComponents === 'function') {
        initCommonComponents();
    }
    
    // Load shop location data
    loadShopLocations();
});

/**
 * Loads shop location data from shops.json
 */
async function loadShopLocations() {
    try {
        // Fetch shops data
        const response = await fetch('./mockup/shops.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const shops = await response.json();
        
        // Render location cards
        renderLocationCards(shops);
    } catch (error) {
        console.error('Error loading shop locations:', error);
        showLoadingError();
    }
}

/**
 * Renders location cards based on shop data
 * @param {Array} shops - Array of shop objects
 */
function renderLocationCards(shops) {
    const container = document.getElementById('location-list');
    
    // Clear loading indicator
    container.innerHTML = '';
    
    if (!shops || shops.length === 0) {
        container.innerHTML = '<p class="no-locations">No locations available at the moment.</p>';
        return;
    }
    
    // Map city IDs to city names and addresses
    const cityInfo = {
        0: {
            name: "Houston",
            address: "123 Main Street, Houston, TX 77001"
        },
        1: {
            name: "Austin",
            address: "456 Congress Avenue, Austin, TX 78701"
        }
    };
    
    // Create a card for each shop
    shops.forEach(shop => {
        // Get city info
        const city = cityInfo[shop.id_city] || { 
            name: "Unknown", 
            address: "Address not available"
        };
        
        // Create location card
        const locationCard = document.createElement('div');
        locationCard.className = 'location-card';
        
        // Generate card HTML
        locationCard.innerHTML = `
            <div class="location-header">
                <h3>BurWeb ${city.name}</h3>
            </div>
            <div class="location-details">
                <p><i class="fas fa-map-marker-alt"></i> ${city.address}</p>
                <p><i class="fas fa-phone"></i> ${shop.phone_number}</p>
                <p><i class="fas fa-envelope"></i> ${shop.email}</p>
                <p><i class="fas fa-clock"></i> Open daily: 10:00 AM - 10:00 PM</p>
                <a href="https://maps.google.com?q=${encodeURIComponent(city.address)}" class="directions-btn" target="_blank">
                    <i class="fas fa-directions"></i> Get Directions
                </a>
            </div>
        `;
        
        // Add to container
        container.appendChild(locationCard);
    });
}

/**
 * Shows an error message when location data can't be loaded
 */
function showLoadingError() {
    const container = document.getElementById('location-list');
    container.innerHTML = `
        <div class="loading-error">
            <i class="fas fa-exclamation-circle"></i>
            <p>There was an error loading location information. Please try again later.</p>
            <button onclick="loadShopLocations()">Retry</button>
        </div>
    `;
}