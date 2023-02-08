import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import { IUser } from "@/models/user.interface";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const router = useRouter()
  const {
    data: user,
    mutate: mutateUser,
    isLoading: userIsLoading,
  } = useSWR<IUser>("/api/auth/user", {
    // revalidateIfStale: true,
    // revalidateOnFocus: true,
    // revalidateOnReconnect: true,
    
  });
  
  useEffect(() => {
    console.log(user)
    if(user?.is_logged_in_users === 1 && user.is_admin_users === 1){
      if(redirectIfFound && !router.pathname.startsWith('/admin')){
        router.push('/admin')
      }
    }
    if(user?.is_logged_in_users === 1 && user.is_admin_users === 0){
      if(redirectIfFound && (router.pathname.startsWith('/admin') || router.pathname.startsWith('/auth'))){
        router.push('/')
      }
    }
  }, [user])


  return { user, mutateUser, userIsLoading };
}
