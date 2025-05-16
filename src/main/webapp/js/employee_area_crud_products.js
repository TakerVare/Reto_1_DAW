/**
 * BurWeb - Employee Area CRUD Products
 * Maneja la funcionalidad CRUD para la gestión de productos
 */

// Estado de los productos
let productState = {
    currentAction: null,   // 'add', 'edit', 'delete'
    selectedProduct: null, // Producto seleccionado para edición
    products: []           // Lista de productos
};

/**
 * Inicializa la sección de productos
 */
function initProductsSection() {
    // Obtener productos si no están ya cargados
    if (productState.products.length === 0 && appData.products.length > 0) {
        productState.products = appData.products;
    }
    
    // Inicializar las acciones de botones
    initProductActions();
    
    // Inicializar drag & drop para imágenes
    initImageDragDrop();
    
    // Cargar la lista de productos
    loadProductsList();
}

/**
 * Inicializa las acciones de los botones (Añadir, Editar, Eliminar)
 */
function initProductActions() {
    // Obtener todos los botones de acción
    const actionButtons = document.querySelectorAll('.employee_area_content_action_selection_nav .action_selection_button');
    
    // Agregar event listener a cada botón
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener la acción
            const action = this.getAttribute('data-action');
            
            // Desactivar todos los botones
            actionButtons.forEach(btn => btn.classList.remove('active'));
            
            // Activar el botón actual
            this.classList.add('active');
            
            // Establecer la acción actual
            productState.currentAction = action;
            
            // Realizar la acción correspondiente
            handleProductAction(action);
        });
    });
}

/**
 * Maneja la acción seleccionada
 * @param {string} action - Acción a realizar ('add', 'edit', 'delete')
 */
function handleProductAction(action) {
    const formContainer = document.getElementById('product-form-container');
    
    // Mostrar/ocultar formulario según la acción
    if (action === 'add') {
        // Mostrar formulario vacío para añadir
        showProductForm(null);
        formContainer.classList.remove('hidden');
    } else if (action === 'edit') {
        // Ocultar formulario hasta que se seleccione un producto
        formContainer.classList.add('hidden');
        productState.selectedProduct = null;
        
        // Mostrar mensaje indicando que se debe seleccionar un producto
        showMessage('Please select a product to edit', 'info');
    } else if (action === 'delete') {
        // Ocultar formulario hasta que se seleccione un producto
        formContainer.classList.add('hidden');
        productState.selectedProduct = null;
        
        // Mostrar mensaje indicando que se debe seleccionar un producto
        showMessage('Please select a product to delete', 'warning');
    }
    
    // Cargar lista de productos con eventos según la acción
    loadProductsList();
}

/**
 * Muestra el formulario de producto
 * @param {Object} product - Producto a editar (null para añadir)
 */
function showProductForm(product) {
    const formContainer = document.getElementById('product-form-container');
    
    // Generar opciones de impuestos desde appData
    const taxOptions = appData.taxes.map(tax => 
        `<option value="${tax.id_tax}" ${product && product.id_tax === tax.id_tax ? 'selected' : ''}>${tax.name} (${tax.percentage}%)</option>`
    ).join('');
    
    // Generar el HTML del formulario
    const formHTML = `
        <form id="product-form">
            <div class="employee_area_content_products_form_image">
                <!-- Área para arrastrar y soltar -->
                <div class="drag-drop-area" id="dragDropArea">
                    <!-- Imagen de previsualización (inicialmente oculta) -->
                    <img id="imagePreview" class="image-preview hidden" alt="Vista previa de la imagen" />
                    <!-- Texto e iconos para cuando no hay imagen seleccionada -->
                    <div class="upload-prompt" id="uploadPrompt">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Arrastra y suelta una imagen aquí<br>o</p>
                        <label for="imageInput" class="file-select-button">Seleccionar archivo</label>
                    </div>
                </div>
                <input type="file" id="imageInput" name="imageInput" accept="image/*" class="file-input" />
            </div>
            <div class="employee_area_content_products_first_row">
                <div class="product_id_container">
                    <label for="product_id" class="form_input_label">ID: </label>
                    <input type="text" id="product_id" name="product_id" class="form_input" readonly value="${product ? product.id_product : getNextProductId()}">
                </div>
                <div class="product_tax_container">
                    <label for="product_tax" class="form_input_label">Product tax: </label>
                    <select name="product_tax" id="product_tax" class="form_input">
                        ${taxOptions}
                    </select>
                </div>
                <div class="product_category_container">
                    <select name="product_category" id="product_category" class="form_input">
                        ${appData.categories.map(category => `<option value="${category.id_category}" ${product && product.id_category === category.id_category ? 'selected' : ''}>${category.name}</option>`).join('')}
                    </select>
                    <label for="product_category" class="form_input_label">Product category: </label>
                </div>
            </div>
            <div class="employee_area_content_products_second_row">
                <div class="product_name_container">
                    <label for="product_name" class="form_input_label">Name: </label>
                    <input type="text" id="product_name" name="product_name" class="form_input" value="${product ? product.name : ''}" required>
                </div>
                <div class="product_price_container">
                    <label for="product_price" class="form_input_label">$ </label>
                    <input type="number" id="product_price" name="product_price" class="form_input" value="${product ? product.price.toFixed(2) : '0.00'}" step="0.01" min="0" required>
                </div>
            </div>
            <div class="employee_area_content_products_third_row">
                <div class="product_description_container">
                    <label for="product_description" class="form_input_label">Description: </label>
                    <textarea name="product_description" id="product_description" class="form_input" required>${product ? product.description : ''}</textarea>
                </div>
            </div>
            <div class="employee_area_content_products_quarter_row">
                <div class="selected_action_submit">
                    <input type="submit" value="${product ? 'Update Product' : 'Add Product'}">
                    <input type="button" value="Cancel" onclick="cancelProductForm()">
                </div>
            </div>
        </form>
    `;
    
    // Actualizar el contenido del formulario
    formContainer.innerHTML = formHTML;
    
    // Mostrar formulario
    formContainer.classList.remove('hidden');
    
    // Si es un producto existente, cargar la imagen
    if (product && product.image) {
        // Mostrar la imagen existente
        const imagePreview = document.getElementById('imagePreview');
        const uploadPrompt = document.getElementById('uploadPrompt');
        
        imagePreview.src = product.image;
        imagePreview.classList.remove('hidden');
        uploadPrompt.classList.add('hidden');
        
        // Añadir botón para eliminar la imagen
        const removeButton = document.createElement('div');
        removeButton.className = 'remove-image';
        removeButton.innerHTML = '<i class="fas fa-times"></i>';
        document.getElementById('dragDropArea').appendChild(removeButton);
        
        // Evento para eliminar la imagen
        removeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            imagePreview.src = '';
            imagePreview.classList.add('hidden');
            uploadPrompt.classList.remove('hidden');
            this.classList.add('hidden');
        });
    }
    
    // Inicializar drag & drop para imágenes
    initImageDragDrop();
    
    // Agregar event listener al formulario
    document.getElementById('product-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProduct();
    });
}

/**
 * Inicializa el drag & drop para imágenes
 */
function initImageDragDrop() {
    // Referencias a los elementos DOM
    const dragDropArea = document.getElementById('dragDropArea');
    if (!dragDropArea) return;
    
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const uploadPrompt = document.getElementById('uploadPrompt');
    
    // Añadir botón para eliminar imagen si no existe
    let removeButton = dragDropArea.querySelector('.remove-image');
    if (!removeButton) {
        removeButton = document.createElement('div');
        removeButton.className = 'remove-image hidden';
        removeButton.innerHTML = '<i class="fas fa-times"></i>';
        dragDropArea.appendChild(removeButton);
    }
    
    // Función para mostrar la imagen seleccionada
    function displayImage(file) {
        // Verificar que el archivo es una imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona un archivo de imagen válido.');
            return;
        }
        
        // Crear URL para la imagen
        const reader = new FileReader();
        reader.onload = function(e) {
            // Mostrar la imagen y ocultar el prompt
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            uploadPrompt.classList.add('hidden');
            removeButton.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
    
    // Evento para cuando se selecciona un archivo mediante el input
    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            displayImage(this.files[0]);
        }
    });
    
    // Eventos para arrastrar y soltar
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Cambiar estilo cuando se arrastra sobre el área
    ['dragenter', 'dragover'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, function() {
            dragDropArea.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, function() {
            dragDropArea.classList.remove('dragover');
        }, false);
    });
    
    // Manejar el evento drop
    dragDropArea.addEventListener('drop', function(e) {
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            imageInput.files = files; // Actualizar el input para enviar el formulario
            displayImage(files[0]);
        }
    }, false);
    
    // Evento para eliminar la imagen
    removeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        imagePreview.src = '';
        imagePreview.classList.add('hidden');
        uploadPrompt.classList.remove('hidden');
        this.classList.add('hidden');
        imageInput.value = ''; // Limpiar el input
    });
    
    // Hacer que el área sea clickeable para seleccionar archivo
    dragDropArea.addEventListener('click', function(e) {
        // Si no hay una imagen mostrada, abrir el selector de archivos
        if (imagePreview.classList.contains('hidden')) {
            imageInput.click();
        }
    });
}

