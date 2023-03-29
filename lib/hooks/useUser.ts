import UserContext from "@/components/context/user.context";
import { useContext } from "react";
//==========================
//     written by: raunak
//==========================

import { useEffect } from "react";
import useSWR from "swr";
import fetchSelf from "../fetchSelf";
import { User } from "@/models/user.model";
import { APIResponse } from "@/models/api.model";
import { useRouter } from "next/router";

// use the current user profile from sessions

export default function useUser() {
  const user: User | null = useContext(UserContext)["user"];
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  function retrieve(input: string) {
    // console.log(input);
    return user;
  }
  const { data, mutate } = useSWR("user", retrieve);

  async function ii_mutate(obj?: User | null, options?: boolean | unknown) {
    if (options && obj) {
      setUser(obj);
      await mutate(obj, options);
    } else {
      // get current context and set
      await mutate(user, false);
    }
  }

  useEffect(() => {
    if (user === null && !router.pathname.startsWith("/auth/gate")) {
      router.replace("/auth/gate", "/auth/gate?please_log_in...");
    } else {
      // user present
      // check admin
      if (user?.is_admin && !router.pathname.startsWith("/admin")) {
        router.replace("/admin", "/admin?please_dont_go_to_client_side");
      }
      if (!user?.is_admin && router.pathname.startsWith("/admin")) {
        router.replace("/", "/?unauthorized");
      }
    }
  }, [router.pathname]);

  return {
    user,
    mutateUser: ii_mutate,
  };
}
