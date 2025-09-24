// Toolbar Management
class Toolbar {
    constructor() {
        // Initialize toolbar buttons
        this.initializeToolbarIcons();
        this.initializeNavButtons();
        this.currentFile = null;
        this.isEditing = false;
        this.unsavedChanges = false;
        this.autoSaveInterval = 60000; // Auto-save every minute
        this.setupAutoSave();
        this.setupWorkspaceChangeDetection();
    }

    initializeToolbarIcons() {
        // Home button
        document.getElementById('home-btn').addEventListener('click', () => {
            this.handleHome();
        });

        // File button
        document.getElementById('file-btn-icon').addEventListener('click', () => {
            this.handleFile();
        });

        // Settings button
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.handleSettings();
        });

        // Refresh button
        document.getElementById('refresh-btn').addEventListener('click', () => {
            this.handleRefresh();
        });

        // Delete button
        document.getElementById('delete-btn').addEventListener('click', () => {
            this.handleDelete();
        });

        // Help button
        document.getElementById('help-btn').addEventListener('click', () => {
            this.handleHelp();
        });
    }

    initializeNavButtons() {
        // File menu button
        document.getElementById('file-btn').addEventListener('click', () => {
            this.showFileMenu();
        });

        // Edit button
        document.getElementById('edit-btn').addEventListener('click', () => {
            this.toggleEditMode();
        });

        // Profile button
        document.getElementById('profile-btn').addEventListener('click', () => {
            this.showProfile();
        });

        // Assessment button
        document.getElementById('assessment-btn').addEventListener('click', () => {
            this.showAssessment();
        });
    }

    // Toolbar icon handlers
    handleHome() {
        console.log('Home clicked');
        // Reset workspace to initial state
        if (confirm('Return to home? This will clear the current workspace.')) {
            this.clearWorkspace();
        }
    }

    handleFile() {
        const fileBtn = document.getElementById('file-btn-icon');
        fileBtn.classList.toggle('active');
        this.showFileMenu();
        
        // Remove active class when menu closes
        setTimeout(() => fileBtn.classList.remove('active'), 100);
    }

    handleSettings() {
        const settingsModal = document.createElement('div');
        settingsModal.className = 'modal';
        settingsModal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Settings</h2>
                <div class="settings-section">
                    <h3>Auto-save</h3>
                    <label>
                        <input type="checkbox" id="autosave-enabled" ${this.autoSaveInterval ? 'checked' : ''}>
                        Enable auto-save
                    </label>
                    <label>
                        Auto-save interval (seconds):
                        <input type="number" id="autosave-interval" value="${this.autoSaveInterval / 1000}" min="30">
                    </label>
                </div>
                <div class="settings-section">
                    <h3>Workspace</h3>
                    <label>
                        <input type="checkbox" id="show-grid">
                        Show grid
                    </label>
                    <label>
                        Grid size:
                        <input type="number" id="grid-size" value="20" min="10" max="100">
                    </label>
                </div>
                <button id="save-settings">Save Settings</button>
            </div>
        `;
        
        document.body.appendChild(settingsModal);
        settingsModal.style.display = 'block';

        const closeBtn = settingsModal.querySelector('.close-btn');
        const saveBtn = settingsModal.querySelector('#save-settings');

        closeBtn.onclick = () => {
            settingsModal.remove();
        };

        saveBtn.onclick = () => {
            this.saveSettings(settingsModal);
            settingsModal.remove();
        };
    }

    saveSettings(modal) {
        const autosaveEnabled = modal.querySelector('#autosave-enabled').checked;
        const autosaveInterval = parseInt(modal.querySelector('#autosave-interval').value) * 1000;
        const showGrid = modal.querySelector('#show-grid').checked;
        const gridSize = parseInt(modal.querySelector('#grid-size').value);

        // Update autosave settings
        if (autosaveEnabled) {
            this.autoSaveInterval = autosaveInterval;
            this.setupAutoSave();
        } else {
            this.autoSaveInterval = null;
            if (this.autoSaveTimer) {
                clearInterval(this.autoSaveTimer);
            }
        }

        // Update grid settings
        const workspace = document.getElementById('simulation-area');
        if (showGrid) {
            workspace.style.backgroundSize = `${gridSize}px ${gridSize}px`;
            workspace.style.backgroundImage = 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)';
        } else {
            workspace.style.backgroundImage = 'none';
        }

        // Save settings to localStorage
        localStorage.setItem('workspaceSettings', JSON.stringify({
            autosaveEnabled,
            autosaveInterval,
            showGrid,
            gridSize
        }));
    }

    handleRefresh() {
        if (this.hasUnsavedChanges()) {
            if (!confirm('You have unsaved changes. Refresh anyway?')) {
                return;
            }
        }
        this.clearWorkspace();
        this.loadLastAutoSave(); // Try to load last auto-save if exists
    }

    handleDelete() {
        if (!this.isEditing) {
            this.toggleEditMode(); // Automatically enter edit mode
        }
        
        const selectedItems = document.querySelectorAll('.workspace-item.selected');
        if (selectedItems.length === 0) {
            alert('Please select items to delete');
            return;
        }

        if (confirm(`Delete ${selectedItems.length} selected item(s)?`)) {
            this.deleteSelectedItems();
            this.markUnsavedChanges();
        }
    }

    handleHelp() {
        const helpModal = document.createElement('div');
        helpModal.className = 'modal';
        helpModal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Help Guide</h2>
                <div class="help-section">
                    <h3>Toolbar Icons</h3>
                    <ul>
                        <li><strong>Home:</strong> Reset workspace to initial state</li>
                        <li><strong>File:</strong> Access file operations (New, Open, Save)</li>
                        <li><strong>Settings:</strong> Configure workspace and auto-save</li>
                        <li><strong>Refresh:</strong> Reset current state (keeps auto-save)</li>
                        <li><strong>Delete:</strong> Remove selected items</li>
                    </ul>
                    <h3>Edit Mode</h3>
                    <p>Click the Edit button or use Delete to enter edit mode. Click items to select them for deletion.</p>
                    <h3>File Operations</h3>
                    <p>Your work is auto-saved every minute. Use Save As to create backup files.</p>
                    <h3>Keyboard Shortcuts</h3>
                    <ul>
                        <li><strong>Ctrl + S:</strong> Save</li>
                        <li><strong>Ctrl + O:</strong> Open</li>
                        <li><strong>Delete:</strong> Remove selected items</li>
                        <li><strong>Esc:</strong> Exit edit mode</li>
                    </ul>
                </div>
            </div>
        `;

        document.body.appendChild(helpModal);
        helpModal.style.display = 'block';

        const closeBtn = helpModal.querySelector('.close-btn');
        closeBtn.onclick = () => {
            helpModal.remove();
        };
    }

    // Navigation button handlers
    showFileMenu() {
        const fileMenu = this.createFileMenu();
        // Position the menu below the file button
        const fileBtn = document.getElementById('file-btn');
        const rect = fileBtn.getBoundingClientRect();
        fileMenu.style.position = 'absolute';
        fileMenu.style.top = rect.bottom + 'px';
        fileMenu.style.left = rect.left + 'px';
        document.body.appendChild(fileMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!fileMenu.contains(e.target) && e.target !== fileBtn) {
                fileMenu.remove();
            }
        }, { once: true });
    }

    createFileMenu() {
        const menu = document.createElement('div');
        menu.className = 'file-menu';
        menu.innerHTML = `
            <div class="menu-item" id="new-file">New</div>
            <div class="menu-item" id="open-file">Open</div>
            <div class="menu-item" id="save-file">Save</div>
            <div class="menu-item" id="save-as">Save As</div>
            <hr>
            <div class="menu-item" id="export">Export</div>
        `;

        // Add event listeners for menu items
        menu.querySelector('#new-file').addEventListener('click', () => this.newFile());
        menu.querySelector('#open-file').addEventListener('click', () => this.openFile());
        menu.querySelector('#save-file').addEventListener('click', () => this.saveFile());
        menu.querySelector('#save-as').addEventListener('click', () => this.saveFileAs());
        menu.querySelector('#export').addEventListener('click', () => this.exportFile());

        return menu;
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;
        const editBtn = document.getElementById('edit-btn');
        editBtn.classList.toggle('active', this.isEditing);
        
        if (this.isEditing) {
            this.enableItemSelection();
        } else {
            this.disableItemSelection();
        }
    }

    showProfile() {
        // Check if user is logged in
        if (!window.loginModal.isLoggedIn()) {
            window.loginModal.show();
            return;
        }
        // Show profile modal
        // TODO: Implement profile modal
    }

    showAssessment() {
        // TODO: Implement assessment view
        console.log('Assessment view not implemented yet');
    }

    // File operations
    newFile() {
        if (this.hasUnsavedChanges()) {
            if (!confirm('You have unsaved changes. Create new file anyway?')) {
                return;
            }
        }
        this.clearWorkspace();
        this.currentFile = null;
    }

    openFile() {
        // Create and trigger file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => this.loadFile(e.target.files[0]);
        input.click();
    }

    loadFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const workspaceData = JSON.parse(e.target.result);
                this.loadWorkspaceState(workspaceData);
                this.currentFile = file.name;
            } catch (error) {
                console.error('Error loading file:', error);
                alert('Error loading file');
            }
        };
        reader.readAsText(file);
    }

    saveFile() {
        if (!this.currentFile) {
            this.saveFileAs();
            return;
        }
        this.saveWorkspaceState(this.currentFile);
    }

    saveFileAs() {
        const workspaceState = this.getWorkspaceState();
        const blob = new Blob([JSON.stringify(workspaceState, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'workspace.json';
        a.click();
        URL.revokeObjectURL(a.href);
    }

    exportFile() {
        // TODO: Implement export functionality
        console.log('Export not implemented yet');
    }

    // Workspace operations
    clearWorkspace() {
        const simulationArea = document.getElementById('simulation-area');
        simulationArea.innerHTML = '';
        window.workspaceItemsState = {};
        window.itemCounts = {};
    }

    hasUnsavedChanges() {
        // Check if there are items in the workspace
        return Object.keys(window.workspaceItemsState || {}).length > 0;
    }

    getWorkspaceState() {
        return {
            items: window.workspaceItemsState,
            itemCounts: window.itemCounts,
            timestamp: new Date().toISOString()
        };
    }

    loadWorkspaceState(state) {
        this.clearWorkspace();
        window.workspaceItemsState = state.items;
        window.itemCounts = state.itemCounts;
        
        // Recreate items in workspace
        for (const [id, itemState] of Object.entries(state.items)) {
            this.recreateWorkspaceItem(id, itemState);
        }
    }

    recreateWorkspaceItem(id, state) {
        const item = document.createElement('div');
        item.className = 'workspace-item';
        item.setAttribute('data-id', id);
        item.style.position = 'absolute';
        item.style.left = state.position?.x || '0px';
        item.style.top = state.position?.y || '0px';

        const img = document.createElement('img');
        img.src = state.image || 'assets/images/test.jpg';
        item.appendChild(img);

        const label = document.createElement('div');
        label.className = 'item-label';
        label.textContent = state.displayName;
        item.appendChild(label);

        document.getElementById('simulation-area').appendChild(item);
    }

    // Auto-save functionality
    setupAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
        }
        
        if (this.autoSaveInterval) {
            this.autoSaveTimer = setInterval(() => {
                this.performAutoSave();
            }, this.autoSaveInterval);
        }
    }

    setupWorkspaceChangeDetection() {
        const simulationArea = document.getElementById('simulation-area');
        
        // Listen for changes in the workspace
        const observer = new MutationObserver(() => {
            this.markUnsavedChanges();
        });

        observer.observe(simulationArea, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    markUnsavedChanges() {
        this.unsavedChanges = true;
        // Visual indicator for unsaved changes
        document.getElementById('file-btn').classList.add('unsaved');
    }

    clearUnsavedChanges() {
        this.unsavedChanges = false;
        document.getElementById('file-btn').classList.remove('unsaved');
    }

    performAutoSave() {
        if (this.unsavedChanges) {
            const state = this.getWorkspaceState();
            localStorage.setItem('workspaceAutoSave', JSON.stringify(state));
            console.log('Auto-saved at:', new Date().toLocaleTimeString());
            this.clearUnsavedChanges();
        }
    }

    loadLastAutoSave() {
        const savedState = localStorage.getItem('workspaceAutoSave');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                this.loadWorkspaceState(state);
                console.log('Loaded auto-save from:', state.timestamp);
            } catch (error) {
                console.error('Error loading auto-save:', error);
            }
        }
    }

    // Edit mode operations
    enableItemSelection() {
        const items = document.querySelectorAll('.workspace-item');
        items.forEach(item => {
            item.classList.add('selectable');
            item.addEventListener('click', this.handleItemClick.bind(this));
        });

        // Add keyboard shortcut for delete
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    disableItemSelection() {
        const items = document.querySelectorAll('.workspace-item');
        items.forEach(item => {
            item.classList.remove('selectable', 'selected');
            item.removeEventListener('click', this.handleItemClick.bind(this));
        });

        // Remove keyboard shortcut
        document.removeEventListener('keydown', this.handleKeyPress.bind(this));
    }

    handleItemClick(e) {
        if (!this.isEditing) return;
        
        if (e.ctrlKey) {
            // Toggle selection of clicked item only
            e.currentTarget.classList.toggle('selected');
        } else if (e.shiftKey) {
            // Select range of items
            const items = Array.from(document.querySelectorAll('.workspace-item'));
            const lastSelected = items.find(item => item.classList.contains('last-selected'));
            if (lastSelected) {
                const start = items.indexOf(lastSelected);
                const end = items.indexOf(e.currentTarget);
                const [min, max] = [start, end].sort((a, b) => a - b);
                items.forEach((item, i) => {
                    if (i >= min && i <= max) {
                        item.classList.add('selected');
                    }
                });
            }
        } else {
            // Clear other selections and select only this item
            document.querySelectorAll('.workspace-item.selected').forEach(item => {
                item.classList.remove('selected', 'last-selected');
            });
            e.currentTarget.classList.add('selected', 'last-selected');
        }
    }

    handleKeyPress(e) {
        if (!this.isEditing) return;

        if (e.key === 'Delete') {
            this.deleteSelectedItems();
        } else if (e.key === 'Escape') {
            this.toggleEditMode();
        } else if (e.ctrlKey) {
            if (e.key === 'a') {
                e.preventDefault();
                // Select all items
                document.querySelectorAll('.workspace-item').forEach(item => {
                    item.classList.add('selected');
                });
            }
        }
    }

    deleteSelectedItems() {
        const selectedItems = document.querySelectorAll('.workspace-item.selected');
        if (selectedItems.length === 0) {
            alert('No items selected');
            return;
        }

        selectedItems.forEach(item => {
            const id = item.getAttribute('data-id');
            delete window.workspaceItemsState[id];
            item.remove();
        });

        this.markUnsavedChanges();
    }

    // Additional keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch (e.key.toLowerCase()) {
                    case 's':
                        e.preventDefault();
                        this.saveFile();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.openFile();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.newFile();
                        break;
                }
            }
        });
    }
}

// Initialize toolbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.toolbar = new Toolbar();
});