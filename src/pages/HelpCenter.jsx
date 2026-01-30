import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Mail } from 'lucide-react';

export default function HelpCenter() {
    const [search, setSearch] = useState("");

    // FAQ Data
    const faqs = [
        {
            category: "Buying",
            items: [
                { q: "How do I buy an item?", a: "Find an item you love, tap 'Chat with Seller', and agree on a price and meetup location. We recommend meeting in public places." },
                { q: "Is it safe to buy on Mini Mart?", a: "Yes! We verify all users and have strict safety guidelines. Check out our Safety Center for more tips." },
                { q: "Can I pay online?", a: "Currently, we encourage cash or instant bank transfers upon meeting to ensure you inspect the item first." }
            ]
        },
        {
            category: "Selling",
            items: [
                { q: "Does it cost money to sell?", a: "Listing items is completely free! We only charge a small fee for premium promoted listings." },
                { q: "How do I promote my listing?", a: "Go to your profile, select the listing, and tap 'Boost Listing' to reach more buyers." }
            ]
        },
        {
            category: "Account",
            items: [
                { q: "How do I reset my password?", a: "Go to the login page and tap 'Forgot Password'. We'll send you a reset link." },
                { q: "Can I change my username?", a: "Yes, you can update your profile details in the Profile settings section." }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            {/* Hero Search */}
            <section className="bg-blue-600 px-6 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">How can we help?</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-200 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 transition-all outline-none"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" size={20} />
                    </div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="max-w-3xl mx-auto px-6 py-20 space-y-12">
                {faqs.map((section, i) => (
                    <motion.div
                        key={section.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <h2 className="text-2xl font-black mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">{section.category}</h2>
                        <div className="space-y-4">
                            {section.items.map((item, index) => (
                                <AccordionItem key={index} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Contact Support */}
            <section className="bg-gray-50 dark:bg-gray-900/50 py-20 px-6 text-center">
                <div className="max-w-xl mx-auto space-y-6">
                    <h2 className="text-3xl font-black">Still need help?</h2>
                    <p className="text-gray-500 dark:text-gray-400">Our support team is available 24/7 to assist you.</p>
                    <div className="flex justify-center gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                            <MessageCircle size={20} />
                            Chat with Support
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Mail size={20} />
                            Email Us
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function AccordionItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900/30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left font-bold hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            >
                {question}
                <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
