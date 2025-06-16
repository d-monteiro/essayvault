// Router module for handling URL-based navigation
const Router = {
    currentRoute: '',

    // Initialize router
    init() {
        this.handleRoute();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Listen for back/forward navigation
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
    },

    // Handle current route
    handleRoute() {
        const hash = window.location.hash.slice(1); // Remove the # symbol
        const route = hash || 'home';
        
        this.currentRoute = route;
        this.renderRoute(route);
    },

    // Render the appropriate view based on route
    renderRoute(route) {
        const container = document.querySelector('.container');
        
        switch(route) {
            case '/admin':
                this.renderAdminView();
                break;
            case '/home':
            default:
                this.renderHomeView();
                break;
        }
    },

    // Render home view (public essays)
    renderHomeView() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <header class="header">
                <h1 class="site-title">${CONFIG.SITE_TITLE}</h1>
                <p class="site-subtitle">${CONFIG.SITE_SUBTITLE}</p>
            </header>

            <!-- Essays List -->
            <div id="essaysList">
                <div class="no-essays">
                    No essays published yet.
                </div>
            </div>
        `;
        
        // Load and render essays
        Essays.init();
    },

    // Render admin view
    renderAdminView() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <header class="header">
                <h1 class="site-title">Admin Panel</h1>
                <p class="site-subtitle">Manage your essays</p>
                <a href="#home" class="back-link">← Back to Essays</a>
            </header>

            <!-- Login Form -->
            <div id="loginForm" class="login-form ${Auth.isLoggedIn ? 'hidden' : ''}">
                <h2>Admin Login</h2>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button class="btn" onclick="login()">Login</button>
                <a href="#home" class="btn btn-secondary">Cancel</a>
            </div>

            <!-- Admin Panel -->
            <div id="adminPanel" class="admin-panel ${Auth.isLoggedIn ? '' : 'hidden'}">
                <h2>Add New Essay</h2>
                <div class="form-group">
                    <label for="essayTitle">Title</label>
                    <input type="text" id="essayTitle" required>
                </div>
                <div class="form-group">
                    <label for="essayContent">Content</label>
                    <textarea id="essayContent" placeholder="Write your essay here..." required></textarea>
                </div>
                <button class="btn" onclick="addEssay()">Publish Essay</button>
                <button class="btn btn-secondary" onclick="logout()">Logout</button>
                
                <div class="admin-essays-section">
                    <h3>Manage Essays</h3>
                    <div id="adminEssaysList">
                        <!-- Essays will be loaded here -->
                    </div>
                </div>
            </div>
        `;

        // Setup admin-specific functionality
        if (Auth.isLoggedIn) {
            this.loadAdminEssays();
        }
        
        // Setup event listeners for admin forms
        Auth.setupEventListeners();
        
        // Focus on username field if not logged in
        if (!Auth.isLoggedIn) {
            setTimeout(() => {
                const usernameField = document.getElementById('username');
                if (usernameField) usernameField.focus();
            }, 100);
        }
    },

    // Load essays in admin view with management options
    loadAdminEssays() {
        const adminEssaysList = document.getElementById('adminEssaysList');
        if (!adminEssaysList) return;

        const essays = Storage.loadEssays();
        
        if (essays.length === 0) {
            adminEssaysList.innerHTML = '<div class="no-essays">No essays to manage.</div>';
            return;
        }

        const essaysHtml = essays.map(essay => `
            <article class="essay admin-essay">
                <h3 class="essay-title">${Essays.escapeHtml(essay.title)}</h3>
                <div class="essay-meta">
                    <span>Published on ${essay.date}</span>
                </div>
                <div class="essay-content-preview">${Essays.escapeHtml(essay.content.substring(0, 200))}${essay.content.length > 200 ? '...' : ''}</div>
                <div class="essay-actions">
                    <button class="btn btn-danger" onclick="Essays.delete(${essay.id})">Delete</button>
                    <button class="btn btn-secondary" onclick="Router.editEssay(${essay.id})">Edit</button>
                </div>
            </article>
        `).join('');

        adminEssaysList.innerHTML = essaysHtml;
    },

    // Navigate to a specific route
    navigate(route) {
        window.location.hash = route;
    },

    // Refresh current route
    refresh() {
        this.handleRoute();
    },

    // Edit essay (placeholder for future implementation)
    editEssay(id) {
        alert('Edit functionality coming soon!');
    }
};