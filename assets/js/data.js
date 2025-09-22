const toolboxData = {
    'Raw Materials': {
        'Fruits': [
            { name: 'Apples', image: 'assets/images/test.jpg', protein: 0.3, carbs: 14, fat: 0.2 },
            { name: 'Oranges', image: 'assets/images/test.jpg', protein: 0.9, carbs: 12, fat: 0.1 },
            { name: 'Bananas', image: 'assets/images/test.jpg', protein: 1.1, carbs: 23, fat: 0.3 },
            { name: 'Mangoes', image: 'assets/images/test.jpg', protein: 0.8, carbs: 15, fat: 0.4 },
            { name: 'Pineapples', image: 'assets/images/test.jpg', protein: 0.5, carbs: 13, fat: 0.1 },
            { name: 'Strawberries', image: 'assets/images/test.jpg', protein: 0.7, carbs: 8, fat: 0.3 },
            { name: 'Grapes', image: 'assets/images/test.jpg', protein: 0.6, carbs: 18, fat: 0.2 },
            { name: 'Papaya', image: 'assets/images/test.jpg', protein: 0.5, carbs: 11, fat: 0.3 },
            { name: 'Avocado', image: 'assets/images/test.jpg', protein: 2, carbs: 9, fat: 15 },
            { name: 'Lemon/Lime', image: 'assets/images/test.jpg', protein: 1.1, carbs: 9, fat: 0.3 },
            { 
                name: 'Tomatoes', 
                image: 'assets/images/test.jpg',
                components: {
                    water: '~94-95%',
                    carbohydrates: {
                        sugars: ['glucose', 'fructose'],
                        fiber: ['cellulose', 'pectin']
                    },
                    proteins: '~1%',
                    fats: '<0.5%',
                    vitamins: {
                        'Vitamin C': 'ascorbic acid',
                        'Vitamin A': ['carotenoids', 'lycopene', 'beta-carotene'],
                        'Vitamin K': '',
                        'B-complex': ['B1', 'B2', 'B3', 'B5', 'B6', 'folate']
                    },
                    minerals: {
                        potassium: 'K',
                        magnesium: 'Mg',
                        phosphorus: 'P',
                        calcium: 'Ca',
                        iron: 'Fe'
                    },
                    'organic-acids': ['citric acid', 'malic acid', 'ascorbic acid'],
                    pigments: ['lycopene', 'beta-carotene', 'chlorophyll'],
                    'other-bioactive-compounds': ['flavonoids', 'phenolic compounds', 'amino acids'],
                    seeds: ['oils', 'proteins', 'sugars', 'acids']
                }
            }
        ],
        'Vegetables': [
            { name: 'Potatoes', image: 'assets/images/test.jpg', protein: 2, carbs: 17, fat: 0.1 },
            { name: 'Carrots', image: 'assets/images/test.jpg', protein: 0.9, carbs: 10, fat: 0.2 },
            { name: 'Spinach', image: 'assets/images/test.jpg', protein: 2.9, carbs: 3.6, fat: 0.4 },
            { name: 'Onions', image: 'assets/images/test.jpg', protein: 1.1, carbs: 9, fat: 0.1 },
            { name: 'Garlic', image: 'assets/images/test.jpg', protein: 6.4, carbs: 33, fat: 0.5 },
            { name: 'Peas', image: 'assets/images/test.jpg', protein: 5, carbs: 14, fat: 0.4 },
            { name: 'Beans', image: 'assets/images/test.jpg', protein: 8, carbs: 21, fat: 0.5 },
            { name: 'Cabbage', image: 'assets/images/test.jpg', protein: 1.3, carbs: 6, fat: 0.1 },
            { name: 'Broccoli', image: 'assets/images/test.jpg', protein: 2.8, carbs: 7, fat: 0.4 },
            { name: 'Sweet corn', image: 'assets/images/test.jpg', protein: 3.2, carbs: 19, fat: 1.2 }
        ],
        'Cereals & Grains': [
            { name: 'Wheat', image: 'assets/images/test.jpg' },
            { name: 'Rice', image: 'assets/images/test.jpg' },
            { name: 'Maize (corn)', image: 'assets/images/test.jpg' },
            { name: 'Barley', image: 'assets/images/test.jpg' },
            { name: 'Oats', image: 'assets/images/test.jpg' },
            { name: 'Millet', image: 'assets/images/test.jpg' },
            { name: 'Sorghum', image: 'assets/images/test.jpg' }
        ],
        'Legumes & Pulses': [
            { name: 'Beans', image: 'assets/images/test.jpg' },
            { name: 'Lentils', image: 'assets/images/test.jpg' },
            { name: 'Chickpeas', image: 'assets/images/test.jpg' },
            { name: 'Soybeans', image: 'assets/images/test.jpg' },
            { name: 'Peas', image: 'assets/images/test.jpg' }
        ],
        'Animal Products': [
            { name: 'Milk', image: 'assets/images/test.jpg' },
            { name: 'Meat', image: 'assets/images/test.jpg' },
            { name: 'Eggs', image: 'assets/images/test.jpg' },
            { name: 'Butter', image: 'assets/images/test.jpg' },
            { name: 'Cheese', image: 'assets/images/test.jpg' },
            { name: 'Yogurt', image: 'assets/images/test.jpg' }
        ],
        'Sweeteners': [
            { name: 'Sugar', image: 'assets/images/test.jpg' },
            { name: 'Honey', image: 'assets/images/test.jpg' },
            { name: 'Molasses', image: 'assets/images/test.jpg' },
            { name: 'Corn syrup', image: 'assets/images/test.jpg' },
            { name: 'Maple syrup', image: 'assets/images/test.jpg' }
        ],
        'Oils & Fats': [
            { name: 'Vegetable oils', image: 'assets/images/test.jpg' },
            { name: 'Margarine', image: 'assets/images/test.jpg' },
            { name: 'Butter', image: 'assets/images/test.jpg' },
            { name: 'Animal fat', image: 'assets/images/test.jpg' }
        ],
        'Additives & Preservatives': [
            { name: 'Salt', image: 'assets/images/test.jpg' },
            { name: 'Vinegar', image: 'assets/images/test.jpg' },
            { name: 'Citric acid', image: 'assets/images/test.jpg' },
            { name: 'Ascorbic acid', image: 'assets/images/test.jpg' },
            { name: 'Baking powder / yeast', image: 'assets/images/test.jpg' },
            { name: 'Spices', image: 'assets/images/test.jpg' },
            { name: 'Herbs', image: 'assets/images/test.jpg' },
            { name: 'Food colorings', image: 'assets/images/test.jpg' }
        ],
        'Water & Beverages': [
            { name: 'Drinking water', image: 'assets/images/test.jpg' },
            { name: 'Coffee beans', image: 'assets/images/test.jpg' },
            { name: 'Tea leaves', image: 'assets/images/test.jpg' },
            { name: 'Cocoa beans', image: 'assets/images/test.jpg' }
        ]
    },
    'Storage & Preservation': {
        'Storage': [
            { name: 'Refrigerator', image: 'assets/images/test.jpg' },
            { name: 'Freezer', image: 'assets/images/test.jpg' },
            { name: 'Cold room', image: 'assets/images/test.jpg' },
            { name: 'Storage bins', image: 'assets/images/test.jpg' }
        ],
        'Preservation': [
            { name: 'Vacuum sealers', image: 'assets/images/test.jpg' },
            { name: 'Ice makers', image: 'assets/images/test.jpg' }
        ]
    },
    'Preparation Tools': {
        'Cutting': [
            { name: 'Knives', image: 'assets/images/test.jpg' },
            { name: 'Cutting boards', image: 'assets/images/test.jpg' }
        ],
        'Mixing': [
            { name: 'Bowls', image: 'assets/images/test.jpg' },
            { name: 'Graters & slicers', image: 'assets/images/test.jpg' },
            { name: 'Peelers', image: 'assets/images/test.jpg' }
        ],
        'Measuring': [
            { name: 'Measuring cups & spoons', image: 'assets/images/test.jpg' },
            { name: 'Scales', image: 'assets/images/test.jpg' }
        ],
        'General': [
            { name: 'Scoops', image: 'assets/images/test.jpg' },
            { name: 'Gloves', image: 'assets/images/test.jpg' },
            { name: 'Aprons', image: 'assets/images/test.jpg' }
        ]
    },
    'Mixing & Processing Equipment': {
        'Mixing': [
            { name: 'Mixers', image: 'assets/images/test.jpg' },
            { name: 'Blenders', image: 'assets/images/test.jpg' },
            { name: 'Food processors', image: 'assets/images/test.jpg' },
            { name: 'Dough kneaders', image: 'assets/images/test.jpg' }
        ],
        'Grinding': [
            { name: 'Grinders / mincers', image: 'assets/images/test.jpg' },
            { name: 'Crushers / mills', image: 'assets/images/test.jpg' }
        ],
        'Other': [
            { name: 'Fermenters', image: 'assets/images/test.jpg' }
        ]
    },
    'Cooking & Heating': {
        'Stoves & Ovens': [
            { name: 'Stoves', image: 'assets/images/test.jpg' },
            { name: 'Ovens', image: 'assets/images/test.jpg' }
        ],
        'Other': [
            { name: 'Steamers', image: 'assets/images/test.jpg' },
            { name: 'Boilers', image: 'assets/images/test.jpg' },
            { name: 'Fryers', image: 'assets/images/test.jpg' },
            { name: 'Roasters / grills', image: 'assets/images/test.jpg' },
            { name: 'Microwave ovens', image: 'assets/images/test.jpg' },
            { name: 'Autoclaves', image: 'assets/images/test.jpg' }
        ]
    },
    'Cooling & Drying': {
        'Cooling': [
            { name: 'Cooling racks', image: 'assets/images/test.jpg' },
            { name: 'Blast chillers', image: 'assets/images/test.jpg' },
            { name: 'Fans', image: 'assets/images/test.jpg' }
        ],
        'Drying': [
            { name: 'Air dryers / dehydrators', image: 'assets/images/test.jpg' }
        ]
    },
    'Packaging Materials': {
        'Containers': [
            { name: 'Glass bottles & jars', image: 'assets/images/test.jpg' },
            { name: 'Plastic containers & films', image: 'assets/images/test.jpg' },
            { name: 'Aluminum cans', image: 'assets/images/test.jpg' },
            { name: 'Paper & cardboard cartons', image: 'assets/images/test.jpg' },
            { name: 'Laminated pouches', image: 'assets/images/test.jpg' }
        ]
    },
    'Packaging Tools & Machines': {
        'Sealing & Wrapping': [
            { name: 'Sealing machines', image: 'assets/images/test.jpg' },
            { name: 'Canning machines', image: 'assets/images/test.jpg' },
            { name: 'Wrapping machines', image: 'assets/images/test.jpg' }
        ],
        'Labeling & Packing': [
            { name: 'Labeling machines', image: 'assets/images/test.jpg' },
            { name: 'Bottling machines', image: 'assets/images/test.jpg' },
            { name: 'Carton packers', image: 'assets/images/test.jpg' }
        ],
        'Portioning': [
            { name: 'Weighing & portioning machines', image: 'assets/images/test.jpg' }
        ]
    },
    'Hygiene & Safety': {
        'Cleaning': [
            { name: 'Cleaning brushes & sponges', image: 'assets/images/test.jpg' },
            { name: 'Detergents & sanitizers', image: 'assets/images/test.jpg' },
            { name: 'Dishwashers', image: 'assets/images/test.jpg' },
            { name: 'Mops & buckets', image: 'assets/images/test.jpg' }
        ],
        'Personal': [
            { name: 'Hand-washing stations', image: 'assets/images/test.jpg' }
        ],
        'Safety': [
            { name: 'First aid kits', image: 'assets/images/test.jpg' },
            { name: 'Fire extinguishers', image: 'assets/images/test.jpg' }
        ]
    },
    'Laboratory / Quality Control Tools': {
        'Measurement': [
            { name: 'Thermometers', image: 'assets/images/test.jpg' },
            { name: 'pH meters', image: 'assets/images/test.jpg' },
            { name: 'Moisture analyzers', image: 'assets/images/test.jpg' },
            { name: 'Refractometers', image: 'assets/images/test.jpg' }
        ],
        'Analysis': [
            { name: 'Microscopes', image: 'assets/images/test.jpg' },
            { name: 'Test kits', image: 'assets/images/test.jpg' }
        ]
    },
    'Utensils & Smallware': {
        'Serving': [
            { name: 'Plates', image: 'assets/images/test.jpg' },
            { name: 'trays', image: 'assets/images/test.jpg' },
            { name: 'serving spoons', image: 'assets/images/test.jpg' }
        ],
        'General': [
            { name: 'Strainers & sieves', image: 'assets/images/test.jpg' },
            { name: 'Funnels', image: 'assets/images/test.jpg' },
            { name: 'Tongs', image: 'assets/images/test.jpg' },
            { name: 'Rolling pins', image: 'assets/images/test.jpg' },
            { name: 'Pans & pots', image: 'assets/images/test.jpg' }
        ]
    },
    'Large Industrial Equipment': {
        'Processing': [
            { name: 'Pasteurizers', image: 'assets/images/test.jpg' },
            { name: 'Homogenizers', image: 'assets/images/test.jpg' },
            { name: 'Conveyor belts', image: 'assets/images/test.jpg' },
            { name: 'Extruders', image: 'assets/images/test.jpg' }
        ],
        'Drying & Evaporation': [
            { name: 'Spray dryers', image: 'assets/images/test.jpg' },
            { name: 'Evaporators', image: 'assets/images/test.jpg' }
        ],
        'Sterilization': [
            { name: 'Sterilizers', image: 'assets/images/test.jpg' },
            { name: 'Milling machines', image: 'assets/images/test.jpg' }
        ]
    }
};
