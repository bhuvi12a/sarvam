"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Upload, Trash2, Link } from "lucide-react";

export default function NewProjectPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [imageMode, setImageMode] = useState<"upload" | "url">("url");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        status: "Ongoing",
        price: "",
        imageUrl: "",
        featured: false,
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size should be less than 5MB");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            const uploadForm = new FormData();
            uploadForm.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadForm,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            setFormData((prev) => ({ ...prev, imageUrl: data.url }));
        } catch (err) {
            setError("Failed to upload image. Please try again.");
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to create project");

            router.push("/admin/projects");
        } catch (err) {
            setError("Failed to create project. Please try again.");
            setIsLoading(false);
        }
    };

    const clearImage = () => setFormData((f) => ({ ...f, imageUrl: "" }));

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
                Add New Project
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
                            placeholder="e.g. Karapalli, Hosur"
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
                            Project Image *
                        </label>

                        {/* Toggle tabs */}
                        <div className="flex gap-2 mb-3">
                            <button
                                type="button"
                                id="tab-upload"
                                onClick={() => { setImageMode("upload"); clearImage(); }}
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
                                onClick={() => { setImageMode("url"); clearImage(); }}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    imageMode === "url"
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                }`}
                            >
                                <Link className="h-4 w-4" /> Paste URL
                            </button>
                        </div>

                        {/* URL mode */}
                        {imageMode === "url" && (
                            <div>
                                <input
                                    id="project-image-url"
                                    type="url"
                                    required
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="https://example.com/villa-image.jpg"
                                />
                                {formData.imageUrl && (
                                    <div className="relative mt-3">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-zinc-700"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+URL";
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={clearImage}
                                            className="absolute top-2 right-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                                        >
                                            <Trash2 className="h-4 w-4" /> Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Upload mode — no image yet */}
                        {imageMode === "upload" && !formData.imageUrl && (
                            <label className="relative block">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={isUploading}
                                    required
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
                                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                                        </>
                                    )}
                                </div>
                            </label>
                        )}

                        {/* Upload mode — image uploaded */}
                        {imageMode === "upload" && formData.imageUrl && (
                            <div className="relative">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-lg border border-gray-300 dark:border-zinc-700"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+Image";
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    className="absolute top-2 right-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" /> Remove
                                </button>
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
                        disabled={isLoading}
                        id="submit-project"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Project"
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
