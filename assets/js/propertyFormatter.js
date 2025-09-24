// Property formatting utilities
class PropertyFormatter {
    static formatKey(key) {
        if (!key) return '';
        return key.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    static createPropertyRow(key, value) {
        return `
            <div class="property-row">
                <div class="property-label">${this.formatKey(key)}:</div>
                <div class="property-value">${value}</div>
            </div>`;
    }

    static createListItem(key, value) {
        return `<li><strong>${this.formatKey(key)}:</strong> ${value}</li>`;
    }

    static wrapInSection(title, content) {
        return `
            <div class="property-section">
                <h4>${title}</h4>
                ${content}
            </div>`;
    }
}

// Make formatter globally available
window.PropertyFormatter = PropertyFormatter;