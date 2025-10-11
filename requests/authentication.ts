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

export const exhangeMonoCodeForToken = async (code: string) => {
  const token = await getToken();
  const response = await axiosInstance.post(
    "/user/monolink-token",
    { code },
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