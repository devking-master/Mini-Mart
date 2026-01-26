import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Search, MapPin, Tag, ArrowRight, Zap, ShieldCheck, Heart, ShoppingBag, Plus, Sparkles, MessageSquare } from 'lucide-react';
import CategoryPills, { categories } from '../components/CategoryPills';
import SkeletonListing from '../components/SkeletonListing';
import { motion, AnimatePresence } from 'framer-motion';
import HERO_BG from '../assets/marketplace_hero.png';

export default function Home() {
    useAuth();
    const { theme } = useTheme();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [committedSearch, setCommittedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search');
        if (search) {
            setSearchTerm(search);
            setCommittedSearch(search);
            // Smooth scroll to results if search is from URL
            setTimeout(() => {
                document.getElementById('market-discovery')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }, [location.search]);

    useEffect(() => {
        const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const listingsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setListings(listingsData);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const filteredListings = listings.filter(listing => {
        const matchesSearch = listing.title?.toLowerCase().includes(committedSearch.toLowerCase());
        const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Separate filter for the "Live Dropdown" suggestions
    const suggestionListings = listings.filter(listing => {
        if (!searchTerm) return false;
        return listing.title?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
    };

    return (
        <div className="space-y-24 pb-32">
            {/* --- BRILLIANT HERO SECTION --- */}
            <section className={`relative min-h-[75vh] flex items-center justify-center transition-colors duration-700 rounded-b-[2.5rem] md:rounded-b-[3.5rem] ${theme === 'dark' ? 'bg-[#0a0a0b]' : 'bg-gray-50'
                }`}>
                {/* Background Clips Container */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[3.5rem]">
                    {/* Background Image with sophisticated Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={HERO_BG}
                            alt="Background"
                            className={`w-full h-full object-cover scale-105 transition-opacity duration-700 ${theme === 'dark' ? 'opacity-40' : 'opacity-35'
                                }`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-700 ${theme === 'dark'
                                ? 'from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent'
                                : 'from-gray-50/40 via-transparent to-transparent'
                            }`} />
                    </div>

                    {/* Floating Glows */}
                    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${theme === 'dark' ? 'opacity-30' : 'opacity-10'}`}>
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full" />
                    </div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-700 ${theme === 'dark'
                                ? 'bg-white/5 border-white/10 text-blue-300'
                                : 'bg-blue-50 border-blue-100 text-blue-600'
                                }`}
                        >
                            <Sparkles size={12} className={theme === 'dark' ? 'text-yellow-400' : 'text-blue-500'} /> Discover Local Treasures
                        </motion.div>

                        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9] drop-shadow-xl transition-colors duration-700 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Mini Mart <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                                Reimagined.
                            </span>
                        </h1>

                        <p className={`text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed transition-colors duration-700 ${theme === 'dark' ? 'text-gray-400 opacity-70' : 'text-gray-600 opacity-80'
                            }`}>
                            The elegant way to shop and sell in your neighborhood. Fast, safe, and brilliant.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col md:flex-row gap-4 items-center justify-center pt-4 relative"
                    >
                        {/* High-Impact Search */}
                        <div className="relative w-full max-w-xl group">
                            <div className="relative flex items-center">
                                <Search className="absolute left-6 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={24} />
                                <input
                                    type="text"
                                    placeholder="Search for something extraordinary..."
                                    className={`w-full pl-16 pr-8 py-5 backdrop-blur-3xl border rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg tracking-tight ${theme === 'dark'
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white focus:text-gray-950'
                                        : 'bg-white/40 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white'
                                        }`}
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        // If user clears the input, clear the committed search too to show all items
                                        if (e.target.value === "") setCommittedSearch("");
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setCommittedSearch(searchTerm);
                                            document.getElementById('market-discovery')?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                />
                            </div>

                            {/* MINI SUGGESTIONS DROPDOWN - ISOLATED FROM GRID */}
                            <AnimatePresence>
                                {searchTerm.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                        style={{ zIndex: 9999 }}
                                        className={`absolute top-full left-0 right-0 mt-3 border rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden w-full max-w-xl mx-auto ${theme === 'dark' ? 'bg-[#121214] border-gray-800' : 'bg-white border-gray-100'
                                            }`}
                                    >
                                        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                                            {suggestionListings.length > 0 ? (
                                                <div className="p-2 space-y-1">
                                                    {suggestionListings.slice(0, 6).map(listing => (
                                                        <Link
                                                            key={listing.id}
                                                            to={`/listing/${listing.id}`}
                                                            className={`w-full p-3 flex items-center gap-4 rounded-xl transition-all duration-200 group ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-blue-50'
                                                                }`}
                                                        >
                                                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-white/5 shadow-sm">
                                                                <img src={listing.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className={`font-bold text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                                    {listing.title}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-0.5">
                                                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-black">₦{listing.price.toLocaleString()}</p>
                                                                    <span className="text-[10px] text-gray-400">• in {listing.category}</span>
                                                                </div>
                                                            </div>
                                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-all">
                                                                <ArrowRight size={14} className="text-blue-500" />
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="py-12 px-6 text-center space-y-2">
                                                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                                                        <Search size={20} className="text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold dark:text-white">No matches found</p>
                                                        <p className="text-xs text-gray-500">Try searching for something else</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`px-5 py-3 border-t flex items-center justify-between ${theme === 'dark' ? 'bg-[#0a0a0b] border-gray-800' : 'bg-gray-50 border-gray-100'
                                            }`}>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type with confidence</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-gray-400 font-medium">Press</span>
                                                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[9px] font-bold text-gray-600 dark:text-gray-400 shadow-sm">ENTER</kbd>
                                                <span className="text-[10px] text-gray-400 font-medium">for all results</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            to="/create-listing"
                            className="w-full md:w-auto px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 group"
                        >
                            <Plus size={20} />
                            Post item for free
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* --- "HOW IT WORKS" USER-FRIENDLY SECTION --- */}
            <section className="max-w-6xl mx-auto px-6">
                <div className="text-center space-y-3 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">Seamless in every way.</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-medium">Three simple steps to start your Mini Mart journey today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Discover Local",
                            desc: "Browse through thousands of verified items from sellers in your community.",
                            icon: ShoppingBag,
                            color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        },
                        {
                            title: "Instant Chat",
                            desc: "Connect instantly with sellers through our secure, real-time messaging system.",
                            icon: MessageSquare,
                            color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                        },
                        {
                            title: "Safe Exchange",
                            desc: "Meet up, verify the item, and complete your purchase safely and simply.",
                            icon: ShieldCheck,
                            color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-8 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-3xl hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white tracking-tight">{feature.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>


            {/* --- FULLY LISTED CATEGORY GRID --- */}
            <section className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight dark:text-white">Shop by Category</h2>
                    <p className="text-sm text-gray-500 font-medium">Explore everything</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => {
                                setSelectedCategory(cat.name);
                                document.getElementById('market-discovery')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 group ${selectedCategory === cat.name
                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                                : 'bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${selectedCategory === cat.name ? 'bg-white/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                                <cat.icon size={24} className={selectedCategory === cat.name ? 'text-white' : 'text-blue-500'} />
                            </div>
                            <span className="text-xs font-bold tracking-tight">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </section>


            {/* --- BROWSE / DISCOVERY SECTION --- */}
            <section id="market-discovery" className="max-w-[1400px] mx-auto px-6 space-y-8 scroll-mt-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest">
                            <Zap size={12} className="fill-current" /> Just listed
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">Explore the Market.</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Found {filteredListings.length} extraordinary items near you.</p>
                    </div>

                    <div className="flex-1 max-w-xs md:max-w-md">
                        {/* Categories are now fully listed above, so we keep this space clear or for other filters */}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <SkeletonListing key={i} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        key={selectedCategory + committedSearch}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8"
                    >
                        {filteredListings.length === 0 ? (
                            <div className="col-span-full py-32 text-center space-y-6 bg-gray-50 dark:bg-gray-950 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                                <Search className="text-gray-300 dark:text-gray-700 mx-auto" size={40} />
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">No results matched.</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto font-medium">Refine your search or try a different category.</p>
                                </div>
                                <button
                                    onClick={() => { setSearchTerm(""); setSelectedCategory("All") }}
                                    className="text-blue-600 font-bold text-sm flex items-center gap-2 mx-auto hover:gap-3 transition-all"
                                >
                                    View all listings <ArrowRight size={16} />
                                </button>
                            </div>
                        ) : (
                            filteredListings.map(listing => (
                                <motion.div key={listing.id} variants={item}>
                                    <Link to={`/listing/${listing.id}`} className="group block bg-white dark:bg-gray-950 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden h-full flex flex-col relative">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={listing.imageUrl}
                                                alt={listing.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-sm dark:text-white border border-white/10">
                                                    {listing.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex-1 space-y-1.5">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1 truncate">{listing.title}</h3>
                                                <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                                    <MapPin size={10} className="text-blue-500/60" />
                                                    <span className="truncate">{listing.address || 'Regional'}</span>
                                                </div>
                                            </div>

                                            <div className="pt-4 mt-4 border-t border-gray-50 dark:border-gray-800/50 flex items-center justify-between">
                                                <p className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">₦{listing.price.toLocaleString()}</p>
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                    <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </section>

            {/* --- FINAL CTA SECTION --- */}
            <section className="max-w-4xl mx-auto px-6">
                <div className="relative overflow-hidden bg-blue-600 rounded-3xl px-8 py-16 text-center space-y-8">
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">
                            Ready to Sell?
                        </h2>
                        <p className="text-blue-100 text-lg font-medium opacity-90">
                            Join thousands of users in Mini Mart. Start your listing in seconds.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/create-listing"
                            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                        >
                            Sell something <Plus size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
