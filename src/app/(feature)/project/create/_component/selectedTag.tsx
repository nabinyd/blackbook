'use client'
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TagSelector = ({
    selectedTags,
    availableTags,
    onTagSelect,
    onTagRemove
}: {
    selectedTags: string[];
    availableTags: string[];
    onTagSelect: (tag: string) => void;
    onTagRemove: (tag: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter tags based on search term
    const filteredTags = availableTags.filter(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags <span className='text-red-500'>*</span>
            </label>

            {/* Dropdown Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                Select tags...
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {/* Search Input */}
                    <div className="p-2 border-b border-gray-200">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tags..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Tags List */}
                    <div className="max-h-60 overflow-y-auto">
                        {filteredTags.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                                No tags found
                            </div>
                        ) : (
                            <div className="py-1">
                                {filteredTags.map(tag => (
                                    <div
                                        key={tag}
                                        onClick={() => onTagSelect(tag)}
                                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => { }}
                                            className="mr-2"
                                        />
                                        <span>{tag}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map(tag => (
                    <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => onTagRemove(tag)}
                            className="ml-1 hover:text-blue-900"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;