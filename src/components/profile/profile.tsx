import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Mail, Phone, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

type UserProfile = {
  userName: string;
  email: string;
  phone: string;
  nid: string;
  image?: string | null;
  createdAt: Date;
};

const VITE_API_URL = import.meta.env.VITE_API_URL;
export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${VITE_API_URL}/api/v1/users/getProfile`, {
          headers: { Authorization: `bearer ${localStorage.getItem("accessToken")}` },
        });
        setUser(data.user);
        setImageUrl(data.user.image || "/images/avatar.jpg");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("attachment", file);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${VITE_API_URL}/api/v1/users/uploadProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (data?.user?.image) {
        setImageUrl(`${data.user.image}?t=${Date.now()}`); 
      }
    } catch (error) {
      toast.error ("failed in uploading" )
      
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  if (!user)
    return <div className="flex justify-center items-center h-full min-h-[200px]">
        <ClipLoader size={50} color="#fbbf24" />
      </div>

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-center p-6 bg-gray-900">
      <div className="w-full max-w-4xl md:ml-44 lg:ml-64 flex flex-col md:flex-row items-center md:items-start bg-gray-800 rounded-3xl shadow-xl border border-amber-500 p-8 gap-6">
        
        <div className="flex flex-col items-center md:w-1/3 border-b md:border-b-0 md:border-r border-amber-500 pb-6 md:pb-0 md:pr-6">
          <img
            src={imageUrl}
            alt="User"
            className="w-36 h-36 rounded-full border-4 border-amber-400 object-cover shadow-md"
          />
          <h2 className="text-2xl font-bold font-signature text-amber-400 mt-4">{user.userName}</h2>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={handleButtonClick}
            className="mt-3 flex items-center gap-2 text-gray-900 bg-amber-400 hover:bg-amber-500 font-semibold px-4 py-2 rounded-full shadow transition"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Change Profile"}
          </button>
        </div>

        <div className="md:w-2/3 space-y-6 w-full mt-6 md:mt-0">
          <InfoItem icon={<Mail size={18} />} text={user.email} />
          <InfoItem icon={<Phone size={18} />} text={user.phone} />
          <InfoItem icon={<span className="font-semibold">NID:</span>} text={user.nid} />
          <InfoItem icon={<Calendar size={18} />} text={`Joined: ${joinedDate}`} />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-gray-700 text-white rounded-lg p-3 shadow hover:shadow-lg transition">
      <div className="text-amber-400">{icon}</div>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
