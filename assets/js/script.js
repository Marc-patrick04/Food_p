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

    const simulationArea = document.getElementById('simulation-area');

    simulationArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    simulationArea.addEventListener('dragenter', (e) => {
        e.preventDefault();
        simulationArea.classList.add('drag-over');
    });

    simulationArea.addEventListener('dragleave', () => {
        simulationArea.classList.remove('drag-over');
    });

    let workspaceItemsState = {};
    let nextItemId = 0;

    simulationArea.addEventListener('drop', (e) => {
        e.preventDefault();
        simulationArea.classList.remove('drag-over');
        const itemId = e.dataTransfer.getData('item-id');
        
        if (itemId) {
            moveWorkspaceItem(itemId, e.clientX, e.clientY);
        } else {
            const itemName = e.dataTransfer.getData('item-name');
            if (itemName) {
                createWorkspaceItem(itemName, e.clientX, e.clientY);
            }
        }
    });

    function createWorkspaceItem(name, x, y) {
        const id = `item-${nextItemId++}`;
        const state = {
            id: id,
            name: name,
            quantity: 1,
            unit: 'unit',
            ingredients: []
        };
        
        const newItem = document.createElement('div');
        newItem.classList.add('workspace-item');
        newItem.setAttribute('data-id', state.id);
        newItem.setAttribute('draggable', true);

        newItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('item-id', state.id);
        });

        const itemData = findToolboxItemData(state.name);
        if (itemData && itemData.image) {
            const img = document.createElement('img');
            img.src = itemData.image;
            newItem.appendChild(img);
        } else {
            const img = document.createElement('img');
            img.src = 'assets/images/test.jpg';
            newItem.appendChild(img);
        }
        
        const rect = simulationArea.getBoundingClientRect();
        newItem.style.position = 'absolute';
        newItem.style.left = `${x - rect.left}px`;
        newItem.style.top = `${y - rect.top}px`;

        workspaceItemsState[state.id] = state;
        simulationArea.appendChild(newItem);
    }

    function moveWorkspaceItem(id, x, y) {
        const item = document.querySelector(`.workspace-item[data-id='${id}']`);
        if (item) {
            const rect = simulationArea.getBoundingClientRect();
            item.style.left = `${x - rect.left}px`;
            item.style.top = `${y - rect.top}px`;
        }
    }

    function findToolboxItemData(itemName) {
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
    }


    // --- Item Properties Modal Logic ---
    const itemPropertiesModal = document.getElementById('item-properties-modal');
    const itemPropertiesTitle = document.getElementById('item-properties-title');
    const physicalPropertiesContent = document.getElementById('physical-properties-content');
    const configPropertiesContent = document.getElementById('config-properties-content');
    const cliContent = document.getElementById('cli-content');
    const attributesPropertiesContent = document.getElementById('attributes-properties-content');
    const propertiesCloseBtn = itemPropertiesModal.querySelector('.close-btn');

    function showItemPropertiesModal(itemId) {
        const itemState = workspaceItemsState[itemId];
        if (!itemState) return;

        const itemData = findToolboxItemData(itemState.name);
        if (!itemData) return;

        itemPropertiesTitle.textContent = `${itemData.name} Properties`;

        // Populate Physical Tab
        let physicalHTML = '<ul>';
        if (itemData.physical) {
            for (const key in itemData.physical) {
                physicalHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${itemData.physical[key]}</li>`;
            }
        }
        physicalHTML += '</ul>';
        physicalPropertiesContent.innerHTML = physicalHTML;

        // Populate Config Tab
        let configHTML = '<ul>';
        if (itemData.config) {
            for (const key in itemData.config) {
                configHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${itemData.config[key]}</li>`;
            }
        }
        configHTML += '</ul>';
        configPropertiesContent.innerHTML = configHTML;

        // Populate Attributes Tab
        let attributesHTML = '<ul>';
        if (itemData.attributes) {
            for (const key in itemData.attributes) {
                attributesHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${itemData.attributes[key]}</li>`;
            }
        }
        attributesHTML += '</ul>';
        attributesPropertiesContent.innerHTML = attributesHTML;

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
    simulationArea.addEventListener('dblclick', (e) => {
        const workspaceItem = e.target.closest('.workspace-item');
        if (workspaceItem) {
            const itemId = workspaceItem.getAttribute('data-id');
            showItemPropertiesModal(itemId);
        }
    });

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
