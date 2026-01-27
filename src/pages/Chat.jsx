import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc, setDoc, updateDoc, increment } from "firebase/firestore";
import { Send, ArrowLeft, MessageCircle, MoreVertical, Image as ImageIcon, Smile, Search } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat() {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [targetUserStatus, setTargetUserStatus] = useState(null);

    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const selectedChatRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        selectedChatRef.current = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "chats"),
            where("participants", "array-contains", currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => {
                const timeA = b.lastMessageTimestamp?.seconds || b.createdAt?.seconds || 0;
                const timeB = a.lastMessageTimestamp?.seconds || a.createdAt?.seconds || 0;
                return timeA - timeB;
            });
            setChats(chatsData);
        });

        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        if (location.state?.targetUser) {
            const { targetUser } = location.state;

            // 1. Sort UIDs to ensure consistent Chat ID
            const participants = [currentUser.uid, targetUser.uid].sort();
            const chatId = participants.join('_');

            // 2. Prepare metadata objects for alignment
            const userDataMap = {
                [currentUser.uid]: {
                    name: currentUser.displayName || currentUser.email.split('@')[0],
                    email: currentUser.email,
                    photo: currentUser.photoURL || null
                },
                [targetUser.uid]: {
                    name: targetUser.displayName || targetUser.email.split('@')[0],
                    email: targetUser.email,
                    photo: targetUser.photoURL || null
                }
            };

            const orderedNames = participants.map(uid => userDataMap[uid].name);
            const orderedEmails = participants.map(uid => userDataMap[uid].email);
            const orderedPhotos = participants.map(uid => userDataMap[uid].photo);

            const existingChat = chats.find(c => c.id === chatId);

            if (existingChat) {
                setSelectedChat(existingChat);
            } else {
                setSelectedChat({
                    id: chatId,
                    participants: participants,
                    participantEmails: orderedEmails,
                    participantNames: orderedNames,
                    participantPhotos: orderedPhotos,
                    listingData: location.state?.listingData || null,
                    isNew: true
                });
            }
        }
    }, [location.state, chats, currentUser]);

    useEffect(() => {
        if (!selectedChat || selectedChat.isNew) {
            if (selectedChat?.isNew) setMessages([]);
            return;
        }

        const q = query(
            collection(db, "chats", selectedChat.id, "messages"),
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => doc.data());
            setMessages(msgs);
            setTimeout(scrollToBottom, 50);
        });

        const chatRef = doc(db, "chats", selectedChat.id);
        updateDoc(chatRef, {
            [`unreadCounts.${currentUser.uid}`]: 0
        }).catch(() => { });

        return unsubscribe;
    }, [selectedChat, currentUser.uid]);

    useEffect(() => {
        if (!selectedChat) return;

        const targetUid = selectedChat.participants.find(p => p !== currentUser.uid);
        if (!targetUid) return;

        const unsubscribe = onSnapshot(doc(db, "users", targetUid), (doc) => {
            if (doc.exists()) {
                setTargetUserStatus(doc.data());
            }
        });

        return unsubscribe;
    }, [selectedChat, currentUser.uid]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat) return;

        const chatDocRef = doc(db, "chats", selectedChat.id);
        const text = newMessage;
        setNewMessage("");

        try {
            if (selectedChat.isNew) {
                await setDoc(chatDocRef, {
                    participants: selectedChat.participants,
                    participantEmails: selectedChat.participantEmails,
                    participantNames: selectedChat.participantNames,
                    participantPhotos: selectedChat.participantPhotos,
                    unreadCounts: {
                        [selectedChat.participants[0]]: 0,
                        [selectedChat.participants[1]]: 0
                    },
                    createdAt: serverTimestamp(),
                    lastMessage: text,
                    lastMessageSenderId: currentUser.uid,
                    lastMessageTimestamp: serverTimestamp()
                });

                const otherUser = selectedChat.participants.find(p => p !== currentUser.uid);
                await updateDoc(chatDocRef, {
                    [`unreadCounts.${otherUser}`]: increment(1)
                });

                setSelectedChat(prev => ({ ...prev, isNew: false }));
            } else {
                await updateDoc(chatDocRef, {
                    lastMessage: text,
                    lastMessageSenderId: currentUser.uid,
                    lastMessageTimestamp: serverTimestamp(),
                    [`unreadCounts.${selectedChat.participants.find(p => p !== currentUser.uid)}`]: increment(1)
                });
            }

            await addDoc(collection(db, "chats", selectedChat.id, "messages"), {
                text: text,
                senderId: currentUser.uid,
                timestamp: serverTimestamp()
            });

            scrollToBottom();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const getOtherName = (chat) => {
        if (!chat) return "Unknown";
        const myIndex = chat.participants.indexOf(currentUser.uid);
        return chat.participantNames?.[1 - myIndex] || "User";
    };

    const getOtherPhoto = (chat) => {
        if (!chat) return null;
        const myIndex = chat.participants.indexOf(currentUser.uid);
        return chat.participantPhotos?.[1 - myIndex];
    };

    const isOnline = targetUserStatus?.lastSeen && (new Date() - targetUserStatus.lastSeen.toDate()) / 60000 < 5;

    return (
        <div className="max-w-[1400px] mx-auto pt-20 md:pt-24 pb-4 md:pb-8 px-4 md:px-6 overflow-hidden h-screen bg-transparent">
            <div className="flex h-[calc(100vh-140px)] bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800 transition-all duration-500">

                {/* Modern Sidebar */}
                <div className={`w-full md:w-[380px] border-r border-gray-100 dark:border-gray-800/50 flex flex-col bg-gray-50/50 dark:bg-gray-900/30 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-6 pb-2 pt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Messages</h2>
                            <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                                <Search size={18} />
                            </button>
                        </div>
                        {/* Status Bubbles or Stories could go here */}
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1.5 scrollbar-hide">
                        {chats.length === 0 ? (
                            <div className="text-center py-20 text-gray-400 dark:text-gray-500 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                    <MessageCircle className="text-gray-300 dark:text-gray-600" size={32} />
                                </div>
                                <p className="font-medium">No conversations yet.</p>
                                <p className="text-xs mt-1 opacity-70">Start chatting with sellers!</p>
                            </div>
                        ) : (
                            chats.map(chat => (
                                <button
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className={`w-full p-3.5 rounded-2xl text-left transition-all duration-300 group relative flex items-center gap-4 ${selectedChat?.id === chat.id
                                            ? 'bg-blue-600 shadow-xl shadow-blue-500/20 scale-[1.02]'
                                            : 'hover:bg-white dark:hover:bg-gray-800/80 hover:shadow-md border border-transparent hover:border-gray-100 dark:hover:border-gray-800'
                                        }`}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-700 shadow-sm">
                                            {getOtherPhoto(chat) ? (
                                                <img src={getOtherPhoto(chat)} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600 dark:text-blue-400">
                                                    {getOtherName(chat)[0]?.toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        {/* Online Indicator if needed (requires context) */}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className={`font-bold text-[15px] truncate ${selectedChat?.id === chat.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                                {getOtherName(chat)}
                                            </span>
                                            {/* Time could go here */}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className={`text-[13px] truncate max-w-[140px] ${selectedChat?.id === chat.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400 font-medium'}`}>
                                                {chat.lastMessageSenderId === currentUser.uid && "You: "}{chat.lastMessage}
                                            </p>

                                            {chat.unreadCounts?.[currentUser.uid] > 0 && (
                                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-red-500/30 scale-100 animate-pulse">
                                                    {chat.unreadCounts[currentUser.uid]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Premium Chat Area */}
                <div className={`flex-1 flex flex-col bg-white dark:bg-gray-950 relative overflow-hidden ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
                    {selectedChat ? (
                        <>
                            {/* Glassmorphic Header */}
                            <div className="absolute top-0 left-0 right-0 h-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 z-20 px-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setSelectedChat(null)}>
                                        <ArrowLeft size={20} />
                                    </button>

                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                                            {getOtherPhoto(selectedChat) ? (
                                                <img src={getOtherPhoto(selectedChat)} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                                                    {getOtherName(selectedChat)[0]?.toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        {isOnline && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-950 rounded-full shadow-sm"></span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-base leading-none mb-1">{getOtherName(selectedChat)}</h3>
                                        <p className={`text-[11px] font-bold uppercase tracking-wider ${isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                                            {isOnline ? 'Active Now' : 'Offline'}
                                        </p>
                                    </div>
                                </div>

                                <button className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 transition-all">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div
                                ref={scrollContainerRef}
                                className="flex-1 overflow-y-auto pt-24 pb-28 px-4 md:px-8 space-y-6 scrollbar-hide bg-gray-50/30 dark:bg-gray-900/10"
                            >
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, index) => {
                                        const isMe = msg.senderId === currentUser.uid;
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.2 }}
                                                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`
                                                    max-w-[85%] md:max-w-[70%] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm
                                                    ${isMe
                                                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-md shadow-blue-500/20'
                                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700/50 rounded-2xl rounded-tl-md shadow-sm'
                                                    }
                                                `}>
                                                    {msg.text}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Floating Input Area */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-gray-950 via-white/80 dark:via-gray-950/80 to-transparent z-20">
                                <form
                                    onSubmit={sendMessage}
                                    className="max-w-4xl mx-auto flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 pl-4 rounded-full shadow-2xl shadow-blue-900/5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50"
                                >
                                    <button type="button" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                        <Smile size={20} />
                                    </button>

                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-transparent border-none px-2 py-2 focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400 font-medium"
                                    />

                                    {newMessage.trim() ? (
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                                        >
                                            <Send size={18} className="translate-x-0.5" />
                                        </button>
                                    ) : (
                                        <button type="button" className="p-2 mr-1 text-gray-400 hover:text-blue-600 transition-colors">
                                            <ImageIcon size={20} />
                                        </button>
                                    )}
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/30 dark:bg-gray-900/10">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <MessageCircle size={40} className="text-blue-600 dark:text-blue-400 opacity-50" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Messages</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-xs text-center">
                                Select a conversation from the left to start chatting securely.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
