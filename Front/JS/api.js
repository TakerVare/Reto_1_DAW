async function getMenuItems() {
    let menuItems = (await fetch('./mockup/menuItems.json')).json()

    return menuItems
}

async function getShoppingCartItems() {
    let ShoppingCartItems = (await fetch('./mockup/shopping_cart_items.json')).json()

    return ShoppingCartItems
}

async function getProductDetails(id){
    let productDetails = await (await fetch('./mockup/products.json')).json()
    
    // Buscar el producto por su id_product en lugar de usar directamente el índice
    return productDetails.find(product => product.id_product === id)
}


function getDetails(id) {

}