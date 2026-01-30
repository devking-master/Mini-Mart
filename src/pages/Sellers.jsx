import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { Star, ShieldCheck, MapPin, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sellers() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                // In a real app, we would query for "featured" or highly rated users
                // For now, we'll just fetch some users to demonstrate
                const q = query(collection(db, "users"), limit(12));
                const snapshot = await getDocs(q);
                const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSellers(fetched);
            } catch (error) {
                console.error("Error fetching sellers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSellers();
    }, []);

    const MockSellers = [
        { id: 'm1', displayName: 'Sarah Styles', photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', location: 'New York, NY', rating: 4.9, sales: 124 },
        { id: 'm2', displayName: 'Tech Wizard', photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', location: 'San Fran, CA', rating: 5.0, sales: 89 },
        { id: 'm3', displayName: 'Antique Jo', photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', location: 'Austin, TX', rating: 4.8, sales: 342 },
        { id: 'm4', displayName: 'Urban Gear', photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', location: 'Chicago, IL', rating: 4.9, sales: 56 },
    ];

    const displaySellers = sellers.length > 0 ? sellers : MockSellers;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white pt-20 pb-20">
            <section className="px-6 md:px-12 py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-6">Featured Sellers</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Meet the top-rated community members making Mini Mart special.
                </p>
            </section>

            <section className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displaySellers.map((seller, i) => (
                        <motion.div
                            key={seller.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Award className="text-blue-500" />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 ring-4 ring-white dark:ring-gray-800 group-hover:scale-105 transition-transform duration-500 shadow-xl">
                                    <img
                                        src={seller.photoURL || `https://ui-avatars.com/api/?name=${seller.displayName || 'User'}&background=random`}
                                        alt={seller.displayName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="font-bold text-lg mb-1">{seller.displayName || 'Anonymous User'}</h3>

                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    <MapPin size={14} />
                                    {seller.location || 'Local Seller'}
                                </div>

                                <div className="flex items-center gap-4 w-full bg-white dark:bg-gray-800 p-3 rounded-2xl">
                                    <div className="flex-1 text-center border-r border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center justify-center gap-1 font-black text-yellow-500">
                                            {seller.rating || 5.0} <Star size={12} fill="currentColor" />
                                        </div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Rating</div>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="font-black text-gray-900 dark:text-white">
                                            {seller.sales || Math.floor(Math.random() * 50) + 1}
                                        </div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Sales</div>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
