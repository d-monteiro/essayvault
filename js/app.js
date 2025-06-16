// Main application file - coordinates all modules

// Global functions for HTML onclick handlers
function login() {
    if (Auth.login()) {
        // Login successful, router will handle the refresh
    }
}

function logout() {
    Auth.logout();
}

function addEssay() {
    if (Essays.add()) {
        // Remove this line since Essays.add() already handles the refresh
        // Router.loadAdminEssays();
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize router first (this will load the appropriate view)
    Router.init();
});