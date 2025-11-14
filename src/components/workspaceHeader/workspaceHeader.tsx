import { Edit2 } from "lucide-react";
import React, { useState } from "react";

interface Props {
  workspaceName: string;
  createdAt: string;
  onUpdate: (newName: string) => void;
}

export default function WorkspaceHeader({
  workspaceName,
  createdAt,
  onUpdate,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(workspaceName);
  const handleSave = () => {
    onUpdate(newName);
    setEditing(false);
  };

  if (!editing)
    return (
      <div className="text-center flex content-center bg-gray-800 rounded-2xl p-8 space-x-14">
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-amber-400">
            {workspaceName}
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            Created at: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => setEditing(true)}
          className="  text-amber-500 font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200"
        >
          <Edit2 size={16} />
        </button>
      </div>
    );
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-8 p-4 bg-gray-900 rounded-lg shadow-lg">
      {editing ? (
        <div className="flex items-center w-full gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 p-3 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <button
            onClick={handleSave}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <span className="text-white text-lg font-semibold">
            {newName || "Your Name"}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
