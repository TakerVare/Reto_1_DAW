async function randomMenu() {
    pintaCombo();
}

// Variables globales para mantener los productos del combo actual
let currentCombo = {
    main: null,
    drink: null,
    dessert: null,
    total: 0
};

async function pintaCombo(){
    try {
        let productos = await getProducts();

        const productMain = [];
        const productDrink = [];
        const productDessert = [];

        // Clasificar productos por categoría
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

        // Obtener contenedores
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

        // Resetear combo actual
        currentCombo.main = null;
        currentCombo.drink = null;
        currentCombo.dessert = null;

        // Crear combo aleatorio para hamburguesas
        if (productMain.length > 0) {
            let MainProduct = getRandomItem(productMain);
            currentCombo.main = MainProduct;

            let MainProductHTML = document.createElement('div');
            MainProductHTML.className = 'combo-item new-combo';
            MainProductHTML.innerHTML = `
                <h3>Hamburguesa</h3>
                <h2>${MainProduct.name}</h2>
                <p>Precio: ${MainProduct.price.toFixed(2)}€</p>
                <img src="${MainProduct.image}" alt="${MainProduct.name}">
            `;
            divBurger.appendChild(MainProductHTML);
        } else {
            divBurger.innerHTML = '<p>No hay hamburguesas disponibles</p>';
        }

        // Crear combo aleatorio para bebidas
        if (productDrink.length > 0) {
            let DrinkProduct = getRandomItem(productDrink);
            currentCombo.drink = DrinkProduct;

            let DrinkProductHTML = document.createElement('div');
            DrinkProductHTML.className = 'combo-item new-combo';
            DrinkProductHTML.innerHTML = `
                <h3>Bebida</h3>
                <h2>${DrinkProduct.name}</h2>
                <p>Precio: ${DrinkProduct.price.toFixed(2)}€</p>
                <img src="${DrinkProduct.image}" alt="${DrinkProduct.name}">
            `;
            divDrink.appendChild(DrinkProductHTML);
        } else {
            divDrink.innerHTML = '<p>No hay bebidas disponibles</p>';
        }

        // Crear combo aleatorio para postres
        if (productDessert.length > 0) {
            let DessertProduct = getRandomItem(productDessert);
            currentCombo.dessert = DessertProduct;

            let DessertProductHTML = document.createElement('div');
            DessertProductHTML.className = 'combo-item new-combo';
            DessertProductHTML.innerHTML = `
                <h3>Postre</h3>
                <h2>${DessertProduct.name}</h2>
                <p>Precio: ${DessertProduct.price.toFixed(2)}€</p>
                <img src="${DessertProduct.image}" alt="${DessertProduct.name}">
            `;
            divDessert.appendChild(DessertProductHTML);
        } else {
            divDessert.innerHTML = '<p>No hay postres disponibles</p>';
        }

        // Calcular y mostrar el precio total
        calculateAndDisplayTotal();

        console.log('Combo generado exitosamente');

    } catch (error) {
        console.error('Error al generar el combo:', error);
    }
}

function calculateAndDisplayTotal() {
    const precioTotalContainer = document.querySelector('.precio-total');

    if (!precioTotalContainer) {
        console.error('Contenedor de precio total no encontrado');
        return;
    }

    // Calcular precio original
    let totalPrice = 0;
    if (currentCombo.main) totalPrice += currentCombo.main.price;
    if (currentCombo.drink) totalPrice += currentCombo.drink.price;
    if (currentCombo.dessert) totalPrice += currentCombo.dessert.price;


    // Actualizar datos del combo
    currentCombo.total = totalPrice;

    // Solo mostrar el total si hay al menos un producto
    if (totalPrice > 0) {
        precioTotalContainer.innerHTML = `
            <div class="combo-total new-total">
                <h2><i class="fas fa-tags"></i> ¡Precio total del combo!</h2>
                <div class="price-display">
                    ${currentCombo.total.toFixed(2)}€
                </div>
            </div>
        `;
    } else {
        precioTotalContainer.innerHTML = '';
    }
}

function getRandomItem(arr){
    if (!arr || arr.length === 0) {
        return null;
    }
    return arr[Math.floor(Math.random() * arr.length)];
}