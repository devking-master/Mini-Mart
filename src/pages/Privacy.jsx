import React from 'react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Privacy Policy</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12 font-medium">Last updated: January 2026</p>

                <div className="space-y-12 prose dark:prose-invert prose-lg max-w-none">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Information Collection</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We collect information you provide directly to us. For example, we collect information when you create an account, subscribe, participate in any interactive features of our services, fill out a form, request customer support or otherwise communicate with us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Use of Information</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We use the information we collect to provide, maintain, and improve our services, such as to process transactions, send you related information, including confirmations and invoices, technical notices, updates, security alerts, and support and administrative messages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Sharing of Information</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We may share personal information as follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mt-4">
                            <li>With vendors, consultants and other service providers who need access to such information to carry out work on our behalf.</li>
                            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation or legal process.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Security</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Mini Mart takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
