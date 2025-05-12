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
        { src: "images/Menus/Iberico_menu.png", alt: "Slide 1" },
        { src: "images/MainFood/burger_2.png", alt: "Slide 2" },
        { src: "images/MainFood/burger_3.png", alt: "Slide 3" }
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
            crossFade: true  // Esta es la clave para que no se superpongan
        },
        speed: 1000,  // Velocidad de la transición en ms
        autoplay: {
            delay: 5000,  // 5 segundos entre slides
            disableOnInteraction: false  // Continúa el autoplay después de interacciones
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

/*Adaptación para API en el futuro:
Cuando estés listo para conectarlo a una API, simplemente modifica la parte donde defines las imágenes:
javascript// En lugar de:
const images = [
    { src: "images/Menus/Iberico_menu.png", alt: "Slide 1" },
    { src: "images/MainFood/burger_2.png", alt: "Slide 2" },
    { src: "images/MainFood/burger_3.png", alt: "Slide 3" }
];

// Cambia a:
fetch('http://localhost:8080/api/carousel')
    .then(response => response.json())
    .then(images => {
        // Aquí el resto del código usando las imágenes de la API
        let html = `...`;
        // ...
    })
    .catch(error => {
        console.error("Error loading carousel data:", error);
        container.innerHTML = "Error loading carousel";
    });*/