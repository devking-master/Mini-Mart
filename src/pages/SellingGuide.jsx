import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit3, MessageCircle, DollarSign, CheckCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SellingGuide() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            {/* Hero Section */}
            <section className="px-6 md:px-12 py-20 bg-blue-50 dark:bg-blue-900/10 mb-20">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                    >
                        Start Selling like a Pro.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Turn your unused items into cash in minutes. Follow our guide to create listings that sell fast.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/create-listing" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30">
                            Start Selling Now
                            <TrendingUp size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black mb-4">How it works</h2>
                    <p className="text-gray-500 dark:text-gray-400">Four simple steps to your first sale</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Camera, title: "Snap Photos", desc: "Take clear, bright photos of your item from multiple angles." },
                        { icon: Edit3, title: "Describe It", desc: "Write a detailed description and set a competitive price." },
                        { icon: MessageCircle, title: "Chat & Agree", desc: "Chat securely with buyers to agree on price and meetup." },
                        { icon: DollarSign, title: "Get Paid", desc: "Meet safely, exchange the item, and get paid instantly." }
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center space-y-4 hover:border-blue-500/30 transition-colors"
                        >
                            <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center">
                                <step.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Pro Tips Section */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="bg-indigo-900 text-white rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black">Pro Seller Tips</h2>
                            <p className="text-indigo-200 text-lg">Maximize your earnings with these expert strategies.</p>

                            <ul className="space-y-6">
                                {[
                                    "Clean your items before taking photos",
                                    "Be honest about any defects or wear",
                                    "Respond to messages quickly",
                                    "Meet in public places for safety"
                                ].map((tip, i) => (
                                    <li key={i} className="flex items-center gap-4 text-indigo-100 font-medium">
                                        <CheckCircle className="text-blue-400 flex-shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <ShieldCheck className="text-blue-400" size={40} />
                                <div>
                                    <h4 className="font-bold text-xl">Safety First</h4>
                                    <p className="text-sm text-indigo-200">Our top priority</p>
                                </div>
                            </div>
                            <p className="text-indigo-100 leading-relaxed">
                                Always prioritize your safety. Use our secure chat feature, never share personal financial details, and always meet in safe, public locations. We verify users to keep our community safe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
