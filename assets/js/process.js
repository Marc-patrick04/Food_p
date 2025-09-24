// Process Management Class
class ProcessManager {
    constructor() {
        this.processes = new Map(); // Store active processes
        this.maxCapacity = {
            'Blender': 1000, // ml
            'Mixing Container': 1000, // ml
            'Industrial Refrigerator': 500000 // ml
        };
    }

    // Initialize process state for an item
    initializeProcessState(itemId, itemType) {
        const processState = {
            status: 'idle',
            contents: [],
            currentOperation: null,
            timeElapsed: 0,
            temperature: 'room temperature',
            properties: {
                viscosity: 'none',
                color: 'none',
                total_volume: '0 ml'
            }
        };

        this.processes.set(itemId, processState);
        return processState;
    }

    // Get process state for an item
    getProcessState(itemId) {
        return this.processes.get(itemId) || this.initializeProcessState(itemId);
    }

    // Update process state
    updateProcessState(itemId, newState) {
        const currentState = this.getProcessState(itemId);
        this.processes.set(itemId, { ...currentState, ...newState });
        return this.processes.get(itemId);
    }

    // Add ingredient to a container
    addIngredient(itemId, ingredient, volume) {
        const state = this.getProcessState(itemId);
        const currentTotal = state.contents.reduce((sum, item) => sum + item.volume, 0);

        // Check capacity
        if (currentTotal + volume > this.maxCapacity[itemId]) {
            throw new Error('Exceeds maximum capacity');
        }

        // Add the ingredient
        state.contents.push({
            name: ingredient,
            volume: volume,
            timeAdded: Date.now()
        });

        // Update total volume
        state.properties.total_volume = `${currentTotal + volume} ml`;

        // Update state
        this.updateProcessState(itemId, state);
        return state;
    }

    // Start blending process
    startBlending(itemId, speed) {
        const state = this.getProcessState(itemId);
        
        if (state.contents.length < 2) {
            throw new Error('Need at least 2 ingredients to blend');
        }

        state.status = 'blending';
        state.currentOperation = 'Blending';
        state.properties.speed = speed;

        this.updateProcessState(itemId, state);

        // Return a promise that resolves when blending is complete
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = this.completeBlending(itemId, speed);
                resolve(result);
            }, 3000); // 3 seconds for blending
        });
    }

    // Complete blending process
    completeBlending(itemId, speed) {
        const state = this.getProcessState(itemId);
        const ingredients = state.contents.map(item => item.name).join(' and ');
        
        // Determine consistency based on speed
        let consistency;
        if (speed <= 2) consistency = 'coarsely blended';
        else if (speed <= 4) consistency = 'well blended';
        else consistency = 'perfectly smooth';

        // Update state
        state.status = 'complete';
        state.currentOperation = null;
        state.result = `${consistency} mixture of ${ingredients}`;
        state.properties.viscosity = this.calculateViscosity(state.contents, speed);
        state.properties.color = this.calculateMixtureColor(state.contents);

        this.updateProcessState(itemId, state);
        return state;
    }

    // Start mixing process
    startMixing(itemId) {
        const state = this.getProcessState(itemId);
        
        if (state.contents.length < 2) {
            throw new Error('Need at least 2 ingredients to mix');
        }

        state.status = 'mixing';
        state.currentOperation = 'Mixing';

        this.updateProcessState(itemId, state);

        // Return a promise that resolves when mixing is complete
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = this.completeMixing(itemId);
                resolve(result);
            }, 2000); // 2 seconds for mixing
        });
    }

    // Complete mixing process
    completeMixing(itemId) {
        const state = this.getProcessState(itemId);
        const ingredients = state.contents.map(item => item.name).join(' and ');

        // Update state
        state.status = 'complete';
        state.currentOperation = null;
        state.result = `Mixed ${ingredients}`;
        state.properties.viscosity = this.calculateViscosity(state.contents, 1);
        state.properties.color = this.calculateMixtureColor(state.contents);

        this.updateProcessState(itemId, state);
        return state;
    }

    // Calculate viscosity based on ingredients and speed
    calculateViscosity(contents, speed = 1) {
        // Base viscosity on ingredients
        const hasThickIngredients = contents.some(item => 
            ['Milk', 'Cream', 'Yogurt', 'Honey', 'Syrup'].includes(item.name)
        );
        
        const hasLiquidIngredients = contents.some(item =>
            ['Water', 'Juice', 'Wine'].includes(item.name)
        );

        if (speed > 4) return 'very thin';
        if (speed > 2) return hasThickIngredients ? 'medium' : 'thin';
        return hasThickIngredients ? 'thick' : (hasLiquidIngredients ? 'medium' : 'thick');
    }

    // Calculate mixture color
    calculateMixtureColor(contents) {
        const colors = contents.map(item => this.getIngredientColor(item.name));
        
        // If there's only one color, return it
        if (colors.length === 1) return colors[0];
        
        // If contains clear liquid, use the other color
        if (colors.includes('clear')) {
            return colors.find(color => color !== 'clear') || 'clear';
        }

        // Combine colors
        return colors.join(' and ');
    }

    // Get ingredient color
    getIngredientColor(ingredientName) {
        const colorMap = {
            'Water': 'clear',
            'Milk': 'white',
            'Orange Juice': 'orange',
            'Apple Juice': 'light yellow',
            'Grape Juice': 'purple',
            'Tomato Juice': 'red',
            'Cream': 'white',
            'Yogurt': 'white',
            'Honey': 'golden',
            'Syrup': 'brown'
        };

        return colorMap[ingredientName] || 'unknown';
    }

    // Temperature control
    setTemperature(itemId, temperature) {
        const state = this.getProcessState(itemId);
        state.temperature = temperature;
        this.updateProcessState(itemId, state);
        return state;
    }

    // Clean equipment
    cleanEquipment(itemId) {
        const state = this.getProcessState(itemId);
        state.status = 'clean';
        state.contents = [];
        state.currentOperation = null;
        state.result = null;
        state.properties = {
            viscosity: 'none',
            color: 'none',
            total_volume: '0 ml'
        };

        this.updateProcessState(itemId, state);
        return state;
    }
}

// Initialize process manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create process manager instance
    window.processManager = new ProcessManager();
});

// Export ProcessManager class globally
window.ProcessManager = ProcessManager;