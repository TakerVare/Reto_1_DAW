document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    //const hamburger = document.querySelector('.hamburger');
    //const navMenu = document.querySelector('.nav_menu');


    //Creo esta variable para dibujar los botones de login y register 
    //o el icono de usuario según corresponda 
    const navUser = document.querySelector('.nav_user');
    var usuario_estatus = localStorage.getItem("usuario");
    localStorage.setItem("usuario", "inactivo");
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
            //newNavUserLogIn.classList.add('nav_user_button');
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
            /*
            newNavUserAvatar.innerText=`<svg id="nav_user_icon" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="lucide lucide-user-round-icon lucide-user-round">
                <circle cx="12" cy="8" r="5"/>
                <path d="M20 21a8 8 0 0 0-16 0"/>
            </svg>`;*/
            newNavUser.appendChild(newNavUserAvatar);
            
            navUser = newNavUser;
            
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