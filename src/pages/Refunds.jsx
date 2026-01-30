import React from 'react';

export default function Refunds() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Refund Policy</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12 font-medium">Last updated: January 2026</p>

                <div className="space-y-12 prose dark:prose-invert prose-lg max-w-none">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. General Policy</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Since Mini Mart is a platform that connects buyers and sellers for local meetup transactions, we generally do not process refunds directly. All sales are final and between the buyer and seller.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Buyer Protection</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We strongly advise all buyers to inspect items thoroughly before handing over payment. Once the transaction is complete, Mini Mart cannot intervene to force a refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Disputes</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            If you believe you have been scammed or sold a counterfeit item, please report the user via the "Report" button on their profile or listing. We verify such claims and ban fraudulent users from our platform.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
