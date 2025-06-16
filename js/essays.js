// Essays management module
const Essays = {
    essays: [],

    // Initialize essays from storage
    init() {
        this.essays = Storage.loadEssays();
        this.render();
    },

    // Add new essay
    add() {
        const title = document.getElementById('essayTitle').value.trim();
        const content = document.getElementById('essayContent').value.trim();

        if (!title || !content) {
            alert('Please fill in both title and content');
            return false;
        }

        const newEssay = {
            id: Date.now(),
            title: title,
            content: content,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            timestamp: new Date().toISOString()
        };

        this.essays.unshift(newEssay);
        
        if (Storage.saveEssays(this.essays)) {
            // Only refresh the appropriate view, don't try to render essays in admin view
            if (Router.currentRoute === '/admin') {
                Router.loadAdminEssays();
            } else {
                this.render();
            }
            
            Auth.clearAdminForm();
            return true;
        } else {
            alert('Error saving essay. Please try again.');
            return false;
        }
    },

    // Delete essay
    delete(id) {
        this.essays = this.essays.filter(essay => essay.id !== id);
        Storage.saveEssays(this.essays);
        
        // Fix the route name to include the leading slash
        if (Router.currentRoute === '/admin') {
            Router.loadAdminEssays();
        } else {
            this.render();
        }
    },

    // Render essays
    render() {
        const essaysList = document.getElementById('essaysList');

        if(!essaysList) return;
        
        if (this.essays.length === 0) {
            essaysList.innerHTML = '<div class="no-essays">No essays published yet.</div>';
            return;
        }

        const essaysHtml = this.essays.map(essay => `
            <article class="essay">
                <h2 class="essay-title">${this.escapeHtml(essay.title)}</h2>
                <div class="essay-meta">
                    <span>Published on ${essay.date}</span>
                </div>
                <div class="essay-content">${this.escapeHtml(essay.content)}</div>
                ${Auth.isLoggedIn ? `
                    <div class="essay-actions">
                        <button class="btn btn-danger" onclick="Essays.delete(${essay.id})">Delete</button>
                    </div>
                ` : ''}
            </article>
        `).join('');

        essaysList.innerHTML = essaysHtml;
    },

    // Utility function to escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Refresh essays display (useful for login state changes)
    refresh() {
        this.render();
    }
};