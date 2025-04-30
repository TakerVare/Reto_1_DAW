async function getMenuItems() {
    let menuItems = (await fetch('./mockup/menuItems.json')).json()

    return menuItems
}

function getDetails(id) {

}