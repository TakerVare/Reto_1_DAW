/**
 * BurWeb - Grid Products Component
 * Crea dinámicamente los grids de productos basados en datos JSON
 */

// Mapeo de id_category a nombres de sección y configuración de sliders
const categoryMapping = {
    1: { sectionKey: 'burgers', sliderConfig: { id: "slider-burgers", content: "BURGERS", speed: "2" } },
    2: { sectionKey: 'drinks', sliderConfig: { id: "slider-drinks", content: "DRINKS", speed: "3" } },
    3: { sectionKey: 'desserts', sliderConfig: { id: "slider-desserts", content: "DESSERTS", speed: "5" } },
    4: { sectionKey: 'sides', sliderConfig: { id: "slider-sides", content: "SIDES", speed: "4" } },
    5: { sectionKey: 'menus', sliderConfig: { id: "slider-menus", content: "MENUS", speed: "1" } }
};

// Función para alternar entre descripción corta y completa (disponible globalmente)
window.toggleDescription = function(event, productId) {
    // Evitar que el clic se propague a la tarjeta del producto
    event.stopPropagation();
    
    // Obtener los elementos
    const shortDesc = document.getElementById(`desc-short-${productId}`);
    const fullDesc = document.getElementById(`desc-full-${productId}`);
    const toggleBtn = event.currentTarget;
    
    // Alternar visibilidad
    if (shortDesc.classList.contains('hidden')) {
        // Mostrar descripción corta, ocultar descripción completa
        shortDesc.classList.remove('hidden');
        fullDesc.classList.add('hidden');
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Ver más';
    } else {
        // Ocultar descripción corta, mostrar descripción completa
        shortDesc.classList.add('hidden');
        fullDesc.classList.remove('hidden');
        toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos';
    }
};

// Función principal para inicializar el grid de productos
async function initGridProducts() {
    try {
        //getCategories();

        // Obtener los datos de productos desde la API
        const products = await getProducts();
        
        // Si no se pueden obtener los productos, mostrar error
        if (!products) {
            console.error('No se pudieron cargar los productos');
            return;
        }
        
        // Organizar productos por categorías
        const productsByCategory = organizeProductsByCategory(products);
        
        // Generar el HTML para el grid de productos
        const gridHTML = generateProductGrid(productsByCategory);
        
        // Insertar el HTML en el contenedor
        const container = document.getElementById('product-menus-container');
        if (container) {
            container.innerHTML = gridHTML;
            
            // Inicializar los sliders de texto
            initializeTextSliders();
        } else {
            console.error('Elemento contenedor "product-menus-container" no encontrado');
        }
    } catch (error) {
        console.error('Error al inicializar el grid de productos:', error);
    }
}

// Función para organizar productos por categorías
function organizeProductsByCategory(products) {
    const productsByCategory = {};
    
    // Inicializar arrays vacíos para cada categoría conocida
    Object.keys(categoryMapping).forEach(categoryId => {
        productsByCategory[categoryId] = [];
    });
    
    // Organizar los productos en sus respectivas categorías
    products.forEach(product => {
        const categoryId = product.id_category;
        
        // Si la categoría existe en nuestro mapping, añadir el producto
        if (productsByCategory[categoryId] !== undefined) {
            productsByCategory[categoryId].push(product);
        }
    });
    
    return productsByCategory;
}

// Función para generar el HTML del grid de productos
function generateProductGrid(productsByCategory) {
    let sectionsHTML = '';
    
    // Generar una sección para cada categoría que tenga productos
    Object.keys(productsByCategory).forEach(categoryId => {
        const products = productsByCategory[categoryId];
        
        // Solo crear secciones para categorías que tienen productos
        if (products.length > 0) {
            const { sectionKey, sliderConfig } = categoryMapping[categoryId];
            sectionsHTML += createProductSection(products, sectionKey, sliderConfig);
        }
    });
    
    return sectionsHTML;
}

// Función para crear una sección de productos
function createProductSection(products, sectionKey, sliderConfig) {
    let productCardsHTML = '';
    
    // Crear cards para cada producto
    products.forEach(product => {
        productCardsHTML += createProductCard(product);
    });
    
    // Retornar el HTML de la sección completa
    return `
        <section class="menu-section">
            ${createTextSlider(sliderConfig)}
            <div class="product-grid ${sectionKey}-grid">
                ${productCardsHTML}
            </div>
        </section>
    `;
}

