/**
 * BurWeb - Contact Page JavaScript
 * Loads and displays shop location information from JSON data
 */

// When the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load common components if available
    if (typeof initCommonComponents === 'function') {
        initCommonComponents();
    }
    
    // Load shop contact data
    loadShopContacts();
});

/**
 * Loads shop contact data from shops.json
 */
async function loadShopContacts() {
    try {
        // Fetch shops data
        const response = await fetch('./mockup/shops.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const shops = await response.json();
        
        // Render contacts for each section
        renderCustomerServiceContacts(shops);
        renderBusinessContacts(shops);
        renderFeedbackContacts(shops);
    } catch (error) {
        console.error('Error loading shop contacts:', error);
        showLoadingError();
    }
}

/**
 * Renders customer service contacts based on shop data
 * @param {Array} shops - Array of shop objects
 */
function renderCustomerServiceContacts(shops) {
    const container = document.getElementById('customer-service-contacts');
    
    // Clear loading indicator
    container.innerHTML = '';
    
    if (!shops || shops.length === 0) {
        container.innerHTML = '<p>Contact information unavailable.</p>';
        return;
    }
    
    // Map city IDs to city names
    const cityNames = {
        0: "Houston",
        1: "Austin"
    };
    
    // Add each shop's contact
    shops.forEach(shop => {
        const cityName = cityNames[shop.id_city] || "Unknown Location";
        
        const contactItem = document.createElement('p');
        contactItem.innerHTML = `<i class="fas fa-envelope"></i> ${shop.email} <small>(${cityName})</small>`;
        
        container.appendChild(contactItem);
    });
}

/**
 * Renders business contacts based on shop data
 * @param {Array} shops - Array of shop objects
 */
function renderBusinessContacts(shops) {
    const container = document.getElementById('business-contacts');
    
    // Clear loading indicator
    container.innerHTML = '';
    
    if (!shops || shops.length === 0) {
        container.innerHTML = '<p>Contact information unavailable.</p>';
        return;
    }
    
    // Add each shop's contact for business inquiries
    shops.forEach(shop => {
        const contactItem = document.createElement('p');
        contactItem.innerHTML = `<i class="fas fa-phone"></i> ${shop.phone_number}`;
        
        container.appendChild(contactItem);
    });
}

/**
 * Renders feedback contacts based on shop data
 * @param {Array} shops - Array of shop objects
 */
function renderFeedbackContacts(shops) {
    const container = document.getElementById('feedback-contacts');
    
    // Clear loading indicator
    container.innerHTML = '';
    
    if (!shops || shops.length === 0) {
        container.innerHTML = '<p>Contact information unavailable.</p>';
        return;
    }
    
    // Map city IDs to city names
    const cityNames = {
        0: "Houston",
        1: "Austin"
    };
    
    // Add each shop's contact
    shops.forEach(shop => {
        const cityName = cityNames[shop.id_city] || "Unknown Location";
        
        const contactItem = document.createElement('p');
        contactItem.innerHTML = `<i class="fas fa-envelope"></i> ${shop.email} <small>(${cityName})</small>`;
        
        container.appendChild(contactItem);
    });
}

/**
 * Shows an error message when contact data can't be loaded
 */
function showLoadingError() {
    const containers = [
        document.getElementById('customer-service-contacts'),
        document.getElementById('business-contacts'),
        document.getElementById('feedback-contacts')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = `
                <p class="loading-error">
                    <i class="fas fa-exclamation-circle"></i>
                    There was an error loading contact information. Please try again later.
                </p>
            `;
        }
    });
}