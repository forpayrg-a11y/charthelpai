"use client";

import React, { useState } from "react";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChartUploadProps {
    onAnalysisComplete?: (result: any) => void;
}

export const ChartUpload = ({ onAnalysisComplete }: ChartUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (onAnalysisComplete) onAnalysisComplete(data);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
            uploadFile(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
            uploadFile(file);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
                className={cn(
                    "relative group cursor-pointer h-64 border-2 border-dashed rounded-3xl transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6 overflow-hidden",
                    isDragging
                        ? "border-brand-primary bg-brand-primary/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <AnimatePresence mode="wait">
                    {isUploading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4"
                        >
                            <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
                            <p className="text-sm font-bold tracking-widest uppercase animate-pulse">AI is analyzing your chart...</p>
                        </motion.div>
                    )}

                    {preview ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-0 p-4"
                        >
                            <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-2xl" />
                            <button
                                onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-md transition-colors z-20"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-3 text-center"
                        >
                            <div className="p-4 rounded-2xl bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold">Drop your chart here</p>
                                <p className="text-sm text-foreground/50">Supports PNG, JPG, WebP. AI will analyze details.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

