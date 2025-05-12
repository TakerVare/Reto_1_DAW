/**
 * BurWeb - Employee Area POS System
 * Maneja la funcionalidad del sistema de punto de venta (POS)
 */

// Estado del POS
let posState = {
    currentCategory: null, // Categoría actual
    cartItems: [],         // Items en el carrito
    products: [],          // Lista de productos
    taxes: [],             // Impuestos disponibles
    offers: [],            // Ofertas disponibles
    taxRate: 0.0625        // Valor por defecto (6.25%)
};

/**
 * Inicializa la sección de POS
 */
async function initPOSSection() {
    console.log('Inicializando sección POS...');
    
    // Obtener productos si no están ya cargados
    if (posState.products.length === 0 && appData.products.length > 0) {
        posState.products = appData.products;
    }
    
    // Cargar impuestos y ofertas
    await loadPOSConfigData();
    
    // Inicializar las categorías
    initPOSCategories();
    
    // Inicializar el carrito
    initPOSCart();
    
    // Cargar productos de la primera categoría
    if (appData.categories.length > 0) {
        loadPOSProductsByCategory(appData.categories[0].id_category);
    } else {
        console.warn('No se encontraron categorías para cargar productos');
    }
}

/**
 * Carga los datos de configuración (impuestos y ofertas)
 */
async function loadPOSConfigData() {
    try {
        // Cargar impuestos
        try {
            if (appData.taxes && appData.taxes.length > 0) {
                posState.taxes = appData.taxes;
                // Establecer la tasa de impuesto por defecto
                if (posState.taxes.length > 0) {
                    posState.taxRate = posState.taxes[0].percentage / 100; // Convertir porcentaje a decimal
                }
                console.log('Impuestos cargados en POS:', posState.taxes);
                console.log(`Tasa de impuesto establecida en: ${posState.taxRate * 100}%`);
            } else {
                // Si no hay impuestos en appData, intentar cargar desde el archivo
                const taxesResponse = await fetch('./mockup/taxes.json');
                if (taxesResponse.ok) {
                    const taxes = await taxesResponse.json();
                    posState.taxes = taxes;
                    // Establecer la tasa de impuesto por defecto
                    if (taxes.length > 0) {
                        posState.taxRate = taxes[0].percentage / 100; // Convertir porcentaje a decimal
                    }
                    console.log('Impuestos cargados desde archivo en POS:', posState.taxes);
                    console.log(`Tasa de impuesto establecida en: ${posState.taxRate * 100}%`);
                }
            }
        } catch (error) {
            console.error('Error al cargar impuestos:', error);
        }
        
        // Cargar ofertas
        try {
            // Intentar cargar ofertas desde el archivo
            const offersResponse = await fetch('./mockup/offers.json');
            if (offersResponse.ok) {
                const loadedOffers = await offersResponse.json();
                console.log('Ofertas cargadas en POS:', loadedOffers);
                
                // Procesar las ofertas para extraer los montos mínimos
                posState.offers = loadedOffers.map(offer => {
                    const match = offer.name.match(/Over €(\d+)/);
                    return {
                        ...offer,
                        minAmount: match && match[1] ? parseFloat(match[1]) : 0
                    };
                });
                
                console.log('Ofertas procesadas:', posState.offers);
            }
        } catch (error) {
            console.error('Error al cargar ofertas:', error);
        }
    } catch (error) {
        console.error('Error al cargar datos de configuración para POS:', error);
    }
}

/**
 * Inicializa las categorías del POS
 */
