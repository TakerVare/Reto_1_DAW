/**
 * BurWeb - Profile Page Functionality
 * Handles the user profile page with order history display
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the profile page
    if (window.location.pathname.includes('profile.html')) {
        // Wait for the profile to be loaded by auth.js
        setTimeout(() => {
            const authUser = getAuthUser();
            if (authUser && authUser.type === 'customer') {
                // Load customer addresses
                loadCustomerAddresses(authUser.id);

                // Load customer order history
                loadCustomerOrders(authUser.id);

                // Setup modal close events
                setupOrderModal();
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
                    <span class="field-label">Direcciones:</span>
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
                    <span class="field-label">Direcciones:</span>
                    <span class="field-value">No tiene direcciones guardadas</span>
                </div>
            `;
        }

        // Append the addresses HTML to the Personal Information section
        personalInfoSection.insertAdjacentHTML('beforeend', addressesHTML);

    } catch (error) {
        console.error('Error loading customer addresses:', error);
    }
}

/**
 * Loads and displays customer order history
 * @param {number} customerId - ID of the customer
 */
async function loadCustomerOrders(customerId) {
    try {
        // Create order history section if it doesn't exist
        let orderSection = document.querySelector('.order-history-section');

        if (!orderSection) {
            // Create the order history section
            const profileContent = document.querySelector('.profile-content');

            if (!profileContent) {
                console.error('Profile content section not found');
                return;
            }

            // Create and append the order history section
            orderSection = document.createElement('div');
            orderSection.className = 'profile-section order-history-section';
            orderSection.innerHTML = '<h3>Historial de Pedidos</h3>';
            profileContent.appendChild(orderSection);
        }

        // Show loading indicator
        orderSection.innerHTML += `
            <div class="orders-loading">
                <i class="fas fa-spinner fa-pulse"></i>
                <p>Cargando historial de pedidos...</p>
            </div>
        `;

        // Get customer orders
        const orders = await getOrders(customerId);

        // Remove loading indicator
        const loadingDiv = orderSection.querySelector('.orders-loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }

        // If no orders, show message
        if (!orders || orders.length === 0) {
            orderSection.innerHTML += `
                <div class="no-orders-message">
                    <p>No hay pedidos en su historial</p>
                    <a href="products.html" class="action-btn">¡Haz tu primer pedido!</a>
                </div>
            `;
            return;
        }

        // Create the orders table
        const ordersTable = document.createElement('div');
        ordersTable.className = 'orders-table';

        // Create table header
        const tableHeader = `
            <div class="orders-table-header">
                <div class="order-cell">Nº Pedido</div>
                <div class="order-cell">Fecha</div>
                <div class="order-cell">Tienda</div>
                <div class="order-cell">Acción</div>
            </div>
        `;

        // Create table body with orders
        let tableRows = '';

        // Sort orders by date (most recent first)
        const sortedOrders = [...orders].sort((a, b) => {
            return new Date(b.order_date) - new Date(a.order_date);
        });

        // Create a row for each order
        sortedOrders.forEach(order => {
            // Format date for display
            const orderDate = new Date(order.order_date);
            const formattedDate = orderDate.toLocaleDateString('es-ES');

            tableRows += `
                <div class="orders-table-row">
                    <div class="order-cell">#${order.id_order}</div>
                    <div class="order-cell">${formattedDate}</div>
                    <div class="order-cell">Tienda #${order.id_shop}</div>
                    <div class="order-cell">
                        <button class="view-order-btn" data-order-id="${order.id_order}">Ver Detalles</button>
                    </div>
                </div>
            `;
        });

        // Combine header and rows
        ordersTable.innerHTML = tableHeader + tableRows;

        // Append table to the order section
        orderSection.appendChild(ordersTable);

        // Add event listeners to view buttons
        const viewButtons = document.querySelectorAll('.view-order-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const orderId = this.getAttribute('data-order-id');
                openOrderDetails(orderId);
            });
        });

    } catch (error) {
        console.error('Error loading customer orders:', error);
        const orderSection = document.querySelector('.order-history-section');

        if (orderSection) {
            // Remove loading indicator if present
            const loadingDiv = orderSection.querySelector('.orders-loading');
            if (loadingDiv) {
                loadingDiv.remove();
            }

            // Show error message
            orderSection.innerHTML += `
                <div class="orders-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Error al cargar el historial de pedidos. Por favor, inténtelo de nuevo más tarde.</p>
                </div>
            `;
        }
    }
}

/**
 * Opens the order details modal
 * @param {number} orderId - ID of the order to show details for
 */
