import { axiosInstance } from "./api";

export const getAllStocks = async () => {
  try {
    const response = await axiosInstance.get("/api/stocks/");
    return response.data;
  } catch (error) {
    console.error("Stock Fetch Error :", error);
    throw error;
  }
};