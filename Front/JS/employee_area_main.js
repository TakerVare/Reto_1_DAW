/**
 * Archivo principal para la gestión del área de empleados
 * Maneja la navegación entre secciones y la carga de los componentes
 */

// Verificar si el usuario está autenticado y es empleado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado y es empleado
    const authUser = getAuthUser();
    
    if (!authUser || authUser.type !== 'employee') {
        // Redirigir al login si no es empleado
        window.location.href = 'login.html';
        return; // Detener la ejecución del resto del código
    }
    
    // El resto del código solo se ejecutará si el usuario es un empleado autenticado
    // Inicializar la aplicación
    initApp();

    // Agregar event listeners a los elementos de navegación
    initNavigation();
});

// Almacena datos de la aplicación
const appData = {
    currentSection: 'products', // Sección actual
    products: [],               // Lista de productos
    roles: [],                  // Lista de roles
    employees: [],              // Lista de empleados
    categories: [
        { id_category: 0, name: "Burgers" },
        { id_category: 1, name: "Drinks" },
        { id_category: 2, name: "Desserts" },
        { id_category: 3, name: "Extras" },
        { id_category: 4, name: "Menus" }
    ], // Categorías de productos
    taxes: [
        { id_tax: 0, rate: 10, name: "Regular Tax" },
        { id_tax: 1, rate: 20, name: "Special Tax" }
    ] // Impuestos disponibles
};

// Nota: He modificado el evento DOMContentLoaded original para incluir la verificación

/**
 * Inicializa la aplicación cargando los datos necesarios
 */
