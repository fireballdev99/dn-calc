'use client'

import React, { useState, useEffect } from 'react';
interface MaterialRequirement {
    essenceOfLife: number;
    intermediateDiamond: number;
    magicProtectionJelly: number;
}

interface EnhancementRate {
    successRate: number;
    breakProbability: number;
    failurePenalty: number;
}

interface ItemType {
    name: string;
    rates: EnhancementRate[];
    materialRequirements: MaterialRequirement[];
}

const ITEM_TYPES: { [key: string]: ItemType } = {
    epic: {
        name: 'Epic and Unique',
        rates: [
            { successRate: 100, breakProbability: 0, failurePenalty: 0 },
            { successRate: 100, breakProbability: 0, failurePenalty: 0 },
            { successRate: 100, breakProbability: 0, failurePenalty: 0 },
            { successRate: 100, breakProbability: 0, failurePenalty: 0 },
            { successRate: 100, breakProbability: 0, failurePenalty: 0 },
            { successRate: 100, breakProbability: 0, failurePenalty: 0 },
            { successRate: 50, breakProbability: 25, failurePenalty: 0 },
            { successRate: 40, breakProbability: 25, failurePenalty: -1 },
            { successRate: 35, breakProbability: 25, failurePenalty: -2 },
            { successRate: 30, breakProbability: 25, failurePenalty: 0 },
            { successRate: 25, breakProbability: 25, failurePenalty: -1 },
            { successRate: 20, breakProbability: 25, failurePenalty: -2 },
            { successRate: 15, breakProbability: 25, failurePenalty: -2 },
            { successRate: 5, breakProbability: 25, failurePenalty: -2 },
            { successRate: 1, breakProbability: 25, failurePenalty: -2 },
        ],
        materialRequirements: generateMaterialRequirements()
    },
    legendary: {
        name: 'Legendary',
        rates: [
            { successRate: 33.33, breakProbability: 0, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 0, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 0, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 0, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 0, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 0, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 25, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 25, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 25, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 25, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 25, failurePenalty: 0 },
            { successRate: 33.33, breakProbability: 25, failurePenalty: -1 },
            { successRate: 15, breakProbability: 25, failurePenalty: -2 },
            { successRate: 5, breakProbability: 25, failurePenalty: -2 },
            { successRate: 1, breakProbability: 25, failurePenalty: -2 },
        ],
        materialRequirements: generateMaterialRequirements()
    }
};

function generateMaterialRequirements(): MaterialRequirement[] {
    return [
        { essenceOfLife: 1, intermediateDiamond: 0, magicProtectionJelly: 0 },
        { essenceOfLife: 1, intermediateDiamond: 0, magicProtectionJelly: 0 },
        { essenceOfLife: 1, intermediateDiamond: 0, magicProtectionJelly: 0 },
        { essenceOfLife: 2, intermediateDiamond: 0, magicProtectionJelly: 0 },
        { essenceOfLife: 2, intermediateDiamond: 0, magicProtectionJelly: 0 },
        { essenceOfLife: 3, intermediateDiamond: 0, magicProtectionJelly: 0 },
        { essenceOfLife: 3, intermediateDiamond: 1, magicProtectionJelly: 12 },
        { essenceOfLife: 3, intermediateDiamond: 1, magicProtectionJelly: 12 },
        { essenceOfLife: 4, intermediateDiamond: 1, magicProtectionJelly: 12 },
        { essenceOfLife: 4, intermediateDiamond: 2, magicProtectionJelly: 18 },
        { essenceOfLife: 4, intermediateDiamond: 2, magicProtectionJelly: 18 },
        { essenceOfLife: 4, intermediateDiamond: 2, magicProtectionJelly: 18 },
        { essenceOfLife: 5, intermediateDiamond: 2, magicProtectionJelly: 18 },
        { essenceOfLife: 5, intermediateDiamond: 3, magicProtectionJelly: 18 },
        { essenceOfLife: 5, intermediateDiamond: 3, magicProtectionJelly: 24 }
    ];
}

