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
import fetchJson from "../fetchServer";

// use the current user profile from sessions

export default function useUser() {
  const user: User | null = useContext(UserContext)["user"];
  const { setUser } = useContext(UserContext);

  const router = useRouter();
  async function retrieve(input: RequestInfo, init?: RequestInit) {
    // console.log(input);
    // check backend
    const sess = await fetchJson(`/api/auth/`, init);
    if (sess && sess.data) {
      setUser(sess.data[0]);
      return sess.data[0];
    } else {
      return user;
    }
  }
  const { data, mutate } = useSWR("user", retrieve);

  async function ii_mutate(obj?: User | null, options?: boolean | unknown) {
    if (options && obj) {
      setUser(obj);
      await mutate(obj, options);
    } else {
      await mutate(user, false);
    }
  }

  return {
    user: data,
    mutateUser: ii_mutate,
  };
}
