import { getToken } from "@/utils/storage";
import axiosInstance from ".";

export const getUserSpendingClass = async () => {
  const token = await getToken();
  const response = await axiosInstance.get("/class", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const syncTransactions = async () => {
  const token = await getToken();
  const response = await axiosInstance.get("/sync/datetime", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
