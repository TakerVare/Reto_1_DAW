/**
 * Inicializa el carrusel
 */
window.initCarousel = initCarousel;

function initCarousel() {
    console.log("Initializing carousel...");
    
    // Obtener el contenedor del carrusel
    const container = document.getElementById('carousel-container');
    if (!container) return;
    
    // Definir las imágenes del carrusel
    const images = [
        { src: "images/Carousel/Iberico_menu.png", alt: "Slide 1" },
        { src: "images/Carousel/Muestra_carrusel.png", alt: "Slide 2" },
        { src: "images/Carousel/New_offers.png", alt: "Slide 3" }
    ];
    
    // Generar el HTML del carrusel
    let html = `
        <div class="swiper mySwiper carrusel-principal">
            <div class="swiper-wrapper">`;
    
    // Añadir cada slide
    images.forEach(img => {
        html += `
                <div class="swiper-slide">
                    <img src="${img.src}" alt="${img.alt}" />
                </div>`;
    });
    
    // Cerrar estructura y añadir controles
    html += `
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>`;
    
    // Insertar el HTML
    container.innerHTML = html;
    
    // Inicializar Swiper con configuración correcta para el efecto fade
    new Swiper(".mySwiper", {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true  
        },
        speed: 1000, 
        autoplay: {
            delay: 5000,  
            disableOnInteraction: false 
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
    
    console.log("Carousel initialized successfully");
}
