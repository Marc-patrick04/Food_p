// Properties Display Manager
class PropertiesManager {
    static displayProperties(itemId, itemData) {
        if (itemData.properties) {
            EquipmentProperties.displayProperties(itemData.properties, itemData);
        } else if (itemData.components) {
            FoodProperties.displayProperties(itemData.components);
        }
    }
}

// Function to display composition content
function displayCompositionContent(data) {
    const compositionContent = document.getElementById('composition-content');
    let html = '<div class="properties-grid">';

    // Handle equipment properties
    if (data.technical_specs) {
        html += '<h4>Technical Specifications</h4>';
        for (const [key, value] of Object.entries(data.technical_specs)) {
            html += `
                <div class="property-row">
                    <div class="property-label">${formatKey(key)}:</div>
                    <div class="property-value">${value}</div>
                </div>`;
        }
    }

    // Handle container properties
    if (data.type === 'container') {
        html += '<h4>Container Properties</h4>';
        html += `
            <div class="property-row">
                <div class="property-label">Type:</div>
                <div class="property-value">${data.type}</div>
            </div>
            <div class="property-row">
                <div class="property-label">Maximum Capacity:</div>
                <div class="property-value">${data.max_capacity} ${data.unit}</div>
            </div>
            <div class="property-row">
                <div class="property-label">Current Volume:</div>
                <div class="property-value">${data.current_volume} ${data.unit}</div>
            </div>`;
    }

    // Handle other properties if they exist
    const otherProperties = Object.entries(data).filter(([key]) => 
        !['technical_specs', 'type', 'max_capacity', 'current_volume', 'unit', 'in_process', 'contents'].includes(key)
    );

    if (otherProperties.length > 0) {
        html += '<h4>Additional Properties</h4>';
        for (const [key, value] of otherProperties) {
            if (typeof value === 'object') {
                html += `<h5>${formatKey(key)}</h5>`;
                for (const [subKey, subValue] of Object.entries(value)) {
                    html += `
                        <div class="property-row">
                            <div class="property-label">${formatKey(subKey)}:</div>
                            <div class="property-value">${subValue}</div>
                        </div>`;
                }
            } else {
                html += `
                    <div class="property-row">
                        <div class="property-label">${formatKey(key)}:</div>
                        <div class="property-value">${value}</div>
                    </div>`;
            }
        }
    }

    html += '</div>';
    compositionContent.innerHTML = html;
}

// Make all functions globally available
window.displayCompositionContent = displayCompositionContent;
window.displayCompositionContent = displayCompositionContent;
window.displayEquipmentProperties = function(properties, itemData) {
    // Get the composition content div
    const compositionContent = document.getElementById('composition-content');
    let html = '<ul class="properties-list">';
    
    if (properties.technical_specs) {
        for (const [key, value] of Object.entries(properties.technical_specs)) {
            html += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
        }
    }
    html += '</ul>';
    compositionContent.innerHTML = html;

    // Update processing tab
    const processingContent = document.getElementById('processing-content');
    html = '<ul class="properties-list">';
    if (properties.operational_parameters) {
        for (const [key, value] of Object.entries(properties.operational_parameters)) {
            html += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
        }
    }
    html += '</ul>';
    processingContent.innerHTML = html;
};

