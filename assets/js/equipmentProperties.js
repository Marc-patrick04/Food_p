// Equipment Properties Handler
class EquipmentProperties {
    static displayProperties(properties, itemData) {
        this.updateCompositionTab(properties);
        this.updateProcessingTab(properties);
        this.updateStorageTab(properties);
        this.updateEquipmentTab(properties);
    }

    static updateCompositionTab(properties) {
        const compositionContent = document.getElementById('composition-content');
        let html = '<div class="properties-grid">';

        if (properties.technical_specs) {
            html += PropertyFormatter.wrapInSection('Technical Specifications',
                Object.entries(properties.technical_specs)
                    .map(([key, value]) => PropertyFormatter.createPropertyRow(key, value))
                    .join(''));
        }

        html += '</div>';
        compositionContent.innerHTML = html;
    }

    static updateProcessingTab(properties) {
        const processingContent = document.getElementById('processing-content');
        let html = '<div class="properties-grid">';

        if (properties.operational_parameters) {
            html += PropertyFormatter.wrapInSection('Operational Parameters',
                Object.entries(properties.operational_parameters)
                    .map(([key, value]) => PropertyFormatter.createPropertyRow(key, value))
                    .join(''));
        }

        html += '</div>';
        processingContent.innerHTML = html;
    }

    static updateStorageTab(properties) {
        const storageContent = document.getElementById('storage-content');
        let html = '<div class="properties-grid">';

        if (properties.maintenance_info) {
            html += PropertyFormatter.wrapInSection('Maintenance Information',
                Object.entries(properties.maintenance_info)
                    .map(([key, value]) => PropertyFormatter.createPropertyRow(key, value))
                    .join(''));
        }

        html += '</div>';
        storageContent.innerHTML = html;
    }

    static updateEquipmentTab(properties) {
        const equipmentContent = document.getElementById('equipment-content');
        let html = '<div class="properties-grid">';

        if (properties.safety_features) {
            html += PropertyFormatter.wrapInSection('Safety Features',
                Object.entries(properties.safety_features)
                    .map(([key, value]) => {
                        const displayValue = Array.isArray(value) ? value.join(', ') : value;
                        return PropertyFormatter.createPropertyRow(key, displayValue);
                    })
                    .join(''));
        }

        html += '</div>';
        equipmentContent.innerHTML = html;
    }
}

// Make class globally available
window.EquipmentProperties = EquipmentProperties;