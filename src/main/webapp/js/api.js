async function getMenuItems() {
    let menuItems = (await fetch('./mockup/menuItems.json')).json()
    
    return menuItems
}

async function getShoppingCartItems() {
    let ShoppingCartItems = (await fetch('./mockup/shopping_cart_items.json')).json()
    
    return ShoppingCartItems
}
//CREO QUE ESTA FUNCIÓN NO LA USAMOS EN NIGÚN SITIO
/*
async function getProductDetails(id){
    let productDetails = await (await fetch('./mockup/products.json')).json()
    
    // Buscar el producto por su id_product en lugar de usar directamente el índice
    return productDetails.find(product => product.id_product === id)
}
*/
async function getProducts() {
    try {
        const response = await fetch('Controller?ACTION=PRODUCT.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();
        console.log(responseText);

        // Transformar los datos al formato deseado
        const formattedProducts = [];

        for (var i in responseText) {
            formattedProducts.push({
                "id_product": responseText[i]['id_product'],
                "id_tax": responseText[i]['id_tax'],
                "id_category": responseText[i]['id_category'],
                "name": responseText[i]['name'],
                "description": responseText[i]['description'],
                "price": responseText[i]['price'],
                "image": responseText[i]['image']
            });
        }

        // Para depuración
        console.log(formattedProducts);

        // Devolver el array de productos con el formato deseado
        return formattedProducts;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error; // Re-lanzar el error para manejarlo en la función que llama
    }
}



async function getCategories() {
    try {
        const response = await fetch('Controller?ACTION=CATEGORY.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();
        //console.log(responseText);

        // Transformar los datos al formato deseado
        const formattedCategories = [];

        for (var i in responseText) {
            formattedCategories.push({
                "id_category": responseText[i]['id_category'],
                "name": responseText[i]['name']
            });
        }

        // Para depuración
        //console.log(formattedCategories);

        // Devolver el array de categorías con el formato deseado
        return formattedCategories;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return []; // Devolver array vacío en caso de error
    }
}

/* FIN EDICIÓN GUILLERMO */

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
 * Obtiene los empleados desde la base de datos
 * @returns {Promise<Array>} Promesa que resuelve a un array de empleados
 */
async function getEmployees() {
    try {
        const response = await fetch('Controller?ACTION=EMPLOYEE.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();
        //console.log(responseText);

        // Transformar los datos al formato deseado
        const formattedEmployees = [];

        for (var i in responseText) {
            formattedEmployees.push({
                "id_employee": responseText[i]['id_employee'],
                "id_rol": responseText[i]['id_rol'],
                "first_name": responseText[i]['first_name'],
                "last_name": responseText[i]['last_name'],
                "email": responseText[i]['email'],
                "password": responseText[i]['password']
            });
        }

        // Para depuración
        //console.log(formattedCategories);

        // Devolver el array de categorías con el formato deseado
        return formattedEmployees;
    } catch (error) {
        console.error('Error al obtener los empleados:', error);
        return []; // Devolver array vacío en caso de error
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
 //TODO
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
        const response = await fetch('Controller?ACTION=CUSTOMER.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();

        // Transformar los datos al formato deseado
        const formattedCustomers = [];

        for (var i in responseText) {
            formattedCustomers.push({
                "id_customer": responseText[i]['id_customer'],
                "first_name": responseText[i]['first_name'],
                "last_name": responseText[i]['last_name'],
                "email": responseText[i]['email'],
                "password": responseText[i]['password']
            });
        }

        // Devolver el array de categorías con el formato deseado
        return formattedCustomers;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        return []; // Devolver array vacío en caso de error
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
 */ //todo
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

/**
 * Gets the addresses for a specific customer
 * @param {number} customerId - ID of the customer
 * @returns {Promise<Array>} Promise that resolves to an array of addresses
 */
async function getCustomerAddresses(customerId) {
    try {
        const response = await fetch('./mockup/addresses.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const addresses = await response.json();

        // Filter addresses for the specific customer
        return addresses.filter(address => address.ID_CUSTOMER === customerId);
    } catch (error) {
        console.error('Error fetching customer addresses:', error);
        return [];
    }
}

/**
 * Gets all cities from the cities.json file
 * @returns {Promise<Array>} Promise that resolves to an array of cities
 */
async function getCities() {
    try {
        const response = await fetch('./mockup/cities.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
}

/**
 * Sets an address as the default (favorite) for a customer
 * @param {number} addressId - ID of the address
 * @param {number} customerId - ID of the customer
 * @returns {Promise<boolean>} Promise that resolves to true if successful
 */
async function setDefaultAddress(addressId, customerId) {
    try {
        // In a real implementation, this would be an API call
        // For this mockup, we'll just return true
        console.log(`Setting address ${addressId} as default for customer ${customerId}`);
        return true;
    } catch (error) {
        console.error('Error setting default address:', error);
        return false;
    }
}

/**
 * Deletes an address
 * @param {number} addressId - ID of the address to delete
 * @returns {Promise<boolean>} Promise that resolves to true if successful
 */
async function deleteAddress(addressId) {
    try {
        // In a real implementation, this would be an API call
        // For this mockup, we'll just return true
        console.log(`Deleting address ${addressId}`);
        return true;
    } catch (error) {
        console.error('Error deleting address:', error);
        return false;
    }
}

/**
 * Creates a new address for a customer
 * @param {Object} addressData - Data for the new address
 * @returns {Promise<boolean>} Promise that resolves to true if successful
 */
async function addAddress(addressData) {
    try {
        // In a real implementation, this would be an API call
        // For this mockup, we'll just return true
        console.log('Adding new address:', addressData);
        return true;
    } catch (error) {
        console.error('Error adding address:', error);
        return false;
    }
}

/**
 * Updates an existing address
 * @param {number} addressId - ID of the address to update
 * @param {Object} addressData - New data for the address
 * @returns {Promise<boolean>} Promise that resolves to true if successful
 */
async function updateAddress(addressId, addressData) {
    try {
        // In a real implementation, this would be an API call
        // For this mockup, we'll just return true
        console.log(`Updating address ${addressId}:`, addressData);
        return true;
    } catch (error) {
        console.error('Error updating address:', error);
        return false;
    }
}