window.displayFoodProperties = function(components) {
    const compositionContent = document.getElementById('composition-content');
    let html = '<ul class="properties-list">';
    
    if (components.nutrients) {
        html += '<li><strong>Nutrients:</strong><ul>';
        for (const [key, value] of Object.entries(components.nutrients)) {
            html += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
        }
        html += '</ul></li>';
    }
    html += '</ul>';
    compositionContent.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', () => {
    const itemPropertiesModal = document.getElementById('item-properties-modal');
    const propertiesCloseBtn = itemPropertiesModal.querySelector('.close-btn');

    // Helper function to format property keys
    function formatKey(key) {
        if (!key) return '';
        return key.split('_')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' ');
    }

    function displayInProcessContent(itemState, itemData) {
        const inProcessContent = document.getElementById('in-process-content');
        let html = '<div class="in-process-container">';

        if (itemData.name === 'Blender') {
            // Blender specific controls
            html += `
                <div class="process-status">
                    <h4>Current Status: ${itemState.inProcess.status}</h4>
                    ${itemState.inProcess.currentOperation ? 
                      `<p>Operation: ${itemState.inProcess.currentOperation}</p>` : ''}
                </div>
                
                <div class="contents-section">
                    <h4>Container Contents</h4>
                    ${itemState.inProcess.contents.length === 0 ? 
                      '<p>Blender is empty</p>' :
                      '<ul class="contents-list">' +
                      itemState.inProcess.contents.map(item => 
                          `<li>${item.name} - ${item.volume}ml</li>`
                      ).join('') +
                      '</ul>'
                    }
                </div>

                <div class="add-ingredients">
                    <h4>Add Ingredients</h4>
                    <select id="ingredient-select">
                        <option value="">Select ingredient...</option>
                        <option value="water">Water</option>
                        <option value="orange_juice">Orange Juice</option>
                        <option value="apple_juice">Apple Juice</option>
                        <option value="milk">Milk</option>
                    </select>
                    <div class="volume-control">
                        <input type="number" id="volume-input" min="50" max="500" value="100" step="50">
                        <span>ml</span>
                    </div>
                    <button id="add-to-blender" class="action-button">Add to Blender</button>
                </div>

                <div class="blender-controls">
                    <h4>Blender Controls</h4>
                    <div class="control-group">
                        <button id="power-toggle" class="control-button ${itemState.inProcess.status === 'on' ? 'active' : ''}">
                            ${itemState.inProcess.status === 'on' ? 'Power Off' : 'Power On'}
                        </button>
                        
                        <div class="speed-control">
                            <label>Speed:</label>
                            <input type="range" id="speed-control" min="1" max="5" value="1" 
                                   ${itemState.inProcess.status !== 'on' ? 'disabled' : ''}>
                            <span id="speed-value">1</span>
                        </div>
                        
                        <button id="start-blending" class="control-button"
                                ${!itemState.inProcess.contents.length || itemState.inProcess.status !== 'on' ? 'disabled' : ''}>
                            Start Blending
                        </button>
                    </div>
                </div>`;
                
            if (itemState.inProcess.result) {
                html += `
                    <div class="process-result">
                        <h4>Result</h4>
                        <p>${itemState.inProcess.result}</p>
                    </div>`;
            }
        } else {
            // Generic content for other items
            html += `
                <p>No in-process operations available for this item.</p>`;
        }

        html += '</div>';
        inProcessContent.innerHTML = html;
        
        // Add event listeners for the controls
        if (itemData.name === 'Blender') {
            setupBlenderControls(itemState);
        }
    }

    function closePropertiesModal() {
        itemPropertiesModal.style.display = 'none';
    }

    function showItemPropertiesModal(itemId) {
        const itemState = workspaceItemsState[itemId];
        if (!itemState) {
            console.log('No item state found for ID:', itemId);
            return;
        }

        const itemData = findToolboxItemData(itemState.name);
        if (!itemData) {
            console.log('No item data found for name:', itemState.name);
            return;
        }

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

        itemPropertiesTitle.textContent = `${itemData.name} Properties`;
        
        // Store current item ID for controls
        window.currentItemId = itemId;

        // Update all tabs based on item type
        if (itemData.properties) {
            displayEquipmentProperties(itemData.properties, itemData);
            displayInProcessContent(itemState, itemData);
            
            // Add event listeners for blender controls if it's a blender
            if (itemData.name === 'Blender') {
                setTimeout(() => {
                    setupBlenderControls(itemData.properties, itemId);
                }, 0);
            }
        } else if (itemData.components) {
            displayFoodProperties(itemData.components);
        }

        // Show the modal
        itemPropertiesModal.style.display = 'block';
    }

    function displayEquipmentProperties(properties, itemData) {
        // Add controls if it's a blender
        const isBlender = itemData.name === 'Blender';
        
        // Composition tab (Technical Specs + Ingredients for blender)
        let compositionHTML = '<ul class="properties-list">';
        if (properties.technical_specs) {
            for (const [key, value] of Object.entries(properties.technical_specs)) {
                compositionHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
            }
        }
        
        // Add ingredients list and controls for blender
        if (isBlender) {
            compositionHTML += '</ul><div class="blender-controls">';
            compositionHTML += '<h3>Blender Contents:</h3>';
            compositionHTML += '<ul class="ingredients-list">';
            if (properties.operational_parameters.contents.length === 0) {
                compositionHTML += '<li>No ingredients added</li>';
            } else {
                properties.operational_parameters.contents.forEach(ingredient => {
                    compositionHTML += `<li>${ingredient}</li>`;
                });
            }
            compositionHTML += '</ul>';
            compositionHTML += '<div class="add-ingredient-control">';
            compositionHTML += '<select id="ingredient-select"><option value="">Select ingredient...</option>';
            // Add available ingredients
            const ingredients = ['Banana', 'Orange', 'Apple', 'Mango'];
            ingredients.forEach(ing => {
                compositionHTML += `<option value="${ing.toLowerCase()}">${ing}</option>`;
            });
            compositionHTML += '</select>';
            compositionHTML += '<button id="add-ingredient-btn">Add Ingredient</button>';
            compositionHTML += '</div>';
            compositionHTML += '</div>';
        } else {
            compositionHTML += '</ul>';
        }
        
        document.getElementById('composition-content').innerHTML = compositionHTML;

        // Processing tab (Operational Parameters)
        let processingHTML = '<ul class="properties-list">';
        if (properties.operational_parameters) {
            for (const [key, value] of Object.entries(properties.operational_parameters)) {
                if (key !== 'contents' && !Array.isArray(value)) {
                    processingHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
                }
            }
        }
        processingHTML += '</ul>';
        
        // Add blender controls if it's a blender
        if (isBlender) {
            processingHTML += '<div class="blender-controls">';
            processingHTML += '<h3>Blender Controls:</h3>';
            
            // Power control
            const powerStatus = properties.operational_parameters.power_status;
            processingHTML += `
                <div class="control-group">
                    <button id="power-btn" class="${powerStatus === 'on' ? 'active' : ''}">
                        ${powerStatus === 'on' ? 'Power Off' : 'Power On'}
                    </button>
                </div>`;
            
            // Speed control
            const currentSpeed = parseInt(properties.operational_parameters.current_speed) || 0;
            processingHTML += `
                <div class="control-group">
                    <label for="speed-control">Speed Control:</label>
                    <input type="range" id="speed-control" 
                           min="0" max="5" value="${currentSpeed}" 
                           ${powerStatus === 'off' ? 'disabled' : ''}>
                    <span id="speed-display">${currentSpeed}</span>
                </div>`;
            
            // Blend control
            processingHTML += `
                <div class="control-group">
                    <button id="blend-btn" ${powerStatus === 'off' || properties.operational_parameters.contents.length < 2 ? 'disabled' : ''}>
                        Start Blending
                    </button>
                    <div id="blend-progress" style="display: none;">
                        <div class="progress-bar"></div>
                    </div>
                </div>`;
            
            // Result display
            processingHTML += `
                <div id="blend-result" class="blend-result" style="display: none;">
                    <h4>Blending Result:</h4>
                    <p id="result-text"></p>
                </div>`;
            
            processingHTML += '</div>';
        }
        
        document.getElementById('processing-content').innerHTML = processingHTML;

        // Storage tab (Maintenance Info)
        let storageHTML = '<ul class="properties-list">';
        if (properties.maintenance_info) {
            for (const [key, value] of Object.entries(properties.maintenance_info)) {
                storageHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
            }
        }
        storageHTML += '</ul>';
        document.getElementById('storage-content').innerHTML = storageHTML;

        // Equipment tab (Safety Features)
        let equipmentHTML = '<ul class="properties-list">';
        if (properties.safety_features) {
            for (const [key, value] of Object.entries(properties.safety_features)) {
                if (Array.isArray(value)) {
                    equipmentHTML += `<li><strong>${formatKey(key)}:</strong> ${value.join(', ')}</li>`;
                } else {
                    equipmentHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
                }
            }
        }
        equipmentHTML += '</ul>';
        document.getElementById('equipment-content').innerHTML = equipmentHTML;
    }

    function displayFoodProperties(components) {
        // Check if this is a mixing container
        if (components.type === 'container') {
            let compositionHTML = '<div class="mixing-container">';
            
            // Container status
            compositionHTML += '<div class="container-status">';
            compositionHTML += `<h3>Container Status</h3>`;
            compositionHTML += '<ul class="properties-list">';
            compositionHTML += `<li><strong>Current Volume:</strong> ${components.current_volume}${components.unit}</li>`;
            compositionHTML += `<li><strong>Maximum Capacity:</strong> ${components.max_capacity}${components.unit}</li>`;
            compositionHTML += `<li><strong>Available Space:</strong> ${components.max_capacity - components.current_volume}${components.unit}</li>`;
            compositionHTML += '</ul></div>';

            // Current contents
            compositionHTML += '<div class="current-contents">';
            compositionHTML += '<h3>Current Contents</h3>';
            if (components.contents.length === 0) {
                compositionHTML += '<p>Container is empty</p>';
            } else {
                compositionHTML += '<ul class="properties-list">';
                components.contents.forEach(item => {
                    compositionHTML += `<li><strong>${item.name}:</strong> ${item.volume}${components.unit}</li>`;
                });
                compositionHTML += '</ul>';
            }
            compositionHTML += '</div>';

            // Add ingredients controls
            compositionHTML += '<div class="add-ingredient-section">';
            compositionHTML += '<h3>Add Liquid</h3>';
            compositionHTML += '<div class="ingredient-controls">';
            compositionHTML += '<select id="liquid-select"><option value="">Select liquid...</option>';
            
            // Available liquids
            const liquids = [
                { name: 'Water', color: 'clear' },
                { name: 'Orange Juice', color: 'orange' },
                { name: 'Apple Juice', color: 'light yellow' },
                { name: 'Grape Juice', color: 'purple' },
                { name: 'Milk', color: 'white' }
            ];
            
            liquids.forEach(liquid => {
                compositionHTML += `<option value="${liquid.name}" data-color="${liquid.color}">${liquid.name}</option>`;
            });
            
            compositionHTML += '</select>';
            compositionHTML += '<input type="number" id="volume-input" min="1" max="1000" value="100" step="10">';
            compositionHTML += `<span class="unit">${components.unit}</span>`;
            compositionHTML += '<button id="add-liquid-btn" class="action-btn">Add</button>';
            compositionHTML += '</div></div>';

            // Mixture properties
            if (components.in_process.contents.length > 0) {
                compositionHTML += '<div class="mixture-properties">';
                compositionHTML += '<h3>Mixture Properties</h3>';
                compositionHTML += '<ul class="properties-list">';
                for (const [key, value] of Object.entries(components.in_process.properties)) {
                    compositionHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
                }
                compositionHTML += '</ul>';
                
                // Add mix button if there are at least 2 ingredients
                if (components.contents.length >= 2) {
                    compositionHTML += '<button id="mix-contents-btn" class="action-btn">Mix Contents</button>';
                }
                
                compositionHTML += '</div>';
            }

            compositionHTML += '</div>';
            document.getElementById('composition-content').innerHTML = compositionHTML;
            
            // Set up event handlers
            setupMixingControls(components);
            
            return;
        }
        
        // Regular food items
        let compositionHTML = '<ul class="properties-list">';
        if (components.nutrients) {
            compositionHTML += '<li><strong>Nutrients:</strong><ul>';
            for (const [key, value] of Object.entries(components.nutrients)) {
                compositionHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
            }
            compositionHTML += '</ul></li>';

        // Add other composition components
        for (const [category, value] of Object.entries(components)) {
            if (category !== 'nutrients' && category !== 'processing_properties' && 
                category !== 'storage_properties' && category !== 'equipment_requirements') {
                compositionHTML += `<li><strong>${formatKey(category)}:</strong>`;
                if (typeof value === 'object') {
                    compositionHTML += '<ul>';
                    for (const [subKey, subValue] of Object.entries(value)) {
                        if (Array.isArray(subValue)) {
                            compositionHTML += `<li><strong>${formatKey(subKey)}:</strong> ${subValue.join(', ')}</li>`;
                        } else {
                            compositionHTML += `<li><strong>${formatKey(subKey)}:</strong> ${subValue}</li>`;
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
        let processingHTML = '<ul class="properties-list">';
        if (components.processing_properties) {
            for (const [key, value] of Object.entries(components.processing_properties)) {
                processingHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
            }
        } else {
            processingHTML += '<li>No processing information available</li>';
        }
        processingHTML += '</ul>';
        document.getElementById('processing-content').innerHTML = processingHTML;

        // Storage tab
        let storageHTML = '<ul class="properties-list">';
        if (components.storage_properties) {
            for (const [key, value] of Object.entries(components.storage_properties)) {
                storageHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
            }
        } else {
            storageHTML += '<li>No storage information available</li>';
        }
        storageHTML += '</ul>';
        document.getElementById('storage-content').innerHTML = storageHTML;

        // Equipment tab
        let equipmentHTML = '<ul class="properties-list">';
        if (components.equipment_requirements) {
            for (const [key, value] of Object.entries(components.equipment_requirements)) {
                equipmentHTML += `<li><strong>${formatKey(key)}:</strong> ${value}</li>`;
            }
        } else {
            equipmentHTML += '<li>No equipment requirements specified</li>';
        }
        equipmentHTML += '</ul>';
        document.getElementById('equipment-content').innerHTML = equipmentHTML;
    }

    // Close modal when clicking the close button
    propertiesCloseBtn.addEventListener('click', closePropertiesModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target == itemPropertiesModal) {
            closePropertiesModal();
        }
    });

    function setupBlenderControls(properties, itemId) {
        const powerBtn = document.getElementById('power-btn');
        const speedControl = document.getElementById('speed-control');
        const speedDisplay = document.getElementById('speed-display');
        const blendBtn = document.getElementById('blend-btn');
        const addIngredientBtn = document.getElementById('add-ingredient-btn');
        const ingredientSelect = document.getElementById('ingredient-select');

        if (powerBtn) {
            powerBtn.addEventListener('click', () => {
                const newStatus = properties.operational_parameters.power_status === 'off' ? 'on' : 'off';
                properties.operational_parameters.power_status = newStatus;
                powerBtn.textContent = newStatus === 'on' ? 'Power Off' : 'Power On';
                powerBtn.classList.toggle('active');
                speedControl.disabled = newStatus === 'off';
                updateBlendButton();
            });
        }

        if (speedControl) {
            speedControl.addEventListener('input', () => {
                properties.operational_parameters.current_speed = speedControl.value;
                speedDisplay.textContent = speedControl.value;
            });
        }

        if (addIngredientBtn && ingredientSelect) {
            addIngredientBtn.addEventListener('click', () => {
                const ingredient = ingredientSelect.value;
                if (ingredient) {
                    properties.operational_parameters.contents.push(ingredient);
                    // Refresh the modal to update the ingredients list
                    showItemPropertiesModal(itemId);
                }
            });
        }

        if (blendBtn) {
            blendBtn.addEventListener('click', () => {
                if (properties.operational_parameters.power_status === 'off') return;

                const blendProgress = document.getElementById('blend-progress');
                const resultDisplay = document.getElementById('blend-result');
                const resultText = document.getElementById('result-text');

                // Start blending animation
                blendBtn.disabled = true;
                blendProgress.style.display = 'block';
                
                // Simulate blending process
                setTimeout(() => {
                    const ingredients = properties.operational_parameters.contents;
                    const speed = parseInt(properties.operational_parameters.current_speed);
                    let result = '';

                    if (speed <= 2) {
                        result = `Chunky ${ingredients.join(' and ')} mixture`;
                    } else if (speed <= 4) {
                        result = `Well-blended ${ingredients.join(' and ')} smoothie`;
                    } else {
                        result = `Super smooth ${ingredients.join(' and ')} purée`;
                    }

                    // Show result
                    blendProgress.style.display = 'none';
                    resultDisplay.style.display = 'block';
                    resultText.textContent = result;

                    // Clear ingredients after blending
                    properties.operational_parameters.contents = [];
                    
                    // Refresh the modal
                    setTimeout(() => {
                        showItemPropertiesModal(itemId);
                    }, 2000);
                }, 3000);
            });
        }

        function updateBlendButton() {
            if (blendBtn) {
                const canBlend = properties.operational_parameters.power_status === 'on' && 
                               properties.operational_parameters.contents.length >= 2;
                blendBtn.disabled = !canBlend;
            }
        }

        updateBlendButton();
    }

    function setupBlenderControls(itemState) {
        // Get control elements
        const powerToggle = document.getElementById('power-toggle');
        const speedControl = document.getElementById('speed-control');
        const speedValue = document.getElementById('speed-value');
        const startBlending = document.getElementById('start-blending');
        const ingredientSelect = document.getElementById('ingredient-select');
        const volumeInput = document.getElementById('volume-input');
        const addToBlender = document.getElementById('add-to-blender');

        // Power toggle
        if (powerToggle) {
            powerToggle.addEventListener('click', () => {
                itemState.inProcess.status = itemState.inProcess.status === 'on' ? 'off' : 'on';
                powerToggle.textContent = itemState.inProcess.status === 'on' ? 'Power Off' : 'Power On';
                powerToggle.classList.toggle('active');
                speedControl.disabled = itemState.inProcess.status !== 'on';
                startBlending.disabled = !itemState.inProcess.contents.length || itemState.inProcess.status !== 'on';
                showItemPropertiesModal(window.currentItemId);
            });
        }

        // Speed control
        if (speedControl && speedValue) {
            speedControl.addEventListener('input', () => {
                speedValue.textContent = speedControl.value;
                itemState.inProcess.speed = parseInt(speedControl.value);
            });
        }

        // Add ingredients
        if (addToBlender && ingredientSelect && volumeInput) {
            addToBlender.addEventListener('click', () => {
                const ingredient = ingredientSelect.value;
                const volume = parseInt(volumeInput.value);
                
                if (!ingredient || volume <= 0) {
                    alert('Please select an ingredient and enter a valid volume');
                    return;
                }

                // Check total volume (max 1000ml)
                const currentTotal = itemState.inProcess.contents.reduce((sum, item) => sum + item.volume, 0);
                if (currentTotal + volume > 1000) {
                    alert('Not enough space in blender! Maximum capacity is 1000ml');
                    return;
                }

                // Add ingredient
                itemState.inProcess.contents.push({
                    name: ingredientSelect.options[ingredientSelect.selectedIndex].text,
                    volume: volume
                });

                showItemPropertiesModal(window.currentItemId);
            });
        }

        // Blending process
        if (startBlending) {
            startBlending.addEventListener('click', () => {
                if (itemState.inProcess.status !== 'on' || !itemState.inProcess.contents.length) return;

                startBlending.disabled = true;
                itemState.inProcess.currentOperation = 'Blending';
                showItemPropertiesModal(window.currentItemId);

                setTimeout(() => {
                    // Create result based on ingredients and speed
                    const ingredients = itemState.inProcess.contents.map(item => item.name).join(' and ');
                    const speed = itemState.inProcess.speed || 1;
                    let consistency;
                    if (speed <= 2) consistency = 'coarsely blended';
                    else if (speed <= 4) consistency = 'well blended';
                    else consistency = 'perfectly smooth';

                    itemState.inProcess.result = `${consistency} mixture of ${ingredients}`;
                    itemState.inProcess.currentOperation = null;
                    itemState.inProcess.contents = [];  // Clear the blender
                    
                    showItemPropertiesModal(window.currentItemId);
                }, 3000);
            });
        }
    }

    function setupMixingControls(components) {
        const addLiquidBtn = document.getElementById('add-liquid-btn');
        const liquidSelect = document.getElementById('liquid-select');
        const volumeInput = document.getElementById('volume-input');
        const mixContentsBtn = document.getElementById('mix-contents-btn');
        
        if (addLiquidBtn && liquidSelect && volumeInput) {
            addLiquidBtn.addEventListener('click', () => {
                const selectedLiquid = liquidSelect.value;
                const selectedOption = liquidSelect.options[liquidSelect.selectedIndex];
                const volume = parseInt(volumeInput.value);
                
                if (!selectedLiquid || volume <= 0) {
                    alert('Please select a liquid and enter a valid volume');
                    return;
                }
                
                // Check if there's enough space
                if (components.current_volume + volume > components.max_capacity) {
                    alert('Not enough space in container!');
                    return;
                }
                
                // Add the liquid to contents
                components.contents.push({
                    name: selectedLiquid,
                    volume: volume,
                    color: selectedOption.dataset.color
                });
                
                // Update current volume
                components.current_volume += volume;
                
                // Update in_process properties
                components.in_process.state = 'unmixed';
                components.in_process.contents = [...components.contents];
                components.in_process.properties.total_volume = `${components.current_volume} ${components.unit}`;
                
                // Refresh the display
                showItemPropertiesModal(window.currentItemId);
            });
        }
        
        if (mixContentsBtn && components.contents.length >= 2) {
            mixContentsBtn.addEventListener('click', () => {
                // Create mixture name from ingredients
                const mixtureNames = components.contents.map(item => item.name).join(' and ');
                components.in_process.mixture_name = `Mixed ${mixtureNames}`;
                
                // Update mixture properties
                components.in_process.state = 'mixed';
                components.in_process.properties.viscosity = calculateViscosity(components.contents);
                components.in_process.properties.color = calculateMixtureColor(components.contents);
                
                // Refresh the display
                showItemPropertiesModal(window.currentItemId);
            });
        }
    }
    
    function calculateViscosity(contents) {
        // Simple viscosity calculation based on contents
        const hasThickLiquid = contents.some(item => 
            ['Milk', 'Syrup'].includes(item.name));
        return hasThickLiquid ? 'medium' : 'low';
    }
    
    function calculateMixtureColor(contents) {
        // Simple color mixing logic
        const colors = contents.map(item => item.color);
        if (colors.includes('clear')) {
            return colors.find(color => color !== 'clear') || 'clear';
        }
        return colors.join(' and ');
    }

    // Make showItemPropertiesModal globally available
    window.showItemPropertiesModal = showItemPropertiesModal;

    // Attach double-click handler to workspace items
    document.getElementById('simulation-area').addEventListener('dblclick', (e) => {
        const workspaceItem = e.target.closest('.workspace-item');
        if (workspaceItem) {
            const itemId = workspaceItem.getAttribute('data-id');
            showItemPropertiesModal(itemId);
        }
    });
});