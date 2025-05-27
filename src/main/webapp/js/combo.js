document

async function randomMenu() {
    pintaCombo();



}

// Función principal para inicializar el grid de productos
async function initGridProducts() {
    try {
        // Obtener los datos de productos desde la API
        const products = await getProducts();

        // Si no se pueden obtener los productos, mostrar error
        if (!products) {
            console.error('No se pudieron cargar los productos');
            return;
        }

        // Organizar productos por categorías
        const productsByCategory = organizeProductsByCategory(products);

        // Generar el HTML para el grid de productos
        const gridHTML = generateProductGrid(productsByCategory);

        // Insertar el HTML en el contenedor
        const container = document.getElementById('product-menus-container');
        if (container) {
            container.innerHTML = gridHTML;

            // Inicializar los sliders de texto
            initializeTextSliders();
        } else {
            console.error('Elemento contenedor "product-menus-container" no encontrado');
        }
    } catch (error) {
        console.error('Error al inicializar el grid de productos:', error);
    }
}

/*
// Función para organizar productos por categorías
function organizeProductsByCategory(products) {
    const productsByCategory = {};

    // Inicializar arrays vacíos para cada categoría conocida
    Object.keys(categoryMapping).forEach(categoryId => {
        productsByCategory[categoryId] = [];
    });

    // Organizar los productos en sus respectivas categorías
    products.forEach(product => {
        const categoryId = product.id_category;

        // Si la categoría existe en nuestro mapping, añadir el producto
        if (productsByCategory[categoryId] !== undefined) {
            productsByCategory[categoryId].push(product);
        }
    });

    return productsByCategory;
}
*/
async function getProductsJson() {
    let products = (await fetch('./mockup/Products_autoria.json')).json()
    
    return products;
}

async function pintaCombo(){
    let pruductos = await getProductsJson();
    
    const productMain = [];
    const productDrink = [];
    const productDessert = [];
    
    console.log(productMain);

    for (var i in pruductos) {
        switch (pruductos[i]['id_category']) {
            case 1:
                productMain.push({
                    "id_product": pruductos[i]['id_product'],
                    "id_tax": pruductos[i]['id_tax'],
                    "id_category": pruductos[i]['id_category'],
                    "name": pruductos[i]['name'],
                    "description": pruductos[i]['description'],
                    "price": pruductos[i]['price'],
                    "image": pruductos[i]['image']
                });  
                console.log(productMain);
              break; 
            case 2:
                productDrink.push({
                    "id_product": pruductos[i]['id_product'],
                    "id_tax": pruductos[i]['id_tax'],
                    "id_category": pruductos[i]['id_category'],
                    "name": pruductos[i]['name'],
                    "description": pruductos[i]['description'],
                    "price": pruductos[i]['price'],
                    "image": pruductos[i]['image']
                });
                console.log(productDrink);  
              break;
            case 3:
                productDessert.push({
                    "id_product": pruductos[i]['id_product'],
                    "id_tax": pruductos[i]['id_tax'],
                    "id_category": pruductos[i]['id_category'],
                    "name": pruductos[i]['name'],
                    "description": pruductos[i]['description'],
                    "price": pruductos[i]['price'],
                    "image": pruductos[i]['image']
                }); 
                console.log(productDessert);
              break;
            default:
              
              break;
          }
          
        
    }

    const divBurger = document.getElementById("burguer-random-container");
    let MainProduct = getRandomItem(productMain);
    let MainProductHTML = document.createElement('div');
    MainProductHTML.innerHTML+=`
        <h1>Name: ${MainProduct.name}</h1>
        <h2>Precio: ${MainProduct.price}</h2>
        <img src="${MainProduct.image}" alt="${MainProduct.name}">
        
    `;
    console.log(MainProductHTML);
    divBurger.appendChild(MainProductHTML);
    



}

function getRandomItem(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

