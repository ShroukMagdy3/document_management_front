import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  uploadImage,
  uploadPdf,
  uploadVideo,
  uploadAudio,
} from "../../api/documents";
import DocumentList from "../documents/documentlist";
import { UploadCloud } from "lucide-react";

export default function UploadMenu({ workspaceId }: { workspaceId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [reloadFlag, setReloadFlag] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (selectedType === "image" && !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    if (selectedType === "pdf" && file.type !== "application/pdf") {
      toast.error("Please select a valid PDF file");
      return;
    }
    if (selectedType === "video" && !file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }
    if (selectedType === "audio" && !file.type.startsWith("audio/")) {
      toast.error("Please select a valid audio file");
      return;
    }

    setIsUploading(true);

    try {
      let res;

      if (selectedType === "image") res = await uploadImage(file);
      else if (selectedType === "pdf") res = await uploadPdf(file);
      else if (selectedType === "video") res = await uploadVideo(file);
      else if (selectedType === "audio") res = await uploadAudio(file);
      else {
        toast.error("Select file type first");
        setIsUploading(false);
        return;
      }
      if (res.data?.message === "success") {
        toast.success("Uploaded ");
        setReloadFlag((prev) => prev + 1);
      }
    } catch (err) {
      toast.error("Upload failed please try in another time ");
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-4">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="p-2 rounded-md bg-gray-800 text-white"
      >
        <option value="">Select File Type</option>
        <option value="image">Image</option>
        <option value="pdf">PDF</option>
        <option value="video">Video</option>
        <option value="audio">Audio</option>
      </select>

      <button
        onClick={() => {
          if (!selectedType) return toast.error("Select File Type First");
          inputRef.current?.click();
        }}
        disabled={isUploading}
        className={`relative overflow-hidden group flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold text-gray-900 transition-all
    ${
      isUploading
        ? "bg-amber-400 opacity-70 cursor-not-allowed"
        : "bg-amber-500 hover:bg-amber-600 hover:shadow-amber-400/50 hover:shadow-lg active:scale-95"
    }`}
      >
        <UploadCloud
          size={20}
          className={`transition-transform ${
            isUploading
              ? "text-gray-800"
              : "text-gray-900 group-hover:text-gray-100 group-hover:-translate-y-0.5"
          }`}
        />

        <span
          className={`transition-all ${
            isUploading ? "text-gray-800" : "group-hover:text-gray-100"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload File"}
        </span>

        {!isUploading && (
          <span className="absolute inset-0 rounded-full bg-amber-300 opacity-0 group-hover:opacity-10 transition-opacity"></span>
        )}
      </button>

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleUpload}
      />
      <DocumentList key={reloadFlag} workspaceId={workspaceId} />
    </div>
  );
}
