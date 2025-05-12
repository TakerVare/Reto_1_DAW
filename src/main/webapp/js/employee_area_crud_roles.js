/**
 * BurWeb - Employee Area CRUD Roles
 * Maneja la funcionalidad CRUD para la gestión de roles
 */

// Estado de los roles
let roleState = {
    currentAction: null,  // 'add', 'edit', 'delete'
    selectedRole: null,   // Rol seleccionado para edición
    roles: []             // Lista de roles
};

/**
 * Inicializa la sección de roles
 */
function initRolesSection() {
    console.log('Inicializando sección de roles');
    
    // Obtener roles si no están ya cargados
    if (roleState.roles.length === 0) {
        // Intentar obtener roles desde appData
        if (appData.roles && appData.roles.length > 0) {
            roleState.roles = [...appData.roles];
            console.log('Roles cargados desde appData:', roleState.roles);
        } else {
            // Si no hay roles en appData, intentar cargar desde JSON directamente
            fetch('./mockup/roles.json')
                .then(response => response.json())
                .then(roles => {
                    roleState.roles = roles;
                    appData.roles = roles; // Actualizar también appData
                    console.log('Roles cargados directamente:', roleState.roles);
                    loadRolesList(); // Volver a cargar la lista después de obtener los datos
                })
                .catch(error => {
                    console.error('Error al cargar roles:', error);
                });
        }
    }
    
    // Inicializar las acciones de botones
    initRoleActions();
    
    // Cargar la lista de roles
    loadRolesList();
}

/**
 * Inicializa las acciones de los botones (Añadir, Editar, Eliminar)
 */
function initRoleActions() {
    // Obtener todos los botones de acción
    const actionButtons = document.querySelectorAll('.main_employee_area_content_roles .action_selection_button');
    
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
            roleState.currentAction = action;
            
            // Realizar la acción correspondiente
            handleRoleAction(action);
        });
    });
}

/**
 * Maneja la acción seleccionada
 * @param {string} action - Acción a realizar ('add', 'edit', 'delete')
 */
function handleRoleAction(action) {
    const formContainer = document.getElementById('role-form-container');
    
    // Mostrar/ocultar formulario según la acción
    if (action === 'add') {
        // Mostrar formulario vacío para añadir
        showRoleForm(null);
        formContainer.style.display = 'block';
    } else if (action === 'edit') {
        // Ocultar formulario hasta que se seleccione un rol
        formContainer.style.display = 'none';
        roleState.selectedRole = null;
        
        // Mostrar mensaje indicando que se debe seleccionar un rol
        showMessage('Please select a role to edit', 'info');
    } else if (action === 'delete') {
        // Ocultar formulario hasta que se seleccione un rol
        formContainer.style.display = 'none';
        roleState.selectedRole = null;
        
        // Mostrar mensaje indicando que se debe seleccionar un rol
        showMessage('Please select a role to delete', 'warning');
    }
    
    // Cargar lista de roles con eventos según la acción
    loadRolesList();
}

/**
 * Muestra el formulario de rol
 * @param {Object} role - Rol a editar (null para añadir)
 */
