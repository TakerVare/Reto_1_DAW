/**
 * BurWeb - Employee Area CRUD Employees
 * Maneja la funcionalidad CRUD para la gestión de empleados
 */

// Estado de los empleados
let employeeState = {
    currentAction: null,    // 'add', 'edit', 'delete'
    selectedEmployee: null, // Empleado seleccionado para edición
    employees: []           // Lista de empleados
};

/**
 * Inicializa la sección de empleados
 */
function initEmployeesSection() {
    console.log('Inicializando sección de empleados');
    
// Asegurarse de que los roles estén cargados para el formulario de empleados
    if ((roleState && roleState.roles.length === 0) && appData.roles && appData.roles.length > 0) {
        if (typeof roleState !== 'undefined') {
            roleState.roles = [...appData.roles];
        }
    }
    
    // Inicializar las acciones de botones
    initEmployeeActions();
    
    // Cargar la lista de empleados
    loadEmployeesList();
}

/**
 * Inicializa las acciones de los botones (Añadir, Editar, Eliminar)
 */
function initEmployeeActions() {
    // Obtener todos los botones de acción
    const actionButtons = document.querySelectorAll('.main_employee_area_content_employees .action_selection_button');
    
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
            employeeState.currentAction = action;
            
            // Realizar la acción correspondiente
            handleEmployeeAction(action);
        });
    });
}

/**
 * Maneja la acción seleccionada
 * @param {string} action - Acción a realizar ('add', 'edit', 'delete')
 */
function handleEmployeeAction(action) {
    const formContainer = document.getElementById('employee-form-container');
    
    // Mostrar/ocultar formulario según la acción
    if (action === 'add') {
        // Mostrar formulario vacío para añadir
        showEmployeeForm(null);
        formContainer.style.display = 'block';
    } else if (action === 'edit') {
        // Ocultar formulario hasta que se seleccione un empleado
        formContainer.style.display = 'none';
        employeeState.selectedEmployee = null;
        
        // Mostrar mensaje indicando que se debe seleccionar un empleado
        showMessage('Please select an employee to edit', 'info');
    } else if (action === 'delete') {
        // Ocultar formulario hasta que se seleccione un empleado
        formContainer.style.display = 'none';
        employeeState.selectedEmployee = null;
        
        // Mostrar mensaje indicando que se debe seleccionar un empleado
        showMessage('Please select an employee to delete', 'warning');
    }
    
    // Cargar lista de empleados con eventos según la acción
    loadEmployeesList();
}

/**
 * Muestra el formulario de empleado
 * @param {Object} employee - Empleado a editar (null para añadir)
 */
