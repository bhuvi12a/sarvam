"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image.");
        } finally {
            setLoading(false);
        }
    };

    if (value) {
        return (
            <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200">
                <img
                    src={value}
                    alt="Upload"
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition bg-gray-50 dark:bg-zinc-900 cursor-pointer relative">
            <input
                type="file"
                onChange={onUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept="image/*"
                disabled={loading}
            />
            {loading ? (
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            ) : (
                <>
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Click to upload property image
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                </>
            )}
        </div>
    );
}
