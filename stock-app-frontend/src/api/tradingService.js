import { axiosInstance } from "./api";

// buy stock
export const buyStock = async (data) => {
  const response = await axiosInstance.post("/api/trading/buy", data);
  return response.data;
};

//sell stock
export const sellStock = async (data) => {
  const response = await axiosInstance.post("/api/trading/sell", data);
  return response.data;
};