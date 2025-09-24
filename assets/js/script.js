// Function to show item properties modal
window.showItemProperties = function(itemId) {
    const itemPropertiesModal = document.getElementById('item-properties-modal');
    const itemPropertiesTitle = document.getElementById('item-properties-title');
    
    const itemState = window.workspaceItemsState[itemId];
    if (!itemState) {
        console.error('No item state found for ID:', itemId);
        return;
    }

    const itemData = findToolboxItemData(itemState.name);
    if (!itemData) {
        console.error('No item data found for name:', itemState.name);
        return;
    }

    console.log('Showing properties for:', itemState.name);
    
    // Initialize in-process state if it doesn't exist
    if (!itemState.inProcess) {
        itemState.inProcess = {
            status: 'idle',
            contents: [],
            currentOperation: null,
            timeElapsed: 0,
            properties: {}
        };
    }

    // Set the title
    itemPropertiesTitle.textContent = `${itemData.name} Properties`;
    
    // Store current item ID for controls
    window.currentItemId = itemId;

    // Update all tabs based on item type
    if (itemData.properties) {
        displayCompositionContent(itemData.properties);
        if (typeof displayEquipmentProperties === 'function') {
            displayEquipmentProperties(itemData.properties, itemData);
        }
        if (typeof displayInProcessContent === 'function') {
            displayInProcessContent(itemState, itemData);
        }
    } else if (itemData.components) {
        displayCompositionContent(itemData.components);
        if (typeof displayFoodProperties === 'function') {
            displayFoodProperties(itemData.components);
        }
    }

    // Show the modal
    itemPropertiesModal.style.display = 'block';

    // Ensure the close button works
    const closeBtn = itemPropertiesModal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = function() {
            itemPropertiesModal.style.display = 'none';
        };
    }

    // Close when clicking outside the modal
    window.onclick = function(event) {
        if (event.target === itemPropertiesModal) {
            itemPropertiesModal.style.display = 'none';
        }
    };
}

// Make functions globally available
window.showItemProperties = showItemProperties;

window.findToolboxItemData = function(itemName) {
    for (const category in toolboxData) {
        for (const subcategory in toolboxData[category]) {
            const items = toolboxData[category][subcategory];
            const itemData = items.find(item => item.name === itemName);
            if (itemData) {
                return itemData;
            }
        }
    }
    return null;
};

