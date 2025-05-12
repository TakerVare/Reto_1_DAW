//Inicializo la variable UserRol como empleado
localStorage.setItem("UserRol", "employee")

// Variable para controlar si el menú ya se ha inicializado
let navMenuInitialized = false;

async function initNavUser() {
    // No hacer nada aquí, la autenticación manejará esto
    // Solo para compatibilidad con cualquier código que pueda estar llamando a esta función
    console.log('Nav user initialization deferred to auth system');
}

async function initNavMenu() {
    // Si ya está inicializado, salir para evitar duplicación
    if (navMenuInitialized) {
        console.log('Menu already initialized, skipping...');
        return;
    }
    
    let menuItems = await getMenuItems();
    let menuNode = document.querySelector('.nav_menu');
    
    // Si no se encuentra el elemento del menú, salir
    if (!menuNode) {
        console.error('Elemento del menú no encontrado');
        return;
    }
    
    // Limpiar el contenido existente para evitar duplicación
    menuNode.innerHTML = '';
    
    let userRol = localStorage.getItem("UserRol");
    let numMenuItems = null;
    
    if (userRol === "employee") {
        numMenuItems = 4;
    } else {
        numMenuItems = 3;
    }
    
    for (let i = 0; i < numMenuItems; i++) {
        // Modificar la URL si el ítem es el menú "Menus" para que lleve a la sección de menús en products.html
        let url = menuItems[i].url;
        if (menuItems[i].text === "Menus") {
            url = "products.html?category=4"; // Categoría 4 corresponde a Menus según tu estructura
        }
        
        let menuItemNode = `<a href="${url}" class="nav_menu_item">
            <i class="${menuItems[i].icon}"></i>
            <span>${menuItems[i].text}</span>
        </a>`;
        
        console.log(`append child ${menuItemNode}`);
        menuNode.innerHTML += menuItemNode;
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
    
    // Marcar como inicializado para evitar duplicación
    navMenuInitialized = true;
}

// Comprobar si hay que inicializarlo directamente o será llamado por common.js
document.addEventListener('DOMContentLoaded', function() {
    // Permitir que common.js maneje la inicialización si existe
    // No hacer nada aquí, ya que common.js llamará a initNavMenu()
});