function initPOSCategories() {
    const categoriesContainer = document.getElementById('pos-categories');
    
    // Si no hay categorías, mostrar mensaje
    if (appData.categories.length === 0) {
        categoriesContainer.innerHTML = '<p>No categories found</p>';
        return;
    }
    
    // Generar botones de categoría
    const categoriesHTML = appData.categories.map(category => `
        <button class="pos-category-btn" data-id="${category.id_category}">
            ${category.name}
        </button>
    `).join('');
    
    // Actualizar el contenido del contenedor
    categoriesContainer.innerHTML = categoriesHTML;
    
    // Agregar event listeners a los botones de categoría
    document.querySelectorAll('.pos-category-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Obtener la categoría
            const categoryId = parseInt(this.getAttribute('data-id'));
            
            // Desactivar todos los botones
            document.querySelectorAll('.pos-category-btn').forEach(btn => btn.classList.remove('active'));
            
            // Activar el botón actual
            this.classList.add('active');
            
            // Cargar productos de la categoría
            loadPOSProductsByCategory(categoryId);
        });
    });
    
    // Activar el primer botón por defecto
    const firstCategoryBtn = document.querySelector('.pos-category-btn');
    if (firstCategoryBtn) {
        firstCategoryBtn.classList.add('active');
    }
}

/**
 * Inicializa el carrito del POS
 */
function initPOSCart() {
    // Limpiar el carrito
    posState.cartItems = [];
    
    // Actualizar la vista del carrito
    updatePOSCart();
    
    // Agregar event listeners a los botones del carrito
    const checkoutBtn = document.querySelector('.pos-cart-checkout');
    const clearBtn = document.querySelector('.pos-cart-clear');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkoutPOS);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearPOSCart);
    }
}

/**
 * Carga los productos de una categoría específica
 * @param {number} categoryId - ID de la categoría a cargar
 */
function loadPOSProductsByCategory(categoryId) {
    // Actualizar la categoría actual
    posState.currentCategory = categoryId;
    
    // Obtener el contenedor de productos
    const productsContainer = document.getElementById('pos-products-grid');
    
    // Filtrar productos por categoría
    const filteredProducts = posState.products.filter(product => product.id_category === categoryId);
    
    // Si no hay productos, mostrar mensaje
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="text-center">No products found in this category</p>';
        return;
    }
    
    // Generar tarjetas de producto
    const productsHTML = filteredProducts.map(product => `
        <div class="pos-product-card" data-id="${product.id_product}">
            <img src="${product.image}" alt="${product.name}">
            <div class="pos-product-name">${product.name}</div>
            <div class="pos-product-price">$${product.price.toFixed(2)}</div>
        </div>
    `).join('');
    
    // Actualizar el contenido del contenedor
    productsContainer.innerHTML = productsHTML;
    
    // Agregar event listeners a las tarjetas de producto
    document.querySelectorAll('.pos-product-card').forEach(card => {
        card.addEventListener('click', function() {
            // Obtener el ID del producto
            const productId = parseInt(this.getAttribute('data-id'));
            
            // Encontrar el producto
            const product = posState.products.find(p => p.id_product === productId);
            
            // Si se encuentra, añadirlo al carrito
            if (product) {
                addToCart(product);
            }
        });
    });
}

/**
 * Añade un producto al carrito
 * @param {Object} product - Producto a añadir
 */
function addToCart(product) {
    // Buscar si el producto ya está en el carrito
    const existingItem = posState.cartItems.find(item => item.product.id_product === product.id_product);
    
    if (existingItem) {
        // Incrementar la cantidad
        existingItem.quantity++;
    } else {
        // Añadir nuevo item
        posState.cartItems.push({
            product: product,
            quantity: 1
        });
    }
    
    // Actualizar la vista del carrito
    updatePOSCart();
    
    // Mostrar mensaje
    showMessage(`Added "${product.name}" to cart`, 'success');
}

/**
 * Actualiza la vista del carrito
 */
