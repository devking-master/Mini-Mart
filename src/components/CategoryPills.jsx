import React from 'react';
import { motion } from 'framer-motion';

import { Laptop, Sofa, Shirt, Car, Book, Briefcase, Grid, Box } from 'lucide-react';

export const categories = [
    { name: "All", icon: Grid },
    { name: "Electronics", icon: Laptop },
    { name: "Furniture", icon: Sofa },
    { name: "Clothing", icon: Shirt },
    { name: "Vehicles", icon: Car },
    { name: "Books", icon: Book },
    { name: "Services", icon: Briefcase },
    { name: "Other", icon: Box }
];

export default function CategoryPills({ selected, onSelect }) {
    return (
        <div className="flex gap-3 overflow-x-auto pb-6 pt-2 scrollbar-hide mask-fade">
            {categories.map((cat) => (
                <button
                    key={cat.name}
                    onClick={() => onSelect(cat.name)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 focus:outline-none ${selected === cat.name
                        ? 'text-white bg-blue-600 shadow-md -translate-y-0.5'
                        : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                >
                    <cat.icon size={16} className={selected === cat.name ? 'opacity-100' : 'opacity-60'} />
                    {cat.name}
                    {selected === cat.name && (
                        <motion.div
                            layoutId="activePill"
                            className="absolute inset-0 rounded-2xl bg-white/10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}