function showRoleForm(role) {
    const formContainer = document.getElementById('role-form-container');
    
    // Lista de permisos disponibles
    const availablePermissions = [
        { id: 'VIEW_KITCHEN_ORDERS', name: 'View Kitchen Orders' },
        { id: 'UPDATE_ORDER_STATUS', name: 'Update Order Status' },
        { id: 'MANAGE_KITCHEN_TEAM', name: 'Manage Kitchen Team' },
        { id: 'VIEW_SALES_REPORTS', name: 'View Sales Reports' },
        { id: 'MANAGE_PRODUCTS', name: 'Manage Products' },
        { id: 'MANAGE_EMPLOYEES', name: 'Manage Employees' },
        { id: 'MANAGE_ROLES', name: 'Manage Roles' },
        { id: 'ACCESS_POS', name: 'Access POS System' }
    ];
    
    // Obtener permisos del rol (si existe)
    const rolePermissions = role ? role.permissions.split(',') : [];
    
    // Generar el HTML del formulario
    const formHTML = `
        <form id="role-form" class="role-form">
            <div class="form-group">
                <label for="role_id">Role ID:</label>
                <input type="number" id="role_id" name="role_id" value="${role ? role.id_rol : getNextRoleId()}" readonly>
            </div>
            <div class="form-group">
                <label for="role_name">Role Name:</label>
                <input type="text" id="role_name" name="role_name" value="${role ? role.name : ''}" required>
            </div>
            <div class="form-group">
                <label for="role_description">Description:</label>
                <textarea id="role_description" name="role_description" required>${role ? role.description : ''}</textarea>
            </div>
            <div class="form-group permissions-group">
                <label>Permissions:</label>
                <div class="checkboxes">
                    ${availablePermissions.map(permission => `
                        <div class="checkbox-item">
                            <input type="checkbox" id="perm_${permission.id}" name="permissions" value="${permission.id}" ${rolePermissions.includes(permission.id) ? 'checked' : ''}>
                            <label for="perm_${permission.id}">${permission.name}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="form-buttons">
                <button type="button" class="cancel-btn" onclick="cancelRoleForm()">Cancel</button>
                <button type="submit" class="save-btn">${role ? 'Update Role' : 'Add Role'}</button>
            </div>
        </form>
    `;
    
    // Actualizar el contenido del formulario
    formContainer.innerHTML = formHTML;
    
    // Mostrar formulario
    formContainer.style.display = 'block';
    
    // Agregar event listener al formulario
    document.getElementById('role-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveRole();
    });
}

/**
 * Carga la lista de roles
 */
function loadRolesList() {
    const rolesListContainer = document.getElementById('roles-list-container');
    
    // Si no hay roles, mostrar mensaje o intentar cargarlos
    if (roleState.roles.length === 0) {
        rolesListContainer.innerHTML = '<p class="text-center">Loading roles...</p>';
        
        // Intentar obtener roles nuevamente si no están cargados
        if (appData.roles && appData.roles.length > 0) {
            roleState.roles = [...appData.roles];
            // Volver a cargar la lista después de obtener los datos
            setTimeout(() => loadRolesList(), 100);
        } else {
            getRoles().then(roles => {
                if (roles && roles.length > 0) {
                    roleState.roles = roles;
                    appData.roles = roles;
                    // Volver a cargar la lista después de obtener los datos
                    loadRolesList();
                } else {
                    rolesListContainer.innerHTML = '<p class="text-center">No roles found</p>';
                }
            }).catch(error => {
                console.error('Error al cargar roles:', error);
                rolesListContainer.innerHTML = '<p class="text-center">Error loading roles</p>';
            });
        }
        return;
    }
    
    // Crear tabla para la lista de roles
    const tableHTML = `
        <table class="roles-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Permissions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${roleState.roles.map(role => `
                    <tr>
                        <td>${role.id_rol}</td>
                        <td>${role.name}</td>
                        <td>${role.description}</td>
                        <td>${formatPermissions(role.permissions)}</td>
                        <td class="action-buttons">
                            ${roleState.currentAction === 'edit' ? 
                                `<button class="edit-btn" data-id="${role.id_rol}">Edit</button>` : 
                                roleState.currentAction === 'delete' ? 
                                `<button class="delete-btn" data-id="${role.id_rol}">Delete</button>` : 
                                `<button class="view-btn" data-id="${role.id_rol}">View</button>`
                            }
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Actualizar el contenido del contenedor
    rolesListContainer.innerHTML = tableHTML;
    
    // Agregar event listeners a los botones de acción
    if (roleState.currentAction === 'edit') {
        document.querySelectorAll('.roles-table .edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const roleId = parseInt(this.getAttribute('data-id'));
                const role = roleState.roles.find(r => r.id_rol === roleId);
                if (role) {
                    selectRole(role);
                }
            });
        });
    } else if (roleState.currentAction === 'delete') {
        document.querySelectorAll('.roles-table .delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const roleId = parseInt(this.getAttribute('data-id'));
                const role = roleState.roles.find(r => r.id_rol === roleId);
                if (role) {
                    if (confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
                        deleteRole(role);
                    }
                }
            });
        });
    } else {
        document.querySelectorAll('.roles-table .view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const roleId = parseInt(this.getAttribute('data-id'));
                const role = roleState.roles.find(r => r.id_rol === roleId);
                if (role) {
                    viewRole(role);
                }
            });
        });
    }
}

/**
 * Formatea la lista de permisos para mostrar en la tabla
 * @param {string} permissions - Cadena de permisos separados por comas
 * @returns {string} HTML formateado para mostrar los permisos
 */