/**
 * Carga la lista de productos
 */
function loadProductsList() {
    const productsListContainer = document.getElementById('products-list-container');
    
    // Si no hay productos, mostrar mensaje
    if (productState.products.length === 0) {
        productsListContainer.innerHTML = '<p class="text-center">No products found</p>';
        return;
    }
    
    // Crear contenedor para la lista de productos
    const listContainer = document.createElement('div');
    listContainer.className = 'product_list_container';
    
    // Añadir cada producto a la lista
    productState.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product_card';
        productCard.innerHTML = `
            <div class="product_list_item">
                <div class="product_list_item_first_row">
                    <div class="product_list_item_first_row_first_colum">
                        <img src="${product.image}" alt="${product.name}" height="60" width="60">
                        <div class="product_name">
                            ${product.name}
                        </div>
                        <div class="price small">
                            <label>$${product.price.toFixed(2)}</label>
                        </div>
                    </div>
                    <div class="product_list_item_first_row_second_colum">
                        <div class="product_select_button">
                            <button type="button">Select</button>
                        </div>
                    </div>
                </div>
                <div class="product_list_item_second_row">
                    <div class="product_description">
                        ${product.description.substring(0, 150)}${product.description.length > 150 ? '...' : ''}
                    </div>
                </div>
            </div>
        `;
        
        // Añadir evento al botón de selección
        const selectButton = productCard.querySelector('.product_select_button button');
        selectButton.addEventListener('click', () => selectProduct(product));
        
        // Añadir el producto a la lista
        listContainer.appendChild(productCard);
    });
    
    // Limpiar el contenedor y añadir la lista
    productsListContainer.innerHTML = '';
    productsListContainer.appendChild(listContainer);
}

/**
 * Selecciona un producto para editar o eliminar
 * @param {Object} product - Producto seleccionado
 */
function selectProduct(product) {
    // Establecer el producto seleccionado
    productState.selectedProduct = product;
    
    // Realizar la acción según el modo actual
    if (productState.currentAction === 'edit') {
        // Mostrar formulario con los datos del producto
        showProductForm(product);
    } else if (productState.currentAction === 'delete') {
        // Mostrar confirmación de eliminación
        if (confirm(`Are you sure you want to delete the product "${product.name}"?`)) {
            deleteProduct(product);
        }
    }
}
//Modificación crítica, guardo copia
/**
 * Guarda un producto (nuevo o editado)
 */
function saveProduct() {
    // Obtener los valores del formulario
    const id = parseInt(document.getElementById('product_id').value);
    const name = document.getElementById('product_name').value;
    const price = parseFloat(document.getElementById('product_price').value);
    const description = document.getElementById('product_description').value;
    const category = parseInt(document.getElementById('product_category').value);
    const tax = parseInt(document.getElementById('product_tax').value);

    // Obtener la imagen
    const imagePreview = document.getElementById('imagePreview');
    const imageSrc = imagePreview.classList.contains('hidden') ? null : imagePreview.src;

    // Validar campos obligatorios
    if (!name || !price || !description) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }

    // Crear objeto de producto
    const product = {
        id_product: id,
        id_tax: tax,
        id_category: category,
        name: name,
        description: description,
        price: price,
        image: imageSrc || (productState.selectedProduct ? productState.selectedProduct.image : '/api/placeholder/100/100')
    };

    // Determinar si es una edición o un nuevo producto
    if (productState.currentAction === 'edit') {
        // Actualizar producto existente
        updateProduct(product)
            .then(success => {
                if (success) {
                    // Actualizar en el estado local
                    const index = productState.products.findIndex(p => p.id_product === id);
                    if (index !== -1) {
                        productState.products[index] = product;
                    }
                    showMessage(`Product "${name}" updated successfully`, 'success');
                    // Actualizar la lista de productos
                    loadProductsList();
                    // Ocultar formulario
                    cancelProductForm();
                } else {
                    showMessage('Error updating product in database', 'error');
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
                showMessage('Error updating product: ' + error.message, 'error');
            });
    } else {
        // Añadir nuevo producto
        addProduct(product)
            .then(success => {
                if (success) {
                    // Añadir al estado local
                    productState.products.push(product);
                    showMessage(`Product "${name}" added successfully`, 'success');
                    // Actualizar la lista de productos
                    loadProductsList();
                    // Ocultar formulario
                    cancelProductForm();
                } else {
                    showMessage('Error adding product to database', 'error');
                }
            })
            .catch(error => {
                console.error('Error adding product:', error);
                showMessage('Error adding product: ' + error.message, 'error');
            });
    }
}
/**
 * Guarda un producto (nuevo o editado)
 */