document.addEventListener('DOMContentLoaded', () => {
    // --- Timer and Top Bar Logic ---
    const timerElement = document.getElementById('timer');
    let seconds = 0;

    function updateTimer() {
        seconds++;
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        timerElement.textContent = `${h}:${m}:${s}`;
    }

    setInterval(updateTimer, 1000);

    // --- Mode Toggle Logic ---
    const realtimeBtn = document.getElementById('realtime-btn');
    const simulationBtn = document.getElementById('simulation-btn');
    
    realtimeBtn.addEventListener('click', () => {
        realtimeBtn.classList.add('active');
        simulationBtn.classList.remove('active');
    });

    simulationBtn.addEventListener('click', () => {
        simulationBtn.classList.add('active');
        realtimeBtn.classList.remove('active');
    });

    // --- Right Panel Logic ---
    const toggleRecipeStepsBtn = document.getElementById('toggle-recipe-steps');
    const recipeStepsWindow = document.getElementById('recipe-steps-window');

    toggleRecipeStepsBtn.addEventListener('click', () => {
        recipeStepsWindow.style.display = recipeStepsWindow.style.display === 'none' ? 'block' : 'none';
    });

    const mainCategoriesContainer = document.getElementById('toolbox-main-categories-container');
    const subcategoriesContainer = document.getElementById('toolbox-subcategories-container');
    const itemsContainer = document.getElementById('toolbox-items-container');

    let selectedMainCategory = null;
    let selectedSubCategory = null;

    function clearSelection(container) {
        const selected = container.querySelector('.selected');
        if (selected) {
            selected.classList.remove('selected');
        }
    }

    function populateMainCategories() {
        mainCategoriesContainer.innerHTML = '';
        for (const category in toolboxData) {
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('main-category-item');
            categoryElement.textContent = category;
            categoryElement.addEventListener('click', () => {
                clearSelection(mainCategoriesContainer);
                categoryElement.classList.add('selected');
                selectedMainCategory = category;
                populateSubCategories(category);
                itemsContainer.innerHTML = ''; // Clear items when main category changes
            });
            mainCategoriesContainer.appendChild(categoryElement);
        }
    }

    function populateSubCategories(mainCategory) {
        subcategoriesContainer.innerHTML = '';
        const subcategories = toolboxData[mainCategory];
        for (const subcategory in subcategories) {
            const subcategoryElement = document.createElement('div');
            subcategoryElement.classList.add('subcategory-item');
            subcategoryElement.textContent = subcategory;
            subcategoryElement.addEventListener('click', () => {
                clearSelection(subcategoriesContainer);
                subcategoryElement.classList.add('selected');
                selectedSubCategory = subcategory;
                populateItems(mainCategory, subcategory);
            });
            subcategoriesContainer.appendChild(subcategoryElement);
        }
    }

    function populateItems(mainCategory, subCategory) {
        itemsContainer.innerHTML = '';
        const items = toolboxData[mainCategory][subCategory];
        items.forEach(itemData => {
            const item = document.createElement('div');
            item.classList.add('toolbox-item');
            item.setAttribute('draggable', true);
            item.setAttribute('data-item-name', itemData.name);

            const img = document.createElement('img');
            img.src = itemData.image;
            item.appendChild(img);

            const span = document.createElement('span');
            span.textContent = itemData.name;
            item.appendChild(span);

            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('item-name', itemData.name);
            });

            itemsContainer.appendChild(item);
        });
    }

    populateMainCategories();

    // --- Existing Simulation Area and Properties Panel Logic ---


    // --- Item Properties Modal Logic ---
    const itemPropertiesModal = document.getElementById('item-properties-modal');
    const itemPropertiesTitle = document.getElementById('item-properties-title');
    const physicalPropertiesContent = document.getElementById('physical-properties-content');
    const cliContent = document.getElementById('cli-content');
    const propertiesCloseBtn = itemPropertiesModal.querySelector('.close-btn');

    function showItemPropertiesModal(itemId) {
        const itemState = workspaceItemsState[itemId];
        if (!itemState) return;

        const itemData = findToolboxItemData(itemState.name);
        if (!itemData) return;

        itemPropertiesTitle.textContent = `${itemData.name} Properties`;

        // Populate Physical Tab with properties
        let physicalHTML = '<ul>';
        
        // Check if it's equipment (has properties field)
        if (itemData.properties) {
            // Technical Specifications
            if (itemData.properties.technical_specs) {
                physicalHTML += '<li><strong>Technical Specifications:</strong><ul>';
                for (const [key, value] of Object.entries(itemData.properties.technical_specs)) {
                    physicalHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`;
                }
                physicalHTML += '</ul></li>';
            }

            // Operational Parameters
            if (itemData.properties.operational_parameters) {
                physicalHTML += '<li><strong>Operational Parameters:</strong><ul>';
                for (const [key, value] of Object.entries(itemData.properties.operational_parameters)) {
                    if (Array.isArray(value)) {
                        physicalHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value.join(', ')}</li>`;
                    } else {
                        physicalHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`;
                    }
                }
                physicalHTML += '</ul></li>';
            }

            // Maintenance Information
            if (itemData.properties.maintenance_info) {
                physicalHTML += '<li><strong>Maintenance Information:</strong><ul>';
                for (const [key, value] of Object.entries(itemData.properties.maintenance_info)) {
                    physicalHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`;
                }
                physicalHTML += '</ul></li>';
            }

            // Safety Features
            if (itemData.properties.safety_features) {
                physicalHTML += '<li><strong>Safety Features:</strong><ul>';
                for (const [key, value] of Object.entries(itemData.properties.safety_features)) {
                    if (Array.isArray(value)) {
                        physicalHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value.join(', ')}</li>`;
                    } else {
                        physicalHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`;
                    }
                }
                physicalHTML += '</ul></li>';
            }
        }
        // Check for food item properties (components)
        else if (itemData.components) {
            // Add basic nutritional info if available
            if (itemData.components.nutrients) {
                physicalHTML += '<li><strong>Nutrients:</strong><ul>';
                for (const [key, value] of Object.entries(itemData.components.nutrients)) {
                    physicalHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`;
                }
                physicalHTML += '</ul></li>';
            }

            // Add other components
            for (const [category, value] of Object.entries(itemData.components)) {
                if (category !== 'nutrients') {
                    physicalHTML += `<li><strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong>`;
                    if (typeof value === 'object') {
                        physicalHTML += '<ul>';
                        for (const [subKey, subValue] of Object.entries(value)) {
                            if (Array.isArray(subValue)) {
                                physicalHTML += `<li><strong>${subKey}:</strong> ${subValue.join(', ')}</li>`;
                            } else {
                                physicalHTML += `<li><strong>${subKey}:</strong> ${subValue}</li>`;
                            }
                        }
                        physicalHTML += '</ul>';
                    } else {
                        physicalHTML += ` ${value}`;
                    }
                    physicalHTML += '</li>';
                }
            }
        }
        
        // If no properties found
        if (physicalHTML === '<ul>') {
            physicalHTML += '<li>No properties available</li>';
        }
        
        physicalHTML += '</ul>';
        physicalPropertiesContent.innerHTML = physicalHTML;



        itemPropertiesModal.style.display = 'block';
    }

    function formatProperties(data) {
        if (typeof data === 'object' && data !== null) {
            let html = '<ul>';
            for (const key in data) {
                html += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${formatProperties(data[key])}</li>`;
            }
            html += '</ul>';
            return html;
        } else {
            return data;
        }
    }

    function closePropertiesModal() {
        itemPropertiesModal.style.display = 'none';
    }

    propertiesCloseBtn.addEventListener('click', closePropertiesModal);

    // Add double-click event listener to workspace items
    // Double-click handling moved to properties.js

    function updatePropertiesPanel(itemId) {
        const itemState = workspaceItemsState[itemId];
        if (!itemState) {
            propertiesContent.innerHTML = '<p>Select an item to see its properties.</p>';
            return;
        }

        let specificProperties = '';
        if (itemState.name.toLowerCase() === 'tomato') {
            specificProperties = '<p>Protein: 1.1g</p><p>Vitamin C: 13.7mg</p>';
        }

        let ingredientsHTML = '';
        if (itemState.ingredients.length > 0) {
            ingredientsHTML += '<h5>Ingredients:</h5><ul>';
            itemState.ingredients.forEach(ing => {
                ingredientsHTML += `<li>${ing.name} (${ing.quantity} ${ing.unit})</li>`;
            });
            ingredientsHTML += '</ul>';
        }

        propertiesContent.innerHTML = `
            <h4>${itemState.name}</h4>
            <label for="quantity">Quantity:</label>
            <input type="text" id="quantity" value="${itemState.quantity}" data-id="${itemId}">
            <label for="unit">Unit:</label>
            <input type="text" id="unit" value="${itemState.unit}" data-id="${itemId}">
            ${specificProperties}
            ${ingredientsHTML}
        `;
    }


    // --- Existing Modal Logic ---

    const loginModal = document.getElementById('login-modal');
    const loginBtn = document.getElementById('login-btn');
    const closeBtn = document.querySelector('.close-btn');

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target == itemPropertiesModal) {
            closePropertiesModal();
        }
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Placeholder for login logic
        console.log('Login form submitted');
        loginModal.style.display = 'none';
    });

});
