async function getMenuItems() {
    let menuItems = (await fetch('./mockup/menuItems.json')).json()
    
    return menuItems
}
/*
async function getShoppingCartItems() { //Todo manejar carrito por js hasta volcar el pedido en la bd
    let ShoppingCartItems = (await fetch('./mockup/shopping_cart_items.json')).json()
    
    return ShoppingCartItems
}
*/
//CREO QUE ESTA FUNCIÓN NO LA USAMOS EN NIGÚN SITIO
/*
async function getProductDetails(id){
    let productDetails = await (await fetch('./mockup/products.json')).json()
    
    // Buscar el producto por su id_product en lugar de usar directamente el índice
    return productDetails.find(product => product.id_product === id)
}
*/


//START PRODUCTS SECTION

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

/**
 * Añade un nuevo producto a la base de datos
 * @param {Object} product - Datos del nuevo producto
 * @returns {Promise<boolean>} Promesa que resuelve a true si la operación fue exitosa
 */
async function addProduct(product) {
    try {
        // Crear FormData para enviar los parámetros
        let formData = new URLSearchParams();
        formData.append('ACTION', 'PRODUCT.ADD');
        formData.append('id_tax', product.id_tax);
        formData.append('id_category', product.id_category);
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('image', product.image);

        // Realizar la petición POST al controlador
        const response = await fetch('Controller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });

        // Verificar si hay errores de red
        if (!response.ok) {
            console.error('Error de red:', response.status);
            return false;
        }

        // Intentar parsear la respuesta como JSON
        const responseText = await response.text();
        console.log('Respuesta del servidor:', responseText);

        try {
            const result = JSON.parse(responseText);
            console.log('Respuesta parseada:', result);

            // Verificar si la operación fue exitosa
            // El servidor devuelve {result: 1} si fue exitoso
            if (result && typeof result.result !== 'undefined') {
                return result.result === 1;
            }
            return false;
        } catch (parseError) {
            console.error('Error al parsear la respuesta JSON:', parseError);
            console.error('Respuesta original:', responseText);
            return false;
        }
    } catch (error) {
        console.error('Error al añadir el producto:', error);
        return false;
    }
}

/**
 * Elimina un producto de la base de datos
 * @param {number} productId - ID del producto a eliminar
 * @returns {Promise<boolean>} Promesa que resuelve a true si la operación fue exitosa
 */
async function deleteProductFromDatabase(productId) {
    try {
        // Crear FormData para enviar los parámetros
        let formData = new URLSearchParams();
        formData.append('ACTION', 'PRODUCT.DELETE');
        formData.append('id_product', productId);

        // Realizar la petición POST al controlador
        const response = await fetch('Controller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });

        // Verificar si hay errores de red
        if (!response.ok) {
            console.error('Error de red:', response.status);
            return false;
        }

        // Intentar parsear la respuesta como JSON
        const responseText = await response.text();
        console.log('Respuesta del servidor:', responseText);

        try {
            const result = JSON.parse(responseText);
            console.log('Respuesta parseada:', result);

            // Verificar si la operación fue exitosa
            // El servidor devuelve {result: 1} si fue exitoso
            if (result && typeof result.result !== 'undefined') {
                return result.result === 1;
            }
            return false;
        } catch (parseError) {
            console.error('Error al parsear la respuesta JSON:', parseError);
            console.error('Respuesta original:', responseText);
            return false;
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return false;
    }
}

/**
 * Actualiza un producto existente en la base de datos
 * @param {Object} product - Datos actualizados del producto
 * @returns {Promise<boolean>} Promesa que resuelve a true si la operación fue exitosa
 */
async function updateProduct(product) {
    try {
        // Crear FormData para enviar los parámetros
        let formData = new URLSearchParams();
        formData.append('ACTION', 'PRODUCT.UPDATE');
        formData.append('id_product', product.id_product);
        formData.append('id_tax', product.id_tax);
        formData.append('id_category', product.id_category);
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('image', product.image);

        // Realizar la petición POST al controlador
        const response = await fetch('Controller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });

        // Verificar si hay errores de red
        if (!response.ok) {
            console.error('Error de red:', response.status);
            return false;
        }

        // Intentar parsear la respuesta como JSON
        const responseText = await response.text();
        console.log('Respuesta del servidor:', responseText);

        try {
            const result = JSON.parse(responseText);
            console.log('Respuesta parseada:', result);

            // Verificar si la operación fue exitosa
            // El servidor devuelve {result: 1} si fue exitoso
            if (result && typeof result.result !== 'undefined') {
                return result.result === 1;
            }
            return false;
        } catch (parseError) {
            console.error('Error al parsear la respuesta JSON:', parseError);
            console.error('Respuesta original:', responseText);
            return false;
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return false;
    }
}

//END PRODUCTS SECTION

//START CATEGORIES SECTION
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

//END CATEGORIES SECTION

//START ROLES SECTION
/**
 * Obtiene los roles desde el archivo JSON
 * @returns {Promise<Array>} Promesa que resuelve a un array de roles
 */
async function getRoles() { //todo
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
//END ROLES SECTION

//START EMPLOYEES SECTION
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
                "id_employee": responseText[i]['m_iIdEmployee'],
                "id_rol": responseText[i]['m_iIdRol'],
                "first_name": responseText[i]['m_strFirstName'],
                "last_name": responseText[i]['m_strLastName'],
                "email": responseText[i]['m_strEmail'],
                "password": responseText[i]['m_strPassword']
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

//END EMPLOYEES SECTION

//START TAXES SECTION
/**
 * Obtiene los impuestos desde la base de datos
 * @returns {Promise<Array>} Promesa que resuelve a un array de impuestos
 */
async function getTaxes() {
    try {
        // Intentar obtener impuestos desde la base de datos
        const response = await fetch('Controller?ACTION=TAX.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();
        console.log('Impuestos cargados desde la base de datos:', responseText);

        // Transformar los datos al formato deseado
        const formattedTaxes = [];

        for (var i in responseText) {
            formattedTaxes.push({
                "id_tax": responseText[i]['id_tax'],
                "name": responseText[i]['name'],
                "percentage": responseText[i]['percentage']
            });
        }

        // Para depuración
        console.log('Impuestos formateados:', formattedTaxes);

        // Devolver el array de impuestos con el formato deseado
        return formattedTaxes;
    } catch (error) {
        console.error('Error al obtener los impuestos desde la base de datos:', error);

        // Intentar cargar desde el archivo JSON como fallback
        try {
            const fallbackResponse = await fetch('./mockup/taxes.json');
            if (!fallbackResponse.ok) {
                throw new Error(`HTTP error en ruta alternativa! Status: ${fallbackResponse.status}`);
            }

            const taxes = await fallbackResponse.json();
            console.log('Impuestos cargados desde archivo local (fallback):', taxes);
            return taxes;
        } catch (fallbackError) {
            console.error('Error al cargar impuestos desde archivo local:', fallbackError);

            // Devolver impuestos por defecto en caso de error
            return [
                { id_tax: 0, name: "Sales tax estatal", percentage: 6.25 }
            ];
        }
    }
}

//END TAXES SECTION

//START OFFERS SECTION
/**
 * Obtiene las ofertas disponibles desde la base de datos
 * @returns {Promise<Array>} Promesa que resuelve a un array de ofertas
 */
async function getOffers() {
    try {
        const response = await fetch('Controller?ACTION=OFFER.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();
        console.log('Ofertas cargadas desde la base de datos:', responseText);

        // Transformar los datos al formato deseado
        const formattedOffers = [];

        for (var i in responseText) {
            formattedOffers.push({
                "id_offer": responseText[i]['id_offer'],
                "name": responseText[i]['name'],
                "discount": responseText[i]['discount'],
                "start_date": responseText[i]['start_date'],
                "end_date": responseText[i]['end_date']
            });
        }

        // Para depuración
        console.log('Ofertas formateadas:', formattedOffers);

        // Devolver el array de ofertas con el formato deseado
        return formattedOffers;
    } catch (error) {
        console.error('Error al obtener las ofertas:', error);

        // Intentar resolver con el archivo JSON como fallback
        try {
            const fallbackResponse = await fetch('./mockup/offers.json');
            if (!fallbackResponse.ok) {
                throw new Error(`HTTP error en ruta alternativa! Status: ${fallbackResponse.status}`);
            }
            const offers = await fallbackResponse.json();
            console.log('Ofertas cargadas desde archivo local (fallback):', offers);
            return offers;
        } catch (fallbackError) {
            console.error('Error al cargar ofertas desde archivo local:', fallbackError);
            return []; // Devolver array vacío en caso de error
        }
    }
}
//END OFFERS SECTION


//START CUSTOMERS SECTION
/**
 * Obtiene los clientes desde la base de datos
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
                "id_customer": responseText[i]['m_iIdCustomer'],
                "first_name": responseText[i]['m_strFirstName'],
                "last_name": responseText[i]['m_strLastName'],
                "email": responseText[i]['m_strEmail'],
                "password": responseText[i]['m_strPassword']
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
 * Crea un nuevo cliente en la base de datos
 * @param {Object} customer - Datos del nuevo cliente
 * @returns {Promise<boolean>} Promesa que resuelve a true si la operación fue exitosa
 */
async function addCustomer(customer) {
    try {
        // Create FormData for sending parameters
        let formData = new URLSearchParams();
        formData.append('ACTION', 'CUSTOMER.ADD');
        formData.append('first_name', customer.first_name);
        formData.append('last_name', customer.last_name);
        formData.append('email', customer.email);
        formData.append('password', customer.password);

        // Make POST request to the controller
        const response = await fetch('Controller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', //Todo => pasar a json como en el GET
            },
            body: formData
        });

        // Check for network errors
        if (!response.ok) {
            console.error('Network error:', response.status);
            return false;
        }

        // Try to parse the response as JSON
        const responseText = await response.text();
        console.log('Raw response:', responseText);

        try {
            const result = JSON.parse(responseText);
            console.log('Parsed response:', result);

            // Verify if operation was successful
            // Server returns {result: 1} if successful
            if (result && typeof result.result !== 'undefined') {
                return result.result === 1;
            }
            return false;
        } catch (parseError) {
            console.error('Error parsing JSON response:', parseError);
            console.error('Raw response was:', responseText);
            return false;
        }
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
        // Obtener clientes directamente de la base de datos
        const customers = await getCustomers();

        // Verificar que customers sea un array válido
        if (Array.isArray(customers) && customers.length > 0) {
            // Buscar cliente con las credenciales proporcionadas, protegiendo contra valores undefined
            const customer = customers.find(c =>
                c && c.email && c.email.toLowerCase() === email.toLowerCase() &&
                c.password === password
            );

            return customer || null;
        }

        // Si no hay clientes o no es un array, devolver null
        return null;
    } catch (error) {
        console.error('Error verifying customer credentials:', error);
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
        const response = await fetch(`Controller?ACTION=ADDRESS.FIND_ALL&id_customer=${customerId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status}`);
        }

        const responseText = await response.json();
        console.log('Direcciones cargadas:', responseText);

        // Transformar los datos al formato deseado
        const formattedAddresses = [];

        for (var i in responseText) {
            formattedAddresses.push({
                "ID_ADDRESS": responseText[i]['id_address'],
                "ID_CUSTOMER": responseText[i]['id_customer'],
                "ID_CITY": responseText[i]['id_city'],
                "STREET": responseText[i]['street'],
                "STATE": responseText[i]['state'],
                "ZIP": responseText[i]['zip'],
                "FAVOURITE": responseText[i]['favourite']
            });
        }

        return formattedAddresses;
    } catch (error) {
        console.error('Error al obtener las direcciones del cliente:', error);

        // Si hay un error, intentar cargar desde el archivo local como fallback
        try {
            const fallbackResponse = await fetch('./mockup/addresses.json');
            if (!fallbackResponse.ok) {
                throw new Error(`HTTP error en ruta alternativa! Status: ${fallbackResponse.status}`);
            }

            const addresses = await fallbackResponse.json();

            // Filtrar direcciones para el cliente específico
            return addresses.filter(address => address.ID_CUSTOMER === customerId);
        } catch (fallbackError) {
            console.error('Error al cargar direcciones desde archivo local:', fallbackError);
            return []; // Devolver array vacío en caso de error
        }
    }
}
//END CUSTOMERS SECTION

//START CITIES SECTION

/**
 * Gets all cities from the database
 * @returns {Promise<Array>} Promise that resolves to an array of cities
 */
async function getCities() {
    try {
        const response = await fetch('Controller?ACTION=CITY.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status}`);
        }

        const responseText = await response.json();
        console.log('Ciudades cargadas desde la base de datos:', responseText);

        // Transformar los datos al formato deseado
        const formattedCities = [];

        for (var i in responseText) {
            formattedCities.push({
                "id_city": responseText[i]['id_city'],
                "name": responseText[i]['name']
            });
        }

        return formattedCities;
    } catch (error) {
        console.error('Error al obtener las ciudades:', error);

        // Si hay un error, intentar cargar desde el archivo local como fallback
        try {
            const fallbackResponse = await fetch('./mockup/cities.json');
            if (!fallbackResponse.ok) {
                throw new Error(`HTTP error en ruta alternativa! Status: ${fallbackResponse.status}`);
            }

            const cities = await fallbackResponse.json();
            console.log('Ciudades cargadas desde archivo local (fallback):', cities);
            return cities;
        } catch (fallbackError) {
            console.error('Error al cargar ciudades desde archivo local:', fallbackError);
            return []; // Devolver array vacío en caso de error
        }
    }
}
//END CITIES SECTION

//START ADRESS SECTION
//FUNCIONALIDAD ELIMINADA HASTA NUEVA ÓRDEN
/**
 * Sets an address as the default (favorite) for a customer
 * @param {number} addressId - ID of the address
 * @param {number} customerId - ID of the customer
 * @returns {Promise<boolean>} Promise that resolves to true if successful
 */
/*
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
*/

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

//END ADRESS SECTION

//START ORDERS SECTION

/**
 * Obtiene todas las órdenes desde la base de datos
 * @param {number} customerId - ID del cliente (opcional) para filtrar órdenes
 * @returns {Promise<Array>} Promesa que resuelve a un array de órdenes
 */
async function getOrders(customerId = null) {
    try {
        // Construir la URL de la petición, añadiendo el filtro de cliente si se proporciona
        let url = 'Controller?ACTION=ORDER.FIND_ALL';
        if (customerId) {
            url += `&id_customer=${customerId}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();
        console.log('Órdenes cargadas:', responseText);

        // Transformar los datos al formato deseado
        const formattedOrders = [];

        for (var i in responseText) {
            formattedOrders.push({
                "id_order": responseText[i]['id_order'],
                "id_customer": responseText[i]['id_customer'],
                "id_address": responseText[i]['id_address'],
                "id_payment": responseText[i]['id_payment'],
                "id_shop": responseText[i]['id_shop'],
                "id_delivery": responseText[i]['id_delivery'],
                "id_offer": responseText[i]['id_offer'],
                "order_date": responseText[i]['order_date']
            });
        }

        return formattedOrders;
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);

        // Intentar cargar desde JSON local como fallback
        try {
            const fallbackResponse = await fetch('./mockup/orders.json');
            if (!fallbackResponse.ok) {
                throw new Error(`HTTP error en ruta alternativa! Status: ${fallbackResponse.status}`);
            }
            const orders = await fallbackResponse.json();
            console.log('Órdenes cargadas desde archivo local (fallback):', orders);
            return orders;
        } catch (fallbackError) {
            console.error('Error al cargar órdenes desde archivo local:', fallbackError);
            return []; // Devolver array vacío en caso de error
        }
    }
}

/**
 * Añade una nueva orden a la base de datos
 * @param {Object} orderData - Datos de la nueva orden
 * @returns {Promise<Object>} Promesa que resuelve al ID de la orden creada si es exitosa
 */
async function addOrder(orderData) {
    try {
        // Crear FormData para enviar los parámetros
        let formData = new URLSearchParams();
        formData.append('ACTION', 'ORDER.ADD');
        formData.append('id_customer', orderData.id_customer);
        formData.append('id_address', orderData.id_address);
        formData.append('id_payment', orderData.id_payment);
        formData.append('id_shop', orderData.id_shop);
        formData.append('id_delivery', orderData.id_delivery);

        // Añadir id_offer solo si está presente en los datos
        if (orderData.id_offer) {
            formData.append('id_offer', orderData.id_offer);
        }

        // Añadir order_date solo si está presente, de lo contrario usar fecha actual
        if (orderData.order_date) {
            formData.append('order_date', orderData.order_date);
        } else {
            // Formato de fecha YYYY-MM-DD
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            formData.append('order_date', formattedDate);
        }

        // Realizar la petición POST al controlador
        const response = await fetch('Controller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });

        // Verificar si hay errores de red
        if (!response.ok) {
            console.error('Error de red:', response.status);
            return { success: false, error: 'Error de red' };
        }

        // Intentar parsear la respuesta como JSON
        const responseText = await response.text();
        console.log('Respuesta del servidor:', responseText);

        try {
            const result = JSON.parse(responseText);
            console.log('Respuesta parseada:', result);

            // Verificar si la operación fue exitosa
            // El servidor devuelve {result: id_order} si fue exitoso
            if (result && typeof result.result !== 'undefined') {
                return {
                    success: true,
                    id_order: result.result
                };
            }
            return { success: false, error: 'Error desconocido' };
        } catch (parseError) {
            console.error('Error al parsear la respuesta JSON:', parseError);
            console.error('Respuesta original:', responseText);
            return { success: false, error: 'Error al parsear respuesta' };
        }
    } catch (error) {
        console.error('Error al añadir la orden:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtiene los detalles de una orden específica
 * @param {number} orderId - ID de la orden
 * @returns {Promise<Array>} Promesa que resuelve a un array de detalles de la orden
 */
async function getOrderDetail(orderId) {
    try {
        const response = await fetch(`Controller?ACTION=ORDER_DETAIL.FIND_ALL&id_order=${orderId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();
        console.log('Detalles de orden cargados:', responseText);

        // Transformar los datos al formato deseado
        const formattedOrderDetails = [];

        for (var i in responseText) {
            formattedOrderDetails.push({
                "id_order_detail": responseText[i]['id_order_detail'],
                "id_order": responseText[i]['id_order'],
                "id_product": responseText[i]['id_product'],
                "line_price": responseText[i]['line_price']
            });
        }

        return formattedOrderDetails;
    } catch (error) {
        console.error('Error al obtener los detalles de la orden:', error);

        // Intentar cargar desde JSON local como fallback
        try {
            const fallbackResponse = await fetch('./mockup/order_details.json');
            if (!fallbackResponse.ok) {
                throw new Error(`HTTP error en ruta alternativa! Status: ${fallbackResponse.status}`);
            }
            const orderDetails = await fallbackResponse.json();
            // Filtrar solo los detalles de la orden solicitada
            const filteredDetails = orderDetails.filter(detail => detail.id_order === orderId);
            console.log('Detalles de orden cargados desde archivo local (fallback):', filteredDetails);
            return filteredDetails;
        } catch (fallbackError) {
            console.error('Error al cargar detalles de orden desde archivo local:', fallbackError);
            return []; // Devolver array vacío en caso de error
        }
    }
}

/**
 * Añade un nuevo detalle a una orden existente
 * @param {Object} detailData - Datos del nuevo detalle de orden
 * @returns {Promise<Object>} Promesa que resuelve a true si la operación fue exitosa
 */
async function addOrderDetail(detailData) {
    try {
        // Crear FormData para enviar los parámetros
        let formData = new URLSearchParams();
        formData.append('ACTION', 'ORDER_DETAIL.ADD');
        formData.append('id_order', detailData.id_order);
        formData.append('id_product', detailData.id_product);
        formData.append('line_price', detailData.line_price);

        // Realizar la petición POST al controlador
        const response = await fetch('Controller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });

        // Verificar si hay errores de red
        if (!response.ok) {
            console.error('Error de red:', response.status);
            return { success: false, error: 'Error de red' };
        }

        // Intentar parsear la respuesta como JSON
        const responseText = await response.text();
        console.log('Respuesta del servidor:', responseText);

        try {
            const result = JSON.parse(responseText);
            console.log('Respuesta parseada:', result);

            // Verificar si la operación fue exitosa
            // El servidor devuelve {result: 1} si fue exitoso
            if (result && typeof result.result !== 'undefined') {
                return {
                    success: result.result === 1,
                    id_order_detail: result.id_order_detail
                };
            }
            return { success: false, error: 'Error desconocido' };
        } catch (parseError) {
            console.error('Error al parsear la respuesta JSON:', parseError);
            console.error('Respuesta original:', responseText);
            return { success: false, error: 'Error al parsear respuesta' };
        }
    } catch (error) {
        console.error('Error al añadir el detalle de la orden:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Procesa una compra completa, creando una orden y sus detalles
 * @param {Object} orderData - Datos de la orden
 * @param {Array} cartItems - Items del carrito a incluir en la orden
 * @returns {Promise<Object>} Promesa que resuelve a objeto con resultado de la operación
 */
async function processOrder(orderData, cartItems) {
    try {
        // Paso 1: Crear la orden
        const orderResult = await addOrder(orderData);

        if (!orderResult.success) {
            return { success: false, error: 'Error al crear la orden', details: orderResult.error };
        }

        const orderId = orderResult.id_order;
        console.log(`Orden creada con ID: ${orderId}`);

        // Paso 2: Añadir cada item del carrito como detalle de la orden
        const detailResults = [];
        let allDetailsSuccess = true;

        for (const item of cartItems) {
            const detailData = {
                id_order: orderId,
                id_product: item.id,
                line_price: (item.price * item.quantity)
            };

            const detailResult = await addOrderDetail(detailData);
            detailResults.push(detailResult);

            if (!detailResult.success) {
                allDetailsSuccess = false;
            }
        }

        // Comprobar si todos los detalles se crearon correctamente
        if (!allDetailsSuccess) {
            return {
                success: false,
                error: 'Error al crear algunos detalles de la orden',
                orderId: orderId,
                detailResults: detailResults
            };
        }

        // Todo correcto
        return {
            success: true,
            orderId: orderId,
            message: 'Orden procesada correctamente'
        };

    } catch (error) {
        console.error('Error al procesar la orden completa:', error);
        return { success: false, error: error.message };
    }
}

//END ORDERS SECTION

//START JOB OFFERS SECTION
/**
 * Obtiene todas las ofertas de empleo desde la base de datos
 * @returns {Promise<Array>} Promesa que resuelve a un array de ofertas de empleo
 */
async function getJobOffers() {
    try {
        const response = await fetch('Controller?ACTION=JOB_OFFER.FIND_ALL', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.status);
        }

        const responseText = await response.json();
        console.log('Ofertas de empleo cargadas:', responseText);

        // Transformar los datos al formato deseado
        const formattedJobOffers = [];

        for (var i in responseText) {
            formattedJobOffers.push({
                "id_job_offer": responseText[i]['id_job_offer'],
                "id_rol": responseText[i]['id_rol'],
                "id_shop": responseText[i]['id_shop'],
                "name": responseText[i]['name'],
                "description": responseText[i]['description']
            });
        }

        return formattedJobOffers;
    } catch (error) {
        console.error('Error al obtener las ofertas de empleo:', error);

        // Si hay un error, intentar cargar desde el archivo local como fallback
        try {
            const fallbackResponse = await fetch('./mockup/jobOffers.json');
            if (!fallbackResponse.ok) {
                throw new Error(`HTTP error en ruta alternativa! Status: ${fallbackResponse.status}`);
            }

            const jobOffers = await fallbackResponse.json();
            console.log('Ofertas de empleo cargadas desde archivo local (fallback):', jobOffers);
            return jobOffers.job_offers || [];
        } catch (fallbackError) {
            console.error('Error al cargar ofertas de empleo desde archivo local:', fallbackError);
            return []; // Devolver array vacío en caso de error
        }
    }
}

//END JOB OFFERS SECTION

