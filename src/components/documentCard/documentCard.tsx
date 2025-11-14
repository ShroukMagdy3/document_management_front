import { Download, Trash, Archive } from "lucide-react";
import React, { useState } from "react";
import { updateDocumentName, deleteDocument, softDeleteDocument } from "../../api/documents";
import toast from "react-hot-toast";

interface Document {
  _id: string;
  name: string;
  type: string;
  secureUrl: string;
  previewUrl: string;
  resourceType: string;
  createdAt: string;
}

export default function DocumentCard({
  doc,
  onDelete,
}: {
  doc: Document;
  onDelete?: (id: string) => void;
}) {
  const [name, setName] = useState(doc.name);
  const [editing, setEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const saveName = async () => {
    setEditing(false);
    if (name.trim() === "" || name === doc.name) return;

    try {
      const data = await updateDocumentName(doc._id, name);
      if (data.message === "Success") toast.success("Name updated");
    } catch {
      toast.error("Failed to update name");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveName();
    if (e.key === "Escape") {
      setName(doc.name);
      setEditing(false);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (doc.resourceType === "pdf") {
      const link = document.createElement("a");
      link.href = `http://localhost:3000/api/v1/workspaces/documents/downloadPdf/${doc._id}`;
      link.setAttribute("download", doc.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    fetch(doc.secureUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = doc.name;
        link.click();
      })
      .catch(() => toast.error("Download failed"));
  };

  const handleDelete = async () => {
    try {
      await deleteDocument(doc._id);
      toast.success("Document deleted");
      setShowConfirm(false);
      if (onDelete) onDelete(doc._id);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleFreeze = async () => {
    try {
      await softDeleteDocument(doc._id);
      toast.success("Document moved to Cycle Bin");
      if (onDelete) onDelete(doc._id);
    } catch {
      toast.error("Freeze failed");
    }
  };

  const handleCardClick = () => {
    if (["image", "video", "pdf", "audio"].includes(doc.resourceType)) {
      const url =
        doc.resourceType === "pdf"
          ? `http://localhost:3000/api/v1/workspaces/documents/openPdf/${doc._id}`
          : doc.secureUrl;
      window.open(url, "_blank");
    } else {
      toast("Preview not available");
    }
  };

  const getImageSrc = () => {
    switch (doc.resourceType) {
      case "image":
        return doc.secureUrl;
      case "video":
        return doc.previewUrl;
      case "audio":
        return "/images/R.jpeg";
      case "raw":
        return doc.previewUrl;
      case "pdf":
        return doc.previewUrl || "/images/default.jpg";
      default:
        return "/images/default.jpg";
    }
  };

  return (
    <>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-5 rounded-lg text-white w-80 shadow-2xl">
            <h3 className="text-lg font-semibold mb-3">Are you sure?</h3>
            <p className="text-gray-300 mb-5">
              Do you really want to delete <span className="font-bold">{name}</span>?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="bg-gray-800 hover:bg-gray-950 transition-all p-3 rounded-lg flex items-center gap-3 w-full max-w-3xl shadow-md shadow-amber-500 hover:shadow-amber-500/50 cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={getImageSrc()}
          alt={name}
          className="w-28 h-28 object-cover rounded cursor-pointer border border-gray-700"
        />

        <div className="flex-1 flex flex-col min-w-0">
          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={saveName}
              onKeyDown={handleKeyDown}
              className="bg-gray-700 text-white px-2 py-1 rounded outline-none w-full truncate"
            />
          ) : (
            <span
              className="text-amber-400 font-semibold cursor-text truncate hover:text-amber-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
            >
              {name}
            </span>
          )}
          <span className="text-sm text-gray-300 truncate">Type: {doc.resourceType}</span>
          <span className="text-sm text-gray-300 truncate">
            Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-2 shrink-0 ml-2">
          <button
            onClick={handleDownload}
            className="text-gray-200 hover:text-amber-400 transition"
            title="Download"
          >
            <Download size={18} />
          </button>

          <button
            onClick={handleFreeze}
            className="text-amber-500 hover:text-amber-600 transition"
            title="Freeze"
          >
            <Archive size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            className="text-red-400 hover:text-red-600 transition"
            title="Delete"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
