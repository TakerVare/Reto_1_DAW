/**
 * BurWeb - Checkout Delivery Options Component
 * Handles delivery options selection in the checkout process
 */

// Carga las opciones de entrega al inicializar la página de checkout
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que estamos en la página de checkout
    if (document.getElementById('checkout-section')) {
        // Inicializar las opciones de entrega
        initDeliveryOptions();
    }
});

/**
 * Inicializa las opciones de entrega en el checkout
 */
async function initDeliveryOptions() {
    try {
        // Obtener opciones de entrega del JSON
        const deliveryOptions = await getDeliveryOptions();
        
        // Crear el contenedor de opciones de entrega
        const deliverySection = createDeliverySection(deliveryOptions);
        
        // Obtener el contenedor del checkout
        const checkoutSection = document.getElementById('checkout-section');
        
        // Insertar el contenedor de opciones de entrega antes del botón de checkout
        const checkoutButton = checkoutSection.querySelector('button');
        if (checkoutButton) {
            checkoutSection.insertBefore(deliverySection, checkoutButton);
        } else {
            checkoutSection.appendChild(deliverySection);
        }
        
        // Añadir event listeners para los cambios de opción de entrega
        addDeliveryOptionListeners();
        
    } catch (error) {
        console.error('Error initializing delivery options:', error);
    }
}

/**
 * Obtiene las opciones de entrega desde la base de datos
 * @returns {Promise<Array>} Promesa que resuelve a un array de opciones de entrega
 */
async function getDeliveryOptions() {
    try {
        // Hacer solicitud a la API del controlador para obtener los datos de entrega
        const response = await fetch('api/Controller?ACTION=DELIVERY.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status}`);
        }

        const responseText = await response.json();
        console.log('Opciones de entrega cargadas desde la base de datos:', responseText);

        // Transformar los datos al formato deseado
        const formattedDeliveries = [];

        for (var i in responseText) {
            formattedDeliveries.push({
                "id_delivery": responseText[i]['id_delivery'],
                "name": responseText[i]['name']
            });
        }

        // Si no hay opciones de entrega en la base de datos, usar valores predeterminados
        if (formattedDeliveries.length === 0) {
            console.warn('No se encontraron opciones de entrega en la base de datos, usando valores predeterminados');
            return [
                { id_delivery: 0, name: "In-store Pickup" },
                { id_delivery: 1, name: "Home Delivery" }
            ];
        }

        return formattedDeliveries;
    } catch (error) {
        console.error('Error al obtener opciones de entrega:', error);

        // Intentar cargar desde el archivo JSON como fallback
        try {
            console.log('Intentando cargar opciones de entrega desde archivo local (fallback)');
            const fallbackResponse = await fetch('./mockup/deliveries.json');
            if (!fallbackResponse.ok) {
                throw new Error(`HTTP error en ruta alternativa! Status: ${fallbackResponse.status}`);
            }
            const deliveries = await fallbackResponse.json();
            console.log('Opciones de entrega cargadas desde archivo local (fallback):', deliveries);
            return deliveries;
        } catch (fallbackError) {
            console.error('Error al cargar opciones de entrega desde archivo local:', fallbackError);

            // Si todo falla, devolver opciones predeterminadas
            return [
                { id_delivery: 1, name: "In-store Pickup" },
                { id_delivery: 2, name: "Home Delivery" }
            ];
        }
    }
}

/**
 * Crea el contenedor HTML para las opciones de entrega
 * @param {Array} deliveryOptions - Array de opciones de entrega
 * @returns {HTMLElement} Elemento HTML con las opciones de entrega
 */
