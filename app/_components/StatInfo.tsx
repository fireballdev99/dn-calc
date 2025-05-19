// _components/StatInfo.tsx
"use client"
import { useState } from 'react';

export default function StatInfo() {
    const [selectedEATK, setSelectedEATK] = useState('Fire');

    return (
        <div className="bg-gray-900 text-gray-200 p-2 sm:p-4 font-sans w-full rounded-lg border border-gray-700 my-2">
            <div className="mt-4">
                <h3 className="text-sm text-gray-200 font-medium mb-2">Character Status</h3>
            </div>
            {/* HP */}
            <div className="border-l-4 border-green-500 bg-gray-800 px-2 py-1 flex justify-between mb-4">
                <div className="text-white font-bold">HP</div>
                <div className="text-orange-500 font-bold">40433</div>
            </div>

            {/* Final Stat Result */}
            <div className="mb-4">
                <h3 className="text-white font-bold mb-1">Final Stat Result</h3>
                <div className="text-orange-400 mb-1">Basic Info</div>
                <div className="grid grid-cols-3 gap-1 mb-2">
                    <div className="text-white">P.ATK</div>
                    <div className="text-orange-500 text-right">1564</div>
                    <div className="text-orange-500 text-right">2192</div>

                    <div className="text-white">M.ATK</div>
                    <div className="text-orange-500 text-right">3461</div>
                    <div className="text-orange-500 text-right">4195</div>

                    <div className="text-white">P.Def</div>
                    <div className="text-orange-500 text-right">26%</div>
                    <div className="text-orange-500 text-right">22%</div>

                    <div className="text-white">M.Def</div>
                    <div className="text-orange-500 text-right">51%</div>
                    <div className="text-orange-500 text-right">48%</div>
                </div>

                <div className="text-orange-400 mb-1">Stats Info</div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="text-white">STR</div>
                    <div className="text-orange-500 text-right">165</div>

                    <div className="text-white">AGI</div>
                    <div className="text-orange-500 text-right">504</div>

                    <div className="text-white">INT</div>
                    <div className="text-orange-500 text-right">162</div>

                    <div className="text-white">VIT</div>
                    <div className="text-orange-500 text-right">400</div>
                </div>

                <div className="text-orange-400 mb-1">Special Attack Info</div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="text-white">Crit</div>
                    <div className="text-orange-500 text-right">75% <span className="text-xs">(8574)</span></div>

                    <div className="text-white">Final Dmg</div>
                    <div className="text-orange-500 text-right">15% <span className="text-xs">(382)</span></div>
                </div>

                <div className="text-orange-400 mb-1">Element Attack Info</div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="text-white">Fire</div>
                    <div className="text-orange-500 text-right">0.00%</div>

                    <div className="text-white">Ice</div>
                    <div className="text-orange-500 text-right">0.00%</div>

                    <div className="text-white">Dark</div>
                    <div className="text-orange-500 text-right">10.00%</div>

                    <div className="text-white">Light</div>
                    <div className="text-orange-500 text-right">8.00%</div>
                </div>

                <div className='grid grid-cols-2 gap-1 mb-2'>
                    <div className="text-orange-400 mb-1">Effective Attack</div>
                    <div className='flex justify-end'>Element</div>
                </div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="text-white">EP.ATK</div>
                    <div className="text-orange-500 text-right">3709</div>
                </div>

                <div className="grid grid-cols-2 gap-1 mb-1">
                    <div className="text-white">E.M.ATK</div>
                    <div className="text-orange-500 text-right">7706</div>
                </div>

                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="text-white">Avg. E.P.ATK</div>
                    <div className="text-orange-500 text-right">3709</div>
                </div>

                <div className="grid grid-cols-2 gap-1 mb-1">
                    <div className="text-white">Avg. E.M.ATK</div>
                    <div className="text-orange-500 text-right">7706</div>
                </div>

            </div>
        </div>
    );
}