import React from 'react';
import { motion } from 'framer-motion';

export default function SkeletonListing() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm h-full flex flex-col animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
            <div className="p-4 space-y-3 flex-1">
                <div className="flex justify-between items-start">
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-2/3" />
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-1/4" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded-md w-full" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded-md w-5/6" />
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md w-1/2" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md w-1/4" />
                </div>
            </div>
        </div>
    );
}
