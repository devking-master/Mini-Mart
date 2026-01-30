import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, MapPin, AlertTriangle, UserCheck, Eye } from 'lucide-react';

export default function Safety() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            {/* Hero */}
            <section className="px-6 md:px-12 py-20 text-center mb-20">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 mx-auto rounded-3xl flex items-center justify-center mb-8"
                >
                    <Shield size={40} />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Safety Center</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    We are committed to creating a secure and trusted environment for our community. Learn how to stay safe.
                </p>
            </section>

            {/* Safety Pillars */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Lock,
                            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
                            title: "Secure Data",
                            desc: "We use bank-level encryption to protect your personal information."
                        },
                        {
                            icon: UserCheck,
                            color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
                            title: "Verified Users",
                            desc: "We screen users to ensure a community of real, trusted people."
                        },
                        {
                            icon: Eye,
                            color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30",
                            title: "Proactive Monitoring",
                            desc: "Our AI systems constantly scan for suspicious activity."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800"
                        >
                            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Checklist */}
            <section className="max-w-[1000px] mx-auto px-6 md:px-12">
                <div className="border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16">
                    <h2 className="text-3xl font-black mb-12 text-center">Safety Checklist</h2>

                    <div className="space-y-8">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
                            <div>
                                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <MapPin size={20} className="text-blue-500" />
                                    Meet in Public
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">Always meet in busy public places like cafes, malls, or police stations. Avoid secluded areas or private homes.</p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 dark:bg-gray-800 ml-18" />

                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
                            <div>
                                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <AlertTriangle size={20} className="text-yellow-500" />
                                    Inspect Before Buying
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">Examine the item thoroughly before handing over money. If it's electronics, test it out.</p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 dark:bg-gray-800 ml-18" />

                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
                            <div>
                                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <Lock size={20} className="text-red-500" />
                                    Keep Communications on App
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">Avoid sharing personal phone numbers or email addresses. Use our secure in-app chat.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