/*
function saveProduct() {
    // Obtener los valores del formulario
    const id = parseInt(document.getElementById('product_id').value);
    const name = document.getElementById('product_name').value;
    const price = parseFloat(document.getElementById('product_price').value);
    const description = document.getElementById('product_description').value;
    const category = parseInt(document.getElementById('product_category').value);
    const tax = parseInt(document.getElementById('product_tax').value);
    
    // Obtener la imagen
    const imagePreview = document.getElementById('imagePreview');
    const imageSrc = imagePreview.classList.contains('hidden') ? null : imagePreview.src;
    
    // Validar campos obligatorios
    if (!name || !price || !description) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Crear objeto de producto
    const product = {
        id_product: id,
        id_tax: tax,
        id_category: category,
        name: name,
        description: description,
        price: price,
        image: imageSrc || (productState.selectedProduct ? productState.selectedProduct.image : '/api/placeholder/100/100')
    };
    
    // Determinar si es una edición o un nuevo producto
    if (productState.currentAction === 'edit') {
        // Actualizar producto existente
        const index = productState.products.findIndex(p => p.id_product === id);
        if (index !== -1) {
            productState.products[index] = product;
            showMessage(`Product "${name}" updated successfully`, 'success');
        }
    } else {
        // Añadir nuevo producto
        productState.products.push(product);
        showMessage(`Product "${name}" added successfully`, 'success');
    }
    
    // Actualizar la lista de productos
    loadProductsList();
    
    // Ocultar formulario
    cancelProductForm();
}
*/
/**
 * Elimina un producto
 * @param {Object} product - Producto a eliminar
 */
function deleteProduct(product) {
    // Buscar el índice del producto
    const index = productState.products.findIndex(p => p.id_product === product.id_product);
    
    // Si se encuentra, eliminarlo
    if (index !== -1) {
        productState.products.splice(index, 1);
        showMessage(`Product "${product.name}" deleted successfully`, 'success');
        
        // Actualizar la lista de productos
        loadProductsList();
    } else {
        showMessage('Product not found', 'error');
    }
}

/**
 * Cancela el formulario de producto
 */
function cancelProductForm() {
    // Ocultar formulario
    const formContainer = document.getElementById('product-form-container');
    formContainer.classList.add('hidden');
    
    // Limpiar estado
    productState.selectedProduct = null;
    
    // Deseleccionar botones de acción
    const actionButtons = document.querySelectorAll('.employee_area_content_action_selection_nav .action_selection_button');
    actionButtons.forEach(btn => btn.classList.remove('active'));
    
    // Limpiar acción actual
    productState.currentAction = null;
}

/**
 * Obtiene el siguiente ID disponible para un nuevo producto
 * @returns {number} Siguiente ID disponible
 */
function getNextProductId() {
    // Si no hay productos, empezar desde 0
    if (productState.products.length === 0) {
        return 0;
    }
    
    // Obtener el ID más alto
    const maxId = Math.max(...productState.products.map(p => p.id_product));
    
    // Devolver el siguiente ID
    return maxId + 1;
}

/**
 * Muestra un mensaje al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje ('success', 'error', 'info', 'warning')
 */
function showMessage(message, type = 'info') {
    // Si existe un mensaje anterior, eliminarlo
    let existingMessage = document.querySelector('.message-container');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear contenedor para el mensaje
    const messageContainer = document.createElement('div');
    messageContainer.className = `message-container message-${type}`;
    messageContainer.innerHTML = `
        <div class="message-content">
            <i class="fas ${getIconForMessageType(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Añadir el mensaje al DOM
    document.querySelector('.main_employee_area_content').appendChild(messageContainer);
    
    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        messageContainer.remove();
    }, 3000);
}

/**
 * Obtiene el icono para el tipo de mensaje
 * @param {string} type - Tipo de mensaje
 * @returns {string} Clase de FontAwesome para el icono
 */
function getIconForMessageType(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-times-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'info':
        default:
            return 'fa-info-circle';
    }
}