function formatPermissions(permissions) {
    if (!permissions) return '';
    
    const permArray = permissions.split(',');
    
    // Si hay muchos permisos, mostrar resumen
    if (permArray.length > 2) {
        return `${permArray.slice(0, 2).join(', ')} <span title="${permArray.join(', ')}">+${permArray.length - 2} more</span>`;
    }
    
    return permArray.join(', ');
}

/**
 * Selecciona un rol para editar
 * @param {Object} role - Rol seleccionado
 */
function selectRole(role) {
    // Establecer el rol seleccionado
    roleState.selectedRole = role;
    
    // Mostrar formulario con los datos del rol
    showRoleForm(role);
}

/**
 * Muestra los detalles de un rol
 * @param {Object} role - Rol a visualizar
 */
function viewRole(role) {
    // Mostrar modal o alerta con los detalles del rol
    alert(`Role Details:
ID: ${role.id_rol}
Name: ${role.name}
Description: ${role.description}
Permissions: ${role.permissions}`);
}

/**
 * Guarda un rol (nuevo o editado)
 */
function saveRole() {
    // Obtener los valores del formulario
    const id = parseInt(document.getElementById('role_id').value);
    const name = document.getElementById('role_name').value;
    const description = document.getElementById('role_description').value;
    
    // Obtener permisos seleccionados
    const permissionsCheckboxes = document.querySelectorAll('input[name="permissions"]:checked');
    const permissions = Array.from(permissionsCheckboxes).map(checkbox => checkbox.value).join(',');
    
    // Validar campos obligatorios
    if (!name || !description) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Crear objeto de rol
    const role = {
        id_rol: id,
        name: name,
        description: description,
        permissions: permissions
    };
    
    // Determinar si es una edición o un nuevo rol
    if (roleState.currentAction === 'edit') {
        // Actualizar rol existente
        const index = roleState.roles.findIndex(r => r.id_rol === id);
        if (index !== -1) {
            roleState.roles[index] = role;
            
            // Actualizar también en appData
            const appDataIndex = appData.roles.findIndex(r => r.id_rol === id);
            if (appDataIndex !== -1) {
                appData.roles[appDataIndex] = role;
            }
            
            showMessage(`Role "${name}" updated successfully`, 'success');
        }
    } else {
        // Añadir nuevo rol
        roleState.roles.push(role);
        
        // Añadir también a appData
        appData.roles.push(role);
        
        showMessage(`Role "${name}" added successfully`, 'success');
    }
    
    // Actualizar la lista de roles
    loadRolesList();
    
    // Ocultar formulario
    cancelRoleForm();
}

/**
 * Elimina un rol
 * @param {Object} role - Rol a eliminar
 */
function deleteRole(role) {
    // Verificar si hay empleados con este rol
    const employeesWithRole = appData.employees.filter(e => e.id_rol === role.id_rol);
    
    if (employeesWithRole.length > 0) {
        // Mostrar advertencia si hay empleados con este rol
        showMessage(`Cannot delete role "${role.name}" because it is assigned to ${employeesWithRole.length} employee(s)`, 'error');
        return;
    }
    
    // Buscar el índice del rol
    const index = roleState.roles.findIndex(r => r.id_rol === role.id_rol);
    
    // Si se encuentra, eliminarlo
    if (index !== -1) {
        roleState.roles.splice(index, 1);
        
        // Eliminar también de appData
        const appDataIndex = appData.roles.findIndex(r => r.id_rol === role.id_rol);
        if (appDataIndex !== -1) {
            appData.roles.splice(appDataIndex, 1);
        }
        
        showMessage(`Role "${role.name}" deleted successfully`, 'success');
        
        // Actualizar la lista de roles
        loadRolesList();
    } else {
        showMessage('Role not found', 'error');
    }
}

/**
 * Cancela el formulario de rol
 */
function cancelRoleForm() {
    // Ocultar formulario
    const formContainer = document.getElementById('role-form-container');
    formContainer.style.display = 'none';
    
    // Limpiar estado
    roleState.selectedRole = null;
}

/**
 * Obtiene el siguiente ID disponible para un nuevo rol
 * @returns {number} Siguiente ID disponible
 */
function getNextRoleId() {
    // Si no hay roles, empezar desde 0
    if (roleState.roles.length === 0) {
        return 0;
    }
    
    // Obtener el ID más alto
    const maxId = Math.max(...roleState.roles.map(r => r.id_rol));
    
    // Devolver el siguiente ID
    return maxId + 1;
}