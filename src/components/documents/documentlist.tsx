import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DocumentCard from "../documentCard/documentCard";
import { File, LucideArrowUpWideNarrow } from "lucide-react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

interface Props {
  workspaceId: string;
}

interface Document {
  _id: string;
  name: string;
  type: string;
  secureUrl: string;
  resourceType: string;
  createdAt: string;
  previewUrl: string;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;
const DEBOUNCE_DELAY = 500; 

export default function DocumentList({ workspaceId }: Props) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const debounceRef = useRef<number | null>(null);

  const fetchDocuments = async (params: any = {}) => {
    try {
      setLoading(true);

      const url = Object.keys(params).length
        ? `${VITE_API_URL}/api/v1/workspaces/documents/search`
        : `${VITE_API_URL}/api/v1/workspaces/documents/getAll`;

      const { data } = await axios.get(url, {
        params: Object.keys(params).length ? params : undefined,
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setDocuments(data.documents || []);
    } catch (err) {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const sortDocuments = async () => {
    try {
      const { data } = await axios.get(
        `${VITE_API_URL}/api/v1/workspaces/documents/sort`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setDocuments(data.documents || []);
    } catch (err) {
      toast.error("please try in another time");
    }
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc._id !== id));
  };


  useEffect(() => {
    fetchDocuments();
  }, [workspaceId]);


  useEffect(() => {
    const params: any = {};
    if (searchName.trim() !== "") params.name = searchName.trim();
    if (searchType !== "") params.type = searchType;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchDocuments(params);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchName, searchType]);

  return (
    <div className="flex justify-center min-h-screen text-white">
      <div className="w-full max-w-5xl px-6 py-10">
        <div
          className="flex flex-col md:flex-row gap-4 mb-8 items-center 
                     bg-gray-950 p-4 rounded-xl shadow-lg border border-gray-800"
        >
          <input
            type="text"
            placeholder="Search by name..."
            className="
              px-4 py-2 rounded-lg 
              bg-gray-800 text-white 
              border border-gray-700 
              focus:outline-none 
              focus:ring-2 focus:ring-amber-500
              w-full md:w-1/2
              transition duration-300
            "
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <select
            className="
              px-4 py-2 rounded-lg 
              bg-gray-800 text-white 
              border border-gray-700 
              focus:outline-none 
              focus:ring-2 focus:ring-amber-500
              w-full md:w-1/4
              transition duration-300
            "
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="pdf">PDF</option>
            <option value="raw">Audio / Other</option>
          </select>

          <button
            onClick={sortDocuments}
            className="
              flex items-center justify-center
              bg-amber-500 hover:bg-amber-600 
              text-black font-semibold 
              px-5 py-2 rounded-full 
              transition duration-300
              shadow-md hover:shadow-amber-500/40
              w-full md:w-auto
            "
          >
            <LucideArrowUpWideNarrow size={18} />
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader size={50} color="#fbbf24" />
          </div>
        )}
        {!loading && documents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 rounded-xl shadow-lg border border-gray-800 bg-gray-900">
            <div className="text-8xl text-amber-500 animate-bounce">
              <File />
            </div>
            <p className="text-2xl font-bold mt-6 text-center text-gray-200">
              No Documents Found
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6 w-full mt-6">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="w-full transition-transform duration-300 hover:scale-[1.02]"
            >
              <DocumentCard doc={doc} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
