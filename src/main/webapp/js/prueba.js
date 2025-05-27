let allProducts = [];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getProductsByCategory(products, categoryId) {
    return products.filter(product => product.id_category == categoryId);
}

function createProductCard(product) {
    const category = [product.id_category];

    return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price} €</div>
                </div>
            </div>
        `;
}

async function loadRandomProducts() {
    const container = document.getElementById('products-container');

    container.innerHTML = ``;

    try {
        if (allProducts.length == 0) {
            allProducts = await getProducts();
        }

        const burgers = getProductsByCategory(allProducts, 1);
        const drinks = getProductsByCategory(allProducts, 2);
        const desserts = getProductsByCategory(allProducts, 3);

        const selectedProducts = [];

        if (burgers.length > 0) {
            selectedProducts.push(getRandomItem(burgers));
        }

        if (drinks.length > 0) {
            selectedProducts.push(getRandomItem(drinks));
        }

        if (desserts.length > 0) {
            selectedProducts.push(getRandomItem(desserts));
        }

        const productsHTML = [];
        for (const product of selectedProducts) {
            const html = createProductCard(product);
            productsHTML.push(html);
        }

        container.innerHTML = productsHTML;

    } catch (error) {
        container.innerHTML = ``;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    loadRandomProducts();
});