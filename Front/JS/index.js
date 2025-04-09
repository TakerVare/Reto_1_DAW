document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    //const hamburger = document.querySelector('.hamburger');
    //const navMenu = document.querySelector('.nav_menu');

    // Inicializamos estas variables como null en lugar de documentElement
    var userIcon = null;
    var NavUserCardMenuDisplay = null;
    
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