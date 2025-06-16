// Storage management module
const Storage = {
    // Load essays from localStorage
    loadEssays() {
        try {
            const savedEssays = localStorage.getItem(CONFIG.STORAGE_KEY);
            return savedEssays ? JSON.parse(savedEssays) : [];
        } catch (error) {
            console.error('Error loading essays:', error);
            return [];
        }
    },

    // Save essays to localStorage
    saveEssays(essays) {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(essays));
            return true;
        } catch (error) {
            console.error('Error saving essays:', error);
            return false;
        }
    },

    // Clear all essays (for admin use)
    clearEssays() {
        try {
            localStorage.removeItem(CONFIG.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing essays:', error);
            return false;
        }
    }
};