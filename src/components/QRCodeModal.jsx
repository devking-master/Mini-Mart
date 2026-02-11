import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Copy, Download, Check, Share2, Smartphone } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose, url, title }) {
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const canvas = document.getElementById('qrcode-canvas');
        if (!canvas) return;
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${title.replace(/\s+/g, '-').toLowerCase()}-qr.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-sm bg-white dark:bg-gray-950 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-50 dark:border-gray-900 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                                <Share2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight leading-none">Share via QR</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Ready to scan</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center text-gray-400 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* QR Code Body */}
                    <div className="p-8 flex flex-col items-center">
                        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 dark:border-white/5 mb-8">
                            <QRCodeCanvas
                                id="qrcode-canvas"
                                value={url}
                                size={200}
                                level={"H"}
                                includeMargin={false}
                                imageSettings={{
                                    src: "/favicon.ico", // Attempt to use favicon if available, or just omit
                                    x: undefined,
                                    y: undefined,
                                    height: 40,
                                    width: 40,
                                    excavate: true,
                                }}
                            />
                        </div>

                        <div className="text-center space-y-2 mb-8">
                            <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                                {title}
                            </h4>
                            <p className="text-sm text-gray-500 font-medium px-4">
                                Scan this code with a mobile phone to view this listing instantly.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full">
                            <button
                                onClick={handleCopy}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-3xl border transition-all ${copied
                                        ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/10 dark:border-green-800'
                                        : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-blue-900/10'
                                    }`}
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                <span className="text-[10px] font-black uppercase tracking-widest">{copied ? 'Copied' : 'Copy Link'}</span>
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                            >
                                <Download size={20} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Download</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                        <Smartphone size={16} className="text-gray-400" />
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Universal QR Compatibility
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
