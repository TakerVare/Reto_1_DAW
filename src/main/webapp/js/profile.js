/**
 * BurWeb - Profile Page Functionality
 * Handles the address display UI in the profile page (simplified version)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the profile page
    if (window.location.pathname.includes('profile.html')) {
        // Wait for the profile to be loaded by auth.js
        setTimeout(() => {
            const authUser = getAuthUser();
            if (authUser && authUser.type === 'customer') {
                loadCustomerAddresses(authUser.id);
            }
        }, 500); // Give the profile page time to load
    }
});

/**
 * Loads and displays customer addresses in a simplified format
 * @param {number} customerId - ID of the customer
 */
async function loadCustomerAddresses(customerId) {
    try {
        // Get the customer's addresses
        const addresses = await getCustomerAddresses(customerId);
        
        // Get city names
        const cities = await getCities();
        
        // Look for the Personal Information section
        const personalInfoSection = document.querySelector('.profile-section');
        
        if (!personalInfoSection) {
            console.error('Personal Information section not found');
            return;
        }
        
        // Create HTML for addresses
        let addressesHTML = '';
        
        if (addresses.length > 0) {
            // If there are addresses, create the HTML for each one
            addressesHTML = `
                <div class="profile-field addresses-field">
                    <span class="field-label">Addresses:</span>
                    <div class="field-value addresses-container">
                        ${addresses.map(address => {
                            // Find the city name
                            const city = cities.find(city => city.id_city === address.ID_CITY);
                            const cityName = city ? city.name : 'Unknown';
                            
                            return `
                                <div class="profile-address ${address.FAVOURITE ? 'favourite-address' : ''}">
                                    ${address.FAVOURITE ? '<div class="address-badge">Default</div>' : ''}
                                    <div class="address-content">
                                        <p class="address-line">${address.STREET}</p>
                                        <p class="address-line">${cityName}, ${address.STATE} ${address.ZIP}</p>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else {
            // If no addresses, show a simple message
            addressesHTML = `
                <div class="profile-field">
                    <span class="field-label">Addresses:</span>
                    <span class="field-value">No addresses saved</span>
                </div>
            `;
        }
        
        // Append the addresses HTML to the Personal Information section
        personalInfoSection.insertAdjacentHTML('beforeend', addressesHTML);
        
    } catch (error) {
        console.error('Error loading customer addresses:', error);
    }
}