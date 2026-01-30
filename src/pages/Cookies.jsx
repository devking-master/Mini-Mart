import React from 'react';

export default function Cookies() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Cookie Policy</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12 font-medium">Last updated: January 2026</p>

                <div className="space-y-12 prose dark:prose-invert prose-lg max-w-none">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. What are cookies?</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. How Mini Mart uses cookies</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>To enable certain functions of the Service.</li>
                            <li>To provide analytics.</li>
                            <li>To store your preferences.</li>
                            <li>To enable advertisements delivery, including behavioral advertising.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
