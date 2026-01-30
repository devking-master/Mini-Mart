import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] flex items-center justify-center px-6 transition-colors duration-500">
            <div className="max-w-xl w-full text-center space-y-12">
                {/* Visual element */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[12rem] md:text-[15rem] font-black text-gray-900/5 dark:text-white/5 leading-none select-none"
                    >
                        404
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-500">
                            <Search size={48} className="text-white md:size-64" />
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight"
                    >
                        Lost in the Mart?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto"
                    >
                        The item or page you're looking for seems to have been misplaced or sold out.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl"
                    >
                        <Home size={20} /> Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                        <ArrowLeft size={20} /> Go Back
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
