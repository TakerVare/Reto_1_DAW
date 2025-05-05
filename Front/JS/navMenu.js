//Inicializo la variable UserRol como empleado
localStorage.setItem("UserRol", "employee")

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
		    <span>${menuItems[i].text}</span>
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