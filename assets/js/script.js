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

    const propertiesPanel = document.getElementById('properties-panel');
    const propertiesContent = document.getElementById('properties-content');

    simulationArea.addEventListener('click', (e) => {
        const workspaceItem = e.target.closest('.workspace-item');
        if (workspaceItem) {
            const selectedItem = document.querySelector('.workspace-item.selected');
            if (selectedItem) {
                selectedItem.classList.remove('selected');
            }
            workspaceItem.classList.add('selected');
            propertiesPanel.style.display = 'block'; // Show properties panel
            updatePropertiesPanel(workspaceItem.getAttribute('data-id'));
        } else {
            const selectedItem = document.querySelector('.workspace-item.selected');
            if (selectedItem) {
                selectedItem.classList.remove('selected');
            }
            propertiesPanel.style.display = 'none'; // Hide properties panel
        }
    });

    function updatePropertiesPanel(itemId) {
        const itemState = workspaceItemsState[itemId];
        if (!itemState) {
            propertiesContent.innerHTML = '<p>Select an item to see its properties.</p>';
            return;
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
            ${ingredientsHTML}
        `;
    }

    propertiesContent.addEventListener('input', (e) => {
        if (e.target.id === 'quantity' || e.target.id === 'unit') {
            const itemId = e.target.getAttribute('data-id');
            workspaceItemsState[itemId][e.target.id] = e.target.value;
        }
    });

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
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Placeholder for login logic
        console.log('Login form submitted');
        loginModal.style.display = 'none';
    });
});
