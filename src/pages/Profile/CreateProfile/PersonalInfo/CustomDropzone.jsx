import React from "react";
import { FileInput, Label } from "flowbite-react";
import { LuCloudUpload } from "react-icons/lu";
import { useTranslation } from "react-i18next";

export default function CustomDropzone({ maxSize, handleFileSelect }) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-slate-50 hover:bg-gray-100 "
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <p className="text-lg font-bold text-[#0D141C] mb-8">
            {t("Dropzone.UploadTitle")}
          </p>

          <LuCloudUpload className="text-gray-500" size={32} strokeWidth={2.5} />

          <p className="mb-2 text-sm text-gray-500 text-wrap">
            <span className="font-semibold text-blue-600">
              {t("Dropzone.ClickToUpload")}
            </span>{" "}
            {t("Dropzone.OrDrag")}
          </p>

          <p className="text-xs text-gray-500">
            {t("Dropzone.FileHint", {
              size: (maxSize / (1024 * 1024)).toFixed(1),
            })}
          </p>
        </div>
        <FileInput onChange={handleFileSelect} id="dropzone-file" className="hidden" />
      </Label>
    </div>
  );
}
