// Properties Modal Management
document.addEventListener('DOMContentLoaded', () => {
    // Make sure we have access to these variables from script.js
    if (typeof workspaceItemsState === 'undefined') {
        console.error('workspaceItemsState is not defined');
        return;
    }
    if (typeof findToolboxItemData === 'undefined') {
        console.error('findToolboxItemData is not defined');
        return;
    }

    const itemPropertiesModal = document.getElementById('item-properties-modal');
    const itemPropertiesTitle = document.getElementById('item-properties-title');
    const propertiesCloseBtn = itemPropertiesModal.querySelector('.close-btn');

    // Helper function to format property keys
    function formatKey(key) {
        if (!key) return '';
        return key.split('_')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' ');
    }

    function closePropertiesModal() {
        itemPropertiesModal.style.display = 'none';
    }

    // Close modal when clicking the close button
    propertiesCloseBtn.addEventListener('click', closePropertiesModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target == itemPropertiesModal) {
            closePropertiesModal();
        }
    });
document.addEventListener('DOMContentLoaded', () => {
    // Make sure we have access to these variables from script.js
    if (typeof workspaceItemsState === 'undefined') {
        console.error('workspaceItemsState is not defined');
        return;
    }
    if (typeof findToolboxItemData === 'undefined') {
        console.error('findToolboxItemData is not defined');
        return;
    }
    const itemPropertiesModal = document.getElementById('item-properties-modal');
    const itemPropertiesTitle = document.getElementById('item-properties-title');
    const propertiesCloseBtn = itemPropertiesModal.querySelector('.close-btn');

    // Close modal when clicking the close button
    propertiesCloseBtn.addEventListener('click', closePropertiesModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target == itemPropertiesModal) {
            closePropertiesModal();
        }
    });

    function closePropertiesModal() {
        itemPropertiesModal.style.display = 'none';
    }

    function showItemPropertiesModal(itemId) {
        const itemState = workspaceItemsState[itemId];
        if (!itemState) return;

        const itemData = findToolboxItemData(itemState.name);
        if (!itemData) return;

        itemPropertiesTitle.textContent = `${itemData.name} Properties`;

        // For equipment items
        if (itemData.properties) {
            displayEquipmentProperties(itemData.properties);
        }
        // For food items
        else if (itemData.components) {
            displayFoodProperties(itemData.components);
        }

        itemPropertiesModal.style.display = 'block';
    }

    function displayEquipmentProperties(properties) {
        // Composition tab (Technical Specs)
        let compositionHTML = '<ul>';
        if (properties.technical_specs) {
            for (const [key, value] of Object.entries(properties.technical_specs)) {
                compositionHTML += `<li><strong>${formatLabel(key)}:</strong> ${value}</li>`;
            }
        }
        compositionHTML += '</ul>';
        document.getElementById('composition-content').innerHTML = compositionHTML;

        // Processing tab (Operational Parameters)
        let processingHTML = '<ul>';
        if (properties.operational_parameters) {
            for (const [key, value] of Object.entries(properties.operational_parameters)) {
                if (Array.isArray(value)) {
                    processingHTML += `<li><strong>${formatLabel(key)}:</strong> ${value.join(', ')}</li>`;
                } else {
                    processingHTML += `<li><strong>${formatLabel(key)}:</strong> ${value}</li>`;
                }
            }
        }
        processingHTML += '</ul>';
        document.getElementById('processing-content').innerHTML = processingHTML;

        // Storage tab (Maintenance Info)
        let storageHTML = '<ul>';
        if (properties.maintenance_info) {
            for (const [key, value] of Object.entries(properties.maintenance_info)) {
                storageHTML += `<li><strong>${formatLabel(key)}:</strong> ${value}</li>`;
            }
        }
        storageHTML += '</ul>';
        document.getElementById('storage-content').innerHTML = storageHTML;

        // Equipment tab (Safety Features)
        let equipmentHTML = '<ul>';
        if (properties.safety_features) {
            for (const [key, value] of Object.entries(properties.safety_features)) {
                if (Array.isArray(value)) {
                    equipmentHTML += `<li><strong>${formatLabel(key)}:</strong> ${value.join(', ')}</li>`;
                } else {
                    equipmentHTML += `<li><strong>${formatLabel(key)}:</strong> ${value}</li>`;
                }
            }
        }
        equipmentHTML += '</ul>';
        document.getElementById('equipment-content').innerHTML = equipmentHTML;
    }

    function displayFoodProperties(components) {
        // Composition tab
        let compositionHTML = '<ul>';
        if (components.nutrients) {
            compositionHTML += '<li><strong>Nutrients:</strong><ul>';
            for (const [key, value] of Object.entries(components.nutrients)) {
                compositionHTML += `<li><strong>${formatLabel(key)}:</strong> ${value}</li>`;
            }
            compositionHTML += '</ul></li>';
        }

        // Add other composition components
        for (const [category, value] of Object.entries(components)) {
            if (category !== 'nutrients' && category !== 'processing_properties' && 
                category !== 'storage_properties' && category !== 'equipment_requirements') {
                compositionHTML += `<li><strong>${formatLabel(category)}:</strong>`;
                if (typeof value === 'object') {
                    compositionHTML += '<ul>';
                    for (const [subKey, subValue] of Object.entries(value)) {
                        if (Array.isArray(subValue)) {
                            compositionHTML += `<li><strong>${formatLabel(subKey)}:</strong> ${subValue.join(', ')}</li>`;
                        } else {
                            compositionHTML += `<li><strong>${formatLabel(subKey)}:</strong> ${subValue}</li>`;
                        }
                    }
                    compositionHTML += '</ul>';
                } else {
                    compositionHTML += ` ${value}`;
                }
                compositionHTML += '</li>';
            }
        }
        compositionHTML += '</ul>';
        document.getElementById('composition-content').innerHTML = compositionHTML;

        // Processing tab
        let processingHTML = '<ul>';
        if (components.processing_properties) {
            for (const [key, value] of Object.entries(components.processing_properties)) {
                processingHTML += `<li><strong>${formatLabel(key)}:</strong> ${value}</li>`;
            }
        } else {
            processingHTML += '<li>No processing information available</li>';
        }
        processingHTML += '</ul>';
        document.getElementById('processing-content').innerHTML = processingHTML;

        // Storage tab
        let storageHTML = '<ul>';
        if (components.storage_properties) {
            for (const [key, value] of Object.entries(components.storage_properties)) {
                storageHTML += `<li><strong>${formatLabel(key)}:</strong> ${value}</li>`;
            }
        } else {
            storageHTML += '<li>No storage information available</li>';
        }
        storageHTML += '</ul>';
        document.getElementById('storage-content').innerHTML = storageHTML;

        // Equipment tab
        let equipmentHTML = '<ul>';
        if (components.equipment_requirements) {
            for (const [key, value] of Object.entries(components.equipment_requirements)) {
                equipmentHTML += `<li><strong>${formatLabel(key)}:</strong> ${value}</li>`;
            }
        } else {
            equipmentHTML += '<li>No equipment requirements specified</li>';
        }
        equipmentHTML += '</ul>';
        document.getElementById('equipment-content').innerHTML = equipmentHTML;
    }

    // Helper function to format labels
    function formatKey(key) {
        return key.split('_')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' ');
    }

    // Attach the double-click handler to workspace items
    document.getElementById('simulation-area').addEventListener('dblclick', (e) => {
        const workspaceItem = e.target.closest('.workspace-item');
        if (workspaceItem) {
            const itemId = workspaceItem.getAttribute('data-id');
            showItemPropertiesModal(itemId);
        }
    });
});