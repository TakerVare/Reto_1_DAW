/**
 * BurWeb - Shopping Cart Component
 * Maneja la lógica del carrito de compras y checkout
 */

// Inicializar carrito desde localStorage o crear uno vacío
let cart = JSON.parse(localStorage.getItem('burwebCart')) || [];
let offers = []; 
let taxRate = 0.0625; // Valor por defecto (6.25%)

// Cargar ofertas y tasas de impuestos al iniciar
async function loadConfigData() {
    try {
        // Cargar ofertas
        try {
            const offersResponse = await fetch('./mockup/offers.json');
            if (offersResponse.ok) {
                const loadedOffers = await offersResponse.json();
                console.log('Offers loaded successfully:', loadedOffers);

                // Procesar las ofertas para extraer los montos mínimos
                offers = loadedOffers.map(offer => {
                    const match = offer.name.match(/Over €(\d+)/);
                    return {
                        ...offer,
                        minAmount: match && match[1] ? parseFloat(match[1]) : 0
                    };
                });
            } else {
                console.warn('No se pudieron cargar las ofertas');
            }
        } catch (error) {
            console.warn('Error al cargar las ofertas:', error);
        }

        // Cargar impuestos
        try {
        
            const taxesResponse = await fetch('api/Controller?ACTION=TAX.FIND_ALL', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (taxesResponse.ok) {
                const taxes = await taxesResponse.json();
                console.log('Taxes loaded successfully:', taxes);

                // Si hay impuestos configurados, usar el primero
                if (taxes && taxes.length > 0) {
                    taxRate = taxes[0].percentage / 100; 
                    console.log(`Tax rate set to ${taxRate * 100}%`);
                }
            } else {
                console.warn('No se pudieron cargar los impuestos, usando valor por defecto');
            }
        } catch (error) {
            console.warn('Error al cargar los impuestos, usando valor por defecto:', error);
        }
    } catch (error) {
        console.error('Error al cargar datos de configuración:', error);
    }
}

// Actualizar carrito en localStorage
function updateCartStorage() {
    localStorage.setItem('burwebCart', JSON.stringify(cart));
}

// Añadir un producto al carrito
function addToCart(productId, productName, productPrice, productImage, quantity = 1) {
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Si es un producto nuevo, añadirlo al carrito
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        });
    }

    // Actualizar localStorage
    updateCartStorage();

    // Actualizar contador del carrito
    updateCartCounter();

    console.log(`Product added to cart:`, cart);
    return true;
}

// Mostrar confirmación de producto añadido
function showAddToCartConfirmation() {
    // Crear el elemento de confirmación si no existe
    if (!document.getElementById('cart-confirmation')) {
        const confirmationHTML = `
            <div id="cart-confirmation" class="cart-confirmation">
                <i class="fas fa-check-circle"></i>
                <span>Product added to cart</span>
            </div>
        `;

        const confirmationContainer = document.createElement('div');
        confirmationContainer.innerHTML = confirmationHTML;
        document.body.appendChild(confirmationContainer.firstElementChild);
    }

    const confirmation = document.getElementById('cart-confirmation');

    // Mostrar confirmación
    confirmation.classList.add('show');

    // Ocultar después de 3 segundos
    setTimeout(() => {
        confirmation.classList.remove('show');
    }, 3000);
}

// Eliminar un producto del carrito
function removeFromCart(productId) {
    // Filtrar el carrito para eliminar el producto
    cart = cart.filter(item => item.id !== productId);

    // Actualizar localStorage
    updateCartStorage();

    // Actualizar contador del carrito
    updateCartCounter();

    // Si estamos en la página de checkout, actualizar la UI
    if (document.getElementById('cart-items')) {
        renderCartItems();
    }
}

// Cambiar la cantidad de un producto en el carrito
function updateCartItemQuantity(productId, newQuantity) {
    // Encontrar el producto en el carrito
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (newQuantity <= 0) {
            // Si la cantidad es 0 o menos, eliminar el producto
            removeFromCart(productId);
        } else {
            // Actualizar la cantidad
            cart[itemIndex].quantity = newQuantity;

            // Actualizar localStorage
            updateCartStorage();

            // Si estamos en la página de checkout, actualizar la UI
            if (document.getElementById('cart-items')) {
                renderCartItems();
            }
        }
    }
}

