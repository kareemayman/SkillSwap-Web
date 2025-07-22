import { useEffect, useRef, useState } from "react";
// import { Image, Trash2 } from "lucide-react";
import { LuImage, LuTrash2 } from "react-icons/lu";
import CustomDropzone from "./CustomDropzone";

export default function ImageUpload({ selectedImage, setSelectedImage, maxSize = 1 * 1024 * 1024, isDropzone = false }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Reset preview and error when selectedImage changes
    if (!selectedImage) {
      setPreview(null);
      setError(null);
    }
  }, [selectedImage]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    setError(null);

    if (!file) {
      setError("No file selected");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.onerror = (e) => {
      console.error("Error loading image:", e);
      setError("Failed to load image preview");
    };
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full relative pb-2">
      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />

      {/* Custom upload button || dropzone*/}
      {!selectedImage ? (
        isDropzone ? (
          <CustomDropzone handleFileSelect={handleFileSelect} maxSize={maxSize} />
        ) : (
          <button
            type="button"
            onClick={handleButtonClick}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200 transition-all duration-200"
          >
            <LuImage size={20} color="#27364B" />
            <span className="text-[#27364B] font-medium text-sm">Add Media</span>
          </button>
        )
      ) : (
        <></>
      )}

      {/* Error message */}
      {error && <div className="absolute  text-red-500 text-xs">{error}</div>}

      {/* Image preview */}
      {preview && (
        <div className="max-w-lg w-fit mx-auto flex flex-col gap-2 p-1 sm:p-4 border border-gray-200 rounded-lg shadow-sm transition-all duration-200">
          <img src={preview} alt="Preview" className="max-h-64 rounded-lg shadow-md object-contain" />

          {/* Image info */}
          <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row justify-between items-center ">
            <div className="mt-2 text-sm text-gray-600">
              <p className="flex items-center gap-1">
                <LuImage size={14} />
                {selectedImage?.name}
              </p>
              <p className="text-xs text-gray-500">{(selectedImage?.size / 1024).toFixed(1)} KB</p>
            </div>

            <button
              type="button"
              onClick={removeImage}
              className=" bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white rounded-md p-1 transition-colors duration-200"
            >
              <LuTrash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