// Función para crear una card de producto con descripción expandible
function createProductCard(product) {
    // Formatear el precio con 2 decimales y el símbolo €
    const formattedPrice = product.price.toFixed(2) + ' €';
    
    // Usar una versión más corta de la descripción inicialmente
    const shortDescription = product.description.length > 100 ? 
        product.description.substring(0, 100) + '...' : 
        product.description;
    
    // Comprobar si la descripción necesita el botón "Ver más"
    const needsExpand = product.description.length > 100;
    
    return `
        <div class="product-card" data-product-id="${product.id_product}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-description-container">
                    <p class="product-description" id="desc-short-${product.id_product}">${shortDescription}</p>
                    <p class="product-description product-description-full hidden" id="desc-full-${product.id_product}">${product.description}</p>
                    ${needsExpand ? 
                        `<button class="description-toggle" data-product-id="${product.id_product}" onclick="toggleDescription(event, ${product.id_product})">
                            <i class="fas fa-chevron-down"></i> Ver más
                        </button>` : 
                        ''}
                </div>
                <div class="product-price-container">
                    <div class="product-price">${formattedPrice}</div>
                    <button class="add-to-cart-btn" onclick="showQuantityPopup(${product.id_product}, '${product.name}', ${product.price}, '${product.image}')">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para crear un slider de texto con el diseño específico
function createTextSlider(config) {
    return `
        <div class="text-slider-container">
            <div class="text-slider speed-${config.speed}" id="${config.id}">
                <!-- El contenido se generará dinámicamente -->
            </div>
        </div>
    `;
}

// Función para inicializar los sliders de texto
function initializeTextSliders() {
    document.querySelectorAll('.text-slider').forEach(slider => {
        const content = slider.id.replace('slider-', '').toUpperCase();
        
        // Crear el contenido repetido para el efecto de deslizamiento infinito
        let repeatedContent = '';
        for (let i = 0; i < 10; i++) {
            repeatedContent += `
                <div class="text-slider-item">
                    <span>${content}</span>
                    <div class="separator">●</div>
                </div>
            `;
        }
        
        slider.innerHTML = repeatedContent;
    });

    // Crear el popup para selección de cantidad si no existe
    if (!document.getElementById('quantity-popup')) {
        createQuantityPopup();
    }
}

// Crear el popup de selección de cantidad
function createQuantityPopup() {
    const popupHTML = `
        <div id="quantity-popup" class="quantity-popup">
            <div class="quantity-popup-content">
                <div class="quantity-popup-header">
                    <h3>Añadir al Carrito</h3>
                    <button class="close-popup" onclick="closeQuantityPopup()">&times;</button>
                </div>
                <div class="quantity-popup-body">
                    <div class="quantity-product-info">
                        <img id="popup-product-image" src="" alt="Product">
                        <div>
                            <h4 id="popup-product-name"></h4>
                            <p id="popup-product-price"></p>
                        </div>
                    </div>
                    <div class="quantity-selector">
                        <button onclick="changeQuantity(-1)">-</button>
                        <input type="number" id="product-quantity" value="1" min="1" max="99" readonly>
                        <button onclick="changeQuantity(1)">+</button>
                    </div>
                    <div class="quantity-total">
                        <span>Total:</span>
                        <span id="popup-total-price"></span>
                    </div>
                    <button class="add-to-cart-confirm" onclick="confirmAddToCart()">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;

    const popupContainer = document.createElement('div');
    popupContainer.innerHTML = popupHTML;
    document.body.appendChild(popupContainer.firstElementChild);
}

// Variables para mantener información del producto actual en el popup
let currentProductId = null;
let currentProductPrice = 0;
let currentProductName = '';
let currentProductImage = '';

// Mostrar el popup con información del producto
function showQuantityPopup(productId, productName, productPrice, productImage) {
    // Guardar info del producto actual
    currentProductId = productId;
    currentProductPrice = productPrice;
    currentProductName = productName;
    currentProductImage = productImage;

    // Actualizar información en el popup
    document.getElementById('popup-product-name').textContent = productName;
    document.getElementById('popup-product-price').textContent = productPrice.toFixed(2) + ' €';
    document.getElementById('popup-product-image').src = productImage;
    
    // Reset cantidad a 1
    document.getElementById('product-quantity').value = 1;
    
    // Actualizar precio total
    updateTotalPrice();
    
    // Mostrar popup
    document.getElementById('quantity-popup').classList.add('show');
}

// Cerrar el popup
function closeQuantityPopup() {
    document.getElementById('quantity-popup').classList.remove('show');
}

// Cambiar la cantidad de productos
function changeQuantity(change) {
    const quantityInput = document.getElementById('product-quantity');
    let quantity = parseInt(quantityInput.value) + change;
    
    // Limitar entre 1 y 99
    quantity = Math.max(1, Math.min(99, quantity));
    
    quantityInput.value = quantity;
    updateTotalPrice();
}

// Actualizar el precio total basado en la cantidad
function updateTotalPrice() {
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const totalPrice = (currentProductPrice * quantity).toFixed(2) + ' €';
    document.getElementById('popup-total-price').textContent = totalPrice;
}

// Confirmar y añadir al carrito
function confirmAddToCart() {
    const quantity = parseInt(document.getElementById('product-quantity').value);
    
    // Llamar a la función de shoppingCart.js para añadir el producto
    addToCart(currentProductId, currentProductName, currentProductPrice, currentProductImage, quantity);
    
    // Cerrar popup
    closeQuantityPopup();
    
    // Mostrar confirmación
    showAddToCartConfirmation();
}

// Función para mostrar la confirmación después de añadir al carrito
function showAddToCartConfirmation() {
    // Crear el elemento de confirmación si no existe
    if (!document.getElementById('cart-confirmation')) {
        const confirmationHTML = `
            <div id="cart-confirmation" class="cart-confirmation">
                <i class="fas fa-check-circle"></i>
                <span>Producto añadido al carrito</span>
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