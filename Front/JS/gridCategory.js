/**
 * Inicializa la cuadrícula de categorías
 * Este componente muestra las diferentes categorías de productos
 */
window.initGridCategory = initGridCategory;

function initGridCategory() {
    console.log("Initializing category grid...");
    
    // Obtener el contenedor de la cuadrícula
    const container = document.getElementById('grid-category-container');
    if (!container) return;
    
    // Definir las categorías
    // Esto podría venir de una API en el futuro
    const categories = [
        { name: "MENU", iconSrc: "/api/placeholder/100/100", altText: "Menu icon" },
        { name: "BURGERS", iconSrc: "/api/placeholder/100/100", altText: "Burgers icon" },
        { name: "DRINKS", iconSrc: "images/Drinks/CocaCola_Original.jpg", altText: "Drinks icon" },
        { name: "SIDES", iconSrc: "/api/placeholder/100/100", altText: "Sides icon" },
        { name: "DESSERTS", iconSrc: "/api/placeholder/100/100", altText: "Desserts icon" },
        { name: "DEALS", iconSrc: "/api/placeholder/100/100", altText: "Deals icon" }
    ];
    
    // Generar el HTML de la cuadrícula
    let html = `
        <div class="category-grid-container">
            <div class="category-grid">`;
    
    // Añadir cada categoría
    categories.forEach(category => {
        html += `
                <div class="category-item">
                    <div class="category-content">
                        <h3>${category.name}</h3>
                        <img src="${category.iconSrc}" alt="${category.altText}" class="category-icon">
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
    
    console.log("Category grid initialized successfully");
}

/* Añade eventos de clic a los elementos de la cuadrícula */
function addClickEvents() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Obtener el nombre de la categoría
                const categoryName = this.querySelector('h3').innerText.toLowerCase();
                
                // Registrar el clic en la categoría
                console.log(`Category clicked: ${categoryName}`);
                
                // Aquí puedes añadir la navegación a la página específica de la categoría
                // Por ejemplo:
                // window.location.href = `/${categoryName}.html`;
                
                // Por ahora, solo añadimos un feedback visual
                this.classList.add('active');
                
                // Quitar la clase 'active' después de que se complete la animación
                setTimeout(() => {
                    this.classList.remove('active');
                }, 300);
            });
        });
    }
}