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

  useEffect(() => {
    // console.log(user)
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.is_logged_in_users) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.is_logged_in_users)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser, userIsLoading };
}
