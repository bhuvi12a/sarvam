"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Upload, Trash2, Link } from "lucide-react";

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [imageMode, setImageMode] = useState<"upload" | "url">("url");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        status: "Ongoing",
        price: "",
        imageUrl: "", gallery: ["", "", "", ""],
        featured: false,
    });

    useEffect(() => {
        if (!id) return;
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${id}`);
                if (!response.ok) throw new Error("Failed to fetch project");
                const data = await response.json();
                
                setFormData({
                    title: data.title || "",
                    description: data.description || "",
                    location: data.location || "",
                    status: data.status || "Ongoing",
                    price: data.price || "",
                    imageUrl: data.imageUrl || "", gallery: data.gallery || ["", "", "", ""],
                    featured: data.featured || false,
                });

                if (data.imageUrl && !data.imageUrl.startsWith("http")) {
                    setImageMode("upload");
                }
            } catch (err) {
                setError("Failed to load project details.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Image size should be less than 2MB");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData((prev) => {
                    const newGallery = [...(prev.gallery || ["", "", "", ""])];
                    const emptyIndex = newGallery.findIndex(g => !g);
                    if (emptyIndex !== -1) {
                        newGallery[emptyIndex] = base64String;
                    } else {
                        newGallery[0] = base64String;
                    }
                    return { ...prev, gallery: newGallery, imageUrl: newGallery[0] };
                });
                setIsUploading(false);
            };
            reader.onerror = () => {
                setError("Failed to read the file.");
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            setError("Failed to process image. Please try again.");
            console.error(err);
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSaving(true);

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update project");

            router.push("/admin/projects");
            router.refresh();
        } catch (err) {
            setError("Failed to update project. Please try again.");
            setIsSaving(false);
        }
    };

    

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
            >
                <ArrowLeft className="h-5 w-5" />
                Back to Projects
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white">
                Edit Project
            </h1>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-4">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Title *
                        </label>
                        <input
                            id="project-title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter project title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="project-description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter project description"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location *
                        </label>
                        <input
                            id="project-location"
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g. Rayakottai Road, Hosur"
                        />
                    </div>

                    {/* Status & Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status *
                            </label>
                            <select
                                id="project-status"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Upcoming">Upcoming</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Price
                            </label>
                            <input
                                id="project-price"
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g. ₹65 Lakhs or On Request"
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Images (Up to 4) *
                        </label>

                        {/* Toggle tabs */}
                        <div className="flex gap-2 mb-3">
                            <button
                                type="button"
                                id="tab-upload"
                                onClick={() => { setImageMode("upload"); }}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    imageMode === "upload"
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                }`}
                            >
                                <Upload className="h-4 w-4" /> Upload File
                            </button>
                            <button
                                type="button"
                                id="tab-url"
                                onClick={() => { setImageMode("url"); }}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    imageMode === "url"
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                }`}
                            >
                                <Link className="h-4 w-4" /> Paste URL
                            </button>
                        </div>

                        {imageMode === "url" && (
                            <div className="space-y-4">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index}>
                                        <input
                                            type="url"
                                            value={formData.gallery?.[index] || ""}
                                            onChange={(e) => {
                                                const newGallery = [...(formData.gallery || ["", "", "", ""])];
                                                newGallery[index] = e.target.value;
                                                setFormData({ 
                                                    ...formData, 
                                                    gallery: newGallery,
                                                    imageUrl: newGallery[0] || formData.imageUrl
                                                });
                                            }}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                                            placeholder={`Image URL ${index + 1}${index === 0 ? " (Main Cover Image)" : ""}`}
                                        />
                                        {formData.gallery?.[index] && (
                                            <div className="relative">
                                                <img
                                                    src={formData.gallery[index]}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-zinc-700"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+URL";
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newGallery = [...formData.gallery];
                                                        newGallery[index] = "";
                                                        setFormData({
                                                            ...formData,
                                                            gallery: newGallery,
                                                            imageUrl: newGallery[0] || formData.imageUrl
                                                        });
                                                    }}
                                                    className="absolute top-2 right-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 text-sm"
                                                >
                                                    <Trash2 className="h-4 w-4" /> Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {imageMode === "upload" && (
                            <div className="space-y-4">
                                <label className="relative block">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={isUploading}
                                    />
                                    <div className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 transition-all bg-gray-50 dark:bg-zinc-800/50">
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-3" />
                                                <p className="text-gray-600 dark:text-gray-400">Uploading image...</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-12 w-12 text-gray-400 mb-3" />
                                                <p className="text-gray-600 dark:text-gray-400 font-medium">Click to upload image</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, GIF up to 2MB</p>
                                            </>
                                        )}
                                    </div>
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[0, 1, 2, 3].map((index) => formData.gallery?.[index] ? (
                                        <div key={index} className="relative">
                                            <img
                                                src={formData.gallery[index]}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border border-gray-300 dark:border-zinc-700"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+Image";
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newGallery = [...formData.gallery];
                                                    newGallery[index] = "";
                                                    setFormData({
                                                        ...formData,
                                                        gallery: newGallery,
                                                        imageUrl: newGallery[0] || formData.imageUrl
                                                    });
                                                }}
                                                className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-1 text-xs"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ) : null)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Featured */}
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="project-featured"
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mark as Featured Project
                            </span>
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        id="submit-project"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
