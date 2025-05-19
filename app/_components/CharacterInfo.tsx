"use client"
import { useState } from 'react';
import { Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDown, Settings } from 'lucide-react';

export default function CharacterInfo() {
    const [name, setName] = useState('');
    const [selectedClass, setSelectedClass] = useState('Rebellion');
    const [level, setLevel] = useState('99');
    const [str, setStr] = useState("")
    const [agi, setAgi] = useState("")
    const [int, setInt] = useState("")
    const [vit, setVit] = useState("")

    return (
        <div className="bg-gray-900 text-gray-200 p-2 sm:p-4 font-sans w-full rounded-lg border border-gray-700">
            {/* Name input and action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2">
                <div className="flex-1">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        classNames={{
                            input: "bg-gray-800 text-gray-200",
                            inputWrapper: "bg-gray-800 border-gray-700 hover:border-gray-600 data-[hover=true]:bg-gray-800"
                        }}
                        size="sm"
                        fullWidth
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <Button color="success" className="bg-green-700 text-gray-200" size="sm">
                        Save
                    </Button>
                    <Button isIconOnly variant="flat" className="bg-gray-700 text-gray-200" size="sm">
                        <Settings size={16} />
                    </Button>
                </div>
            </div>

            {/* Presets dropdown */}
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        endContent={<ChevronDown size={16} />}
                        variant="flat"
                        className="mb-2 w-full justify-between bg-gray-800 border border-gray-700 text-gray-200"
                        size="sm"
                    >
                        Presets
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Presets"
                    className="bg-gray-800 text-gray-200"
                >
                    <DropdownItem key="preset1">Preset 1</DropdownItem>
                    <DropdownItem key="preset2">Preset 2</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            {/* Character attributes */}
            <div className="grid grid-cols-1 gap-2">
                {/* Class selection */}
                <div className="w-full">
                    <div className="text-xs text-gray-400 mb-1 ml-1">Class</div>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="flat"
                                className="w-full justify-between bg-gray-800 border border-gray-700 text-gray-200"
                                startContent={
                                    <div className="bg-blue-600 rounded p-1">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 14L12 10L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                }
                                endContent={<ChevronDown size={16} />}
                                size="sm"
                            >
                                {selectedClass}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Class Selection"
                            className="bg-gray-800 text-gray-200"
                            onAction={(key) => setSelectedClass(key.toString())}
                        >
                            <DropdownItem key="Rebellion">Rebellion</DropdownItem>
                            <DropdownItem key="Warrior">Warrior</DropdownItem>
                            <DropdownItem key="Mage">Mage</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                {/* Level selection */}
                <div className="w-full">
                    <div className="text-xs text-gray-400 mb-1 ml-1">Level</div>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="flat"
                                className="w-full justify-between bg-gray-800 border border-gray-700 text-gray-200"
                                endContent={<ChevronDown size={16} />}
                                size="sm"
                            >
                                {level}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Level Selection"
                            className="bg-gray-800 text-gray-200"
                            onAction={(key) => setLevel(key.toString())}
                        >
                            <DropdownItem key="40">40</DropdownItem>
                            <DropdownItem key="50">50</DropdownItem>
                            <DropdownItem key="60">60</DropdownItem>
                            <DropdownItem key="70">70</DropdownItem>
                            <DropdownItem key="80">80</DropdownItem>
                            <DropdownItem key="90">90</DropdownItem>
                            <DropdownItem key="93">93</DropdownItem>
                            <DropdownItem key="100">100</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="w-full">
                    <div className="text-xs text-gray-400 mb-1 ml-1">Basic Stats</div>
                    <div className="flex gap-1">
                        <Input
                            value={str}
                            onChange={(e) => setStr(e.target.value)}
                            placeholder="STR"
                            classNames={{
                                input: "bg-gray-800 text-gray-200",
                                inputWrapper: "bg-gray-800 border-gray-700 hover:border-gray-600 data-[hover=true]:bg-gray-800"
                            }}
                            size="sm"
                            fullWidth
                        />
                        <Input
                            value={agi}
                            onChange={(e) => setAgi(e.target.value)}
                            placeholder="AGI"
                            classNames={{
                                input: "bg-gray-800 text-gray-200",
                                inputWrapper: "bg-gray-800 border-gray-700 hover:border-gray-600 data-[hover=true]:bg-gray-800"
                            }}
                            size="sm"
                            fullWidth
                        />
                        <Input
                            value={int}
                            onChange={(e) => setInt(e.target.value)}
                            placeholder="INT"
                            classNames={{
                                input: "bg-gray-800 text-gray-200",
                                inputWrapper: "bg-gray-800 border-gray-700 hover:border-gray-600 data-[hover=true]:bg-gray-800"
                            }}
                            size="sm"
                            fullWidth
                        />
                        <Input
                            value={vit}
                            onChange={(e) => setVit(e.target.value)}
                            placeholder="VIT"
                            classNames={{
                                input: "bg-gray-800 text-gray-200",
                                inputWrapper: "bg-gray-800 border-gray-700 hover:border-gray-600 data-[hover=true]:bg-gray-800"
                            }}
                            size="sm"
                            fullWidth
                        />
                    </div>
                </div>

            </div>



        </div >
    );
}