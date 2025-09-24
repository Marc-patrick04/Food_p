const toolboxData = {
    'In-Process Materials': {
        'Mixtures & Solutions': [
            {
                name: 'Mixing Container',
                image: 'assets/images/test.jpg',
                components: {
                    type: 'container',
                    contents: [],
                    max_capacity: 1000,
                    current_volume: 0,
                    unit: 'ml',
                    in_process: {
                        state: 'empty',
                        contents: [],
                        mixture_name: '',
                        properties: {
                            'viscosity': 'none',
                            'temperature': 'room temperature',
                            'color': 'none',
                            'total_volume': '0 ml'
                        }
                    }
                }
            }
        ]
    },
    'Processing Equipment': {
        'Storage Equipment': [
            {
                name: 'Industrial Refrigerator',
                image: 'assets/images/fridge.jpg',
                properties: {
                    technical_specs: {
                        'temperature range': '-2°C to 8°C',
                        'capacity': '500-1000L',
                        'power consumption': '1.5-2.0 kW',
                        'voltage': '220-240V',
                        'frequency': '50/60 Hz',
                        'refrigerant': 'R-134a/R-404A',
                        'dimensions': '140x80x200 cm'
                    },
                    operational_parameters: {
                        'cooling rate': '2-3°C/hour',
                        'temperature uniformity': '±0.5°C',
                        'humidity control': '60-85% RH',
                        'defrost cycle': 'Automatic',
                        'air circulation': 'Forced convection',
                        'shelf loading capacity': '40-50 kg/shelf'
                    },
                    maintenance_info: {
                        'cleaning interval': '24-48 hours',
                        'defrost interval': '6-8 hours',
                        'filter cleaning': 'Weekly',
                        'temperature check': 'Every 4 hours'
                    }
                }
            },
            {
                name: 'Blast Freezer',
                image: 'assets/images/test.jpg',
                properties: {
                    technical_specs: {
                        'temperature range': '-40°C to -18°C',
                        'capacity': '200-400kg/cycle',
                        'power consumption': '4.5-5.5 kW',
                        'voltage': '380-415V',
                        'cooling time': '240 minutes',
                        'refrigerant': 'R-404A/R-507'
                    },
                    operational_parameters: {
                        'freezing rate': '6-10°C/hour',
                        'air velocity': '3-5 m/s',
                        'cycle time': '4-6 hours',
                        'product core temperature': '-18°C',
                        'air circulation': 'High-velocity forced'
                    }
                }
            }
        ],
        'Mixing Equipment': [
            {
                name: 'Industrial Mixer',
                image: 'assets/images/mixing bowl.jpg',
                properties: {
                    technical_specs: {
                        'bowl capacity': '20-80L',
                        'power': '1.1-2.2 kW',
                        'voltage': '220-380V',
                        'speed range': '20-500 rpm',
                        'material': 'Stainless Steel 304',
                        'weight': '120-150 kg'
                    },
                    operational_parameters: {
                        'mixing speeds': ['Low: 107rpm', 'Medium: 198rpm', 'High: 365rpm'],
                        'max dough capacity': '25kg',
                        'timer range': '0-30 minutes',
                        'noise level': '<70 dB',
                        'mixing actions': ['Planetary', 'Spiral', 'Whipping']
                    },
                    maintenance_info: {
                        'cleaning frequency': 'After each use',
                        'lubrication interval': '200 hours',
                        'belt inspection': 'Monthly',
                        'bowl inspection': 'Daily'
                    },
                    safety_features: {
                        'bowl guard': 'Interlocked',
                        'emergency stop': 'Push button',
                        'overload protection': 'Thermal cutout',
                        'safety certifications': ['CE', 'ETL']
                    }
                }
            },
            {
                name: 'Dough Kneader',
                image: 'assets/images/test.jpg',
                properties: {
                    technical_specs: {
                        'bowl capacity': '40-50L',
                        'power': '2.2-3.0 kW',
                        'voltage': '380V',
                        'speed range': '15-150 rpm',
                        'material': 'Stainless Steel 304',
                        'weight': '180-200 kg'
                    },
                    operational_parameters: {
                        'kneading speeds': ['Slow: 15rpm', 'Fast: 30rpm'],
                        'max dough weight': '35kg',
                        'timer range': '0-20 minutes',
                        'temperature rise': '<8°C during operation'
                    }
                }
            }
        ],
        'Heating Equipment': [
            {
                name: 'Industrial Oven',
                image: 'assets/images/test.jpg',
                properties: {
                    technical_specs: {
                        'temperature range': '50-300°C',
                        'capacity': '100-150kg',
                        'power': '15-20 kW',
                        'voltage': '380-415V',
                        'dimensions': '120x100x180 cm',
                        'number of decks': '3-4'
                    },
                    operational_parameters: {
                        'heating time': '15-20 min to 250°C',
                        'temperature accuracy': '±2°C',
                        'steam injection': 'Adjustable',
                        'heat distribution': 'Forced convection',
                        'baking surface': 'Stone/Steel plate'
                    },
                    safety_features: {
                        'overheating protection': 'Automatic cutoff',
                        'door safety': 'Double insulated',
                        'steam vent': 'Automatic control'
                    }
                }
            }
        ]
    },
    'Raw Materials': {
        'Fruits': [
            { 
                name: 'Apples',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '0.3g',
                        carbs: '14g',
                        fat: '0.2g',
                        fiber: '2.4g',
                        calories: '52 kcal'
                    },
                    vitamins: {
                        'Vitamin C': '4.6mg',
                        'Vitamin B6': '0.041mg',
                        'Vitamin A': '54 IU'
                    },
                    minerals: {
                        potassium: '107mg',
                        calcium: '6mg',
                        magnesium: '5mg',
                        iron: '0.12mg'
                    },
                    antioxidants: ['quercetin', 'catechin', 'chlorogenic acid'],
                    other: ['pectin', 'malic acid']
                }
            },
            { 
                name: 'Oranges',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '0.9g',
                        carbs: '12g',
                        fat: '0.1g',
                        fiber: '2.4g',
                        calories: '47 kcal'
                    },
                    vitamins: {
                        'Vitamin C': '53.2mg',
                        'Vitamin A': '225 IU',
                        'Vitamin B1': '0.087mg',
                        'Folate': '34μg'
                    },
                    minerals: {
                        potassium: '181mg',
                        calcium: '40mg',
                        magnesium: '10mg'
                    },
                    flavonoids: ['hesperidin', 'naringenin'],
                    other: ['citric acid', 'pectin']
                }
            },
            { 
                name: 'Bananas',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '1.1g',
                        carbs: '23g',
                        fat: '0.3g',
                        fiber: '2.6g',
                        calories: '89 kcal'
                    },
                    vitamins: {
                        'Vitamin B6': '0.4mg',
                        'Vitamin C': '8.7mg',
                        'Folate': '20μg'
                    },
                    minerals: {
                        potassium: '358mg',
                        magnesium: '27mg',
                        manganese: '0.3mg'
                    },
                    antioxidants: ['dopamine', 'catechins'],
                    other: ['resistant starch', 'pectin']
                }
            },
            { 
                name: 'Mangoes',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '0.8g',
                        carbs: '15g',
                        fat: '0.4g',
                        fiber: '1.6g',
                        calories: '60 kcal'
                    },
                    vitamins: {
                        'Vitamin C': '36.4mg',
                        'Vitamin A': '1082 IU',
                        'Vitamin B6': '0.119mg',
                        'Folate': '43μg'
                    },
                    minerals: {
                        potassium: '168mg',
                        magnesium: '10mg',
                        copper: '0.111mg'
                    },
                    antioxidants: ['beta-carotene', 'zeaxanthin'],
                    polyphenols: ['gallic acid', 'quercetin']
                }
            },
            { 
                name: 'Avocado',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '2g',
                        carbs: '9g',
                        fat: '15g',
                        fiber: '7g',
                        calories: '160 kcal'
                    },
                    fats: {
                        'Monounsaturated': '10g',
                        'Polyunsaturated': '2g',
                        'Saturated': '2g'
                    },
                    vitamins: {
                        'Vitamin K': '21μg',
                        'Folate': '81μg',
                        'Vitamin C': '10mg',
                        'Vitamin B6': '0.257mg',
                        'Vitamin E': '2.07mg'
                    },
                    minerals: {
                        potassium: '485mg',
                        magnesium: '29mg',
                        iron: '0.55mg'
                    },
                    antioxidants: ['lutein', 'zeaxanthin', 'beta-carotene']
                }
            },
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
            {
                name: 'Potatoes',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '2g',
                        carbs: '17g',
                        fat: '0.1g',
                        fiber: '2.2g',
                        calories: '77 kcal'
                    },
                    vitamins: {
                        'Vitamin C': '19.7mg',
                        'Vitamin B6': '0.295mg',
                        'Folate': '16μg'
                    },
                    minerals: {
                        potassium: '421mg',
                        magnesium: '23mg',
                        iron: '0.78mg'
                    },
                    antioxidants: ['flavonoids', 'carotenoids'],
                    other: ['resistant starch', 'glycoalkaloids']
                }
            },
            {
                name: 'Carrots',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '0.9g',
                        carbs: '10g',
                        fat: '0.2g',
                        fiber: '2.8g',
                        calories: '41 kcal'
                    },
                    vitamins: {
                        'Vitamin A': '16706 IU',
                        'Vitamin C': '5.9mg',
                        'Vitamin K': '13.2μg'
                    },
                    minerals: {
                        potassium: '320mg',
                        calcium: '33mg',
                        iron: '0.3mg'
                    },
                    antioxidants: ['beta-carotene', 'alpha-carotene', 'lutein'],
                    phytochemicals: ['polyacetylenes', 'falcarinol']
                }
            },
            {
                name: 'Spinach',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '2.9g',
                        carbs: '3.6g',
                        fat: '0.4g',
                        fiber: '2.2g',
                        calories: '23 kcal'
                    },
                    vitamins: {
                        'Vitamin K': '483μg',
                        'Vitamin A': '9377 IU',
                        'Vitamin C': '28.1mg',
                        'Folate': '194μg'
                    },
                    minerals: {
                        iron: '2.71mg',
                        calcium: '99mg',
                        magnesium: '79mg'
                    },
                    antioxidants: ['lutein', 'zeaxanthin', 'beta-carotene'],
                    other: ['nitrates', 'thylakoids']
                }
            },
            { name: 'Cabbage', image: 'assets/images/test.jpg', protein: 1.3, carbs: 6, fat: 0.1 },
            { name: 'Broccoli', image: 'assets/images/test.jpg', protein: 2.8, carbs: 7, fat: 0.4 },
            { name: 'Sweet corn', image: 'assets/images/test.jpg', protein: 3.2, carbs: 19, fat: 1.2 }
        ],
        'Cereals & Grains': [
            { 
                name: 'Wheat',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '13g',
                        carbs: '71g',
                        fat: '2g',
                        fiber: '12g'
                    },
                    material_properties: {
                        'moisture content': '13-14%',
                        'particle size': '2-3mm',
                        'bulk density': '760-770 kg/m³',
                        'thermal conductivity': '0.12-0.16 W/m·K',
                        'specific heat': '1.46 kJ/kg·K',
                        'gelatinization temperature': '58-64°C',
                        'water absorption': '60-65%',
                        'gluten content': '8-15%',
                        'ash content': '1.5-2%'
                    },
                    processing_properties: {
                        'milling yield': '72-75%',
                        'dough development time': '3-8 minutes',
                        'mixing tolerance': 'Medium to High',
                        'fermentation tolerance': 'High'
                    }
                }
            },
            { 
                name: 'Rice',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '7g',
                        carbs: '78g',
                        fat: '0.6g',
                        fiber: '0.6g'
                    },
                    material_properties: {
                        'moisture content': '12-14%',
                        'grain length': '5-7mm',
                        'bulk density': '580-600 kg/m³',
                        'thermal conductivity': '0.17-0.19 W/m·K',
                        'specific heat': '1.73 kJ/kg·K',
                        'gelatinization temperature': '68-78°C',
                        'water absorption': '2.5-3.5x weight',
                        'amylose content': '20-25%',
                        'ash content': '0.3-0.5%'
                    },
                    processing_properties: {
                        'milling yield': '65-70%',
                        'cooking time': '15-20 minutes',
                        'grain elongation': '1.5-2x',
                        'stickiness': 'Low to Medium'
                    }
                }
            },
            { 
                name: 'Maize (corn)',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '9.4g',
                        carbs: '74g',
                        fat: '4.7g',
                        fiber: '7.3g'
                    },
                    material_properties: {
                        'moisture content': '13-15%',
                        'kernel size': '8-16mm',
                        'bulk density': '720-750 kg/m³',
                        'thermal conductivity': '0.15-0.18 W/m·K',
                        'specific heat': '1.84 kJ/kg·K',
                        'gelatinization temperature': '62-72°C',
                        'water absorption': '35-40%',
                        'starch content': '65-75%',
                        'ash content': '1.3-1.4%'
                    },
                    processing_properties: {
                        'milling yield': '65-70%',
                        'oil extraction rate': '3-4%',
                        'nixtamalization time': '8-16 hours',
                        'drying temperature': '45-65°C'
                    }
                }
            },
            { 
                name: 'Oats',
                image: 'assets/images/test.jpg',
                components: {
                    nutrients: {
                        protein: '16.9g',
                        carbs: '66.3g',
                        fat: '6.9g',
                        fiber: '10.6g'
                    },
                    material_properties: {
                        'moisture content': '12-14%',
                        'kernel size': '2-3mm',
                        'bulk density': '410-500 kg/m³',
                        'thermal conductivity': '0.14-0.16 W/m·K',
                        'specific heat': '1.63 kJ/kg·K',
                        'gelatinization temperature': '55-70°C',
                        'water absorption': '2x weight',
                        'beta-glucan content': '4-6%',
                        'ash content': '2-2.5%'
                    },
                    processing_properties: {
                        'dehulling efficiency': '75-80%',
                        'cooking time': '20-30 minutes',
                        'stabilization temperature': '100-105°C',
                        'flaking thickness': '0.4-0.6mm'
                    }
                }
            }
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
            { 
                name: 'Vegetable oils',
                image: 'assets/images/test.jpg',
                components: {
                    material_properties: {
                        'density': '910-920 kg/m³',
                        'smoke point': '200-230°C',
                        'viscosity': '40-50 mPa·s at 20°C',
                        'refractive index': '1.465-1.475',
                        'surface tension': '30-35 mN/m',
                        'specific heat': '1.67-2.10 kJ/kg·K',
                        'thermal conductivity': '0.16-0.17 W/m·K',
                        'flash point': '315-330°C'
                    },
                    chemical_properties: {
                        'iodine value': '110-140',
                        'acid value': '0.1-0.3 mg KOH/g',
                        'peroxide value': '<10 meq O₂/kg',
                        'saponification value': '188-196 mg KOH/g',
                        'fatty acid composition': {
                            'saturated': '8-15%',
                            'monounsaturated': '20-30%',
                            'polyunsaturated': '55-70%'
                        }
                    },
                    processing_properties: {
                        'oxidative stability': 'Medium',
                        'heat stability': 'High',
                        'clarification temperature': '60-70°C',
                        'winterization temperature': '5-10°C'
                    }
                }
            },
            { 
                name: 'Butter',
                image: 'assets/images/test.jpg',
                components: {
                    material_properties: {
                        'density': '911 kg/m³',
                        'melting point': '32-35°C',
                        'viscosity': '50-100 mPa·s at 40°C',
                        'thermal conductivity': '0.15-0.20 W/m·K',
                        'specific heat': '2.72 kJ/kg·K',
                        'moisture content': '15-16%',
                        'solid fat content': '40-50% at 10°C',
                        'flash point': '250°C'
                    },
                    chemical_properties: {
                        'iodine value': '26-40',
                        'acid value': '<0.8 mg KOH/g',
                        'peroxide value': '<10 meq O₂/kg',
                        'fatty acid composition': {
                            'saturated': '63-70%',
                            'monounsaturated': '25-30%',
                            'polyunsaturated': '2-5%'
                        },
                        'pH': '6.1-6.4'
                    },
                    processing_properties: {
                        'churning temperature': '10-12°C',
                        'pasteurization temperature': '85°C',
                        'crystallization temperature': '18-22°C',
                        'storage temperature': '4-5°C'
                    }
                }
            },
            { 
                name: 'Animal fat',
                image: 'assets/images/test.jpg',
                components: {
                    material_properties: {
                        'density': '920-940 kg/m³',
                        'melting point': '45-50°C',
                        'viscosity': '40-50 mPa·s at 50°C',
                        'thermal conductivity': '0.17-0.19 W/m·K',
                        'specific heat': '2.0-2.3 kJ/kg·K',
                        'smoke point': '185-215°C',
                        'solid fat content': '25-40% at 20°C'
                    },
                    chemical_properties: {
                        'iodine value': '32-47',
                        'acid value': '<0.5 mg KOH/g',
                        'peroxide value': '<10 meq O₂/kg',
                        'saponification value': '190-200 mg KOH/g',
                        'fatty acid composition': {
                            'saturated': '40-50%',
                            'monounsaturated': '40-50%',
                            'polyunsaturated': '1-10%'
                        }
                    },
                    processing_properties: {
                        'rendering temperature': '115-145°C',
                        'storage stability': 'High',
                        'filtration temperature': '55-65°C',
                        'clarification point': '65-75°C'
                    }
                }
            }
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
            {
                name: 'Blender',
                image: 'assets/images/test.jpg',
                properties: {
                    technical_specs: {
                        'power': '1000W',
                        'capacity': '2L',
                        'voltage': '220V',
                        'speeds': '5'
                    },
                    operational_parameters: {
                        'min_speed': '8000 RPM',
                        'max_speed': '24000 RPM',
                        'current_speed': '0',
                        'power_status': 'off',
                        'contents': []
                    },
                    maintenance_info: {
                        'cleaning': 'After each use',
                        'blade_check': 'Monthly'
                    },
                    safety_features: {
                        'safety_lock': 'Lid must be properly locked',
                        'overload_protection': 'Automatic shutoff'
                    }
                },
                actions: {
                    can_add_ingredients: true,
                    can_blend: true,
                    can_power: true,
                    can_adjust_speed: true
                }
            },
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
