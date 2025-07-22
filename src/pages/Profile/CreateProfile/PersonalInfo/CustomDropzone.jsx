import React from "react";
import { FileInput, Label } from "flowbite-react";
// import { CloudUpload } from "lucide-react";
import { LuCloudUpload } from "react-icons/lu";

export default function CustomDropzone({ maxSize, handleFileSelect }) {
  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-slate-50 hover:bg-gray-100 "
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <p className="text-lg font-bold text-[#0D141C] mb-8">Upload Profile Picture</p>

          <LuCloudUpload className="text-gray-500" size={32} strokeWidth={2.5} />

          <p className="mb-2 text-sm text-gray-500 text-wrap">
            <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 ">PNG, JPG, GIF up to {maxSize / (1024 * 1024)}MB</p>
        </div>
        <FileInput onChange={handleFileSelect} id="dropzone-file" className="hidden" />
      </Label>
    </div>
  );
}
