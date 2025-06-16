// Authentication module
const Auth = {
    isLoggedIn: false,

    // Handle login
    login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === CONFIG.ADMIN_USERNAME && password === CONFIG.ADMIN_PASSWORD) {
            this.isLoggedIn = true;
            this.clearLoginForm();
            Router.refresh(); // Refresh the admin view
            return true;
        } else {
            alert('Invalid credentials');
            return false;
        }
    },

    // Handle logout
    logout() {
        this.isLoggedIn = false;
        this.clearAdminForm();
        Router.navigate('home'); // Redirect to home after logout
    },

    // Clear login form
    clearLoginForm() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    },

    // Clear admin form
    clearAdminForm() {
        document.getElementById('essayTitle').value = '';
        document.getElementById('essayContent').value = '';
    },

    // Setup login form event listeners
    setupEventListeners() {
        const loginInputs = document.querySelectorAll('#username, #password');
        loginInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.login();
                }
            });
        });
    }
};