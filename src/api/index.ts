import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const loginUser = async (data: any) => {
  try {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user", error);
    throw error;
  }
};

export const registerUser = async (data: any) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error retrieving user profile", error);
    throw error;
  }
};

export const updateProfile = async (data: any) => {
  try {
    const response = await apiClient.patch("/user", data);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile", error);
    throw error;
  }
};

export const uploadImageFile = async (data: any) => {
  try {
    const response = await apiClient.post("/file/img", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image file");
    throw error;
  }
};

export const uploadAudioFile = async (data: any) => {
  try {
    const response = await apiClient.post("/file/audio", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading audio file");
    throw error;
  }
};

export const getPoems = async () => {
  try {
    const response = await apiClient.get("/poem");
    return response.data;
  } catch (error) {
    console.error("Error retrieving poem", error);
    throw error;
  }
};

export const getPoemById = async (id: number) => {
  try {
    const response = await apiClient.get(`/poem/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error get poem by id", error);
    throw error;
  }
};

export const addPoem = async (data: any) => {
  try {
    let temp = { ...data, imagePath: data.image, audioPath: data.audio };
    delete temp.image;
    delete temp.audio;

    const response = await apiClient.post("/poem", temp);
    return response.data;
  } catch (error) {
    console.error("Error add poem", error);
    throw error;
  }
};

export const updatePoem = async (id: number, data: any) => {
  try {
    let temp = { ...data};
    if (typeof(data.image) == 'string'){
      temp = { ...temp, imagePath: data.image };
      delete temp.image;
    }
    if (typeof(data.audio) == 'string'){
      temp = { ...temp, audioPath: data.audio };
      delete temp.audio;
    }

    temp.year = Number(data.year);

    const response = await apiClient.put(`/poem/${id}`, temp);
    return response.data;
  } catch (error) {
    console.error("Error updating poem", error);
    throw error;
  }
};

export const deletePoem = async (id: number) => {
  try {
    const response = await apiClient.delete(`/poem/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error delete poem", error);
    throw error;
  }
};

export const addAlbum = async (data: any) => {
  try {
    const response = await apiClient.post("/album", data);
    return response.data;
  } catch (error) {
    console.error("Error while adding album");
    throw error;
  }
};

export const getAlbums = async () => {
  try {
    const response = await apiClient.get("/album/creator");
    return response.data;
  } catch (error) {
    console.error("Error while getting album");
    throw error;
  }
};

export const getAlbumPoems = async (albumId: number) => {
  try {
    const response = await apiClient.get(`/poem/album/${albumId}`);
    return response.data;
  } catch (error) {
    console.error("Error while getting album poems");
    throw error;
  }
};

export const updateAlbum = async (id: number, data: any) => {
  try {
    const response = await apiClient.patch(`/album/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating album", error);
    throw error;
  }
};

export const getAlbum = async (albumId: number) => {
  try {
    const response = await apiClient.get(`/album/${albumId}`);
    return response.data;
  } catch (error) {
    console.error("Error while getting album");
    throw error;
  }
};

export const deleteAlbum = async (id: number) => {
  try {
    const response = await apiClient.delete(`/album/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error delete poem", error);
    throw error;
  }
};
