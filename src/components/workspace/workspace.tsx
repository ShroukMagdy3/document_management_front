import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllDocuments } from "../../api/documents";
import WorkspaceHeader from "../workspaceHeader/workspaceHeader";
import UploadMenu from "../upload/upload";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
interface workspace {
  _id: string;
  name: string;
  createdAt: string;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function WorkspaceProfile() {
  const [workspace, setWorkspace] = useState<workspace>();
  const [documents, setDocuments] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [docsLoading, setDocsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const { data } = await axios.get(
          `${VITE_API_URL}/api/v1/workspaces/getMyWorkspace`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setWorkspace(data.workspace);
      } catch (err) {
        console.error(err);
        toast.error("error");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspace();
  }, []);

  useEffect(() => {
    if (!workspace?._id) return;
    const fetchDocs = async () => {
      setDocsLoading(true);
      try {
        const { data } = await getAllDocuments();
        setDocuments(data.docs);
      } catch (err) {
        console.error(err);
      } finally {
        setDocsLoading(false);
      }
    };
    fetchDocs();
  }, [workspace]);

  const handleUpdate = async (newName: string) => {
    try {
      const { data } = await axios.patch(
      `${VITE_API_URL}/api/v1/workspaces/update/${workspace?._id}`,
      { name: newName },
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setWorkspace((prev) => {
      if (!prev) return prev;
      return { ...prev, name: newName };
    });
    toast.success("Name Updated")
    } catch (error) {
      toast.error("Please try in another time!")
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full min-h-[200px]">
        <ClipLoader size={50} color="#fbbf24" />
      </div>
    );
  return (
    <div className="min-h-screen  rounded-lg text-white flex flex-col items-center">
      {workspace && (
        <WorkspaceHeader
          workspaceName={workspace.name}
          createdAt={workspace.createdAt}
          onUpdate={handleUpdate}
        />
      )}

      {workspace && <UploadMenu workspaceId={workspace?._id} />}
    </div>
  );
}
