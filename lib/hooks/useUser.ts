//==========================
//     written by: raunak
//==========================


import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetchSelf from "../fetchSelf";
import { User } from "@/models/user.model";


// get user from session object 

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User | null>(
    "/api/user",
    fetchSelf,
    {
      refreshInterval: 3000,
      revalidateOnFocus: true
    }
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user: user, mutateUser };
}
