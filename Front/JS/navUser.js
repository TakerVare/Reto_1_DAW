//Inicializo la variable UserStatus como logged
localStorage.setItem("UserStatus", "logged")

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