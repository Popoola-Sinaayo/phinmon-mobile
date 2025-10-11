import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/requests/authentication";
import { getUserData, saveUserData } from "@/utils/storage";

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      // First try to get cached data from AsyncStorage
      const cachedUserData = await getUserData();
      // console.log(cachedUserData, "cachedUserData")
      
      // if (cachedUserData) {
      //   console.log("herer")
      //   // Return cached data immediately for better UX
      //   return cachedUserData;
      // }
      
      // If no cached data, fetch from API
      
      const userData = await getUserDetails();
      console.log(userData, "userData")
      // Save to AsyncStorage for future use
      await saveUserData(userData);
      
      return userData;
    },
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

export default useUserData;
