async function getMenuItems() {
    let menuItems = (await fetch('./mockup/menuItems.json')).json()
    
    return menuItems
}

async function getShoppingCartItems() {
    let ShoppingCartItems = (await fetch('./mockup/shopping_cart_items.json')).json()
    
    return ShoppingCartItems
}

async function getProductDetails(id){
    let productDetails = await (await fetch('./mockup/products.json')).json()
    
    // Buscar el producto por su id_product en lugar de usar directamente el índice
    return productDetails.find(product => product.id_product === id)
}


async function getProducts(){
    try {
        let productsResponse = await fetch('./mockup/products.json');
        if (!productsResponse.ok) {
            throw new Error(`Error fetching products: ${productsResponse.status}`);
        }
        let products = await productsResponse.json();
        console.log('Products loaded:', products.length);
        
        // Añadir esta línea para mostrar todo el array en la consola
        console.log('Products array:', products);
        
        return products;
    } catch (error) {
        console.error('Error in getProducts:', error);
        return [];
    }
}

/**
 * Obtiene las categorías de productos desde el archivo JSON
 * @returns {Promise<Array>} Promesa que resuelve a un array de categorías
 */
async function getCategories() {
    try {
        const response = await fetch('./mockup/categories.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        // Devuelve categorías por defecto en caso de error
        return [
            { "id_category": 0, "name": "Burgers" },
            { "id_category": 1, "name": "Drinks" },
            { "id_category": 2, "name": "Desserts" },
            { "id_category": 3, "name": "Extras" },
            { "id_category": 4, "name": "Menus" }
        ];
    }
}

/**
 * Obtiene los roles desde el archivo JSON
 * @returns {Promise<Array>} Promesa que resuelve a un array de roles
 */
async function getRoles() {
    try {
        const response = await fetch('./mockup/roles.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const roles = await response.json();
        console.log('Roles loaded from API:', roles);
        return roles;
    } catch (error) {
        console.error('Error fetching roles:', error);
        // Intentar resolver con un formato alternativo de la URL
        try {
            const altResponse = await fetch('mockup/roles.json');
            if (!altResponse.ok) {
                throw new Error(`HTTP error in alternate path! Status: ${altResponse.status}`);
            }
            const roles = await altResponse.json();
            console.log('Roles loaded from alternate path:', roles);
            return roles;
        } catch (altError) {
            console.error('Error fetching roles from alternate path:', altError);
            return []; // Devolver array vacío en caso de error
        }
    }
}

/**
 * Obtiene los empleados desde el archivo JSON
 * @returns {Promise<Array>} Promesa que resuelve a un array de empleados
 */
async function getEmployees() {
    try {
        const response = await fetch('./mockup/employees.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const employees = await response.json();
        console.log('Employees loaded from API:', employees);
        return employees;
    } catch (error) {
        console.error('Error fetching employees:', error);
        // Intentar resolver con un formato alternativo de la URL
        try {
            const altResponse = await fetch('mockup/employees.json');
            if (!altResponse.ok) {
                throw new Error(`HTTP error in alternate path! Status: ${altResponse.status}`);
            }
            const employees = await altResponse.json();
            console.log('Employees loaded from alternate path:', employees);
            return employees;
        } catch (altError) {
            console.error('Error fetching employees from alternate path:', altError);
            return []; // Devolver array vacío en caso de error
        }
    }
}

/**
 * Obtiene los impuestos desde el archivo JSON
 * @returns {Promise<Array>} Promesa que resuelve a un array de impuestos
 */
async function getTaxes() {
    try {
        const response = await fetch('./mockup/taxes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const taxes = await response.json();
        console.log('Taxes loaded from API:', taxes);
        return taxes;
    } catch (error) {
        console.error('Error fetching taxes:', error);
        // Intentar resolver con un formato alternativo de la URL
        try {
            const altResponse = await fetch('mockup/taxes.json');
            if (!altResponse.ok) {
                throw new Error(`HTTP error in alternate path! Status: ${altResponse.status}`);
            }
            const taxes = await altResponse.json();
            console.log('Taxes loaded from alternate path:', taxes);
            return taxes;
        } catch (altError) {
            console.error('Error fetching taxes from alternate path:', altError);
            // Devolver impuestos por defecto en caso de error
            return [
                { id_tax: 0, name: "Sales tax estatal", percentage: 6.25 }
            ];
        }
    }
}

/**
 * Obtiene las ofertas disponibles desde el archivo JSON
 * @returns {Promise<Array>} Promesa que resuelve a un array de ofertas
 */
async function getOffers() {
    try {
        const response = await fetch('./mockup/offers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const offers = await response.json();
        console.log('Ofertas cargadas desde API:', offers);
        return offers;
    } catch (error) {
        console.error('Error fetching offers:', error);
        // Intentar resolver con un formato alternativo de la URL
        try {
            const altResponse = await fetch('mockup/offers.json');
            if (!altResponse.ok) {
                throw new Error(`HTTP error in alternate path! Status: ${altResponse.status}`);
            }
            const offers = await altResponse.json();
            console.log('Ofertas cargadas desde ruta alternativa:', offers);
            return offers;
        } catch (altError) {
            console.error('Error fetching offers from alternate path:', altError);
            // Devolver array vacío en caso de error
            return [];
        }
    }
}

/**
 * Obtiene los clientes desde el archivo JSON
 * @returns {Promise<Array>} Promesa que resuelve a un array de clientes
 */
async function getCustomers() {
    try {
        const response = await fetch('./mockup/customers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const customers = await response.json();
        console.log('Customers loaded from API:', customers);
        return customers;
    } catch (error) {
        console.error('Error fetching customers:', error);
        try {
            const altResponse = await fetch('mockup/customers.json');
            if (!altResponse.ok) {
                throw new Error(`HTTP error in alternate path! Status: ${altResponse.status}`);
            }
            const customers = await altResponse.json();
            console.log('Customers loaded from alternate path:', customers);
            return customers;
        } catch (altError) {
            console.error('Error fetching customers from alternate path:', altError);
            return [];
        }
    }
}

/**
 * Simula la adición de un nuevo cliente al JSON
 * En un entorno real, esto se haría a través de una API real
 * @param {Object} customer - Datos del nuevo cliente
 * @returns {Promise<boolean>} Promesa que resuelve a true si la operación fue exitosa
 */
async function addCustomer(customer) {
    try {
        // En un entorno real, aquí se enviaría una solicitud POST a la API
        // Para el mockup, guardamos en localStorage
        const customers = await getCustomers();
        
        // Generar un nuevo ID
        const newId = customers.length > 0 
            ? Math.max(...customers.map(c => c.id_customer)) + 1 
            : 0;
        
        // Crear nuevo cliente
        const newCustomer = {
            id_customer: newId,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            password: customer.password
        };
        
        // Agregar a la lista temporal
        customers.push(newCustomer);
        
        // Guardar en localStorage para simular persistencia
        localStorage.setItem('mockCustomers', JSON.stringify(customers));
        
        console.log('Customer added:', newCustomer);
        return true;
    } catch (error) {
        console.error('Error adding customer:', error);
        return false;
    }
}

/**
 * Verifica las credenciales de un cliente
 * @param {string} email - Email del cliente
 * @param {string} password - Contraseña del cliente
 * @returns {Promise<Object|null>} Cliente si las credenciales son válidas, null en caso contrario
 */
async function verifyCustomerCredentials(email, password) {
    try {
        // Intentar primero obtener clientes del localStorage (para incluir los nuevos registros)
        let customers = JSON.parse(localStorage.getItem('mockCustomers')) || [];
        
        // Si no hay datos en localStorage, obtener del JSON original
        if (customers.length === 0) {
            customers = await getCustomers();
        }
        
        // Buscar cliente con las credenciales proporcionadas
        const customer = customers.find(c => 
            c.email.toLowerCase() === email.toLowerCase() && c.password === password
        );
        
        return customer || null;
    } catch (error) {
        console.error('Error verifying customer credentials:', error);
        return null;
    }
}

/**
 * Verifica las credenciales de un empleado
 * @param {string} email - Email del empleado
 * @param {string} password - Contraseña del empleado
 * @returns {Promise<Object|null>} Empleado si las credenciales son válidas, null en caso contrario
 */
async function verifyEmployeeCredentials(email, password) {
    try {
        const employees = await getEmployees();
        
        // Buscar empleado con las credenciales proporcionadas
        const employee = employees.find(e => 
            e.email.toLowerCase() === email.toLowerCase() && e.password === password
        );
        
        return employee || null;
    } catch (error) {
        console.error('Error verifying employee credentials:', error);
        return null;
    }
}