function createDeliverySection(deliveryOptions) {
    // Crear el contenedor principal
    const deliverySection = document.createElement('div');
    deliverySection.className = 'delivery-section';
    
    // HTML para las opciones de entrega
    deliverySection.innerHTML = `
        <div class="delivery-options">
            <h3>Delivery Options</h3>
            <div class="delivery-options-container">
                ${deliveryOptions.map(option => `
                    <div class="delivery-option">
                        <input type="radio" id="delivery-${option.id_delivery}" 
                               name="delivery-option" value="${option.id_delivery}" 
                               ${option.id_delivery === 0 ? 'checked' : ''}>
                        <label for="delivery-${option.id_delivery}">${option.name}</label>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="delivery-locations" id="delivery-locations">
            <!-- El contenido cambiará según la opción seleccionada -->
        </div>
    `;
    
    return deliverySection;
}

/**
 * Añade event listeners para los cambios de opción de entrega
 */
function addDeliveryOptionListeners() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery-option"]');
    
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateDeliveryLocations(this.value);
        });
    });
    
    // Inicializar con la opción seleccionada por defecto (normalmente In-store Pickup)
    const selectedOption = document.querySelector('input[name="delivery-option"]:checked');
    if (selectedOption) {
        updateDeliveryLocations(selectedOption.value);
    }
}

/**
 * Actualiza las ubicaciones de entrega según la opción seleccionada
 * @param {string} optionId -
 */
async function updateDeliveryLocations(optionId) {
    const locationsContainer = document.getElementById('delivery-locations');
    
    // Convertir a número para comparaciones
    const deliveryOptionId = parseInt(optionId);
    
    try {
        // Si es recogida en tienda (id_delivery = 0)
        if (deliveryOptionId === 0) {
            // Obtener las tiendas disponibles
            const shops = await getShops();
            
            // Mostrar las tiendas
            locationsContainer.innerHTML = `
                <h4>Select Store Location</h4>
                <div class="location-list store-list">
                    ${shops.map(shop => {
                        // Obtener el nombre de la ciudad
                        const cityName = shop.id_city === 0 ? 'Houston' : 'Austin';
                        
                        return `
                            <div class="location-item store-item">
                                <input type="radio" id="shop-${shop.id_shop}" 
                                       name="location" value="shop-${shop.id_shop}"
                                       ${shop.id_shop === 0 ? 'checked' : ''}>
                                <label for="shop-${shop.id_shop}">
                                    <div class="location-name">${cityName} Store</div>
                                    <div class="location-details">${shop.phone_number}</div>
                                    <div class="location-details">${shop.email}</div>
                                </label>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            
        } 
        // Si es entrega a domicilio (id_delivery = 1)

        else if (deliveryOptionId === 2) {
            // Obtener el usuario autenticado
            const authUser = getAuthUser();
            
            if (authUser && authUser.type === 'customer') {
                // Obtener las direcciones del cliente
                const addresses = await getCustomerAddresses(authUser.id);
                
                // Obtener las ciudades para mostrar los nombres
                const cities = await getCities();
                
                if (addresses.length > 0) {
                    // Mostrar las direcciones
                    locationsContainer.innerHTML = `
                        <h4>Select Delivery Address</h4>
                        <div class="location-list address-list">
                            ${addresses.map(address => {
                                // Encontrar el nombre de la ciudad
                                const city = cities.find(city => city.id_city === address.ID_CITY);
                                const cityName = city ? city.name : 'Unknown';
                                
                                return `
                                    <div class="location-item address-item ${address.FAVOURITE ? 'default-address' : ''}">
                                        <input type="radio" id="address-${address.ID_CITY}" 
                                               name="location" value="address-${address.ID_CITY}"
                                               ${address.FAVOURITE ? 'checked' : ''}>
                                        <label for="address-${address.ID_CITY}">
                                            <div class="location-name">${address.STREET}</div>
                                            <div class="location-details">${cityName}, ${address.STATE} ${address.ZIP}</div>
                                            ${address.FAVOURITE ? '<div class="default-badge">Default</div>' : ''}
                                        </label>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                } else {
                    // No hay direcciones guardadas
                    locationsContainer.innerHTML = `
                        <div class="no-addresses">
                            <p>You don't have any saved addresses.</p>
                            <p>Please select In-store Pickup or add an address in your profile.</p>
                        </div>
                    `;
                }
            } else {
                // Usuario no autenticado
                locationsContainer.innerHTML = `
                    <div class="no-addresses">
                        <p>Please <a href="login.html">sign in</a> to use delivery to your address.</p>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error updating delivery locations:', error);
        locationsContainer.innerHTML = `
            <div class="error-message">
                <p>Error loading delivery locations. Please try again.</p>
            </div>
        `;
    }
}

/**
 * Obtiene las tiendas desde el archivo JSON
 * @returns {Promise<Array>} Promesa que resuelve a un array de tiendas
 */
async function getShops() {
    try {
        const response = await fetch('./mockup/shops.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching shops:', error);
        return [];
    }
}

// Función para obtener la opción de entrega y ubicación seleccionadas
// Esta función se llamará al procesar el pago
function getSelectedDeliveryOption() {
    const deliveryOption = document.querySelector('input[name="delivery-option"]:checked');
    const locationOption = document.querySelector('input[name="location"]:checked');
    
    if (!deliveryOption) {
        return { error: 'No delivery option selected' };
    }
    
    const result = {
        deliveryType: parseInt(deliveryOption.value),
        deliveryName: deliveryOption.nextElementSibling.textContent
    };
    
    if (locationOption) {
        const locationValue = locationOption.value;
        const locationId = parseInt(locationValue.split('-')[1]);
        
        result.locationId = locationId;
        result.locationType = locationValue.startsWith('shop') ? 'shop' : 'address';
        result.locationName = locationOption.nextElementSibling.querySelector('.location-name').textContent;
    } else {
        result.error = 'No location selected';
    }
    
    return result;
}

// Modificar la función proceedToCheckout para incluir la opción de entrega
const originalProceedToCheckout = window.proceedToCheckout;

window.proceedToCheckout = function() {
    // Obtener la opción de entrega seleccionada
    const deliveryOption = getSelectedDeliveryOption();
    
    if (deliveryOption.error) {
        alert(deliveryOption.error);
        return;
    }
    
    // Añadir información de entrega al resumen del pedido
    const deliveryInfo = `
        Delivery Method: ${deliveryOption.deliveryName}
        Delivery Location: ${deliveryOption.locationName}
    `;
    
    // Llamar a la función original con la información adicional
    if (typeof originalProceedToCheckout === 'function') {
        // Si la función original existe, guardar la información de entrega y llamar a la original
        window.selectedDeliveryOption = deliveryOption;
        originalProceedToCheckout();
    } else {
        // Si no existe, mostrar un mensaje genérico
        alert(`Order placed successfully!\n\n${deliveryInfo}`);
    }
};