function updatePOSCart() {
    // Obtener el contenedor de items
    const cartItemsContainer = document.getElementById('pos-cart-items');
    
    // Si no hay items, mostrar mensaje
    if (posState.cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center">Cart is empty</p>';
        document.getElementById('pos-cart-total-amount').innerHTML = '<div class="pos-cart-total-empty">$0.00</div>';
        return;
    }
    
    // Generar HTML de los items
    const itemsHTML = posState.cartItems.map((item, index) => `
        <div class="pos-cart-item">
            <div class="pos-cart-item-info">
                <div class="pos-cart-item-name">${item.product.name}</div>
                <div class="pos-cart-item-price">$${item.product.price.toFixed(2)}</div>
            </div>
            <div class="pos-cart-item-quantity">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <div class="pos-cart-item-remove" onclick="removeFromCart(${index})">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
    `).join('');
    
    // Actualizar el contenido del contenedor
    cartItemsContainer.innerHTML = itemsHTML;
    
    // Calcular subtotal
    const subtotal = calculateCartSubtotal();
    
    // Verificar si se aplica alguna oferta
    const applicableOffer = getApplicableOffer();
    const discountAmount = applicableOffer ? calculateDiscount(subtotal, applicableOffer) : 0;
    
    // Calcular impuestos
    const afterDiscountAmount = subtotal - discountAmount;
    const taxAmount = calculateTax(afterDiscountAmount);
    
    // Calcular total
    const total = afterDiscountAmount + taxAmount;
    
    // Crear el resumen del carrito con un diseño más esquemático
    let summaryHTML = `
        <div class="pos-cart-summary">
            <div class="pos-cart-summary-item">
                <div class="pos-cart-summary-label">Subtotal:</div>
                <div class="pos-cart-summary-value">$${subtotal.toFixed(2)}</div>
            </div>
    `;
    
    // Añadir fila de descuento si hay una oferta aplicable
    if (applicableOffer) {
        summaryHTML += `
            <div class="pos-cart-summary-item discount">
                <div class="pos-cart-summary-label">Discount:</div>
                <div class="pos-cart-summary-value">-$${discountAmount.toFixed(2)}</div>
            </div>
            <div class="pos-cart-summary-offer">
                <span>${applicableOffer.name}</span>
            </div>
        `;
    }
    
    // Añadir fila de impuestos
    summaryHTML += `
        <div class="pos-cart-summary-item tax">
            <div class="pos-cart-summary-label">Tax (${(posState.taxRate * 100).toFixed(2)}%):</div>
            <div class="pos-cart-summary-value">$${taxAmount.toFixed(2)}</div>
        </div>
        <div class="pos-cart-summary-separator"></div>
        <div class="pos-cart-summary-item total">
            <div class="pos-cart-summary-label">Total:</div>
            <div class="pos-cart-summary-value">$${total.toFixed(2)}</div>
        </div>
    </div>
    `;
    
    // Actualizar el resumen del carrito
    document.getElementById('pos-cart-total-amount').innerHTML = summaryHTML;
}

/**
 * Calcula el subtotal del carrito
 * @returns {number} Subtotal del carrito
 */
