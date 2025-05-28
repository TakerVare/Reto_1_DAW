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

async function getProductsJson() {
    let products = (await fetch('./mockup/Products_autoria.json')).json()

    return products;
}

async function pintaCombo(){
    try {
        let productos = await getProductsJson();

        const productMain = [];
        const productDrink = [];
        const productDessert = [];

        for (var i in productos) {
            switch (productos[i]['id_category']) {
                case 1:
                    productMain.push({
                        "id_product": productos[i]['id_product'],
                        "id_tax": productos[i]['id_tax'],
                        "id_category": productos[i]['id_category'],
                        "name": productos[i]['name'],
                        "description": productos[i]['description'],
                        "price": productos[i]['price'],
                        "image": productos[i]['image']
                    });
                    break;
                case 2:
                    productDrink.push({
                        "id_product": productos[i]['id_product'],
                        "id_tax": productos[i]['id_tax'],
                        "id_category": productos[i]['id_category'],
                        "name": productos[i]['name'],
                        "description": productos[i]['description'],
                        "price": productos[i]['price'],
                        "image": productos[i]['image']
                    });
                    break;
                case 3:
                    productDessert.push({
                        "id_product": productos[i]['id_product'],
                        "id_tax": productos[i]['id_tax'],
                        "id_category": productos[i]['id_category'],
                        "name": productos[i]['name'],
                        "description": productos[i]['description'],
                        "price": productos[i]['price'],
                        "image": productos[i]['image']
                    });
                    break;
                default:
                    break;
            }
        }

        // Limpiar contenedores existentes
        const divBurger = document.querySelector('.burguer-random-container');
        const divDrink = document.querySelector('.drink-random-container');
        const divDessert = document.querySelector('.dessert-random-container');

        // Verificar que los elementos existen
        if (!divBurger || !divDrink || !divDessert) {
            console.error('No se encontraron todos los contenedores necesarios');
            console.log('divBurger:', divBurger);
            console.log('divDrink:', divDrink);
            console.log('divDessert:', divDessert);
            return;
        }

        // Limpiar contenedores
        divBurger.innerHTML = '';
        divDrink.innerHTML = '';
        divDessert.innerHTML = '';

        // Crear combo aleatorio para hamburguesas
        if (productMain.length > 0) {
            let MainProduct = getRandomItem(productMain);
            let MainProductHTML = document.createElement('div');
            MainProductHTML.className = 'combo-item';
            MainProductHTML.innerHTML = `
                <h3>🍔 Hamburguesa</h3>
                <h2>${MainProduct.name}</h2>
                <p>Precio: ${MainProduct.price}€</p>
                <img src="${MainProduct.image}" alt="${MainProduct.name}" style="max-width: 200px; height: auto;">
            `;
            divBurger.appendChild(MainProductHTML);
        } else {
            divBurger.innerHTML = '<p>No hay hamburguesas disponibles</p>';
        }

        // Crear combo aleatorio para bebidas
        if (productDrink.length > 0) {
            let DrinkProduct = getRandomItem(productDrink);
            let DrinkProductHTML = document.createElement('div');
            DrinkProductHTML.className = 'combo-item';
            DrinkProductHTML.innerHTML = `
                <h3>🥤 Bebida</h3>
                <h2>${DrinkProduct.name}</h2>
                <p>Precio: ${DrinkProduct.price}€</p>
                <img src="${DrinkProduct.image}" alt="${DrinkProduct.name}" style="max-width: 200px; height: auto;">
            `;
            divDrink.appendChild(DrinkProductHTML);
        } else {
            divDrink.innerHTML = '<p>No hay bebidas disponibles</p>';
        }

        // Crear combo aleatorio para postres
        if (productDessert.length > 0) {
            let DessertProduct = getRandomItem(productDessert);
            let DessertProductHTML = document.createElement('div');
            DessertProductHTML.className = 'combo-item';
            DessertProductHTML.innerHTML = `
                <h3>🍰 Postre</h3>
                <h2>${DessertProduct.name}</h2>
                <p>Precio: ${DessertProduct.price}€</p>
                <img src="${DessertProduct.image}" alt="${DessertProduct.name}" style="max-width: 200px; height: auto;">
            `;
            divDessert.appendChild(DessertProductHTML);
        } else {
            divDessert.innerHTML = '<p>No hay postres disponibles</p>';
        }

        console.log('Combo generado exitosamente');

    } catch (error) {
        console.error('Error al generar el combo:', error);
    }
}

function getRandomItem(arr){
    if (!arr || arr.length === 0) {
        return null;
    }
    return arr[Math.floor(Math.random() * arr.length)];
}