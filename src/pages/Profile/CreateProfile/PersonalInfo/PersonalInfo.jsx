import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import StatusOverlay from "../../../../components/StatusOverlay";
import ImageUpload from "./ImageUpload";
import Button from "../../../../components/Button";
import { LuArrowUpRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";

export default function PersonalInfo({ updateStep, userId, initialData, onComplete }) {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, data: null });
  const [bio, setBio] = useState(initialData?.bio || "");
  const { t } = useTranslation();

  let imageUrl = initialData?.profilePicture || null;

  async function saveChangesHandler() {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "profile_pics");
    formData.append("folder", "profile_pictures");

    try {
      setStatus({ loading: true, error: null, data: null });
      const response = await fetch("https://api.cloudinary.com/v1_1/dplcc4igl/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error?.message || "Upload failed");

      imageUrl = data.secure_url;

      const userRef = doc(db, "users", userId);
      const updateObj = { bio, profilePicture: imageUrl };

      await updateDoc(userRef, updateObj);

      setImage(null);
      setBio("");
      setStatus({ loading: false, error: null, data: "Personal Info updated successfully!" });
      onComplete(updateObj);

      // Wait for 1 seconds to show success message before moving to next step
      setTimeout(() => {
        updateStep(2);
      }, 1000);
    } catch (error) {
      setStatus({ loading: false, error: error.message, data: null });
      return;
    }
  }

  function dismissOverlay() {
    setStatus({ loading: false, error: null, data: null });
  }

  return (
    // <div className="p-4 bg-gray-50/50 border rounded-xl border-gray-300 shadow-2xl transition-all relative">
    <>
      <StatusOverlay status={status} onDismiss={dismissOverlay} />

      <div className="flex flex-col gap-8">
        <div>
          <label htmlFor="bio" className="block mb-2 text-base font-bold text-[var(--color-text-primary)] dark:text-white">
            {t("Bio")}
          </label>
          <textarea
            id="bio"
            rows="4"
            className="block p-4 w-full text-sm text-gray-900 bg-slate-50 rounded-lg border border-gray-300 placeholder-gray-500 resize-none"
            placeholder={t("info")}
            value={bio}
            onChange={(e) => {
              if (e.target.value.trim().length > 0) {
                setBio(e.target.value);
                return;
              }
              setBio(e.target.value.trim());
            }}
          />
        </div>

        <div className="">
          <ImageUpload isDropzone selectedImage={image} setSelectedImage={setImage} maxSize={5 * 1024 * 1024} />
        </div>

        <div className="flex justify-end gap-4">
          <Button disabled={!image || !bio} value="Next" onPress={saveChangesHandler} />
        </div>
      </div>
    </>
    // </div>
  );
}
