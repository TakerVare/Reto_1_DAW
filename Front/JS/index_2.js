/* parámetros para pruebas */
//Inicializo la variable UserRol como empleado
localStorage.setItem("UserRol", "employee")
localStorage.setItem("UserStatus", "logged")

async function initNavMenu() {
    
    let menuItems = await getMenuItems()
    let menuNode = document.querySelector('.nav_menu')
    let userRol = localStorage.getItem("UserRol")
    let numMenuItems=null

    if (userRol==="employee")
    {
        numMenuItems=4
    }else{
        numMenuItems=3
    }

    for(let i=0; i<numMenuItems; i++){
        let menuItemNode = `<a href="${menuItems[i].url}" class="nav_menu_item">
		    <i class="${menuItems[i].icon}"></i>
		    <span>${menuItems[i].name}</span>
	        </a>`
        console.log(`append child ${menuItemNode}`);
        menuNode.innerHTML += menuItemNode
    }
    
    // Evento clic para enlaces del menú (cerrar menú hamburguesa al clickear un enlace)
    const navLinks = document.querySelectorAll('.nav_menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            if (hamburger && hamburger.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

async function initNavUser(){

    let userStatus = localStorage.getItem("UserStatus")
    //Select the nav_user node
    let userNode = document.getElementById('nav_user')
    
    if(userStatus === "logged" || userStatus === "activo"){
        // Limpiamos el contenido existente
        userNode.innerHTML = '';
        
        // Creamos el primer div contenedor del icono
        let iconContainer = document.createElement('div')
        
        // Añadimos el SVG al contenedor
        iconContainer.innerHTML = `
		<svg id="nav_user_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="8" r="5"></circle>
			<path d="M20 21a8 8 0 0 0-16 0"></path>
		</svg>
        `
        
        // Creamos el div del menú con las clases correctas
        let menuCard = document.createElement('div')
        menuCard.classList.add('card_user_menu', 'hidden')
        
        // Añadimos el contenido del menú
        menuCard.innerHTML = `
		<ul class="list">
			<li class="element">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round">
					<circle cx="12" cy="8" r="5"></circle>
					<path d="M20 21a8 8 0 0 0-16 0"></path>
				</svg>
			<p class="label">My profile</p>
			</li>
			<div class="separator"></div>
			<li class="element">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon 
					lucide-log-out">
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
					<polyline points="16 17 21 12 16 7"></polyline>
					<line x1="21" x2="9" y1="12" y2="12"></line>
				</svg>
			<p class="label">Log out</p>
			</li>
		</ul>
        `
        
        // Añadimos los contenedores al nodo principal
        userNode.appendChild(iconContainer)
        userNode.appendChild(menuCard)
        
        // Añadimos el event listener para mostrar/ocultar el menú al hacer clic en el icono
        const userIcon = document.getElementById('nav_user_icon')
        userIcon.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague
            menuCard.classList.toggle('hidden')
            
            // Si el carrito está visible, lo ocultamos
            const cartMenuDisplay = document.querySelector('.shopping_cart_menu');
            if (cartMenuDisplay && !cartMenuDisplay.classList.contains('hidden')) {
                cartMenuDisplay.classList.add('hidden');
            }
        })
        
    } else {
        // Limpiamos el contenido existente
        userNode.innerHTML = '';
        
        // Agregamos los botones de inicio de sesión y registro
        userNode.innerHTML = `
        <button class="nav_user_button">Sing in</button><button class="nav_user_button">Register</button>
        `;
    }
}

async function initShoppingCart() {
    // Seleccionamos el contenedor del carrito
    const navShoppingCart = document.querySelector('.nav_shopping_car');
    
    if (!navShoppingCart) return;
    
    // Verificamos si ya existe el icono del carrito, si no, lo creamos
    let cartIcon = navShoppingCart.querySelector('.fa-shopping-cart');
    if (!cartIcon) {
        const iconElement = document.createElement('i');
        iconElement.className = 'fas fa-shopping-cart';
        navShoppingCart.appendChild(iconElement);
        cartIcon = iconElement;
    }
    
    // Creamos el contenedor del menú del carrito
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('shopping_cart_menu', 'hidden');
    
    // Estructura básica del carrito
    cartContainer.innerHTML = `
        <div class="master-container">
            <div class="card cart">
                <label class="title">Your cart</label>
                <div class="products">
                    <!-- Los productos se generarán dinámicamente -->
                </div>
            </div>

            <div class="card checkout">
                <label class="title">Checkout</label>
                <div class="details">
                    <span>Your cart subtotal:</span>
                    <span>0.00$</span>
                    <span>Discount through applied coupons:</span>
                    <span>0.00$</span>
                    <span>Shipping fees:</span>
                    <span>0.00$</span>
                </div>
                <div class="checkout--footer">
                    <label class="price"><sup>$</sup>0.00</label>
                    <button class="checkout-btn">Checkout</button>
                </div>
            </div>
        </div>
    `;
    
    // Añadimos el carrito al DOM
    navShoppingCart.appendChild(cartContainer);
    
    // Obtenemos los elementos del carrito y los añadimos
    await updateShoppingCartContent();
    
    // Añadimos el event listener para mostrar/ocultar el carrito
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que el clic se propague
        cartContainer.classList.toggle('hidden');
        
        // Si el menú de usuario está visible, lo ocultamos
        const userMenu = document.querySelector('.card_user_menu');
        if (userMenu && !userMenu.classList.contains('hidden')) {
            userMenu.classList.add('hidden');
        }
    });
    
    // Evitar que los clics dentro del carrito lo cierren
    cartContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Configurar eventos para los botones del carrito
    setupCartEventListeners(cartContainer);
}

