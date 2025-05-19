/**
 * Inicializa el footer con enlaces y logo
 */
window.initFooter = initFooter;

function initFooter() {
    console.log("Initializing footer...");
    
    const footerElement = document.querySelector('.footer');
    if (!footerElement) return;
    
    // Definir los enlaces del footer con sus URLs correspondientes
    const aboutUsLinks = [
        { text: 'About BurWeb', url: 'about_burweb.html' },
        { text: 'Locations', url: 'locations.html' }
    ];
    
    const workWithUsLinks = [
        { text: 'Career', url: 'career.html' }, // Cambiado de 'careers.html' a 'career.html'
        { text: 'Our Philosophy', url: 'philosophy.html' }
    ];
    
    const contactLinks = [
        { text: 'Contact', url: 'contact.html' },
        { text: 'Our team', url: 'team.html' }
    ];
    
    // Crear el contenedor principal del footer
    const footerNav = document.createElement('div');
    footerNav.className = 'footer_nav';
    
    // Crear y añadir el logo
    const logoDiv = document.createElement('div');
    logoDiv.className = 'footer_nav_logo';
    const logoImg = document.createElement('img');
    logoImg.src = 'images/Logos/Logo_vertical_256.ico';
    logoImg.alt = 'logo BurWeb.Sa';
    logoDiv.appendChild(logoImg);
    footerNav.appendChild(logoDiv);
    
    // Crear y añadir las secciones del footer
    const aboutUsSection = createFooterSection('ABOUT US', aboutUsLinks, 'footer_nav_about_us');
    const workWithUsSection = createFooterSection('WORK WITH US', workWithUsLinks, 'footer_nav_explore');
    const contactSection = createFooterSection('CONTACT US', contactLinks, 'footer_nav_contact');
    
    footerNav.appendChild(aboutUsSection);
    footerNav.appendChild(workWithUsSection);
    footerNav.appendChild(contactSection);
    
    // Limpiar y añadir el nuevo contenido
    footerElement.innerHTML = '';
    footerElement.appendChild(footerNav);
    
    // Añadir evento al logo para volver a la página principal
    logoDiv.style.cursor = 'pointer';
    logoDiv.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    console.log("Footer initialized successfully");
}

/**
 * Crea una sección del footer con título y enlaces
 */
function createFooterSection(title, links, className) {
    const section = document.createElement('div');
    section.className = className;
    
    // Crear el título
    const titleElement = document.createElement('ul');
    const strongElement = document.createElement('strong');
    strongElement.textContent = title;
    titleElement.appendChild(strongElement);
    section.appendChild(titleElement);
    
    // Crear los enlaces
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.style.cursor = 'pointer';
        a.style.textDecoration = 'none';
        a.style.color = 'inherit';
        
        // Al pasar el ratón, cambiar el color
        a.addEventListener('mouseover', function() {
            this.style.color = 'var(--color-border)';
        });
        
        a.addEventListener('mouseout', function() {
            this.style.color = 'inherit';
        });
        
        li.appendChild(a);
        section.appendChild(li);
    });
    
    return section;
}