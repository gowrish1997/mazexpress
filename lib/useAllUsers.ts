import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { IUser } from "@/models/user.interface";

export default function useAllUser({user_id}:{user_id:number | undefined}) {

  const {
    data: allUser,
    mutate: mutateAllUser,
    isLoading: allUserIsLoading,
  } = useSWR<IUser[]>(`/api/users?id=${user_id}`, {
   // revalidateIfStale: true,
    // revalidateOnFocus: true,
    // revalidateOnReconnect: true,
    
  });



  return { allUser, mutateAllUser, allUserIsLoading };
}