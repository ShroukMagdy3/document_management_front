
import axios from "axios";
// import toast from "react-hot-toast";

const BASE = "http://localhost:3000/api/v1/workspaces";
export const uploadImage = (file: File) => {
  const form = new FormData();
  form.append("attachment", file);
  return axios.post("http://localhost:3000/api/v1/workspaces/documents/uploadImage", form ,{
    headers:{
      authorization :`bearer ${localStorage.getItem("accessToken")}`
    }
  });
};

export const uploadPdf = (file: File) => {
  const form = new FormData();
  form.append("pdf", file);
  return axios.post("http://localhost:3000/api/v1/workspaces/documents/uploadPdf", form,{
    headers:{
      authorization :`bearer ${localStorage.getItem("accessToken")}`,
    }
  });
};

export const uploadVideo = (file: File) => {
  const form = new FormData();
  form.append("attachment", file);
  return axios.post("http://localhost:3000/api/v1/workspaces/documents/uploadVideo", form,{
    headers:{
      authorization :`bearer ${localStorage.getItem("accessToken")}`,
       "Content-Type": "multipart/form-data" 

    }
  });
};

export const uploadAudio = (file: File) => {
  const form = new FormData();
  form.append("attachment", file);
  return axios.post("http://localhost:3000/api/v1/workspaces/documents/uploadAudio", form,{
    headers:{
      authorization :`bearer ${localStorage.getItem("accessToken")}`,
       "Content-Type": "multipart/form-data" 
    }
  });
};



export const getAllDocuments = async () => {
  return axios.get(
    `http://localhost:3000/api/v1/workspaces/documents/getAll`,
    {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
         "Content-Type": "multipart/form-data" 
      },
    }
  );
};



export const updateDocumentName = async (documentId: string, newName: string) => {
  const { data } = await axios.patch(
    `${BASE}/documents/update/${documentId}`,
    { name: newName },
    {
       headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};



export const deleteDocument = async (documentId: string) => {
  const { data } = await axios.delete(
    `${BASE}/documents/delete/${documentId}`,
    {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return data;
};


export const softDeleteDocument = async (documentId: string) => {
  const { data } = await axios.patch(
    `${BASE}/documents/freeze/${documentId}`,
    {},
    {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return data;
};


export const getCycleBinDocuments = async () => {
  const res = await axios.get(`${BASE}/documents/cycleBin` ,{
    headers:{
      authorization:`bearer ${localStorage.getItem("accessToken")}`
    }
  });
  return res.data; 
};

export const unfreezeDocument = async (docId: string) => {
  const res = await axios.patch(`${BASE}/documents/unfreeze/${docId}`, 
     {},
    {headers:{
      authorization:`bearer ${localStorage.getItem("accessToken")}`
    }}
  );
  return res.data;
};




export const searchDocuments = async (params: { name?: string; type?: string }) => {
  const query = new URLSearchParams();
  if (params.name) query.append("name", params.name);
  if (params.type) query.append("type", params.type);

  const res = await axios.get(
    `${BASE}documents/search?${query.toString()}`,
    {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  return res.data;
};

