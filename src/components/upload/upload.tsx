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
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
  <div className="w-full flex flex-col gap-6 mt-4 items-end px-2">

  <select
    value={selectedType}
    onChange={(e) => setSelectedType(e.target.value)}
    className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 w-56"
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
    className={`
      group relative flex items-center gap-3 px-14 py-3 
      rounded-xl font-semibold transition-all duration-300
      ${isUploading
        ? "bg-amber-400 opacity-60 cursor-not-allowed"
        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/30 active:scale-95"
      }
    `}
  >
    <UploadCloud
      size={22}
      className={`transition-transform ${
        isUploading
          ? "text-gray-800"
          : "text-gray-900 group-hover:-translate-y-0.5 group-hover:text-white"
      }`}
    />

    <span
      className={`transition-colors ${
        isUploading ? "text-gray-900" : "text-gray-900 group-hover:text-white"
      }`}
    >
      {isUploading ? "Uploading..." : "Upload File"}
    </span>

    {!isUploading && (
      <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
    )}
  </button>

  <input
    type="file"
    ref={inputRef}
    className="hidden"
    onChange={handleUpload}
  />
</div>

      <DocumentList key={reloadFlag} workspaceId={workspaceId} />
    </>
  );
}
