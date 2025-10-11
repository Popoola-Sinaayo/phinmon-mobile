import { getToken } from "@/utils/storage";
import axiosInstance from "."


export const authenticateUser = async (email: string) => {
  const response = await axiosInstance.post("/user/authenticate", { email });
  return response.data;
};

export const getUserDetails = async () => {
  const token = await getToken();
  const response = await axiosInstance.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.data, "response.data.data")
  return response.data.data;
};

export const verifyOtpDetails = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await axiosInstance.post("/user/verify-otp", { otp, email });
  return response.data.data;
};

export const onboardUser = async (data: any) => {
  const token = await getToken();
  const response = await axiosInstance.post("/user/onboarding", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const exhangeMonoCodeForToken = async (data: {
  code: string;
  institution: string;
}) => {
  const token = await getToken();
  const response = await axiosInstance.post(
    "/user/monolink-token",
    { code: data.code, institution: data.institution },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const sendChatMessage = async (message: string) => {
  const token = await getToken();
  const response = await axiosInstance.post(
    "/ai/chat",
    { question: message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const disconnectAccount = async (monoAccountId: string) => {
  const token = await getToken();
  const response = await axiosInstance.post(
    "/user/disconnect-account",
    { monoAccountId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const updateNotificationPreferences = async (preferencesData: {
  notifications?: "all" | "over_set_amount" | "balance_below_amount" | "none";
  notificationSetAmount?: number;
}) => {
  const token = await getToken();
  const response = await axiosInstance.put(
    "/user/preferences/notifications",
    preferencesData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const updateKeywordPreferences = async (preferencesData: {
  userMappedKeyWords?: {
    food?: string[];
    transport?: string[];
    shopping?: string[];
    bills?: string[];
    entertainment?: string[];
    savings?: string[];
    health?: string[];
    education?: string[];
    subscriptions?: string[];
    gifting?: string[];
    home?: string[];
    income?: string[];
    bank_charges?: string[];
    donations?: string[];
  };
}) => {
  const token = await getToken();
  const response = await axiosInstance.put(
    "/user/preferences/notifications",
    preferencesData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const updateAccountDetails = async (accountData: {
  fullName: string;
  phoneNumber: string;
  country: string;
}) => {
  const token = await getToken();
  const response = await axiosInstance.post("/user/onboarding", accountData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};