// Calcular el total del carrito
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Verificar si se aplica alguna oferta y calcular el descuento
function getApplicableOffer() {
    if (!offers || offers.length === 0) return null;

    const subtotal = calculateCartTotal();
    console.log(`Checking offers for subtotal: ${subtotal} €`);

    // Buscar ofertas aplicables basadas en el monto mínimo
    const validOffers = offers
        .filter(offer => {
            // Verificar monto mínimo para el descuento usando la propiedad que extrajimos
            const applicable = subtotal >= offer.minAmount;
            console.log(`Offer: ${offer.name}, min: ${offer.minAmount}€, applicable: ${applicable}`);
            return applicable;
        })
        .sort((a, b) => b.discount - a.discount); // Ordenar por mayor descuento primero

    // Retornar la oferta más ventajosa si hay alguna válida
    if (validOffers.length > 0) {
        console.log(`Best applicable offer: ${validOffers[0].name} with ${validOffers[0].discount}% discount`);
        return validOffers[0];
    }

    console.log('No applicable offers found');
    return null;
}

// Calcular el descuento basado en la oferta aplicable
function calculateDiscount() {
    const applicableOffer = getApplicableOffer();
    if (!applicableOffer) return 0;

    const subtotal = calculateCartTotal();
    const discountAmount = subtotal * (applicableOffer.discount / 100);
    console.log(`Discount amount: ${discountAmount.toFixed(2)} €`);
    return discountAmount;
}

// Actualizar contador de productos en el carrito
function updateCartCounter() {
    // Calcular total de productos
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Buscar el contador en el menú del carrito
    const counter = document.querySelector('.cart-counter');

    if (counter) {
        // Si hay productos, mostrar el contador con el número
        if (totalItems > 0) {
            counter.textContent = totalItems;
            counter.style.display = 'flex';
        } else {
            // Si no hay productos, ocultar el contador
            counter.style.display = 'none';
        }
    }
}

// Inicializar el menú del carrito en la barra de navegación
function initShoppingCartMenu() {
    const cartContainer = document.querySelector('.nav_shopping_car');

    if (cartContainer) {
        const cartHTML = `
            <div class="cart-menu-container">
                <a href="shoppingCartCheckout.html" class="cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-counter">0</span>
                </a>
            </div>
        `;

        cartContainer.innerHTML = cartHTML;

        // Actualizar contador
        updateCartCounter();
    }
}

