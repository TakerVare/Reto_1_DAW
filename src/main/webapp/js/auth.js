/**
 * BurWeb - Authentication Component
 * Maneja el inicio de sesión, registro y gestión de sesiones
 */

// Tipos de usuario
const USER_TYPES = {
    CUSTOMER: 'customer',
    EMPLOYEE: 'employee',
    GUEST: 'guest'
};

// Al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el estado de autenticación
    checkAuthState();
});

/**
 * Verifica el estado de autenticación actual
 * Actualiza la UI según el usuario esté autenticado o no
 */
function checkAuthState() {
    const authUser = getAuthUser();
    
    if (authUser) {
        // Usuario autenticado
        updateUIForAuthenticatedUser(authUser);
    } else {
        // Usuario no autenticado
        updateUIForGuest();
    }
}

/**
 * Iniciar sesión
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} userType - Tipo de usuario ('customer' o 'employee')
 * @returns {Promise<boolean>} Promesa que resuelve a true si el inicio de sesión fue exitoso
 */
async function login(email, password, userType) {
    try {
        let user = null;
        
        if (userType === USER_TYPES.CUSTOMER) {
            // Verificar credenciales de cliente
            user = await verifyCustomerCredentials(email, password);
        } else if (userType === USER_TYPES.EMPLOYEE) {
            // Verificar credenciales de empleado
            user = await verifyEmployeeCredentials(email, password);
        }
        
        if (user) {
            // Credenciales válidas, guardar datos de sesión
            const sessionData = {
                id: userType === USER_TYPES.CUSTOMER ? user.id_customer : user.id_employee,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                type: userType,
                role: userType === USER_TYPES.EMPLOYEE ? user.id_rol : null
            };
            
            // Guardar en localStorage
            localStorage.setItem('authUser', JSON.stringify(sessionData));
            
            // Actualizar UI
            updateUIForAuthenticatedUser(sessionData);
            
            return true;
        } else {
            // Credenciales inválidas
            console.log('Invalid credentials');
            return false;
        }
    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}

/**
 * Cerrar sesión
 */
function logout() {
    // Eliminar datos de sesión
    localStorage.removeItem('authUser');
    
    // Actualizar UI
    updateUIForGuest();
    
    // Redireccionar a la página de inicio si es necesario
    if (window.location.pathname.includes('profile.html') || 
        window.location.pathname.includes('employee_area.html')) {
        window.location.href = 'index.html';
    }
}

/**
 * Registrar un nuevo cliente
 * @param {Object} customerData - Datos del nuevo cliente
 * @returns {Promise<boolean>} Promesa que resuelve a true si el registro fue exitoso
 */
async function register(customerData) {
    try {
        // Validar email único
        const customers = await getCustomers();
        const existingCustomer = customers.find(c => 
            c.email.toLowerCase() === customerData.email.toLowerCase()
        );
        
        if (existingCustomer) {
            console.log('Email already in use');
            return false;
        }
        
        // Agregar nuevo cliente
        const result = await addCustomer(customerData);
        
        if (result) {
            // Iniciar sesión automáticamente
            return await login(customerData.email, customerData.password, USER_TYPES.CUSTOMER);
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return false;
    }
}

/**
 * Obtiene el usuario autenticado actualmente
 * @returns {Object|null} Datos del usuario autenticado o null si no hay sesión
 */
function getAuthUser() {
    try {
        const authUser = localStorage.getItem('authUser');
        return authUser ? JSON.parse(authUser) : null;
    } catch (error) {
        console.error('Error getting auth user:', error);
        return null;
    }
}

/**
 * Actualiza la UI para un usuario autenticado
 * @param {Object} user - Datos del usuario autenticado
 */
function updateUIForAuthenticatedUser(user) {
    // Actualizar el rol de usuario en localStorage para los componentes que lo utilizan
    localStorage.setItem('UserRol', user.type === USER_TYPES.EMPLOYEE ? 'employee' : 'customer');
    
    // Actualizar menú de usuario
    const userMenuButton = document.querySelector('#nav_user');
    if (userMenuButton) {
        userMenuButton.innerHTML = `
            <svg id="nav_user_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M20 21a8 8 0 0 0-16 0"></path>
            </svg>
            <div class="card_user_menu hidden" id="nav_user_menu">
                <div class="list">
                    <div class="element" onclick="window.location.href='profile.html'">
                        <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#000"></path>
                        </svg>
                        <div class="label">My Profile</div>
                    </div>
                    <div class="element" onclick="window.location.href='orders.html'">
                        <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#000"></path>
                        </svg>
                        <div class="label">My Orders</div>
                    </div>
                </div>
                <div class="separator"></div>
                <div class="list">
                    ${user.type === USER_TYPES.EMPLOYEE ? `
                        <div class="element" onclick="window.location.href='employee_area.html'">
                            <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z" fill="#000"></path>
                            </svg>
                            <div class="label">Employee Area</div>
                        </div>
                    ` : ''}
                    <div class="element" onclick="logout()">
                        <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V2.5h-3v2.18C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="#000"></path>
                        </svg>
                        <div class="label">Log Out</div>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar evento para mostrar/ocultar menú
        const userIcon = document.getElementById('nav_user_icon');
        const userMenu = document.getElementById('nav_user_menu');
        
        if (userIcon && userMenu) {
            userIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                userMenu.classList.toggle('hidden');
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', function() {
                userMenu.classList.add('hidden');
            });
            
            // Evitar que el menú se cierre al hacer clic dentro de él
            userMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Si estamos en la página de perfil, actualizar información del perfil
    if (window.location.pathname.includes('profile.html')) {
        updateProfilePage(user);
    }
    
    // Si estamos en employee_area.html y el usuario no es empleado, redirigir
    if (window.location.pathname.includes('employee_area.html') && user.type !== USER_TYPES.EMPLOYEE) {
        window.location.href = 'index.html';
    }
}

/**
 * Actualiza la UI para un usuario invitado (no autenticado)
 */
function updateUIForGuest() {
    // Actualizar el rol de usuario en localStorage para los componentes que lo utilizan
    localStorage.setItem('UserRol', 'guest');
    
    // Actualizar menú de usuario
    const userMenuButton = document.querySelector('#nav_user');
    if (userMenuButton) {
        userMenuButton.innerHTML = `
            <svg id="nav_user_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M20 21a8 8 0 0 0-16 0"></path>
            </svg>
            <div class="card_user_menu hidden" id="nav_user_menu">
                <div class="list">
                    <div class="element" onclick="window.location.href='login.html'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" y2="12" x2="3"></line>
                        </svg>
                        <div class="label">Sign In</div>
                    </div>
                    <div class="element" onclick="window.location.href='login.html#register'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" y2="14" x2="20"></line>
                            <line x1="23" y1="11" y2="11" x2="17"></line>
                        </svg>
                        <div class="label">Register</div>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar evento para mostrar/ocultar menú
        const userIcon = document.getElementById('nav_user_icon');
        const userMenu = document.getElementById('nav_user_menu');
        
        if (userIcon && userMenu) {
            userIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                userMenu.classList.toggle('hidden');
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', function() {
                userMenu.classList.add('hidden');
            });
            
            // Evitar que el menú se cierre al hacer clic dentro de él
            userMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Si estamos en la página de perfil o área de empleados, redirigir al login
    if (window.location.pathname.includes('profile.html') || 
        window.location.pathname.includes('employee_area.html')) {
        window.location.href = 'login.html';
    }
}

/**
 * Actualiza la página de perfil con los datos del usuario
 * @param {Object} user - Datos del usuario autenticado
 */
function updateProfilePage(user) {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) return;
    
    // Mostrar información del perfil
    profileContainer.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">
                <img src="images/Icons/user_profile.png" alt="Profile Avatar">
            </div>
            <div class="profile-info">
                <h2>${user.first_name} ${user.last_name}</h2>
                <p class="profile-email">${user.email}</p>
                <p class="profile-type">${user.type === USER_TYPES.CUSTOMER ? 'Customer' : 'Employee'}</p>
            </div>
        </div>
        <div class="profile-content">
            <div class="profile-section">
                <h3>Personal Information</h3>
                <div class="profile-field">
                    <span class="field-label">First Name:</span>
                    <span class="field-value">${user.first_name}</span>
                </div>
                <div class="profile-field">
                    <span class="field-label">Last Name:</span>
                    <span class="field-value">${user.last_name}</span>
                </div>
                <div class="profile-field">
                    <span class="field-label">Email:</span>
                    <span class="field-value">${user.email}</span>
                </div>
            </div>
            ${user.type === USER_TYPES.EMPLOYEE ? `
                <div class="profile-section">
                    <h3>Employee Information</h3>
                    <div class="profile-field">
                        <span class="field-label">Employee ID:</span>
                        <span class="field-value">${user.id}</span>
                    </div>
                    <div class="profile-field">
                        <span class="field-label">Role:</span>
                        <span class="field-value" id="employee-role">Loading...</span>
                    </div>
                </div>
            ` : ''}
            <div class="profile-section">
                <h3>Account Actions</h3>
                <button class="profile-button" onclick="logout()">Log Out</button>
                <button class="profile-button secondary" onclick="window.location.href='index.html'">Back to Home</button>
            </div>
        </div>
    `;
    
    // Si es empleado, cargar información del rol
    if (user.type === USER_TYPES.EMPLOYEE) {
        loadEmployeeRole(user.role);
    }
}

/**
 * Carga la información del rol de empleado
 * @param {number} roleId - ID del rol
 */
async function loadEmployeeRole(roleId) {
    try {
        const roles = await getRoles();
        const role = roles.find(r => r.id_rol === roleId);
        
        const roleElement = document.getElementById('employee-role');
        if (roleElement && role) {
            roleElement.textContent = role.name;
        } else if (roleElement) {
            roleElement.textContent = 'Unknown';
        }
    } catch (error) {
        console.error('Error loading employee role:', error);
    }
}