// Función para actualizar el contenido del carrito
async function updateShoppingCartContent() {
    try {
        // Obtenemos los elementos del carrito usando la función de api.js
        const cartItems = await getShoppingCartItems();
        
        // Seleccionamos el contenedor de productos
        const productsContainer = document.querySelector('.shopping_cart_menu .products');
        
        if (!productsContainer) return;
        
        // Limpiamos el contenedor
        productsContainer.innerHTML = '';
        
        // Si el carrito está vacío, mostramos un mensaje
        if (!cartItems || cartItems.length === 0) {
            productsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            updateCartTotals(0, 0, 0);
            return;
        }
        
        // Calculamos los totales
        let subtotal = 0;
        let discount = 0;
        let shipping = cartItems.length > 0 ? 4.99 : 0;
        
        // Creamos los elementos del carrito
        for (let i = 0; i < cartItems.length; i++) {
            const cartItem = cartItems[i];
            
            try {
                // Obtenemos el producto usando la función del api.js (corregida)
                const product = await getProductDetails(cartItem.id_product);
                
                if (product) {
                    // Creamos el elemento del producto
                    const productElement = createCartItemElement(product, cartItem.amount);
                    productsContainer.appendChild(productElement);
                    
                    // Si no es el último elemento, añadimos un separador
                    if (i < cartItems.length - 1) {
                        const separator = document.createElement('div');
                        separator.className = 'separator';
                        productsContainer.appendChild(separator);
                    }
                    
                    // Calculamos el subtotal
                    subtotal += product.price * cartItem.amount;
                }
            } catch (error) {
                console.error(`Error al obtener detalles del producto ${cartItem.id_product}:`, error);
            }
        }
        
        // Actualizamos los totales en el carrito
        updateCartTotals(subtotal, discount, shipping);
        
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
        // En caso de error, mostramos un mensaje en el carrito
        const productsContainer = document.querySelector('.shopping_cart_menu .products');
        if (productsContainer) {
            productsContainer.innerHTML = '<div class="error-cart">Error al cargar el carrito. Inténtalo de nuevo más tarde.</div>';
        }
    }
}

