/**
 * BurWeb - Profile Page Functionality
 * Handles the address management UI in the profile page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the profile page
    if (window.location.pathname.includes('profile.html')) {
        // The profile page is already initialized by auth.js
        // We'll add an event listener to handle address-related actions once the profile is loaded
        const profileContainer = document.getElementById('profile-container');

        // If there's an observer in a production environment, you might want to observe
        // changes to the profile container instead of using a timeout
        setTimeout(() => {
            const authUser = getAuthUser();
            if (authUser && authUser.type === 'customer') {
                loadCustomerAddresses(authUser.id);
            }
        }, 500); // Give the profile page time to load
    }
});

/**
 * Loads and displays customer addresses
 * @param {number} customerId - ID of the customer
 */
async function loadCustomerAddresses(customerId) {
    try {
        // Get the customer's addresses
        const addresses = await getCustomerAddresses(customerId);

        // If the customer has addresses, display them
        if (addresses.length > 0) {
            // Get city names
            const cities = await getCities();

            // Create the addresses section
            const profileContainer = document.getElementById('profile-container');

            // Create addresses section HTML
            const addressesSection = document.createElement('div');
            addressesSection.className = 'profile-section';
            addressesSection.innerHTML = `
                <h3>My Addresses</h3>
                <div id="addresses-list">
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
                                <div class="address-actions">
                                    ${!address.FAVOURITE ?
                                        `<button class="address-action make-default" data-address-id="${address.ID_CITY}">
                                            Make Default
                                        </button>` : ''
                                    }
                                    <button class="address-action edit-address" data-address-id="${address.ID_CITY}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="address-action delete-address" data-address-id="${address.ID_CITY}">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <button class="profile-button add-address-btn">
                    <i class="fas fa-plus"></i> Add New Address
                </button>
            `;

            // Add the addresses section to the profile
            profileContainer.appendChild(addressesSection);

            // Add event listeners for address actions
            addAddressEventListeners(customerId);
        } else {
            // No addresses found, add a section with an option to add a new address
            const profileContainer = document.getElementById('profile-container');

            const addressesSection = document.createElement('div');
            addressesSection.className = 'profile-section';
            addressesSection.innerHTML = `
                <h3>My Addresses</h3>
                <p>You don't have any saved addresses yet.</p>
                <button class="profile-button add-address-btn">
                    <i class="fas fa-plus"></i> Add New Address
                </button>
            `;

            profileContainer.appendChild(addressesSection);

            // Add event listener for add address button
            const addAddressBtn = addressesSection.querySelector('.add-address-btn');
            if (addAddressBtn) {
                addAddressBtn.addEventListener('click', () => {
                    showAddAddressForm(customerId);
                });
            }
        }
    } catch (error) {
        console.error('Error loading customer addresses:', error);
    }
}

/**
 * Adds event listeners to address action buttons
 * @param {number} customerId - ID of the customer
 */
function addAddressEventListeners(customerId) {
    // Add address button
    const addAddressBtn = document.querySelector('.add-address-btn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            showAddAddressForm(customerId);
        });
    }

    // Make default buttons
    const makeDefaultBtns = document.querySelectorAll('.make-default');
    makeDefaultBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const addressId = parseInt(btn.getAttribute('data-address-id'));

            // Set as default
            const success = await setDefaultAddress(addressId, customerId);

            if (success) {
                // In a real implementation, you would reload the addresses
                // For now, just show an alert
                alert(`Address has been set as default. The page will reload to show changes.`);
                // Reload the page to see the changes
                window.location.reload();
            } else {
                alert('There was an error setting the address as default. Please try again.');
            }
        });
    });

    // Edit buttons
    const editBtns = document.querySelectorAll('.edit-address');
    editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const addressId = parseInt(btn.getAttribute('data-address-id'));

            // Get the address element to extract details
            const addressElement = btn.closest('.profile-address');
            const streetElement = addressElement.querySelector('.address-line:first-child');
            const locationElement = addressElement.querySelector('.address-line:last-child');

            // Extract address details
            const street = streetElement?.textContent || '';
            const location = locationElement?.textContent || '';

            // Show edit form
            showEditAddressForm(addressId, street, location, customerId);
        });
    });

    // Delete buttons
    const deleteBtns = document.querySelectorAll('.delete-address');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const addressId = parseInt(btn.getAttribute('data-address-id'));

            // Confirm deletion
            if (confirm('Are you sure you want to delete this address?')) {
                const success = await deleteAddress(addressId);

                if (success) {
                    // In a real implementation, you would reload the addresses
                    // For now, just show an alert
                    alert(`Address has been deleted. The page will reload to show changes.`);
                    // Reload the page to see the changes
                    window.location.reload();
                } else {
                    alert('There was an error deleting the address. Please try again.');
                }
            }
        });
    });
}

/**
 * Shows a form to add a new address
 * @param {number} customerId - ID of the customer
 */
function showAddAddressForm(customerId) {
    // In a real implementation, this would show a modal with a form
    // For this mockup, we'll just show an alert
    alert(`Add address functionality will be implemented soon for customer ${customerId}.`);
}

/**
 * Shows a form to edit an address
 * @param {number} addressId - ID of the address
 * @param {string} street - Street address
 * @param {string} location - City, state, and ZIP
 * @param {number} customerId - ID of the customer
 */
function showEditAddressForm(addressId, street, location, customerId) {
    // In a real implementation, this would show a modal with a form
    // For this mockup, we'll just show an alert
    alert(`Edit address functionality will be implemented soon for address ${addressId}.`);
}