const EnhancementSimulator: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string>('epic');
    const [currentLevel, setCurrentLevel] = useState<number>(0);
    const [targetLevel, setTargetLevel] = useState<number>(1);
    const [useProtection, setUseProtection] = useState<boolean>(true);
    const [inventory, setInventory] = useState({
        essenceOfLife: 100,
        intermediateDiamond: 50,
        magicProtectionJelly: 100
    });
    const [simulationResults, setSimulationResults] = useState<string[]>([]);
    const [simulationStats, setSimulationStats] = useState({
        attempts: 0,
        successes: 0,
        failures: 0,
        breaks: 0,
        materialsUsed: {
            essenceOfLife: 0,
            intermediateDiamond: 0,
            magicProtectionJelly: 0
        }
    });
    const [isSimulating, setIsSimulating] = useState<boolean>(false);
    const [autoSimulate, setAutoSimulate] = useState<boolean>(false);
    const [simSpeed, setSimSpeed] = useState<number>(300); // ms between attempts
    const [startingLevel, setStartingLevel] = useState<number>(0); // New state for starting level

    // Helper function to get requirements for current level
    const getCurrentRequirements = () => {
        if (currentLevel >= 0 && currentLevel < 15) {
            return ITEM_TYPES[selectedItem].materialRequirements[currentLevel];
        }
        return { essenceOfLife: 0, intermediateDiamond: 0, magicProtectionJelly: 0 };
    };

    // Helper function to get enhancement rates for current level
    const getCurrentRates = () => {
        if (currentLevel >= 0 && currentLevel < 15) {
            return ITEM_TYPES[selectedItem].rates[currentLevel];
        }
        return { successRate: 0, breakProbability: 0, failurePenalty: 0 };
    };

    // Check if we have enough materials
    const hasEnoughMaterials = () => {
        const req = getCurrentRequirements();
        return (
            inventory.essenceOfLife >= req.essenceOfLife &&
            inventory.intermediateDiamond >= req.intermediateDiamond &&
            (
                !useProtection ||
                (req.magicProtectionJelly === 0 || inventory.magicProtectionJelly >= req.magicProtectionJelly)
            )
        );
    };

    // Use materials
    const useMaterials = () => {
        const req = getCurrentRequirements();
        const materialsUsed = {
            essenceOfLife: req.essenceOfLife,
            intermediateDiamond: req.intermediateDiamond,
            magicProtectionJelly: useProtection ? req.magicProtectionJelly : 0
        };

        setInventory({
            ...inventory,
            essenceOfLife: inventory.essenceOfLife - materialsUsed.essenceOfLife,
            intermediateDiamond: inventory.intermediateDiamond - materialsUsed.intermediateDiamond,
            magicProtectionJelly: inventory.magicProtectionJelly - materialsUsed.magicProtectionJelly
        });

        return materialsUsed;
    };

    // Single enhancement attempt
    const attemptEnhancement = () => {
        if (currentLevel >= 15 || !hasEnoughMaterials()) {
            setAutoSimulate(false);
            return;
        }

        const rates = getCurrentRates();
        const roll = Math.random() * 100;
        const breakRoll = Math.random() * 100;
        const materialsUsed = useMaterials();

        // Update simulation stats
        setSimulationStats(prev => ({
            ...prev,
            attempts: prev.attempts + 1,
            materialsUsed: {
                essenceOfLife: prev.materialsUsed.essenceOfLife + materialsUsed.essenceOfLife,
                intermediateDiamond: prev.materialsUsed.intermediateDiamond + materialsUsed.intermediateDiamond,
                magicProtectionJelly: prev.materialsUsed.magicProtectionJelly + materialsUsed.magicProtectionJelly
            }
        }));

        let result = '';

        // Success check
        if (roll <= rates.successRate) {
            setCurrentLevel(prev => prev + 1);
            result = `Success! +${currentLevel} → +${currentLevel + 1}`;
            setSimulationStats(prev => ({
                ...prev,
                successes: prev.successes + 1
            }));
        }
        // Failure check
        else {
            // Break check
            if (rates.breakProbability > 0 && breakRoll <= rates.breakProbability && !useProtection) {
                // Item breaks - no protection system
                setCurrentLevel(0);
                result = `Catastrophic failure! Item broken, enhancement level reset to +0`;
                setSimulationStats(prev => ({
                    ...prev,
                    breaks: prev.breaks + 1
                }));
            }
            else if (rates.breakProbability > 0 && breakRoll <= rates.breakProbability) {
                // Item breaks - with protection system
                result = `Catastrophic failure! Item broken, using magic protection jelly`;
                setSimulationStats(prev => ({
                    ...prev,
                    breaks: prev.breaks + 1
                }));
            }
            // Regular failure with penalty
            else if (rates.failurePenalty !== 0) {
                const newLevel = Math.max(0, currentLevel + rates.failurePenalty);
                setCurrentLevel(newLevel);
                result = `Failed! Enhancement level decreased: +${currentLevel} → +${newLevel}`;
            }
            // Regular failure without penalty
            else {
                result = `Failed! Enhancement level remains at +${currentLevel}`;
            }

            setSimulationStats(prev => ({
                ...prev,
                failures: prev.failures + 1
            }));
        }

        // Add result to log
        setSimulationResults(prevResults => [result, ...prevResults.slice(0, 99)]);

        // Check if we've reached target level
        if (currentLevel + 1 >= targetLevel) {
            setAutoSimulate(false);
        }
    };

    // Bulk simulation
    const startSimulation = () => {
        if (!isSimulating && currentLevel < targetLevel) {
            setIsSimulating(true);
            setAutoSimulate(true);
        } else {
            setAutoSimulate(false);
        }
    };

    // Add specific materials
    const addSpecificMaterial = (materialType: string, amount: number) => {
        setInventory(prev => ({
            ...prev,
            [materialType]: prev[materialType as keyof typeof prev] + amount
        }));
    };

    // Reset simulator
    const resetSimulator = () => {
        setCurrentLevel(startingLevel);
        setSimulationResults([]);
        setSimulationStats({
            attempts: 0,
            successes: 0,
            failures: 0,
            breaks: 0,
            materialsUsed: {
                essenceOfLife: 0,
                intermediateDiamond: 0,
                magicProtectionJelly: 0
            }
        });
    };

    // Apply starting level
    const applyStartingLevel = (level: number) => {
        setStartingLevel(level);
        setCurrentLevel(level);

        // Set target level to at least one more than starting level
        if (targetLevel <= level) {
            setTargetLevel(level + 1);
        }

        resetSimulator();
    };

    // Auto simulation effect
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (autoSimulate && hasEnoughMaterials() && currentLevel < targetLevel) {
            timer = setTimeout(() => {
                attemptEnhancement();
            }, simSpeed);
        } else if (autoSimulate) {
            setAutoSimulate(false);
            setIsSimulating(false);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [autoSimulate, currentLevel, inventory, targetLevel]);

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 max-w-6xl mx-auto">
            {/* Left Panel - Enhancement Interface */}
            <div className="w-full md:w-1/2 bg-gray-800 rounded-lg overflow-hidden border border-amber-500">
                <div className="p-4">
                    <h2 className="text-2xl text-center font-bold mb-4 text-amber-500">Item Enhancement Simulator</h2>

                    {/* Item Type Selection */}
                    <div className="mb-4">
                        <label className="block text-white mb-2">Item Type:</label>
                        <select
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                            value={selectedItem}
                            onChange={(e) => {
                                setSelectedItem(e.target.value);
                                resetSimulator();
                            }}
                        >
                            <option value="epic">Epic and Unique</option>
                            <option value="legendary">Legendary</option>
                        </select>
                    </div>

                    {/* Starting Level Selection */}
                    <div className="mb-4">
                        <label className="block text-white mb-2">Starting Level:</label>
                        <div className="grid grid-cols-4 gap-2">
                            {[0, 6, 8, 9, 10, 11, 12, 13].map((level) => (
                                <button
                                    key={level}
                                    className={`p-2 rounded ${startingLevel === level ? 'bg-amber-600' : 'bg-gray-700'} hover:bg-amber-700 text-white`}
                                    onClick={() => applyStartingLevel(level)}
                                >
                                    +{level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Current Enhancement Visual */}
                    <div className="relative w-full h-64 bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                        <div className="absolute inset-0 bg-center bg-no-repeat opacity-10"
                            style={{ backgroundImage: "url('https://via.placeholder.com/400')" }}></div>
                        <div className="text-center z-10">
                            <div className="text-4xl font-bold text-amber-500 mb-2">+{currentLevel}</div>
                            <div className="text-lg text-white">{currentLevel === 15 ? "MAX LEVEL" : ""}</div>
                        </div>
                    </div>

                    {/* Enhancement Controls */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-white mb-1">Target Level:</label>
                            <select
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                                value={targetLevel}
                                onChange={(e) => setTargetLevel(parseInt(e.target.value))}
                            >
                                {[...Array(16)].map((_, idx) => (
                                    <option key={idx} value={idx} disabled={idx <= currentLevel}>
                                        +{idx}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-white mb-1">Simulation Speed:</label>
                            <select
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                                value={simSpeed}
                                onChange={(e) => setSimSpeed(parseInt(e.target.value))}
                            >
                                <option value={1000}>Slow</option>
                                <option value={300}>Normal</option>
                                <option value={100}>Fast</option>
                                <option value={10}>Very Fast</option>
                            </select>
                        </div>
                    </div>

                    {/* Protection Option */}
                    <div className="mb-4">
                        <label className="flex items-center text-white">
                            <input
                                type="checkbox"
                                checked={useProtection}
                                onChange={(e) => setUseProtection(e.target.checked)}
                                className="mr-2"
                            />
                            Use Magic Protection Jelly
                        </label>
                    </div>

                    {/* Requirement Display */}
                    <div className="mb-4 p-3 bg-gray-900 rounded-lg">
                        <h3 className="text-white font-bold mb-2">Requirements</h3>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                            <div className="flex justify-between mb-1">
                                <span className="text-amber-200">Essence of Life:</span>
                                <span className="text-white">{getCurrentRequirements().essenceOfLife}</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span className="text-blue-200">Intermediate Diamond:</span>
                                <span className="text-white">{getCurrentRequirements().intermediateDiamond}</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span className="text-purple-200">Magic Protection Jelly:</span>
                                <span className="text-white">{useProtection ? getCurrentRequirements().magicProtectionJelly : 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Enhancement Rates */}
                    <div className="mb-4 p-3 bg-gray-900 rounded-lg">
                        <h3 className="text-white font-bold mb-2">Enhancement Rates</h3>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-green-400">Success:</span>
                                <span className="text-white">{getCurrentRates().successRate}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-red-400">Break:</span>
                                <span className="text-white">{getCurrentRates().breakProbability}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-yellow-400">On Fail:</span>
                                <span className="text-white">
                                    {getCurrentRates().failurePenalty === 0
                                        ? "No change"
                                        : `${getCurrentRates().failurePenalty} level${Math.abs(getCurrentRates().failurePenalty) > 1 ? 's' : ''}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={attemptEnhancement}
                            disabled={currentLevel >= 15 || !hasEnoughMaterials()}
                        >
                            Enhance Once
                        </button>
                        <button
                            className={`${autoSimulate ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                            onClick={startSimulation}
                            disabled={currentLevel >= 15 || !hasEnoughMaterials() || currentLevel >= targetLevel}
                        >
                            {autoSimulate ? 'Stop Simulation' : 'Auto Enhance'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel - Inventory & Results */}
            <div className="w-full md:w-1/2">
                {/* Inventory */}
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-amber-500 mb-4 p-4">
                    <h2 className="text-xl font-bold mb-3 text-amber-500">Inventory</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center bg-gray-700 p-2 rounded">
                            <div className="w-8 h-8 bg-amber-200 rounded-full mr-2"></div>
                            <span className="text-white">Essence: {inventory.essenceOfLife}</span>
                        </div>
                        <div className="flex items-center bg-gray-700 p-2 rounded">
                            <div className="w-8 h-8 bg-blue-200 rounded-full mr-2"></div>
                            <span className="text-white">Diamond: {inventory.intermediateDiamond}</span>
                        </div>
                        <div className="flex items-center bg-gray-700 p-2 rounded">
                            <div className="w-8 h-8 bg-purple-200 rounded-full mr-2"></div>
                            <span className="text-white">Magic Jelly: {inventory.magicProtectionJelly}</span>
                        </div>
                    </div>

                    {/* Individual Material Add Buttons */}
                    <div className="mb-4">
                        <h3 className="text-white font-bold mb-2">Add Materials</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label className="block text-white text-xs mb-1">Essence of Life</label>
                                <div className="flex gap-1">
                                    <button
                                        className="bg-amber-600 hover:bg-amber-700 text-white py-1 px-2 rounded text-xs flex-1"
                                        onClick={() => addSpecificMaterial('essenceOfLife', 100)}
                                    >
                                        +100
                                    </button>
                                    <button
                                        className="bg-amber-700 hover:bg-amber-800 text-white py-1 px-2 rounded text-xs flex-1"
                                        onClick={() => addSpecificMaterial('essenceOfLife', 1000)}
                                    >
                                        +1000
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-white text-xs mb-1">Intermediate Diamond</label>
                                <div className="flex gap-1">
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs flex-1"
                                        onClick={() => addSpecificMaterial('intermediateDiamond', 50)}
                                    >
                                        +50
                                    </button>
                                    <button
                                        className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-2 rounded text-xs flex-1"
                                        onClick={() => addSpecificMaterial('intermediateDiamond', 500)}
                                    >
                                        +500
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-white text-xs mb-1">Magic Protection Jelly</label>
                                <div className="flex gap-1">
                                    <button
                                        className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs flex-1"
                                        onClick={() => addSpecificMaterial('magicProtectionJelly', 100)}
                                    >
                                        +100
                                    </button>
                                    <button
                                        className="bg-purple-700 hover:bg-purple-800 text-white py-1 px-2 rounded text-xs flex-1"
                                        onClick={() => addSpecificMaterial('magicProtectionJelly', 1000)}
                                    >
                                        +1000
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm ml-auto"
                            onClick={resetSimulator}
                        >
                            Reset Simulator
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-amber-500 mb-4 p-4">
                    <h2 className="text-xl font-bold mb-3 text-amber-500">Statistics</h2>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="bg-gray-700 p-2 rounded">
                            <span className="text-white">Total Attempts: {simulationStats.attempts}</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                            <span className="text-white">Success Rate: {simulationStats.attempts > 0 ? ((simulationStats.successes / simulationStats.attempts) * 100).toFixed(2) : 0}%</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                            <span className="text-white">Successful: {simulationStats.successes}</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                            <span className="text-white">Failed: {simulationStats.failures}</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded col-span-2">
                            <span className="text-white">Item Breaks: {simulationStats.breaks}</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-amber-300">Materials Used</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="bg-gray-700 p-2 rounded">
                            <span className="text-white">Essence: {simulationStats.materialsUsed.essenceOfLife}</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                            <span className="text-white">Diamond: {simulationStats.materialsUsed.intermediateDiamond}</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                            <span className="text-white">Magic Jelly: {simulationStats.materialsUsed.magicProtectionJelly}</span>
                        </div>
                    </div>
                </div>

                {/* Results Log */}
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-amber-500 p-4">
                    <h2 className="text-xl font-bold mb-3 text-amber-500">Enhancement Log</h2>
                    <div className="h-64 overflow-y-auto bg-gray-900 rounded p-2">
                        {simulationResults.length > 0 ? (
                            <ul className="space-y-1">
                                {simulationResults.map((result, index) => (
                                    <li
                                        key={index}
                                        className={`text-sm p-1 ${result.includes('Success')
                                            ? 'text-green-400 bg-green-900 bg-opacity-20'
                                            : result.includes('Catastrophic')
                                                ? 'text-red-400 bg-red-900 bg-opacity-20'
                                                : 'text-yellow-400 bg-yellow-900 bg-opacity-20'
                                            }`}
                                    >
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-gray-400 text-center py-4">No enhancement attempts yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancementSimulator;