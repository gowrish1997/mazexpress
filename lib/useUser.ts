import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { IUser } from "@/models/user.interface";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const {
    data: user,
    mutate: mutateUser,
    isLoading: userIsLoading,
  } = useSWR<IUser>("/api/auth/user", {
   // revalidateIfStale: true,
    // revalidateOnFocus: true,
    // revalidateOnReconnect: true,
    
  });



  return { user, mutateUser, userIsLoading };
}
