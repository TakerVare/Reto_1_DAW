/**
 * Inicializa la cuadrícula de categorías
 * Este componente muestra las diferentes categorías de productos
 */
window.initGridCategory = initGridCategory;

async function initGridCategory() {
    
    // Obtener el contenedor de la cuadrícula
    const container = document.getElementById('grid-category-container');
    if (!container) return;
    
    try {
        // Obtener categorías desde la API
        let categories = await getCategories();

        //En caso de error de carga de categorías, las metemos a pedal
        if (!categories || categories.length === 0) {
            // Si no se pueden obtener categorías, usar datos de fallback
            categories = [
                { id_category: 1, name: "BURGERS" },
                { id_category: 2, name: "DRINKS" },
                { id_category: 3, name: "DESSERTS" },
                { id_category: 4, name: "EXTRAS" },
                { id_category: 5, name: "MENUS" }
            ];
        }

        // Mapeo de categorías a iconos
        const categoryIcons = {
            "BURGERS": "./images/Burgers/TORREZNATOR.png",
            "DRINKS": "./images/Drinks/CocaCola_Original.png",
            "DESSERTS": "./images/Desserts/Burcream Chocolate.png",
            "EXTRAS": "./images/Sides/French_friesweb.png",
            "MENUS": "./images/Menus/Police_Menu.png"
        };
        
        // Generar el HTML de la cuadrícula
        let html = `
            <div class="category-grid-container">
                <div class="category-grid">`;
        
        // Añadir cada categoría
        categories.forEach(category => {
            const categoryName = category.name.toUpperCase();
            const iconSrc = categoryIcons[categoryName] || "/api/placeholder/100/100";
            
            html += `
                <div class="category-item" data-category-id="${category.id_category}">
                    <div class="category-content">
                        <h3>${categoryName}</h3>
                        <img src="${iconSrc}" alt="${categoryName} icon" class="category-icon">
                    </div>
                </div>`;
        });
        
        html += `
                </div>
            </div>`;
        
        // Insertar el HTML
        container.innerHTML = html;
        
        // Añadir eventos de clic a las categorías
        addClickEvents();
        
    } catch (error) {
        console.error("Error initializing category grid:", error);
        container.innerHTML = '<p>Error loading categories. Please try again later.</p>';
    }
}

/* Añade eventos de clic a los elementos de la cuadrícula */
function addClickEvents() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Obtener el nombre y ID de la categoría
                const categoryName = this.querySelector('h3').innerText.toLowerCase();
                const categoryId = this.dataset.categoryId;
                
                // Registrar el clic en la categoría
                console.log(`Category clicked: ${categoryName} (ID: ${categoryId})`);
                
                // Comprobar si estamos en la página de índice o de productos
                if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
                    // Redireccionar a la página de productos con el ID de categoría
                    window.location.href = `products.html?category=${categoryId}`;
                } else {
                    // Ya estamos en la página de productos, desplazarse a la sección
                    scrollToProductSection(categoryId);
                }
                
                // Feedback visual
                this.classList.add('active');
                
                if (!window.location.pathname.includes('index.html')) {
                    setTimeout(() => {
                        this.classList.remove('active');
                    }, 300);
                }
            });
        });
    }
}

/* Función para desplazarse a la sección de productos correspondiente */
function scrollToProductSection(categoryId) {
    // Buscar la sección correspondiente al ID de categoría
    const sections = document.querySelectorAll('.menu-section');
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionKey = Object.keys(categoryMapping).find(
            key => categoryMapping[key].sectionKey === section.querySelector('.product-grid').className.split(' ')[1].replace('-grid', '')
        );
        
        if (sectionKey === categoryId) {
            // Desplazarse a la sección encontrada
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Resaltar brevemente la sección para mejor UX
            section.classList.add('active');
            setTimeout(() => {
                section.classList.remove('active');
            }, 2000);
            
            break;
        }
    }
}