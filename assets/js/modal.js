// Modal Management
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeBtn = this.modal.querySelector('.close-btn');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close when clicking the close button
        if (this.closeBtn) {
            this.closeBtn.onclick = () => this.hide();
        }

        // Close when clicking outside the modal
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.hide();
            }
        });
    }

    show() {
        this.modal.style.display = 'block';
    }

    hide() {
        this.modal.style.display = 'none';
    }

    setTitle(title) {
        const titleElement = this.modal.querySelector('h2');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }
}

class ItemPropertiesModal extends Modal {
    constructor() {
        super('item-properties-modal');
        this.titleElement = document.getElementById('item-properties-title');
        this.setupTabs();
    }

    setupTabs() {
        const tabs = this.modal.querySelectorAll('.tab-link');
        const contents = this.modal.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', (event) => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Hide all content sections
                contents.forEach(c => c.style.display = 'none');

                // Add active class to clicked tab
                event.currentTarget.classList.add('active');
                // Show corresponding content
                const tabId = event.currentTarget.getAttribute('onclick').match(/'([^']+)'/)[1];
                document.getElementById(tabId).style.display = 'block';
            });
        });
    }

    setTitle(title) {
        if (this.titleElement) {
            this.titleElement.textContent = title;
        }
    }

    // Function to handle tab switching
    openTab(tabName) {
        const tabcontent = this.modal.getElementsByClassName('tab-content');
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }

        const tablinks = this.modal.getElementsByClassName('tab-link');
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }

        document.getElementById(tabName).style.display = 'block';
        this.modal.querySelector(`[onclick*="${tabName}"]`).className += ' active';
    }

    // Update content for a specific tab
    updateTabContent(tabId, content) {
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            const contentDiv = tabContent.querySelector('div[id$="-content"]');
            if (contentDiv) {
                contentDiv.innerHTML = content;
            }
        }
    }
}

class LoginModal extends Modal {
    constructor() {
        super('login-modal');
        this.setupForm();
    }

    setupForm() {
        const form = this.modal.querySelector('#login-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Handle login form submission
                const username = form.querySelector('#username').value;
                const password = form.querySelector('#password').value;
                this.handleLogin(username, password);
            });
        }

        const createAccountLink = this.modal.querySelector('#create-account-link');
        if (createAccountLink) {
            createAccountLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Handle create account click
                this.showCreateAccountForm();
            });
        }
    }

    handleLogin(username, password) {
        // Add login logic here
        console.log('Logging in with:', username);
        // After successful login
        this.hide();
    }

    showCreateAccountForm() {
        // Add logic to show create account form
        console.log('Showing create account form');
    }
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create modal instances
    window.itemPropertiesModal = new ItemPropertiesModal();
    window.loginModal = new LoginModal();

    // Make openTab function globally available for inline onclick handlers
    window.openTab = function(evt, tabName) {
        window.itemPropertiesModal.openTab(tabName);
    };
});

// Export modal instances globally
window.Modal = Modal;
window.ItemPropertiesModal = ItemPropertiesModal;
window.LoginModal = LoginModal;