function calculateCartSubtotal() {
    return posState.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

/**
 * Obtiene la oferta aplicable según el monto del carrito
 * @returns {Object|null} Oferta aplicable o null si no hay ofertas aplicables
 */
function getApplicableOffer() {
    if (!posState.offers || posState.offers.length === 0) return null;
    
    const subtotal = calculateCartSubtotal();
    
    // Filtrar ofertas aplicables y ordenar por mayor descuento
    const applicableOffers = posState.offers
        .filter(offer => subtotal >= offer.minAmount)
        .sort((a, b) => b.discount - a.discount);
    
    // Retornar la oferta con mayor descuento si hay alguna
    return applicableOffers.length > 0 ? applicableOffers[0] : null;
}

/**
 * Calcula el descuento basado en la oferta aplicable
 * @param {number} subtotal - Subtotal del carrito
 * @param {Object} offer - Oferta aplicable
 * @returns {number} Monto del descuento
 */
function calculateDiscount(subtotal, offer) {
    if (!offer) return 0;
    return subtotal * (offer.discount / 100);
}

/**
 * Calcula los impuestos sobre el monto especificado
 * @param {number} amount - Monto sobre el que calcular impuestos
 * @returns {number} Monto de impuestos
 */
function calculateTax(amount) {
    return amount * posState.taxRate;
}

/**
 * Incrementa la cantidad de un item en el carrito
 * @param {number} index - Índice del item en el carrito
 */
function increaseQuantity(index) {
    // Incrementar la cantidad
    posState.cartItems[index].quantity++;
    
    // Actualizar la vista del carrito
    updatePOSCart();
}

/**
 * Decrementa la cantidad de un item en el carrito
 * @param {number} index - Índice del item en el carrito
 */
function decreaseQuantity(index) {
    // Decrementar la cantidad
    posState.cartItems[index].quantity--;
    
    // Si la cantidad es 0, eliminar el item
    if (posState.cartItems[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        // Actualizar la vista del carrito
        updatePOSCart();
    }
}

/**
 * Elimina un item del carrito
 * @param {number} index - Índice del item en el carrito
 */
function removeFromCart(index) {
    // Eliminar el item
    posState.cartItems.splice(index, 1);
    
    // Actualizar la vista del carrito
    updatePOSCart();
}

/**
 * Realiza el pago del carrito
 */
function checkoutPOS() {
    // Si no hay items, mostrar mensaje
    if (posState.cartItems.length === 0) {
        showMessage('Cart is empty', 'warning');
        return;
    }
    
    // Calcular totales
    const subtotal = calculateCartSubtotal();
    const applicableOffer = getApplicableOffer();
    const discountAmount = applicableOffer ? calculateDiscount(subtotal, applicableOffer) : 0;
    const afterDiscountAmount = subtotal - discountAmount;
    const taxAmount = calculateTax(afterDiscountAmount);
    const total = afterDiscountAmount + taxAmount;
    
    // Crear un modal de confirmación con un resumen mejor estructurado
    const modalHTML = `
        <div class="confirm-modal" id="checkout-modal">
            <div class="confirm-modal-content">
                <div class="confirm-modal-header">
                    <h3>Order Summary</h3>
                </div>
                <div class="confirm-modal-body">
                    <div class="checkout-summary">
                        <div class="checkout-products">
                            <h4>Products:</h4>
                            <ul>
                                ${posState.cartItems.map(item => `
                                    <li>
                                        <span class="product-quantity">${item.quantity}x</span>
                                        <span class="product-name">${item.product.name}</span>
                                        <span class="product-price">$${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="checkout-totals">
                            <div class="checkout-total-item">
                                <span>Subtotal:</span>
                                <span>$${subtotal.toFixed(2)}</span>
                            </div>
                            ${applicableOffer ? `
                                <div class="checkout-total-item discount">
                                    <span>Discount (${applicableOffer.name}):</span>
                                    <span>-$${discountAmount.toFixed(2)}</span>
                                </div>
                            ` : ''}
                            <div class="checkout-total-item">
                                <span>Tax (${(posState.taxRate * 100).toFixed(2)}%):</span>
                                <span>$${taxAmount.toFixed(2)}</span>
                            </div>
                            <div class="checkout-total-item total">
                                <span>Total:</span>
                                <span>$${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="confirm-modal-buttons">
                    <button class="cancel-btn" onclick="closeCheckoutModal()">Cancel</button>
                    <button class="confirm-btn" onclick="processPayment()">Process Payment</button>
                </div>
            </div>
        </div>
    `;
    
    // Añadir el modal al DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);
}

/**
 * Cierra el modal de checkout
 */
function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Procesa el pago
 */
function processPayment() {
    // Cerrar el modal
    closeCheckoutModal();
    
    // Mostrar mensaje de éxito
    showMessage('Payment successful! Order has been processed.', 'success');
    
    // Limpiar el carrito
    clearPOSCart();
}

/**
 * Limpia el carrito
 */
function clearPOSCart() {
    // Limpiar el carrito
    posState.cartItems = [];
    
    // Actualizar la vista del carrito
    updatePOSCart();
    
    // Mostrar mensaje
    showMessage('Cart has been cleared', 'info');
}