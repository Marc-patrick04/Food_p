// Workspace management
window.workspaceItemsState = {};
window.nextItemId = 0;
window.itemCounts = {};

// Function to find item data in the toolbox
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

// Function to create a new item in the workspace
function createWorkspaceItem(name, x, y) {
    console.log('Creating workspace item:', name);
    const id = `item-${window.nextItemId++}`;
    
    // Increment the count for this item type
    window.itemCounts[name] = (window.itemCounts[name] || 0) + 1;
    const displayName = `${name}${window.itemCounts[name].toString().padStart(2, '0')}`;
    
    const simulationArea = document.getElementById('simulation-area');
    const rect = simulationArea.getBoundingClientRect();
    const state = {
        id: id,
        name: name,
        displayName: displayName,
        quantity: 1,
        unit: 'unit',
        ingredients: [],
        position: {
            x: `${x - rect.left}px`,
            y: `${y - rect.top}px`
        }
    };
    
    // Store the state in the global workspaceItemsState
    window.workspaceItemsState[id] = state;
    console.log('Created state:', state);
    console.log('Current workspaceItemsState:', window.workspaceItemsState);
    
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
    
    // Add item name label
    const label = document.createElement('div');
    label.classList.add('item-label');
    label.textContent = state.displayName;
    newItem.appendChild(label);
    
    newItem.style.position = 'absolute';
    newItem.style.left = state.position.x;
    newItem.style.top = state.position.y;

    window.workspaceItemsState[state.id] = state;
    simulationArea.appendChild(newItem);
    
    // Add direct double-click handler to the new item
    newItem.addEventListener('dblclick', function(e) {
        e.stopPropagation();  // Prevent event bubbling
        console.log('Double-click event triggered');
        console.log('Item ID:', state.id);
        handleItemDoubleClick(state.id);
    });

    return state;
}

// Function to move an existing item in the workspace
function moveWorkspaceItem(id, x, y) {
    const item = document.querySelector(`.workspace-item[data-id='${id}']`);
    if (item) {
        const simulationArea = document.getElementById('simulation-area');
        const rect = simulationArea.getBoundingClientRect();
        const newX = `${x - rect.left}px`;
        const newY = `${y - rect.top}px`;
        item.style.left = newX;
        item.style.top = newY;

        // Update the state with the new position
        if (window.workspaceItemsState[id]) {
            window.workspaceItemsState[id].position = { x: newX, y: newY };
        }
    }
}

// Function to initialize workspace event listeners
function initWorkspaceEvents() {
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
}

// Function to get workspace item state
function getWorkspaceItemState(id) {
    return window.workspaceItemsState[id];
}

// Function to update workspace item state
function updateWorkspaceItemState(id, newState) {
    if (window.workspaceItemsState[id]) {
        window.workspaceItemsState[id] = { ...window.workspaceItemsState[id], ...newState };
        return true;
    }
    return false;
}

// Function to handle double-click on workspace items
function handleItemDoubleClick(itemId) {
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

    const modal = document.getElementById('item-properties-modal');
    const title = document.getElementById('item-properties-title');
    
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
    title.textContent = `${itemData.name} Properties`;
    
    // Store current item ID for controls
    window.currentItemId = itemId;

    // Update all tabs based on item type
    if (itemData.properties) {
        window.displayCompositionContent(itemData.properties);
        if (typeof window.displayEquipmentProperties === 'function') {
            window.displayEquipmentProperties(itemData.properties, itemData);
        }
    } else if (itemData.components) {
        window.displayCompositionContent(itemData.components);
        if (typeof window.displayFoodProperties === 'function') {
            window.displayFoodProperties(itemData.components);
        }
    }

    // Show the modal using the modal class
    window.itemPropertiesModal.show();
}

// Make functions globally available
window.findToolboxItemData = findToolboxItemData;
window.createWorkspaceItem = createWorkspaceItem;
window.moveWorkspaceItem = moveWorkspaceItem;
window.getWorkspaceItemState = getWorkspaceItemState;
window.updateWorkspaceItemState = updateWorkspaceItemState;
window.handleItemDoubleClick = handleItemDoubleClick;

// Initialize workspace when DOM is loaded
document.addEventListener('DOMContentLoaded', initWorkspaceEvents);
