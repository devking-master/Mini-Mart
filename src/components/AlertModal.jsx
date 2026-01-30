import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export default function AlertModal({
    isOpen,
    onClose,
    title,
    message,
    buttonText = "Okay",
    type = "error" // error, success, info
}) {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={32} />;
            case 'info': return <Info size={32} />;
            case 'error': default: return <AlertCircle size={32} />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success': return 'bg-green-100 text-green-600 dark:bg-green-900/30';
            case 'info': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30';
            case 'error': default: return 'bg-red-100 text-red-600 dark:bg-red-900/30';
        }
    };

    const getButtonColor = () => {
        switch (type) {
            case 'success': return 'bg-green-600 hover:bg-green-700 shadow-green-600/20';
            case 'info': return 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20';
            case 'error': default: return 'bg-red-600 hover:bg-red-700 shadow-red-600/20';
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                >
                    <div className="p-6 text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${getColors()}`}>
                            {getIcon()}
                        </div>

                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                            {title}
                        </h3>

                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 leading-relaxed">
                            {message}
                        </p>

                        <button
                            onClick={onClose}
                            className={`w-full py-3 px-4 font-bold rounded-2xl text-white shadow-lg transition-all ${getButtonColor()}`}
                        >
                            {buttonText}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