// Renderizar los productos en la página de checkout
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');

    if (cartItemsContainer) {
        if (cart.length > 0) {
            // Si hay productos en el carrito, mostrarlos
            let cartItemsHTML = '';

            cart.forEach(item => {
                const itemTotal = (item.price * item.quantity).toFixed(2);

                cartItemsHTML += `
                    <div class="cart-item" data-product-id="${item.id}">
                        <div class="cart-item-details">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div>
                                <h3 class="cart-item-name">${item.name}</h3>
                                <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                            </div>
                        </div>
                        <div class="cart-item-quantity">
                            <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" value="${item.quantity}" min="1" max="99" 
                                onchange="updateCartItemQuantity(${item.id}, parseInt(this.value))" readonly>
                            <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <div class="cart-item-total">${itemTotal} €</div>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            });

            cartItemsContainer.innerHTML = cartItemsHTML;

            // Actualizar el resumen
            updateCartSummary();
        } else {
            // Si el carrito está vacío, mostrar mensaje
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="products.html" class="continue-shopping">Continue Shopping</a>
                </div>
            `;

            // Actualizar el resumen
            updateCartSummary();
        }
    }
}

// Actualizar el resumen del carrito
function updateCartSummary() {
    const summaryContainer = document.getElementById('cart-summary');

    if (summaryContainer) {
        if (cart.length > 0) {
            // Calcular subtotal
            const subtotal = calculateCartTotal();

            // Verificar si se aplica alguna oferta
            const applicableOffer = getApplicableOffer();
            const discountAmount = applicableOffer ? parseFloat(calculateDiscount()) : 0;

            // Calcular impuestos (sobre el monto después del descuento)
            const discountedSubtotal = subtotal - discountAmount;
            const tax = discountedSubtotal * taxRate;

            // Calcular total
            const total = discountedSubtotal + tax;

            // Mostrar resumen
            let summaryHTML = `
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)} €</span>
                </div>
            `;

            // Añadir fila de descuento si hay una oferta aplicable
            if (applicableOffer) {
                summaryHTML += `
                    <div class="summary-row discount">
                        <span>Discount (${applicableOffer.name})</span>
                        <span>-${discountAmount.toFixed(2)} €</span>
                    </div>
                `;
            }

            // Mostrar el impuesto con el porcentaje cargado desde el JSON
            summaryHTML += `
                <div class="summary-row">
                    <span>Tax (${(taxRate * 100).toFixed(2)}%)</span>
                    <span>${tax.toFixed(2)} €</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>${total.toFixed(2)} €</span>
                </div>
            `;

            summaryContainer.innerHTML = summaryHTML;

            // Habilitar el botón de checkout
            document.getElementById('checkout-section').style.display = 'block';
        } else {
            // Si el carrito está vacío, ocultar resumen
            summaryContainer.innerHTML = '';
            document.getElementById('checkout-section').style.display = 'none';
        }
    }
}

// Proceder al checkout
async function proceedToCheckout() {
    // Verificar que el usuario está autenticado
    const authUser = getAuthUser();
    if (!authUser || authUser.type !== 'customer') {
        alert('Por favor, inicia sesión como cliente para completar tu compra');
        window.location.href = 'login.html';
        return;
    }

    // Obtener el método de pago seleccionado
    const paymentMethodInput = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethodInput) {
        alert('Por favor, selecciona un método de pago');
        return;
    }
    const paymentMethodId = parseInt(paymentMethodInput.value);

    // Obtener información de entrega seleccionada
    let deliveryOption;
    if (typeof getSelectedDeliveryOption === 'function') {
        deliveryOption = getSelectedDeliveryOption();
        if (deliveryOption.error) {
            alert(deliveryOption.error);
            return;
        }
    } else {
        // Valores por defecto si no existe la función
        deliveryOption = {
            deliveryType: 0, // Recogida en tienda
            locationId: 0,   // Tienda principal
            locationType: 'shop'
        };
    }

    // Calcular totales para el pedido
    const subtotal = calculateCartTotal();
    const applicableOffer = getApplicableOffer();
    const discountAmount = applicableOffer ? parseFloat(calculateDiscount()) : 0;
    const discountedSubtotal = subtotal - discountAmount;
    const tax = discountedSubtotal * taxRate;
    const total = discountedSubtotal + tax;

    // Preparar datos para el pedido
    const orderData = {
        id_customer: authUser.id,
        id_payment: paymentMethodId,
        id_delivery: deliveryOption.deliveryType,
        // Asignar id_shop o id_address según el tipo de entrega
        id_shop: deliveryOption.locationType === 'shop' ? deliveryOption.locationId : 1,
        id_address: deliveryOption.locationType === 'address' ? deliveryOption.locationId : 1,
        // Asignar id_offer si hay una oferta aplicable
        id_offer: applicableOffer ? applicableOffer.id_offer : 1
    };

    // Cambiar el texto del botón a "Procesando..." y deshabilitarlo
    const checkoutButton = document.getElementById('checkout-button');
    const originalButtonText = checkoutButton.textContent;
    checkoutButton.textContent = 'Procesando...';
    checkoutButton.disabled = true;

    try {
        console.log('Enviando datos del pedido:', orderData);
        console.log('Productos en el carrito:', cart);

        // Preparar los items del carrito para la API
        const cartItems = cart.map(item => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity
        }));

        // Llamar a la API para procesar el pedido
        const result = await processOrder(orderData, cartItems);
        console.log('Resultado del procesamiento del pedido:', result);

        if (result.success) {
            // Pedido guardado correctamente
            //alert(`¡Pedido realizado con éxito! Número de pedido: ${result.orderId}`);

            // Vaciar carrito
            cart = [];
            updateCartStorage();

            // Redirigir a la página de productos o a una confirmación
            window.location.href = 'products.html';
        } else {
            // Error al guardar el pedido
            alert(`Error al procesar tu pedido: ${result.error || 'Error desconocido'}`);
            // Restaurar el botón
            checkoutButton.textContent = originalButtonText;
            checkoutButton.disabled = false;
        }
    } catch (error) {
        console.error('Error al procesar el pedido:', error);
        alert('Ha ocurrido un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
        // Restaurar el botón
        checkoutButton.textContent = originalButtonText;
        checkoutButton.disabled = false;
    }
}

// Inicializar métodos de pago
function initPaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option');

    // Añadir eventos de clic para mejorar la experiencia de usuario
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Obtener el input dentro de esta opción
            const radio = this.querySelector('input[type="radio"]');

            // Marcar este radio y desmarcar los demás
            radio.checked = true;

            // Actualizar las clases para el estilo visual
            paymentOptions.forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    // Marcar la primera opción como seleccionada por defecto
    if (paymentOptions.length > 0) {
        paymentOptions[0].classList.add('selected');
    }
}

// Inicializar el carrito cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de configuración (ofertas e impuestos)
    loadConfigData();

    // Inicializar menú del carrito
    initShoppingCartMenu();

    // Si estamos en la página de checkout, renderizar los productos
    if (document.getElementById('cart-items')) {
        renderCartItems();

        // Inicializar selección de método de pago
        initPaymentMethods();
    }
});