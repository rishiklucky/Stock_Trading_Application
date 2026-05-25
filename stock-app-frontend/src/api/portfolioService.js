import { axiosInstance } from "./api";
import { getAllStocks } from "./stockService";

export const getAllPortfolio = async () => {
  const response = await axiosInstance.get("/api/trading/portfolio");
  return response.data;
};


