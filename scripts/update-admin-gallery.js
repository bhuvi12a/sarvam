const fs = require('fs');

function updatePage(file) {
    let code = fs.readFileSync(file, 'utf8');

    // Make sure gallery is in formData
    if (!code.includes('gallery: [')) {
        code = code.replace(/imageUrl: \"\",/g, 'imageUrl: "", gallery: ["", "", "", ""],');
    }
    
    if (file.includes('edit')) {
        // Also update fetchProject to set gallery
        code = code.replace(/imageUrl: data.imageUrl \|\| \"\",/g, 'imageUrl: data.imageUrl || "", gallery: data.gallery || ["", "", "", ""],');
    }

    // Replace handleImageUpload to fill the first empty spot in gallery
    if (!code.includes('const emptyIndex')) {
        code = code.replace(/setFormData\(\(prev\) => \(\{ \.\.\.prev, imageUrl: base64String \}\)\);/g, `setFormData((prev) => {
                    const newGallery = [...(prev.gallery || ["", "", "", ""])];
                    const emptyIndex = newGallery.findIndex(g => !g);
                    if (emptyIndex !== -1) {
                        newGallery[emptyIndex] = base64String;
                    } else {
                        newGallery[0] = base64String;
                    }
                    return { ...prev, gallery: newGallery, imageUrl: newGallery[0] };
                });`);
    }

    // Replace the UI for Image
    const startIndex = code.indexOf('{/* Image */}');
    const endIndex = code.indexOf('{/* Featured */}');
    
    if (startIndex !== -1 && endIndex !== -1) {
        const replacement = `{/* Image */}
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
                                className={\`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all \${
                                    imageMode === "upload"
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                }\`}
                            >
                                <Upload className="h-4 w-4" /> Upload File
                            </button>
                            <button
                                type="button"
                                id="tab-url"
                                onClick={() => { setImageMode("url"); }}
                                className={\`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all \${
                                    imageMode === "url"
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                }\`}
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
                                            placeholder={\`Image URL \${index + 1}\${index === 0 ? " (Main Cover Image)" : ""}\`}
                                        />
                                        {formData.gallery?.[index] && (
                                            <div className="relative">
                                                <img
                                                    src={formData.gallery[index]}
                                                    alt={\`Preview \${index + 1}\`}
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
                                                alt={\`Preview \${index + 1}\`}
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

                    `;
        
        code = code.substring(0, startIndex) + replacement + code.substring(endIndex);
    }
    
    // Remove unused clearImage
    code = code.replace(/const clearImage = \(\) => setFormData\(\(f\) => \(\{ \.\.\.f, imageUrl: \"\" \}\)\);/g, '');

    fs.writeFileSync(file, code);
}

updatePage('src/app/admin/projects/new/page.tsx');
updatePage('src/app/admin/projects/[id]/edit/page.tsx');
console.log('Pages updated successfully!');
