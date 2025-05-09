/**
 * BurWeb - Componente de Grid de Productos
 * Crea dinámicamente las secciones de menús, hamburguesas, bebidas, guarniciones y postres
 */

window.initGridProducts = initGridProducts;

function initGridProducts() {
    console.log("Initializing product grid...");
    
    // Obtener el contenedor de menús
    const container = document.getElementById('product-menus-container');
    if (!container) {
        console.error('Elemento contenedor "product-menus-container" no encontrado');
        return;
    }
    
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
    
    // Generar HTML para todas las secciones
    let html = '';
    
    // Generar la sección de menús
    html += createMenuSection('menus', sliderConfigs[0]);
    
    // Generar la sección de hamburguesas
    html += createMenuSection('burgers', sliderConfigs[1]);
    
    // Generar la sección de bebidas
    html += createMenuSection('drinks', sliderConfigs[2]);
    
    // Generar la sección de guarniciones
    html += createMenuSection('sides', sliderConfigs[3]);
    
    // Generar la sección de postres
    html += createMenuSection('desserts', sliderConfigs[4]);
    
    // Insertar todo el HTML generado en el contenedor
    container.innerHTML = html;
    
    // Inicializar los sliders
    initializeTextSliders();
    
    console.log("Product grid initialized successfully");
    
    /**
     * Crea una sección de menú completa con slider y productos
     * @param {string} sectionKey - Clave del tipo de productos en el objeto menuData
     * @param {object} sliderConfig - Configuración del slider para esta sección
     * @return {string} HTML de la sección completa
     */
    function createMenuSection(sectionKey, sliderConfig) {
        const products = menuData[sectionKey];
        let productCards = '';
        
        // Generar todas las tarjetas de producto para esta sección
        products.forEach(product => {
            productCards += `
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
        });
        
        // Devolver la sección completa
        return `
            <section class="menu-section">
                <!-- Slider para ${sectionKey} -->
                <div class="text-slider-container">
                    <div class="text-slider speed-${sliderConfig.speed}" id="${sliderConfig.id}" data-content="${sliderConfig.content}">
                        <!-- El contenido se generará con JavaScript -->
                    </div>
                </div>
                
                <!-- Grid de ${sectionKey} -->
                <div class="product-grid ${sectionKey}-grid">
                    ${productCards}
                </div>
            </section>
        `;
    }
}

/**
 * Inicializa los sliders de texto con la estructura HTML correcta
 */
function initializeTextSliders() {
    const sliders = document.querySelectorAll('.text-slider');
    
    if (sliders.length > 0) {
        sliders.forEach(slider => {
            const content = slider.getAttribute('data-content');
            let sliderHtml = '';
            
            // Crear 10 elementos de slider (para asegurar que se llena toda la anchura)
            for (let i = 0; i < 10; i++) {
                sliderHtml += `
                    <div class="text-slider-item">
                        <span>${content}</span>
                        <div class="separator">&#9679;</div>
                    </div>
                `;
            }
            
            slider.innerHTML = sliderHtml;
        });
    }
}

// Inicializar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Descomentar esta línea para ejecutar automáticamente
    // window.initGridProducts();
});