function showEmployeeForm(employee) {
    const formContainer = document.getElementById('employee-form-container');
    
    // Asegurarse de que hay roles disponibles
    let availableRoles = [];
    
    // Primero intentar obtener roles desde roleState
    if (typeof roleState !== 'undefined' && roleState.roles && roleState.roles.length > 0) {
        availableRoles = roleState.roles;
    } 
    // Si no, intentar obtener roles desde appData
    else if (appData.roles && appData.roles.length > 0) {
        availableRoles = appData.roles;
    }
    
    console.log('Roles disponibles para el formulario:', availableRoles);
    
    // Si no hay roles, mostrar mensaje y cargar datos
    if (availableRoles.length === 0) {
        // Intentar cargar roles
        getRoles().then(roles => {
            if (roles && roles.length > 0) {
                appData.roles = roles;
                if (typeof roleState !== 'undefined') {
                    roleState.roles = [...roles];
                }
                // Volver a mostrar el formulario
                showEmployeeForm(employee);
            } else {
                showMessage('No roles available. Please create roles first.', 'error');
            }
        }).catch(error => {
            console.error('Error loading roles:', error);
            showMessage('Error loading roles. Please try again.', 'error');
        });
        return;
    }
    
    // Generar el HTML del formulario
    const formHTML = `
        <form id="employee-form" class="employee-form">
            <div class="form-group">
                <label for="employee_id">Employee ID:</label>
                <input type="number" id="employee_id" name="employee_id" value="${employee ? employee.id_employee : getNextEmployeeId()}" readonly>
            </div>
            <div class="form-group">
                <label for="employee_role">Role:</label>
                <select id="employee_role" name="employee_role" required>
                    ${availableRoles.map(role => `
                        <option value="${role.id_rol}" ${employee && employee.id_rol === role.id_rol ? 'selected' : ''}>${role.name}</option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="employee_first_name">First Name:</label>
                <input type="text" id="employee_first_name" name="employee_first_name" value="${employee ? employee.first_name : ''}" required>
            </div>
            <div class="form-group">
                <label for="employee_last_name">Last Name:</label>
                <input type="text" id="employee_last_name" name="employee_last_name" value="${employee ? employee.last_name : ''}" required>
            </div>
            <div class="form-group">
                <label for="employee_email">Email:</label>
                <input type="email" id="employee_email" name="employee_email" value="${employee ? employee.email : ''}" required>
            </div>
            <div class="form-group">
                <label for="employee_password">Password:</label>
                <input type="password" id="employee_password" name="employee_password" value="${employee ? employee.password : ''}" ${employee ? '' : 'required'} placeholder="${employee ? '••••••••••••' : 'Enter password'}">
                <small>Leave blank to keep current password (if editing)</small>
            </div>
            <div class="form-buttons">
                <button type="button" class="cancel-btn" onclick="cancelEmployeeForm()">Cancel</button>
                <button type="submit" class="save-btn">${employee ? 'Update Employee' : 'Add Employee'}</button>
            </div>
        </form>
    `;
    
    // Actualizar el contenido del formulario
    formContainer.innerHTML = formHTML;
    
    // Mostrar formulario
    formContainer.style.display = 'block';
    
    // Agregar event listener al formulario
    document.getElementById('employee-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveEmployee();
    });
}

/**
 * Carga la lista de empleados
 */
function loadEmployeesList() {
    const employeesListContainer = document.getElementById('employees-list-container');
    
    // Si no hay empleados, mostrar mensaje o intentar cargarlos
    if (employeeState.employees.length === 0) {
        employeesListContainer.innerHTML = '<p class="text-center">Loading employees...</p>';
        
        // Intentar obtener empleados nuevamente si no están cargados
        if (appData.employees && appData.employees.length > 0) {
            employeeState.employees = [...appData.employees];
            // Volver a cargar la lista después de obtener los datos
            setTimeout(() => loadEmployeesList(), 100);
        } else {
            getEmployees().then(employees => {
                if (employees && employees.length > 0) {
                    employeeState.employees = employees;
                    appData.employees = employees;
                    // Volver a cargar la lista después de obtener los datos
                    loadEmployeesList();
                } else {
                    employeesListContainer.innerHTML = '<p class="text-center">No employees found</p>';
                }
            }).catch(error => {
                console.error('Error al cargar empleados:', error);
                employeesListContainer.innerHTML = '<p class="text-center">Error loading employees</p>';
            });
        }
        return;
    }
    
    // Asegúrate de que los roles estén cargados
    const availableRoles = (typeof roleState !== 'undefined' && roleState.roles && roleState.roles.length > 0) 
        ? roleState.roles 
        : (appData.roles && appData.roles.length > 0) 
            ? appData.roles 
            : [];
    
    // Crear tabla para la lista de empleados
    const tableHTML = `
        <table class="employees-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${employeeState.employees.map(employee => {
                    // Encontrar el rol del empleado
                    const role = availableRoles.find(r => r.id_rol === employee.id_rol);
                    const roleName = role ? role.name : 'Unknown';
                    
                    return `
                        <tr>
                            <td>${employee.id_employee}</td>
                            <td>${employee.first_name} ${employee.last_name}</td>
                            <td>${employee.email}</td>
                            <td>${roleName}</td>
                            <td class="action-buttons">
                                ${employeeState.currentAction === 'edit' ? 
                                    `<button class="edit-btn" data-id="${employee.id_employee}">Edit</button>` : 
                                    employeeState.currentAction === 'delete' ? 
                                    `<button class="delete-btn" data-id="${employee.id_employee}">Delete</button>` : 
                                    `<button class="view-btn" data-id="${employee.id_employee}">View</button>`
                                }
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
    
    // Actualizar el contenido del contenedor
    employeesListContainer.innerHTML = tableHTML;
    
    // Agregar event listeners a los botones de acción
    if (employeeState.currentAction === 'edit') {
        document.querySelectorAll('.employees-table .edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const employeeId = parseInt(this.getAttribute('data-id'));
                const employee = employeeState.employees.find(e => e.id_employee === employeeId);
                if (employee) {
                    selectEmployee(employee);
                }
            });
        });
    } else if (employeeState.currentAction === 'delete') {
        document.querySelectorAll('.employees-table .delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const employeeId = parseInt(this.getAttribute('data-id'));
                const employee = employeeState.employees.find(e => e.id_employee === employeeId);
                if (employee) {
                    if (confirm(`Are you sure you want to delete the employee "${employee.first_name} ${employee.last_name}"?`)) {
                        deleteEmployee(employee);
                    }
                }
            });
        });
    } else {
        document.querySelectorAll('.employees-table .view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const employeeId = parseInt(this.getAttribute('data-id'));
                const employee = employeeState.employees.find(e => e.id_employee === employeeId);
                if (employee) {
                    viewEmployee(employee);
                }
            });
        });
    }
}

/**
 * Selecciona un empleado para editar
 * @param {Object} employee - Empleado seleccionado
 */
function selectEmployee(employee) {
    // Establecer el empleado seleccionado
    employeeState.selectedEmployee = employee;
    
    // Mostrar formulario con los datos del empleado
    showEmployeeForm(employee);
}

/**
 * Muestra los detalles de un empleado
 * @param {Object} employee - Empleado a visualizar
 */
function viewEmployee(employee) {
    // Asegúrate de que los roles estén cargados
    const availableRoles = (typeof roleState !== 'undefined' && roleState.roles && roleState.roles.length > 0) 
        ? roleState.roles 
        : (appData.roles && appData.roles.length > 0) 
            ? appData.roles 
            : [];
            
    // Encontrar el rol del empleado
    const role = availableRoles.find(r => r.id_rol === employee.id_rol);
    const roleName = role ? role.name : 'Unknown';
    
    // Mostrar modal o alerta con los detalles del empleado
    alert(`Employee Details:
ID: ${employee.id_employee}
Name: ${employee.first_name} ${employee.last_name}
Email: ${employee.email}
Role: ${roleName}`);
}

/**
 * Guarda un empleado (nuevo o editado)
 */
function saveEmployee() {
    // Obtener los valores del formulario
    const id = parseInt(document.getElementById('employee_id').value);
    const roleId = parseInt(document.getElementById('employee_role').value);
    const firstName = document.getElementById('employee_first_name').value;
    const lastName = document.getElementById('employee_last_name').value;
    const email = document.getElementById('employee_email').value;
    const password = document.getElementById('employee_password').value;
    
    // Validar campos obligatorios
    if (!firstName || !lastName || !email) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Validar formato de email
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Crear objeto de empleado
    const employee = {
        id_employee: id,
        id_rol: roleId,
        first_name: firstName,
        last_name: lastName,
        email: email
    };
    
    // Si se está añadiendo un nuevo empleado o se ha cambiado la contraseña
    if (employeeState.currentAction !== 'edit' || password) {
        employee.password = password;
    } else {
        // Mantener la contraseña actual
        const existingEmployee = employeeState.employees.find(e => e.id_employee === id);
        if (existingEmployee) {
            employee.password = existingEmployee.password;
        }
    }
    
    // Determinar si es una edición o un nuevo empleado
    if (employeeState.currentAction === 'edit') {
        // Actualizar empleado existente
        const index = employeeState.employees.findIndex(e => e.id_employee === id);
        if (index !== -1) {
            employeeState.employees[index] = employee;
            
            // Actualizar también en appData
            const appDataIndex = appData.employees.findIndex(e => e.id_employee === id);
            if (appDataIndex !== -1) {
                appData.employees[appDataIndex] = employee;
            }
            
            showMessage(`Employee "${firstName} ${lastName}" updated successfully`, 'success');
        }
    } else {
        // Añadir nuevo empleado
        employeeState.employees.push(employee);
        
        // Añadir también a appData
        appData.employees.push(employee);
        
        showMessage(`Employee "${firstName} ${lastName}" added successfully`, 'success');
    }
    
    // Actualizar la lista de empleados
    loadEmployeesList();
    
    // Ocultar formulario
    cancelEmployeeForm();
}

/**
 * Elimina un empleado
 * @param {Object} employee - Empleado a eliminar
 */
function deleteEmployee(employee) {
    // Buscar el índice del empleado
    const index = employeeState.employees.findIndex(e => e.id_employee === employee.id_employee);
    
    // Si se encuentra, eliminarlo
    if (index !== -1) {
        employeeState.employees.splice(index, 1);
        
        // Eliminar también de appData
        const appDataIndex = appData.employees.findIndex(e => e.id_employee === employee.id_employee);
        if (appDataIndex !== -1) {
            appData.employees.splice(appDataIndex, 1);
        }
        
        showMessage(`Employee "${employee.first_name} ${employee.last_name}" deleted successfully`, 'success');
        
        // Actualizar la lista de empleados
        loadEmployeesList();
    } else {
        showMessage('Employee not found', 'error');
    }
}

/**
 * Cancela el formulario de empleado
 */
function cancelEmployeeForm() {
    // Ocultar formulario
    const formContainer = document.getElementById('employee-form-container');
    formContainer.style.display = 'none';
    
    // Limpiar estado
    employeeState.selectedEmployee = null;
}

/**
 * Obtiene el siguiente ID disponible para un nuevo empleado
 * @returns {number} Siguiente ID disponible
 */
function getNextEmployeeId() {
    // Si no hay empleados, empezar desde 0
    if (employeeState.employees.length === 0) {
        return 0;
    }
    
    // Obtener el ID más alto
    const maxId = Math.max(...employeeState.employees.map(e => e.id_employee));
    
    // Devolver el siguiente ID
    return maxId + 1;
}

/**
 * Valida un formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} true si el email es válido, false en caso contrario
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}