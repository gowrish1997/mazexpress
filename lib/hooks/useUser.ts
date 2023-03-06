import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { APIResponse } from "@/models/api.model";
import { UserEntity } from "../adapter/entities/UserEntity";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const user = session?.user;

  const { data: warehouses, mutate: mutateWarehouses } =
    useSWR<APIResponse<UserEntity>>(`/api/users?email=${user?.email}`);

  useEffect(() => {
    // console.log(session);
    if (user && session) {
      if (session.is_admin) {
        if (redirectIfFound && !router.pathname.startsWith("/admin")) {
          router.push("/admin");
        }
      }
      if (session.is_admin) {
        if (
          redirectIfFound &&
          (router.pathname.startsWith("/admin") ||
            router.pathname.startsWith("/auth"))
        ) {
          router.push("/");
        }
      }
    }
  }, [redirectIfFound, router, user]);

  return { user, status };
}