async function openOrderDetails(orderId) {
    try {
        // Create modal if not already present
        let modal = document.getElementById('order-modal');

        if (!modal) {
            // Create modal element
            modal = document.createElement('div');
            modal.id = 'order-modal';
            modal.className = 'order-modal';

            // Create modal content
            modal.innerHTML = `
                <div class="order-modal-content">
                    <span class="close-modal">&times;</span>
                    <div id="order-modal-body">
                        <div class="order-loading">
                            <i class="fas fa-spinner fa-pulse"></i>
                            <p>Cargando detalles del pedido...</p>
                        </div>
                    </div>
                </div>
            `;

            // Add modal to the body
            document.body.appendChild(modal);
        }

        // Show the modal
        modal.style.display = 'block';

        // Disable scrolling on body
        document.body.style.overflow = 'hidden';

        // Get the modal body to update content
        const modalBody = document.getElementById('order-modal-body');

        // Show loading indicator
        modalBody.innerHTML = `
            <div class="order-loading">
                <i class="fas fa-spinner fa-pulse"></i>
                <p>Cargando detalles del pedido...</p>
            </div>
        `;

        // Get order details
        const order = await getOrderById(orderId);
        const orderDetails = await getOrderDetail(orderId);

        // Get products for order details
        const products = await getProducts();

        // Format date
        const orderDate = new Date(order.order_date);
        const formattedDate = orderDate.toLocaleDateString('es-ES');

        // Calculate total amount
        let totalAmount = 0;
        orderDetails.forEach(detail => {
            totalAmount += detail.line_price;
        });

        // Create modal content
        const modalContent = `
            <div class="order-modal-header">
                <h2>Detalles del Pedido #${order.id_order}</h2>
                <p>Fecha: ${formattedDate}</p>
            </div>
            <div class="order-modal-details">
                <h3>Productos del Pedido</h3>
                <div class="order-products-table">
                    <div class="order-products-header">
                        <div class="product-cell">Producto</div>
                        <div class="product-cell">Precio</div>
                    </div>
                    <div class="order-products-body">
                        ${orderDetails.map(detail => {
            // Find product name
            const product = products.find(p => p.id_product === detail.id_product);
            const productName = product ? product.name : `Producto #${detail.id_product}`;

            return `
                                <div class="order-products-row">
                                    <div class="product-cell">${productName}</div>
                                    <div class="product-cell">${detail.line_price.toFixed(2)} €</div>
                                </div>
                            `;
        }).join('')}
                    </div>
                </div>
                
                <div class="order-summary">
                    <div class="order-total">
                        <span>Total:</span>
                        <span>${totalAmount.toFixed(2)} €</span>
                    </div>
                </div>
                
                <h3>Información del Envío</h3>
                <div class="order-shipping-info">
                    <p><strong>Método de entrega:</strong> ${getDeliveryMethodName(order.id_delivery)}</p>
                    <p><strong>Dirección de envío:</strong> ${await getAddressDetails(order.id_address)}</p>
                </div>
                
                <h3>Información del Pago</h3>
                <div class="order-payment-info">
                    <p><strong>Método de pago:</strong> ${getPaymentMethodName(order.id_payment)}</p>
                </div>
            </div>
        `;

        // Update modal body with content
        modalBody.innerHTML = modalContent;

    } catch (error) {
        console.error('Error loading order details:', error);

        // Show error in modal
        const modalBody = document.getElementById('order-modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="order-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Error al cargar los detalles del pedido. Por favor, inténtelo de nuevo más tarde.</p>
                </div>
            `;
        }
    }
}

/**
 * Setup modal close events
 */
function setupOrderModal() {
    // Close modal when clicking X
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('close-modal')) {
            closeOrderModal();
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('order-modal');
        if (modal && event.target === modal) {
            closeOrderModal();
        }
    });

    // Close modal when pressing Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeOrderModal();
        }
    });
}

/**
 * Closes the order details modal
 */
function closeOrderModal() {
    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.style.display = 'none';
    }

    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

/**
 * Gets an order by ID
 * @param {number} orderId - ID of the order to get
 * @returns {Promise<Object>} Order object
 */
async function getOrderById(orderId) {
    const orders = await getOrders();
    return orders.find(order => order.id_order === parseInt(orderId)) || { id_order: orderId };
}

/**
 * Gets the name of a delivery method
 * @param {number} deliveryId - ID of the delivery method
 * @returns {string} Name of the delivery method
 */
function getDeliveryMethodName(deliveryId) {
    const deliveryMethods = {
        0: "Recogida en tienda",
        1: "Entrega a domicilio",
        2: "Entrega a domicilio"
    };

    return deliveryMethods[deliveryId] || `Método de entrega #${deliveryId}`;
}

/**
 * Gets the name of a payment method
 * @param {number} paymentId - ID of the payment method
 * @returns {string} Name of the payment method
 */
function getPaymentMethodName(paymentId) {
    const paymentMethods = {
        1: "Tarjeta de crédito",
        2: "PayPal",
        3: "Efectivo"
    };

    return paymentMethods[paymentId] || `Método de pago #${paymentId}`;
}

/**
 * Gets the details of an address
 * @param {number} addressId - ID of the address
 * @returns {Promise<string>} Address details
 */
async function getAddressDetails(addressId) {
    try {
        const authUser = getAuthUser();
        if (!authUser) return `Dirección #${addressId}`;

        const addresses = await getCustomerAddresses(authUser.id);
        const address = addresses.find(addr => addr.ID_ADDRESS === addressId);

        if (address) {
            const cities = await getCities();
            const city = cities.find(city => city.id_city === address.ID_CITY);
            const cityName = city ? city.name : 'Unknown';

            return `${address.STREET}, ${cityName}, ${address.STATE} ${address.ZIP}`;
        }

        return `Dirección #${addressId}`;
    } catch (error) {
        console.error('Error getting address details:', error);
        return `Dirección #${addressId}`;
    }
}