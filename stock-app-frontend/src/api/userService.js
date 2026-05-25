import { axiosInstance } from "./api";

//register

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/register",
      userData
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Registration failed";
  }
};

// LOGIN
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/login",
      loginData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Invalid Email or Password";
  }
};