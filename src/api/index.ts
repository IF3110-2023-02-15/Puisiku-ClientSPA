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

export const getPoems = async () => {
  try {
    const response = await apiClient.get("/poem");
    return response.data;
  } catch (error) {
    console.error("Error retrieving poem", error);
    throw error;
  }
};

export const addPoem = async (data: any) => {
  try {
    const response = await apiClient.post("/poem", data);
    return response.data;
  } catch (error) {
    console.error("Error add poem", error);
    throw error;
  }
};
