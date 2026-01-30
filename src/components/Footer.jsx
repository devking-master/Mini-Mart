import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setStatus("loading");
        try {
            await addDoc(collection(db, "subscribers"), {
                email: email,
                timestamp: serverTimestamp()
            });
            setStatus("success");
            setEmail("");
        } catch (error) {
            console.error("Subscription error:", error);
            setStatus("error");
        }
    };

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-500">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">M</div>
                            <span className="text-2xl font-black tracking-tighter dark:text-white">Mini Mart.</span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-xs">
                            The modern community marketplace. Buy, sell, and connect with people in your neighborhood with absolute ease and safety.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://www.instagram.com/sammyblinks85/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="https://x.com/Devking0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="https://www.facebook.com/me/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Marketplace</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Browse Items', path: '/' },
                                { name: 'Selling Guide', path: '/selling-guide' },
                                { name: 'Safety Tips', path: '/safety' },
                                { name: 'Featured Sellers', path: '/sellers' },
                                { name: 'Categories', path: '/categories' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-gray-500 dark:text-gray-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Support</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Help Center', path: '/help' },
                                { name: 'Terms of Service', path: '/terms' },
                                { name: 'Privacy Policy', path: '/privacy' },
                                { name: 'Cookie Settings', path: '/cookies' },
                                { name: 'Refund Policy', path: '/refunds' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-gray-500 dark:text-gray-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6 p-8 bg-blue-600 rounded-[2.5rem] text-white">
                        <h4 className="text-sm font-black uppercase tracking-widest opacity-80">Stay Updated</h4>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-6 text-center space-y-2 animate-in fade-in slide-in-from-bottom-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="text-white" size={24} />
                                </div>
                                <p className="font-bold text-lg">You're Subscribed!</p>
                                <p className="text-blue-100 text-sm">We'll keep you posted on new deals.</p>
                                <button onClick={() => setStatus('idle')} className="text-xs font-bold underline mt-2 hover:text-blue-200">Reset</button>
                            </div>
                        ) : (
                            <>
                                <p className="text-blue-100 font-medium">Join our newsletter to get the latest deals and marketplace updates.</p>
                                <form onSubmit={handleSubscribe} className="relative group">
                                    <input
                                        type="email"
                                        placeholder="name@email.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl pl-4 pr-24 py-4 text-sm text-white placeholder:text-blue-200 outline-none focus:bg-white focus:text-gray-900 transition-all"
                                        disabled={status === 'loading'}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="absolute right-2 top-2 bottom-2 px-4 bg-white text-blue-600 rounded-xl font-black text-xs hover:scale-105 transition-transform active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
                                    >
                                        {status === 'loading' ? <Loader size={14} className="animate-spin" /> : "JOIN"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">
                        &copy; {new Date().getFullYear()} Mini Mart Reimagined. Built for elite communities.
                    </p>
                    <div className="flex gap-8">
                        <button className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">English (US)</button>
                        <button className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Currency: NGN</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
