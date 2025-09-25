import { getToken } from "@/utils/storage";
import axiosInstance from "."


export const authenticateUser = async (email: string) => {
    const response = await axiosInstance.post("/authenticate", { email });
    return response.data;
}

export const getUserDetails = async () => {
    // const token = await getToken();
    const response = await axiosInstance.get("/me", {
        headers: {
            // Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

export const verifyOtpDetails = async ({email, otp}: {email: string, otp: string}) => {
    const response = await axiosInstance.post("/verify-otp", { otp, email });
    return response.data.data;
}


export const onboardUser = async (data: any) => {
    const token = await getToken();
    const response = await axiosInstance.post("/onboarding", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
}


export const exhangeMonoCodeForToken = async (code: string) => {
    const token = await getToken();
    const response = await axiosInstance.post(
      "/monolink-token",
      { code },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
}