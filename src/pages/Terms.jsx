import React from 'react';

export default function Terms() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Terms of Service</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12 font-medium">Last updated: January 2026</p>

                <div className="space-y-12 prose dark:prose-invert prose-lg max-w-none">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            By accessing and using Mini Mart, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Mini Mart provides users with a platform to buy, sell, and connect with other users in their local community. We do not own, sell, resel, furnish, provide, rent, re-rent, manage and/or control properties, or transportation or delivery services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            You agree to not use the Service to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing,  tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable.</li>
                            <li>Harm minors in any way.</li>
                            <li>Impersonate any person or entity.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Termination</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            You agree that Mini Mart may, under certain circumstances and without prior notice, immediately terminate your Mini Mart account and access to the Service. Cause for such termination shall include, but not be limited to, breaches or violations of the TOS or other incorporated agreements or guidelines.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
