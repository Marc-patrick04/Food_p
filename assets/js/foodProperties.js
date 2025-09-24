// Food Properties Handler
class FoodProperties {
    static displayProperties(components) {
        this.updateCompositionTab(components);
        this.updateProcessingTab(components);
        this.updateStorageTab(components);
        this.updateEquipmentTab(components);
    }

    static updateCompositionTab(components) {
        const compositionContent = document.getElementById('composition-content');
        let html = '<div class="properties-grid">';

        // Handle container properties
        if (components.type === 'container') {
            html += this.createContainerProperties(components);
        }
        // Handle food properties
        else {
            html += this.createFoodComposition(components);
        }

        html += '</div>';
        compositionContent.innerHTML = html;
    }

    static createContainerProperties(components) {
        let html = PropertyFormatter.wrapInSection('Container Properties', `
            ${PropertyFormatter.createPropertyRow('Type', components.type)}
            ${PropertyFormatter.createPropertyRow('Maximum Capacity', `${components.max_capacity} ${components.unit}`)}
            ${PropertyFormatter.createPropertyRow('Current Volume', `${components.current_volume} ${components.unit}`)}`
        );

        if (components.contents && components.contents.length > 0) {
            html += PropertyFormatter.wrapInSection('Current Contents',
                components.contents.map(item => 
                    PropertyFormatter.createPropertyRow(item.name, `${item.volume} ${components.unit}`)
                ).join('')
            );
        }

        return html;
    }

    static createFoodComposition(components) {
        let html = '';
        
        if (components.nutrients) {
            html += PropertyFormatter.wrapInSection('Nutritional Information',
                Object.entries(components.nutrients)
                    .map(([key, value]) => PropertyFormatter.createPropertyRow(key, value))
                    .join('')
            );
        }

        const otherProperties = Object.entries(components)
            .filter(([key]) => !['nutrients', 'processing_properties', 'storage_properties', 'equipment_requirements'].includes(key));

        if (otherProperties.length > 0) {
            html += PropertyFormatter.wrapInSection('Additional Properties',
                otherProperties.map(([key, value]) => {
                    if (typeof value === 'object') {
                        return PropertyFormatter.wrapInSection(PropertyFormatter.formatKey(key),
                            Object.entries(value)
                                .map(([subKey, subValue]) => PropertyFormatter.createPropertyRow(subKey, subValue))
                                .join('')
                        );
                    }
                    return PropertyFormatter.createPropertyRow(key, value);
                }).join('')
            );
        }

        return html;
    }

    static updateProcessingTab(components) {
        const processingContent = document.getElementById('processing-content');
        let html = '<div class="properties-grid">';

        if (components.processing_properties) {
            html += PropertyFormatter.wrapInSection('Processing Requirements',
                Object.entries(components.processing_properties)
                    .map(([key, value]) => PropertyFormatter.createPropertyRow(key, value))
                    .join('')
            );
        }

        html += '</div>';
        processingContent.innerHTML = html;
    }

    static updateStorageTab(components) {
        const storageContent = document.getElementById('storage-content');
        let html = '<div class="properties-grid">';

        if (components.storage_properties) {
            html += PropertyFormatter.wrapInSection('Storage Requirements',
                Object.entries(components.storage_properties)
                    .map(([key, value]) => PropertyFormatter.createPropertyRow(key, value))
                    .join('')
            );
        }

        html += '</div>';
        storageContent.innerHTML = html;
    }

    static updateEquipmentTab(components) {
        const equipmentContent = document.getElementById('equipment-content');
        let html = '<div class="properties-grid">';

        if (components.equipment_requirements) {
            html += PropertyFormatter.wrapInSection('Required Equipment',
                Object.entries(components.equipment_requirements)
                    .map(([key, value]) => PropertyFormatter.createPropertyRow(key, value))
                    .join('')
            );
        }

        html += '</div>';
        equipmentContent.innerHTML = html;
    }
}

// Make class globally available
window.FoodProperties = FoodProperties;