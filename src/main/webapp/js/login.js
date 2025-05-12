/**
 * BurWeb - Login Page Script
 * Maneja la interacción con los formularios de inicio de sesión y registro
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes comunes
    if (typeof initCommonComponents === 'function') {
        initCommonComponents();
    }
    
    // Verificar si el usuario ya está autenticado
    const authUser = getAuthUser();
    if (authUser) {
        // Redireccionar a la página de perfil si ya está autenticado
        window.location.href = 'profile.html';
        return;
    }
    
    // Inicializar las pestañas
    initTabs();
    
    // Inicializar los formularios
    initLoginForm();
    initRegisterForm();
});

/**
 * Inicializa las pestañas de inicio de sesión y registro
 */
function initTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    const tabLinks = document.querySelectorAll('.tab-link');
    
    // Función para cambiar de pestaña
    function switchTab(tabId) {
        // Desactivar todas las pestañas y formularios
        tabs.forEach(tab => tab.classList.remove('active'));
        forms.forEach(form => form.classList.remove('active'));
        
        // Activar la pestaña y formulario seleccionados
        document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-form`).classList.add('active');
    }
    
    // Verificar si hay un hash en la URL para activar la pestaña correspondiente
    if (window.location.hash === '#register') {
        switchTab('register');
    }
    
    // Eventos de clic para las pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });
    
    // Eventos de clic para los enlaces dentro de los formularios
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(this.getAttribute('data-tab'));
        });
    });
}

/**
 * Inicializa el formulario de inicio de sesión
 */
function initLoginForm() {
    const loginButton = document.getElementById('login-button');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const userTypeInputs = document.querySelectorAll('input[name="login-user-type"]');
    const messageContainer = document.getElementById('login-message');
    
    loginButton.addEventListener('click', async function() {
        // Limpiar mensajes anteriores
        messageContainer.innerHTML = '';
        messageContainer.className = 'auth-message';
        
        // Validar campos
        if (!emailInput.value || !passwordInput.value) {
            showMessage(messageContainer, 'Please fill in all fields', 'error');
            return;
        }
        
        // Obtener tipo de usuario seleccionado
        let userType = '';
        userTypeInputs.forEach(input => {
            if (input.checked) {
                userType = input.value;
            }
        });
        
        // Mostrar mensaje de carga
        showMessage(messageContainer, 'Signing in...', 'info');
        
        // Intentar iniciar sesión
        try {
            const success = await login(emailInput.value, passwordInput.value, userType);
            
            if (success) {
                // Redireccionar a la página principal
                showMessage(messageContainer, 'Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showMessage(messageContainer, 'Invalid email or password', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage(messageContainer, 'An error occurred. Please try again.', 'error');
        }
    });
    
    // Permitir enviar el formulario con Enter
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginButton.click();
            }
        });
    });
}

/**
 * Inicializa el formulario de registro
 */
function initRegisterForm() {
    const registerButton = document.getElementById('register-button');
    const firstNameInput = document.getElementById('register-first-name');
    const lastNameInput = document.getElementById('register-last-name');
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('register-password-confirm');
    const messageContainer = document.getElementById('register-message');
    
    registerButton.addEventListener('click', async function() {
        // Limpiar mensajes anteriores
        messageContainer.innerHTML = '';
        messageContainer.className = 'auth-message';
        
        // Validar campos
        if (!firstNameInput.value || !lastNameInput.value || !emailInput.value || 
            !passwordInput.value || !confirmPasswordInput.value) {
            showMessage(messageContainer, 'Please fill in all fields', 'error');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showMessage(messageContainer, 'Please enter a valid email address', 'error');
            return;
        }
        
        // Validar longitud de contraseña
        if (passwordInput.value.length < 8) {
            showMessage(messageContainer, 'Password must be at least 8 characters long', 'error');
            return;
        }
        
        // Validar que las contraseñas coincidan
        if (passwordInput.value !== confirmPasswordInput.value) {
            showMessage(messageContainer, 'Passwords do not match', 'error');
            return;
        }
        
        // Mostrar mensaje de carga
        showMessage(messageContainer, 'Creating account...', 'info');
        
        // Datos del nuevo cliente
        const customerData = {
            first_name: firstNameInput.value,
            last_name: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        
        // Intentar registrar
        try {
            const success = await register(customerData);
            
            if (success) {
                // Redireccionar a la página principal
                showMessage(messageContainer, 'Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showMessage(messageContainer, 'Email already in use or registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showMessage(messageContainer, 'An error occurred. Please try again.', 'error');
        }
    });
    
    // Permitir enviar el formulario con Enter
    [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                registerButton.click();
            }
        });
    });
}

/**
 * Muestra un mensaje en el contenedor especificado
 * @param {HTMLElement} container - Contenedor del mensaje
 * @param {string} message - Texto del mensaje
 * @param {string} type - Tipo de mensaje ('error', 'success', 'info')
 */
function showMessage(container, message, type) {
    container.innerHTML = message;
    container.className = `auth-message ${type}`;
}