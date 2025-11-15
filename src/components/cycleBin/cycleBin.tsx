import { Archive, File } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCycleBinDocuments, unfreezeDocument } from "../../api/documents";
import { ClipLoader } from "react-spinners";

interface Document {
  _id: string;
  name: string;
  type: string;
  secureUrl: string;
  previewUrl: string;
  resourceType: string;
  deletedAt: string;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function CycleBin() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCycleBin = async () => {
    setLoading(true);
    try {
      const data = await getCycleBinDocuments();
      setDocuments(data.documents);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cycle bin");
    } finally {
      setLoading(false);
    }
  };

  const handleUnfreeze = async (docId: string) => {
    try {
      const res = await unfreezeDocument(docId);
      toast.success("Document restored!");
      setDocuments((prev) => prev.filter((doc) => doc._id !== docId));
    } catch (err) {
      toast.error("Failed to restore document");
    }
  };

  const handleOpen = (doc: Document) => {
    switch (doc.resourceType) {
      case "image":
      case "video":
      case "audio":
      case "pdf":
        window.open(
          doc.resourceType === "pdf"
            ? `${VITE_API_URL}/api/v1/workspaces/documents/openPdf/${doc._id}`
            : doc.secureUrl,
          "_blank"
        );
        break;
      default:
        toast("Preview not available");
    }
  };

  const getImageSrc = (doc: Document) => {
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
        return doc.previewUrl;
      default:
        return "/images/default.jpg";
    }
  };

  useEffect(() => {
    fetchCycleBin();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[200px]">
        <ClipLoader size={50} color="#fbbf24" />
      </div>
    );
  }
  if (documents.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-90  rounded-lg shadow-lg mx-4 md:mx-0">
        <div className="text-8xl text-amber-500 animate-bounce">
          <File />
        </div>
        <p className="text-2xl text-white font-bold mt-6 text-center">
          No Documents Found
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-3 pr-6 md:pr-16 lg:pr-28 ml-auto w-[85%]">
      {documents.map((doc) => (
        <div
          key={doc._id}
          className="bg-gray-800/90 hover:bg-gray-900 transition-all duration-300 p-3 rounded-xl flex items-center justify-between shadow-md shadow-amber-500/10 hover:shadow-amber-500/20"
        >
          <div className="flex items-center gap-4">
            <img
              src={getImageSrc(doc)}
              alt={doc.name}
              className="w-16 h-16 object-cover rounded-lg border border-gray-700 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleOpen(doc)}
            />
            <div className="flex flex-col">
              <h1
                className="text-amber-400 font-semibold text-base hover:text-amber-300 cursor-pointer transition-colors"
                onClick={() => handleOpen(doc)}
              >
                {doc.name}
              </h1>
              <span className="text-xs text-gray-400 mt-0.5">
                <span className="font-medium text-gray-300">Type:</span>{" "}
                {doc.resourceType}
              </span>
              <span className="text-xs text-gray-400">
                <span className="font-medium text-gray-300">Hide At:</span>{" "}
                {new Date(doc.deletedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg shadow-sm hover:shadow-amber-500/30 transition-all flex items-center justify-center"
              onClick={() => handleUnfreeze(doc._id)}
            >
              <Archive size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
