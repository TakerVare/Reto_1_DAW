/* parámetros para pruebas */
//Inicializo la variable UserRol como empleado
localStorage.setItem("UserRol", "employee")
localStorage.setItem("UserStatus", "NOlogged")

async function initNavMenu() {
    
    let menuItems = await getMenuItems()
    let menuNode = document.getElementById('nav_menu')
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

}

async function initNavUser(){

    let userStatus = localStorage.getItem("UserStatus")
    let userNode = document.getElementById('nav_user')
    let menuUserNavNodeLogo = document.createElement('div')
    let menuUserNavCard = document.createElement('div')
    menuUserNavNode=null
    if(userStatus!="logged"){
        
        menuUserNavNodeLogo.innerHTML = `<div>
            <svg id="nav_user_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round">
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M20 21a8 8 0 0 0-16 0"></path>
            </svg>
        </div>`
        menuUserNavCard.classList.add('card_user_menu')
        menuUserNavCard.innerHTML = `<ul class="list">
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
            </ul>`
    }

    /*
    userNode.innerHTML += menuUserNavNode
    userNode.innerHTML += menuUserNavCard
    */
   userNode.appendChild(menuUserNavNodeLogo)
   userNode.appendChild(menuUserNavCard)
}

window.onload = function() {
    initNavMenu()
    initNavUser()
}