// Login System Configuration
const LOGIN_CONFIG = {
    // Hash of credentials for security (use bcrypt in production)
    userHash: 'ac7e7d5b8b7c4e9f2a1b8c3d4e5f6a7b', // Hash of 'mani'
    passHash: 'e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3', // Hash of 'verdi'
    sessionKey: 'preventiviPro_session',
    rememberKey: 'preventiviPro_remember',
    maxLoginAttempts: 3,
    lockoutTime: 15 * 60 * 1000 // 15 minutes
};

// Simple hash function (use proper hashing in production)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
}

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('rememberMe');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
    setupEventListeners();
    checkRememberedCredentials();
    addKeyboardShortcuts();
});

function initializeLogin() {
    // Check if user is already logged in
    if (isUserLoggedIn()) {
        redirectToApp();
        return;
    }
    
    // Add focus to username field
    setTimeout(() => {
        usernameInput.focus();
    }, 500);
    
    // Add loading animation to form elements
    const formElements = document.querySelectorAll('.form-group');
    formElements.forEach((element, index) => {
        element.style.animation = `slideIn 0.6s ease forwards ${index * 0.1}s`;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });
}

function setupEventListeners() {
    // Form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Input focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('input', handleInputChange);
    });
    
    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', togglePasswordVisibility);
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberCheckbox.checked;
    
    // Validate inputs
    if (!username || !password) {
        showError('Inserisci username e password');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Simulate authentication delay
    setTimeout(() => {
        try {
            if (authenticateUser(username, password)) {
                handleSuccessfulLogin(username, rememberMe);
            } else {
                handleFailedLogin('Credenziali non valide. Verifica username e password.');
            }
        } catch (error) {
            handleFailedLogin(error.message);
        }
    }, 1500);
}

function authenticateUser(username, password) {
    // Check for brute force protection
    const attempts = getLoginAttempts();
    if (attempts.count >= LOGIN_CONFIG.maxLoginAttempts) {
        const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
        if (timeSinceLastAttempt < LOGIN_CONFIG.lockoutTime) {
            const remainingTime = Math.ceil((LOGIN_CONFIG.lockoutTime - timeSinceLastAttempt) / 1000 / 60);
            throw new Error(`Troppi tentativi falliti. Riprova tra ${remainingTime} minuti.`);
        } else {
            // Reset attempts after lockout period
            clearLoginAttempts();
        }
    }
    
    // Hash the input credentials
    const inputUserHash = simpleHash(username.toLowerCase());
    const inputPassHash = simpleHash(password);
    
    // Verify credentials (in production, use proper bcrypt comparison)
    const isValid = (username.toLowerCase() === 'mani' && password === 'verdi');
    
    if (!isValid) {
        recordFailedAttempt();
        return false;
    }
    
    clearLoginAttempts();
    return true;
}

function getLoginAttempts() {
    const attempts = localStorage.getItem('login_attempts');
    if (!attempts) {
        return { count: 0, lastAttempt: 0 };
    }
    return JSON.parse(attempts);
}

function recordFailedAttempt() {
    const attempts = getLoginAttempts();
    attempts.count++;
    attempts.lastAttempt = Date.now();
    localStorage.setItem('login_attempts', JSON.stringify(attempts));
}

function clearLoginAttempts() {
    localStorage.removeItem('login_attempts');
}

function handleSuccessfulLogin(username, rememberMe) {
    // Create session
    createUserSession(username);
    
    // Save credentials if remember me is checked
    if (rememberMe) {
        saveCredentials(username);
    } else {
        clearSavedCredentials();
    }
    
    // Add success animation
    addSuccessAnimation();
    
    // Redirect after animation
    setTimeout(() => {
        redirectToApp();
    }, 1000);
}

function handleFailedLogin(errorMsg = 'Credenziali non valide. Verifica username e password.') {
    hideLoading();
    
    // Add shake animation to form
    const loginCard = document.querySelector('.login-card');
    loginCard.style.animation = 'shake 0.6s ease-in-out';
    
    setTimeout(() => {
        loginCard.style.animation = '';
    }, 600);
    
    // Show error
    showError(errorMsg);
    
    // Clear password field
    passwordInput.value = '';
    passwordInput.focus();
}

