document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    //const hamburger = document.querySelector('.hamburger');
    //const navMenu = document.querySelector('.nav_menu');

    // Inicializamos estas variables como null
    var userIcon = null;
    var NavUserCardMenuDisplay = null;
    // Creo las variables cartIcon y cartMenuDisplay para manejar el icono del carrito y su menú desplegable
    var cartIcon = null;
    var cartMenuDisplay = null;
    
    //Creo esta variable para dibujar los botones de login y register 
    //o el icono de usuario según corresponda 
    var navUser = document.querySelector('.nav_user');
    var usuario_estatus = localStorage.getItem("usuario");
    localStorage.setItem("usuario", "activo");
    if(navUser) {
        if(usuario_estatus!="activo"){
            //Creo el primer botón de Sing in
            const newNavUser=document.getElementById('nav_user');
            const newNavUserLogIn = document.createElement('button');
            newNavUserLogIn.classList.add('nav_user_button');
            newNavUserLogIn.innerText='Sing in';
            newNavUser.appendChild(newNavUserLogIn);
            
            //Creo el primer botón de Register
            const newNavUserRegister = document.createElement('button');
            newNavUserRegister.classList.add('nav_user_button');
            newNavUserRegister.innerText='Register';
            newNavUser.appendChild(newNavUserRegister);

            navUser = newNavUser;
        }
        if(usuario_estatus==="activo"){
            
            //Creo el avatar
            const newNavUser=document.getElementById('nav_user');
            const newNavUserAvatar = document.createElement('div');
            newNavUserAvatar.innerHTML=`<svg id="nav_user_icon" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="lucide lucide-user-round-icon lucide-user-round">
                <circle cx="12" cy="8" r="5"/>
                <path d="M20 21a8 8 0 0 0-16 0"/>
            </svg>`;
            newNavUser.appendChild(newNavUserAvatar);
            
            const newNavUserCardMenu = document.createElement('div');
            newNavUserCardMenu.classList.add('card_user_menu');
            newNavUserCardMenu.classList.add('hidden');
            newNavUserCardMenu.innerHTML=`<ul class="list">
                    <li class="element">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-user-round-icon lucide-user-round">
                            <circle cx="12" cy="8" r="5"/>
                            <path d="M20 21a8 8 0 0 0-16 0"/>
                        </svg>
                    <p class="label">My profile</p>
                    </li>
                    <div class="separator"></div>
                    <li class="element">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        class="lucide lucide-log-out-icon 
                        lucide-log-out">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" x2="9" y1="12" y2="12"/>
                    </svg>
                    <p class="label">Log out</p>
                    </li>
                </ul>`;
            
            newNavUser.appendChild(newNavUserCardMenu);
            
            // Ahora seleccionamos los elementos después de que se han añadido al DOM
            userIcon = document.getElementById('nav_user_icon');
            NavUserCardMenuDisplay = document.querySelector('.card_user_menu');
            
            navUser = newNavUser;
            
            // Sólo configuramos los event listeners si ambos elementos existen
            if (userIcon && NavUserCardMenuDisplay) {
                // Alternar visibilidad al hacer clic
                userIcon.addEventListener("click", () => {
                    NavUserCardMenuDisplay.classList.toggle("hidden");
                });
              
                // Ocultar el menú de usuario si haces clic fuera
                document.addEventListener("click", (e) => {
                    if (!userIcon.contains(e.target) && !NavUserCardMenuDisplay.contains(e.target)) {
                        NavUserCardMenuDisplay.classList.add("hidden");
                    }
                });
            }
        }
        
    }

    //Inicio Manejo del carrito de compras

    var navShoppingCart = document.querySelector('.nav_shopping_car');
    if (navShoppingCart) {
        // Obtenemos el icono del carrito
        cartIcon = navShoppingCart.querySelector('.fa-shopping-cart');
        
        // Creamos el contenedor del carrito y lo añadimos al DOM
        const cartContainer = document.createElement('div');
        cartContainer.classList.add('shopping_cart_menu');
        cartContainer.classList.add('hidden');
        
        // Insertamos el contenido del Carrito.html
        cartContainer.innerHTML = `
            <div class="master-container">
                <div class="card cart">
                    <label class="title">Your cart</label>
                    <div class="products">
                        <div class="product">
                            <img src="images/MainFood/Burger_1.png" alt="imagen-producto" height="60" width="60">
                            <div>
                                <span class="product_name">Cheese Burger coin queso y bacon</span>
                            </div>
                            <div class="product_quantity">
                                <div class="product_quantity_button product_quantity_less">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-square-minus-icon lucide-square-minus">
                                        <rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M8 12h8" /></svg>
                                </div>
                                <label>9</label>
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
                            <label class="price small">$23.99</label>

                        </div>
                        <div class="separator"></div>
                        
                        <div class="product">
                            <img src="images/Drinks/CocaCola_Original.jpg" alt="imagen-producto" height="60" width="60">
                            <div>
                                <span class="product_name">Cheese Burger coin queso y bacon</span>
                            </div>
                            <div class="product_quantity">
                                <div class="product_quantity_button product_quantity_less">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-square-minus-icon lucide-square-minus">
                                        <rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M8 12h8" /></svg>
                                </div>
                                <label>9</label>
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
                            <label class="price small">$23.99</label>
                        </div>
                    </div>
                </div>

                <div class="card checkout">
                    <label class="title">Checkout</label>
                    <div class="details">
                        <span>Your cart subtotal:</span>
                        <span>47.99$</span>
                        <span>Discount through applied coupons:</span>
                        <span>3.99$</span>
                        <span>Shipping fees:</span>
                        <span>4.99$</span>
                    </div>
                    <div class="checkout--footer">
                        <label class="price"><sup>$</sup>57.99</label>
                        <button class="checkout-btn">Checkout</button>
                    </div>
                </div>
            </div>
        `;
        
        // Añadimos el carrito al DOM, justo después del icono
        navShoppingCart.appendChild(cartContainer);
        
        // Guardamos la referencia al carrito para usarla después
        cartMenuDisplay = cartContainer;
        
        // Configuramos el event listener para el icono del carrito
        if (cartIcon && cartMenuDisplay) {
            cartIcon.addEventListener("click", (e) => {
                e.stopPropagation(); // Evitamos que el clic se propague
                cartMenuDisplay.classList.toggle("hidden");
                
                // Si el menú de usuario está visible, lo ocultamos
                if (NavUserCardMenuDisplay && !NavUserCardMenuDisplay.classList.contains("hidden")) {
                    NavUserCardMenuDisplay.classList.add("hidden");
                }
            });
            
            // Ocultar el carrito si haces clic fuera
            document.addEventListener("click", (e) => {
                if (!cartIcon.contains(e.target) && !cartMenuDisplay.contains(e.target)) {
                    cartMenuDisplay.classList.add("hidden");
                }
            });
            
            // Evitar que los clics dentro del carrito lo cierren
            cartMenuDisplay.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        }
    }

    //Fin Manejo del carrito de compras

    /*
    // Si no existe el menú hamburguesa, crearlo
    if (!hamburger) {
        const newHamburger = document.createElement('button');
        newHamburger.classList.add('hamburger');
        newHamburger.innerHTML = '<div></div><div></div><div></div>';
        document.querySelector('.header').appendChild(newHamburger);
        
        // Actualizar la referencia
        hamburger = newHamburger;
    }
    
    // Función para alternar el menú
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    }
    
    // Evento de clic para el botón hamburguesa
    hamburger.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav_menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
    
    // Ajustar navegación al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });
    */
});