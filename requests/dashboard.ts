import { getToken } from "@/utils/storage";
import axiosInstance from ".";

export const getUserSpendingClass = async () => {
  const token = await getToken();
  const response = await axiosInstance.get("/user/class", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const syncTransactions = async () => {
  const token = await getToken();
  const response = await axiosInstance.get("/user/sync/datetime", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const getTransactions = async () => {
  const token = await getToken();
  const response = await axiosInstance.get("/user/transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const updateTransactionCategory = async (
  transactionId: string,
  category: string
) => {
  const token = await getToken();
  const response = await axiosInstance.post(
    "/user/transaction/update",
    {
      transactionId,
      updateData: {
        category,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const getTransactionsByDate = async (
  startDate: string,
  endDate: string
) => {
  const token = await getToken();
  const response = await axiosInstance.get(
    `/user/transaction/date?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};


export const updatePushToken = async (
 pushToken: string
) => {
  const token = await getToken();
  const response = await axiosInstance.post(
    "/user/push/token",
    {
      pushToken
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};