// Función para crear un elemento de producto del carrito
function createCartItemElement(product, quantity) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.dataset.productId = product.id_product;
    
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" height="60" width="60">
        <div>
            <span class="product_name">${product.name}</span>
        </div>
        <div class="product_quantity">
            <div class="product_quantity_button product_quantity_less">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-square-minus-icon lucide-square-minus">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M8 12h8" /></svg>
            </div>
            <label>${quantity}</label>
            <div class="product_quantity_button product_quantity_plus">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-square-plus-icon lucide-square-plus">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" /></svg>
            </div>
            <div class="product_quantity_button product_quantity_delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" /></svg>
            </div> 
        </div>
        <label class="price small">$${(product.price * quantity).toFixed(2)}</label>
    `;
    
    return productDiv;
}

// Función para actualizar los totales del carrito
function updateCartTotals(subtotal, discount, shipping) {
    const subtotalElement = document.querySelector('.shopping_cart_menu .details span:nth-child(2)');
    const discountElement = document.querySelector('.shopping_cart_menu .details span:nth-child(4)');
    const shippingElement = document.querySelector('.shopping_cart_menu .details span:nth-child(6)');
    const totalElement = document.querySelector('.shopping_cart_menu .price');
    
    if (subtotalElement) subtotalElement.textContent = `${subtotal.toFixed(2)}$`;
    if (discountElement) discountElement.textContent = `${discount.toFixed(2)}$`;
    if (shippingElement) shippingElement.textContent = `${shipping.toFixed(2)}$`;
    
    const total = subtotal - discount + shipping;
    if (totalElement) totalElement.innerHTML = `<sup>$</sup>${total.toFixed(2)}`;
}

// Función para configurar los event listeners de los botones del carrito
function setupCartEventListeners(cartContainer) {
    // Event delegation para los botones del carrito
    cartContainer.addEventListener('click', async function(e) {
        // Encuentra el elemento más cercano con la clase .product
        const productElement = e.target.closest('.product');
        if (!productElement) return;
        
        const productId = parseInt(productElement.dataset.productId);
        const quantityLabel = productElement.querySelector('.product_quantity label');
        
        // Botón de restar cantidad
        if (e.target.closest('.product_quantity_less')) {
            let quantity = parseInt(quantityLabel.textContent);
            if (quantity > 1) {
                quantity--;
                quantityLabel.textContent = quantity;
                await updateCartItemQuantity(productId, quantity);
                updateShoppingCartContent();
            }
        }
        
        // Botón de añadir cantidad
        if (e.target.closest('.product_quantity_plus')) {
            let quantity = parseInt(quantityLabel.textContent);
            quantity++;
            quantityLabel.textContent = quantity;
            await updateCartItemQuantity(productId, quantity);
            updateShoppingCartContent();
        }
        
        // Botón de eliminar
        if (e.target.closest('.product_quantity_delete')) {
            await removeCartItem(productId);
            updateShoppingCartContent();
        }
    });
    
    // Event listener para el botón de checkout
    const checkoutBtn = cartContainer.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
}

// Función para actualizar la cantidad de un producto en el carrito
async function updateCartItemQuantity(productId, quantity) {
    try {
        console.log(`Actualizando cantidad del producto ${productId} a ${quantity}`);
        // En una aplicación real, aquí enviaríamos los datos al servidor
        // Por ahora, simplemente mostramos un mensaje en la consola
        
        // Simulamos la actualización en localStorage para efectos de demostración
        const cartItems = await getShoppingCartItems();
        const updatedCartItems = cartItems.map(item => {
            if (item.id_product === productId) {
                return { ...item, amount: quantity };
            }
            return item;
        });
        
        // En una aplicación real, guardaríamos estos datos en el servidor
        console.log('Carrito actualizado:', updatedCartItems);
        
        return true;
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
        return false;
    }
}

// Función para eliminar un producto del carrito
async function removeCartItem(productId) {
    try {
        console.log(`Eliminando producto ${productId} del carrito`);
        // En una aplicación real, aquí enviaríamos los datos al servidor
        // Por ahora, simplemente mostramos un mensaje en la consola
        
        // Simulamos la eliminación en localStorage para efectos de demostración
        const cartItems = await getShoppingCartItems();
        const updatedCartItems = cartItems.filter(item => item.id_product !== productId);
        
        // En una aplicación real, guardaríamos estos datos en el servidor
        console.log('Carrito actualizado:', updatedCartItems);
        
        return true;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return false;
    }
}

// Función para inicializar el menú hamburguesa
function initBurgerMenu() {
    const navBurgerMenu = document.querySelector('.nav_burger_menu');
    const navMenu = document.querySelector('.nav_menu');
    let hamburger = document.querySelector('.hamburger');
    
    // Si no existe el elemento hamburguesa, lo creamos
    if (!hamburger && navBurgerMenu) {
        const newHamburger = document.createElement('button');
        newHamburger.classList.add('hamburger');
        newHamburger.innerHTML = '<div></div><div></div><div></div>';
        navBurgerMenu.appendChild(newHamburger);
        
        // Actualizar referencia
        hamburger = newHamburger;
    }
    
    // Función para alternar el menú
    window.toggleMenu = function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    }
    
    // Evento de clic para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (navMenu && hamburger) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('open')) {
                toggleMenu();
            }
        }
    });
    
    // Ajustar navegación al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (navMenu && hamburger && window.innerWidth > 768 && navMenu.classList.contains('open')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });
}

// Añadimos un event listener para manejar clics fuera de los menús
document.addEventListener('click', function(event) {
    // Menú de usuario
    const userIcon = document.getElementById('nav_user_icon');
    const userMenu = document.querySelector('.card_user_menu');
    
    // Si el clic no fue dentro del menú de usuario ni en el icono, ocultarlo
    if (userMenu && !userMenu.classList.contains('hidden') && 
        !userMenu.contains(event.target) && 
        (userIcon && !userIcon.contains(event.target))) {
        userMenu.classList.add('hidden');
    }
    
    // Menú de carrito
    const cartIcon = document.querySelector('.fas.fa-shopping-cart');
    const cartMenu = document.querySelector('.shopping_cart_menu');
    
    if (cartMenu && !cartMenu.classList.contains('hidden') && 
        !cartMenu.contains(event.target) && 
        (cartIcon && !cartIcon.contains(event.target))) {
        cartMenu.classList.add('hidden');
    }
});

window.onload = function() {
    initNavMenu();
    initNavUser();
    initBurgerMenu();
    initShoppingCart();
}