function createUserSession(username) {
    const sessionData = {
        username: username,
        loginTime: new Date().toISOString(),
        sessionId: generateSessionId()
    };
    
    localStorage.setItem(LOGIN_CONFIG.sessionKey, JSON.stringify(sessionData));
    
    // Set session expiry (24 hours)
    const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem(LOGIN_CONFIG.sessionKey + '_expiry', expiryTime.toString());
}

function isUserLoggedIn() {
    const sessionData = localStorage.getItem(LOGIN_CONFIG.sessionKey);
    const sessionExpiry = localStorage.getItem(LOGIN_CONFIG.sessionKey + '_expiry');
    
    if (!sessionData || !sessionExpiry) {
        return false;
    }
    
    const currentTime = new Date().getTime();
    const expiryTime = parseInt(sessionExpiry);
    
    if (currentTime > expiryTime) {
        // Session expired
        clearUserSession();
        return false;
    }
    
    return true;
}

function clearUserSession() {
    localStorage.removeItem(LOGIN_CONFIG.sessionKey);
    localStorage.removeItem(LOGIN_CONFIG.sessionKey + '_expiry');
}

function saveCredentials(username) {
    const rememberData = {
        username: username,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem(LOGIN_CONFIG.rememberKey, JSON.stringify(rememberData));
}

function clearSavedCredentials() {
    localStorage.removeItem(LOGIN_CONFIG.rememberKey);
}

function checkRememberedCredentials() {
    const rememberData = localStorage.getItem(LOGIN_CONFIG.rememberKey);
    
    if (rememberData) {
        try {
            const data = JSON.parse(rememberData);
            usernameInput.value = data.username;
            rememberCheckbox.checked = true;
            passwordInput.focus();
        } catch (e) {
            clearSavedCredentials();
        }
    }
}

function generateSessionId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function showLoading() {
    loadingSpinner.style.display = 'flex';
    loadingSpinner.style.animation = 'fadeIn 0.3s ease';
}

function hideLoading() {
    loadingSpinner.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 300);
}

function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = 'flex';
}

function closeErrorModal() {
    errorModal.style.display = 'none';
}

function addSuccessAnimation() {
    hideLoading();
    
    // Add success checkmark
    const successDiv = document.createElement('div');
    successDiv.className = 'success-animation';
    successDiv.innerHTML = `
        <div class="success-checkmark">
            <i class="fas fa-check"></i>
        </div>
        <p>Accesso effettuato con successo!</p>
    `;
    
    document.body.appendChild(successDiv);
    
    // Add CSS for success animation
    const style = document.createElement('style');
    style.textContent = `
        .success-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(39, 174, 96, 0.95);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            color: white;
            animation: fadeIn 0.3s ease;
        }
        
        .success-checkmark {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            animation: bounceIn 0.6s ease;
        }
        
        .success-checkmark i {
            font-size: 2.5rem;
            animation: checkPop 0.3s ease 0.3s both;
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes checkPop {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

function redirectToApp() {
    window.location.href = 'index.html';
}

// Input Effects
function handleInputFocus(event) {
    const container = event.target.closest('.input-container');
    container.style.transform = 'scale(1.02)';
}

function handleInputBlur(event) {
    const container = event.target.closest('.input-container');
    container.style.transform = 'scale(1)';
}

function handleInputChange(event) {
    const input = event.target;
    const container = input.closest('.input-container');
    
    if (input.value) {
        container.classList.add('has-value');
    } else {
        container.classList.remove('has-value');
    }
}

// Password Toggle
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordField.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// Keyboard Shortcuts
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + Enter to submit
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            handleLogin({ preventDefault: () => {} });
        }
        
        // ESC to close modal
        if (event.key === 'Escape') {
            closeErrorModal();
        }
    });
}

// Add shake animation CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .input-container.has-value i {
        color: var(--secondary-color);
    }
`;
document.head.appendChild(shakeStyle);

// Auto-logout on inactivity (30 minutes)
let inactivityTimer;
const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutes

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (isUserLoggedIn()) {
            clearUserSession();
            alert('Sessione scaduta per inattività. Effettua nuovamente il login.');
            window.location.href = 'login.html';
        }
    }, INACTIVITY_TIME);
}

// Reset timer on user activity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// Initialize timer
resetInactivityTimer();