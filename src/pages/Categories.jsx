import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Shirt, Home, Car, Gamepad, Watch, Laptop, Baby, Book, Music, PenTool, Dog } from 'lucide-react';

export default function Categories() {
    const categories = [
        { name: "Electronics", icon: Smartphone, color: "bg-blue-500" },
        { name: "Fashion", icon: Shirt, color: "bg-pink-500" },
        { name: "Home & Garden", icon: Home, color: "bg-green-500" },
        { name: "Vehicles", icon: Car, color: "bg-orange-500" },
        { name: "Gaming", icon: Gamepad, color: "bg-purple-500" },
        { name: "Watches", icon: Watch, color: "bg-gray-700" },
        { name: "Computers", icon: Laptop, color: "bg-indigo-500" },
        { name: "Baby & Kids", icon: Baby, color: "bg-yellow-500" },
        { name: "Books", icon: Book, color: "bg-red-500" },
        { name: "Music", icon: Music, color: "bg-teal-500" },
        { name: "Tools", icon: PenTool, color: "bg-orange-700" },
        { name: "Pets", icon: Dog, color: "bg-stone-500" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            <section className="px-6 md:px-12 py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-6">Browse Categories</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400">Find exactly what you're looking for.</p>
            </section>

            <section className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                to={`/?category=${cat.name}`}
                                className="block group relative overflow-hidden bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 hover:border-blue-500/30 transition-all h-full"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${cat.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <cat.icon size={32} />
                                </div>

                                <h3 className="text-2xl font-black mb-2">{cat.name}</h3>
                                <p className="text-xs font-bold text-gray-400 group-hover:text-blue-500 transition-colors uppercase tracking-widest italic">View Quality Items</p>

                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