async function initApp() {
    try {
        // Cargar productos
        try {
            const products = await getProducts();
            if (products) {
                appData.products = products;
                console.log('Productos cargados:', appData.products.length);
            }
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }

        // El resto del código permanece igual...

        // Cargar roles (usando la función getRoles)
        try {
            const roles = await getRoles();
            if (roles) {
                appData.roles = roles;
                console.log('Roles cargados:', appData.roles);
            }
        } catch (error) {
            console.error('Error al cargar roles:', error);
            // Intentar cargar directamente como respaldo
            try {
                const rolesResponse = await fetch('./mockup/roles.json');
                const roles = await rolesResponse.json();
                if (roles) {
                    appData.roles = roles;
                    console.log('Roles cargados directamente:', appData.roles);
                }
            } catch (fetchError) {
                console.error('Error al cargar roles directamente:', fetchError);
            }
        }

        // Cargar impuestos
        try {
            const taxes = await getTaxes();
            if (taxes) {
                appData.taxes = taxes;
                console.log('Taxes loaded:', appData.taxes);
            }
        } catch (error) {
            console.error('Error al cargar impuestos:', error);
            // Usar impuestos por defecto
            appData.taxes = [
                { id_tax: 0, name: "Sales tax estatal", percentage: 6.25 }
            ];
        }

        // Cargar empleados (usando la función getEmployees)
        try {
            const employees = await getEmployees();
            if (employees) {
                appData.employees = employees;
                console.log('Empleados cargados:', appData.employees);
            }
        } catch (error) {
            console.error('Error al cargar empleados:', error);
            // Intentar cargar directamente como respaldo
            try {
                const employeesResponse = await fetch('./mockup/employees.json');
                const employees = await employeesResponse.json();
                if (employees) {
                    appData.employees = employees;
                    console.log('Empleados cargados directamente:', appData.employees);
                }
            } catch (fetchError) {
                console.error('Error al cargar empleados directamente:', fetchError);
            }
        }

        // Cargar la sección inicial (productos)
        loadSection(appData.currentSection);

    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
}

/**
 * Inicializa los event listeners para la navegación
 */
function initNavigation() {
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.main_employee_area_navigation_menu a');

    // Agregar event listener a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Obtener la sección a cargar
            const section = this.getAttribute('data-section');

            // Remover la clase 'active' de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));

            // Agregar la clase 'active' al enlace actual
            this.classList.add('active');

            // Cargar la sección
            loadSection(section);
        });
    });

    // Marcar como activo el enlace de la sección actual
    const currentLink = document.querySelector(`.main_employee_area_navigation_menu a[data-section="${appData.currentSection}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

/**
 * Carga la sección especificada
 * @param {string} section - Nombre de la sección a cargar
 */
function loadSection(section) {
    // Actualizar la sección actual
    appData.currentSection = section;

    // Obtener el contenedor de la sección
    const container = document.getElementById('employee-section-container');

    // Limpiar el contenedor
    container.innerHTML = '';

    // Cargar la sección correspondiente
    switch (section) {
        case 'products':
            loadProductsSection(container);
            break;
        case 'roles':
            loadRolesSection(container);
            break;
        case 'employees':
            loadEmployeesSection(container);
            break;
        case 'pos':
            loadPOSSection(container);
            break;
        default:
            container.innerHTML = '<p>Sección no encontrada</p>';
    }
}

/**
 * Carga la sección de productos
 * @param {HTMLElement} container - Contenedor donde se cargará la sección
 */
function loadProductsSection(container) {
    // Crear el contenedor para la sección de productos
    const productsSection = document.createElement('div');
    productsSection.className = 'employee_area_section main_employee_area_content_products';

    // HTML para la sección de productos
    productsSection.innerHTML = `
        <div class="employee_area_content_action_selection_nav">
            <div class="add_selection action_selection_button" data-action="add">
                <i class="fas fa-plus"></i> Add Product
            </div>
            <div class="edit_selection action_selection_button" data-action="edit">
                <i class="fas fa-edit"></i> Edit Product
            </div>
            <div class="delete_selection action_selection_button" data-action="delete">
                <i class="fas fa-trash-alt"></i> Delete Product
            </div>
        </div>
        <div class="employee_area_content_form employee_area_content_products_form hidden" id="product-form-container">
            <!-- El formulario se cargará dinámicamente -->
        </div>
        <div class="employee_area_content_products_list" id="products-list-container">
            <!-- La lista de productos se cargará dinámicamente -->
        </div>
    `;

    // Agregar la sección al contenedor
    container.appendChild(productsSection);

    // Inicializar la sección de productos
    initProductsSection();
}

/**
 * Carga la sección de roles
 * @param {HTMLElement} container - Contenedor donde se cargará la sección
 */
function loadRolesSection(container) {
    // Crear el contenedor para la sección de roles
    const rolesSection = document.createElement('div');
    rolesSection.className = 'employee_area_section main_employee_area_content_roles';

    // HTML para la sección de roles
    rolesSection.innerHTML = `
        <div class="employee_area_content_action_selection_nav">
            <div class="add_selection action_selection_button" data-action="add">
                <i class="fas fa-plus"></i> Add Role
            </div>
            <div class="edit_selection action_selection_button" data-action="edit">
                <i class="fas fa-edit"></i> Edit Role
            </div>
            <div class="delete_selection action_selection_button" data-action="delete">
                <i class="fas fa-trash-alt"></i> Delete Role
            </div>
        </div>
        <div class="employee_area_content_form" id="role-form-container" style="display: none;">
            <!-- El formulario se cargará dinámicamente -->
        </div>
        <div class="employee_area_content_roles_list" id="roles-list-container">
            <!-- La lista de roles se cargará dinámicamente -->
        </div>
    `;

    // Agregar la sección al contenedor
    container.appendChild(rolesSection);

    // Inicializar la sección de roles
    initRolesSection();
}

/**
 * Carga la sección de empleados
 * @param {HTMLElement} container - Contenedor donde se cargará la sección
 */
function loadEmployeesSection(container) {
    // Crear el contenedor para la sección de empleados
    const employeesSection = document.createElement('div');
    employeesSection.className = 'employee_area_section main_employee_area_content_employees';

    // HTML para la sección de empleados
    employeesSection.innerHTML = `
        <div class="employee_area_content_action_selection_nav">
            <div class="add_selection action_selection_button" data-action="add">
                <i class="fas fa-plus"></i> Add Employee
            </div>
            <div class="edit_selection action_selection_button" data-action="edit">
                <i class="fas fa-edit"></i> Edit Employee
            </div>
            <div class="delete_selection action_selection_button" data-action="delete">
                <i class="fas fa-trash-alt"></i> Delete Employee
            </div>
        </div>
        <div class="employee_area_content_form" id="employee-form-container" style="display: none;">
            <!-- El formulario se cargará dinámicamente -->
        </div>
        <div class="employee_area_content_employees_list" id="employees-list-container">
            <!-- La lista de empleados se cargará dinámicamente -->
        </div>
    `;

    // Agregar la sección al contenedor
    container.appendChild(employeesSection);

    // Inicializar la sección de empleados
    initEmployeesSection();
}

/**
 * Carga la sección de POS (Point of Sale)
 * @param {HTMLElement} container - Contenedor donde se cargará la sección
 */
function loadPOSSection(container) {
    // Crear el contenedor para la sección de POS
    const posSection = document.createElement('div');
    posSection.className = 'employee_area_section main_employee_area_content_pos';

    // HTML para la sección de POS
    posSection.innerHTML = `
        <div class="pos-area">
            <div class="pos-products-container">
                <div class="pos-categories" id="pos-categories">
                    <!-- Las categorías se cargarán dinámicamente -->
                </div>
                <div class="pos-products-grid" id="pos-products-grid">
                    <!-- Los productos se cargarán dinámicamente -->
                </div>
            </div>
            <div class="pos-cart-container">
                <div class="pos-cart-title">
                    <i class="fas fa-shopping-cart"></i> Shopping Cart
                </div>
                <div class="pos-cart-items" id="pos-cart-items">
                    <!-- Los items del carrito se cargarán dinámicamente -->
                </div>
                <div class="pos-cart-total">
                    <span>Total:</span>
                    <span id="pos-cart-total-amount">$0.00</span>
                </div>
                <div class="pos-cart-buttons">
                    <button class="pos-cart-checkout">
                        <i class="fas fa-check-circle"></i> Checkout
                    </button>
                    <button class="pos-cart-clear">
                        <i class="fas fa-trash-alt"></i> Clear
                    </button>
                </div>
            </div>
        </div>
    `;

    // Agregar la sección al contenedor
    container.appendChild(posSection);

    // Inicializar la sección de POS
    initPOSSection();
}