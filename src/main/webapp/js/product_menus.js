/**
 * BurWeb - Product Menus Component
 * Crea dinámicamente la sección de menús y productos
 */

function createProductMenus() {
    // Datos para los diferentes tipos de productos
    const menuData = {
        menus: [
            {
                image: "MENU 1 PNG",
                title: "Menú Básico",
                description: "Hamburguesa clásica con patatas fritas y refresco de tu elección. Incluye salsa a elegir.",
                price: "12.95 €"
            },
            {
                image: "MENU 2 PNG",
                title: "Menú Gourmet",
                description: "Hamburguesa premium con patatas gajo, ensalada y bebida. Incluye postre del día.",
                price: "16.50 €"
            },
            {
                image: "MENU 3 PNG",
                title: "Menú Familiar",
                description: "4 hamburguesas, 2 raciones grandes de patatas, 4 bebidas y 2 postres para compartir.",
                price: "38.95 €"
            }
        ],
        burgers: [
            {
                image: "HAMBURGUESA 1 PNG",
                title: "Clásica",
                description: "Deliciosa hamburguesa con carne 100% de ternera, lechuga, tomate, cebolla y nuestra salsa especial.",
                price: "8.50 €"
            },
            {
                image: "HAMBURGUESA 2 PNG",
                title: "Cheese Burger",
                description: "Jugosa hamburguesa con doble de queso cheddar, bacon crujiente y cebolla caramelizada.",
                price: "9.95 €"
            },
            {
                image: "HAMBURGUESA 3 PNG",
                title: "Mediterránea",
                description: "Hamburguesa gourmet con rúcula, queso de cabra, tomate seco y alioli casero.",
                price: "10.50 €"
            },
            {
                image: "HAMBURGUESA 4 PNG",
                title: "BBQ Deluxe",
                description: "Espectacular hamburguesa con salsa barbacoa, aros de cebolla, queso y bacon ahumado.",
                price: "11.25 €"
            },
            {
                image: "HAMBURGUESA 5 PNG",
                title: "Veggie Burger",
                description: "Hamburguesa vegana con proteína de guisantes, vegetales frescos y salsa de aguacate.",
                price: "9.75 €"
            },
            {
                image: "HAMBURGUESA 6 PNG",
                title: "Doble XXL",
                description: "Para los más hambrientos: doble carne, doble queso, huevo frito y todos los extras.",
                price: "12.95 €"
            }
        ],
        drinks: [
            {
                image: "DRINK 1 PNG",
                title: "Refrescos",
                description: "Coca-Cola, Fanta, Sprite, Nestea. Disponibles en formato grande o mediano.",
                price: "2.50 €"
            },
            {
                image: "DRINK 2 PNG",
                title: "Cervezas",
                description: "Variedad de cervezas nacionales e importadas. Consulta nuestras opciones artesanales.",
                price: "3.50 €"
            },
            {
                image: "DRINK 3 PNG",
                title: "Batidos",
                description: "Batidos caseros de vainilla, chocolate o fresa. Elaborados con helado artesanal.",
                price: "4.95 €"
            }
        ],
        sides: [
            {
                image: "SIDE 1 PNG",
                title: "Patatas Fritas",
                description: "Crujientes patatas fritas cortadas a mano. Disponibles en ración individual o para compartir.",
                price: "3.95 €"
            },
            {
                image: "SIDE 2 PNG",
                title: "Aros de Cebolla",
                description: "Aros de cebolla rebozados, crujientes por fuera y tiernos por dentro. Con salsa a elegir.",
                price: "4.50 €"
            },
            {
                image: "SIDE 3 PNG",
                title: "Ensalada Fresh",
                description: "Mezcla de lechugas, tomate cherry, cebolla morada, aguacate y aderezo balsámico.",
                price: "5.95 €"
            }
        ],
        desserts: [
            {
                image: "DESSERT 1 PNG",
                title: "Brownie con Helado",
                description: "Brownie casero de chocolate con nueces, servido caliente con helado de vainilla y sirope.",
                price: "5.95 €"
            },
            {
                image: "DESSERT 2 PNG",
                title: "Cheesecake",
                description: "Tarta de queso cremosa con base de galleta y topping de frutos rojos casero.",
                price: "5.50 €"
            },
            {
                image: "DESSERT 3 PNG",
                title: "Helados Artesanales",
                description: "Selección de helados artesanales. Pregunta por los sabores disponibles.",
                price: "4.50 €"
            }
        ]
    };

    // Configuración de los sliders
    const sliderConfigs = [
        { id: "slider-menus", content: "MENUS", speed: "1" },
        { id: "slider-burgers", content: "BURGERS", speed: "2" },
        { id: "slider-drinks", content: "BEBIDAS", speed: "3" },
        { id: "slider-sides", content: "SIDES", speed: "4" },
        { id: "slider-desserts", content: "POSTRES", speed: "5" }
    ];

    // Función para crear un producto
    function createProductCard(product) {
        return `
            <div class="product-card">
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price-container">
                        <div class="product-price">${product.price}</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para crear un slider de texto
    function createTextSlider(config) {
        return `
            <div class="text-slider-container">
                <div class="text-slider speed-${config.speed}" id="${config.id}" data-content="${config.content}">
                    <!-- El contenido se generará con JavaScript -->
                </div>
            </div>
        `;
    }

    // Función para crear una sección de producto
    function createProductSection(sectionKey, sliderConfig) {
        const products = menuData[sectionKey];
        let productCards = '';
        
        products.forEach(product => {
            productCards += createProductCard(product);
        });

        return `
            <section class="menu-section">
                ${createTextSlider(sliderConfig)}
                <div class="product-grid ${sectionKey}-grid">
                    ${productCards}
                </div>
            </section>
        `;
    }

    // Crear el contenedor principal para todos los menús
    const productMenusContainer = document.createElement('div');
    productMenusContainer.className = 'product-menus-container';

    // Generar el HTML para cada sección
    const menuSections = [
        createProductSection('menus', sliderConfigs[0]),
        createProductSection('burgers', sliderConfigs[1]),
        createProductSection('drinks', sliderConfigs[2]),
        createProductSection('sides', sliderConfigs[3]),
        createProductSection('desserts', sliderConfigs[4])
    ];

    // Añadir todas las secciones al contenedor
    productMenusContainer.innerHTML = menuSections.join('');

    // Obtener el elemento donde se insertará el contenido
    const targetElement = document.getElementById('product-menus');
    if (targetElement) {
        targetElement.appendChild(productMenusContainer);
    } else {
        console.error('Elemento destino "product-menus" no encontrado');
    }

    // Inicializar los sliders de texto
    initializeTextSliders();
}

// Función para inicializar los sliders de texto
function initializeTextSliders() {
    document.querySelectorAll('.text-slider').forEach(slider => {
        const content = slider.getAttribute('data-content');
        const repeatedContent = Array(10).fill(content).join(' ');
        slider.innerHTML = repeatedContent;
    });
}
