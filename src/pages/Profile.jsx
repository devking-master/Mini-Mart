import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { User, Package, Calendar, MapPin, ArrowRight, Plus, Camera, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const IMGBB_API_KEY = "5c96460dbce35dbdb36e2e26b2dad63e";

export default function Profile() {
    const { currentUser, updateUserProfile } = useAuth();
    const [myListings, setMyListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function fetchMyListings() {
            const q = query(
                collection(db, "listings"),
                where("userId", "==", currentUser.uid)
            );

            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
            setMyListings(data);
            setLoading(false);
        }

        if (currentUser) {
            fetchMyListings();
        }
    }, [currentUser]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("key", IMGBB_API_KEY);

        try {
            const response = await axios.post("https://api.imgbb.com/1/upload", formData);
            const imageUrl = response.data.data.display_url;
            await updateUserProfile(currentUser, { photoURL: imageUrl });
        } catch (err) {
            console.error("Failed to upload profile picture:", err);
            alert("Failed to update profile picture.");
        }
        setUploading(false);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 pt-32 pb-32 px-6">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500"
            >
                <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
                    <div className="absolute -bottom-16 left-12">
                        <div className="relative group">
                            <div className="w-36 h-36 bg-white dark:bg-gray-900 rounded-[2rem] p-1.5 shadow-2xl transition-all">
                                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-[1.5rem] flex items-center justify-center overflow-hidden border-2 border-gray-50 dark:border-gray-700">
                                    {currentUser?.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-5xl text-gray-300 dark:text-gray-600 font-black tracking-tighter">
                                            {currentUser?.email?.[0].toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upload Overlay */}
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300">
                                {uploading ? <Loader className="animate-spin text-white" size={32} /> : <Camera className="text-white" size={32} />}
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={uploading} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="pt-24 pb-12 px-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{currentUser?.displayName || currentUser?.email?.split('@')[0]}</h1>
                            <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white rounded-full">Premium Member</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">{currentUser?.email}</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800/50 transition-all min-w-[160px]">
                            <span className="block text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Listings</span>
                            <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{myListings.length}</span>
                        </div>
                        <Link to="/create-listing" className="bg-blue-600 text-white px-10 py-6 rounded-[2rem] font-black text-lg flex items-center gap-3 hover:bg-blue-700 hover:-translate-y-2 transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]">
                            <Plus size={24} /> New Item
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Listings Section */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter flex items-center gap-3">
                        <Package className="text-blue-600 dark:text-blue-400" size={28} /> My Collection
                    </h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-gray-100 dark:bg-gray-800/10 rounded-[3rem] h-[450px] animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {myListings.length === 0 ? (
                            <div className="col-span-full py-32 text-center bg-gray-50 dark:bg-gray-900/30 rounded-[4rem] border border-dashed border-gray-200 dark:border-gray-800 transition-all space-y-6">
                                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-sm border border-gray-100 dark:border-gray-800">
                                    <Package size={40} className="text-gray-300 dark:text-gray-700" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Your market is empty.</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xs mx-auto">Start sharing your items with the community and earn today.</p>
                                </div>
                                <Link to="/create-listing" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-3 transition-all">
                                    Post your first item <ArrowRight size={20} />
                                </Link>
                            </div>
                        ) : (
                            myListings.map(listing => (
                                <motion.div key={listing.id} variants={item}>
                                    <Link to={`/listing/${listing.id}`} className="group block bg-white dark:bg-gray-900 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-gray-100/50 dark:border-gray-800/20 overflow-hidden h-full flex flex-col relative">
                                        <div className="aspect-[16/11] bg-gray-50 dark:bg-gray-800/10 relative overflow-hidden">
                                            <img
                                                src={listing.imageUrl}
                                                alt={listing.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="bg-white/95 dark:bg-black/60 backdrop-blur-xl text-[10px] font-black tracking-[0.15em] uppercase px-4 py-2 rounded-2xl shadow-sm dark:text-white border border-white/20">
                                                    {listing.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1 tracking-tighter leading-none">{listing.title}</h3>
                                                <span className="text-blue-600 dark:text-blue-400 font-[1000] text-xl tracking-tighter">₦{listing.price.toLocaleString()}</span>
                                            </div>

                                            <p className="text-[15px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 font-medium leading-relaxed leading-snug">
                                                {listing.description}
                                            </p>

                                            <div className="pt-6 border-t border-gray-50 dark:border-gray-800/50 flex flex-col gap-4">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
                                                    <MapPin size={14} className="text-blue-500 flex-shrink-0" />
                                                    <span className="truncate">{listing.address || 'Location Hidden'}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-400 uppercase tracking-widest">
                                                        <Calendar size={14} />
                                                        {new Date(listing.createdAt?.seconds * 1000).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/10 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                                                        Live
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
