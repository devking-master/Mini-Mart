import React, { useState } from 'react';
import axios from 'axios';
import { Upload, X, Image as ImageIcon, CheckCircle, Loader, RefreshCw } from 'lucide-react';
import imageCompression from 'browser-image-compression';

const IMGBB_API_KEY = "5c96460dbce35dbdb36e2e26b2dad63e";

export default function ImageUpload({ onUploadComplete }) {
    const [uploading, setUploading] = useState(false);
    const [compressing, setCompressing] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [uploadedUrls, setUploadedUrls] = useState([]); // Array of uploaded URLs
    const [error, setError] = useState("");

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Generate previews immediately for better UX
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
        setError("");

        // We'll track progress locally to update parent incrementally
        let currentUrls = [...uploadedUrls];

        try {
            // SEQUENTIAL UPLOAD LOOP (Fix for timeouts)
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                    // 1. Compress Image
                    setCompressing(true);
                    setUploading(false);

                    const options = {
                        maxSizeMB: 0.8, // Compress slightly more (0.8MB)
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };

                    const compressedFile = await imageCompression(file, options);

                    setCompressing(false);
                    setUploading(true); // Switch status to uploading

                    // 2. Upload to ImgBB
                    const formData = new FormData();
                    formData.append("image", compressedFile);
                    formData.append("key", IMGBB_API_KEY);

                    const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
                        timeout: 120000 // Increased timeout to 120s
                    });

                    const url = response.data.data.display_url;

                    // Update local tracker
                    currentUrls.push(url);

                    // Update State & Parent
                    setUploadedUrls([...currentUrls]);
                    onUploadComplete([...currentUrls]);

                } catch (err) {
                    console.error("Upload/Compression failed for file:", file.name, err);
                    setError(`Failed to upload ${file.name}. Please try again.`);
                    // Continue to next file even if one fails
                }
            }

            if (currentUrls.length < (uploadedUrls.length + files.length)) {
                // Check if any failed? Not perfect check but okay.
            }

        } catch (err) {
            console.error("Batch upload error:", err);
            setError("Unexpected error during upload.");
        } finally {
            setUploading(false);
            setCompressing(false);
        }
    };

    const removeImage = (index) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        const newUrls = uploadedUrls.filter((_, i) => i !== index);

        setPreviews(newPreviews);
        setUploadedUrls(newUrls);
        onUploadComplete(newUrls);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 transition-colors relative">
                <input
                    type="file"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading || compressing}
                />

                {uploading || compressing ? (
                    <div className="flex flex-col items-center text-blue-600">
                        <Loader className="animate-spin mb-2" size={32} />
                        <span className="font-medium">
                            {compressing ? "Compressing..." : `Uploading image ${uploadedUrls.length + 1}...`}
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-gray-500">
                        <div className="bg-blue-50 p-3 rounded-full mb-3 text-blue-600">
                            <Upload size={24} />
                        </div>
                        <span className="font-bold text-gray-900">Click to upload images</span>
                        <span className="text-sm mt-1">or drag and drop here</span>
                        <span className="text-xs text-gray-400 mt-2">SVG, PNG, JPG (max 32MB)</span>
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                    <X size={16} /> {error}
                </div>
            )}

            {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {previews.map((src, index) => (
                        <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                            <img
                                src={src}
                                alt={`Preview ${index}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay for removing */}
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                            >
                                <X size={14} />
                            </button>
                            {/* Status Indicators */}
                            {!uploadedUrls[index] && (uploading || compressing) && (
                                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                                    <Loader className="animate-spin text-blue-600" size={24} />
                                </div>
                            )}
                            {uploadedUrls[index] && (
                                <div className="absolute bottom-1 right-1 text-green-500 bg-white rounded-full p-0.5 shadow-sm">
                                    <CheckCircle size={16} fill="white" className="text-green-500" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-500 text-center">
                {uploadedUrls.length} images uploaded.
            </p>
        </div>
    );
}
