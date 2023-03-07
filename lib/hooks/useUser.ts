import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/entity/User";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const router = useRouter();
  const { data: session, status } = useSession();


  const { data: user, mutate: mutateUser } =
    useSWR<APIResponse<User>>(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/users?email=${session?.user?.email}`);

  useEffect(() => {
    // console.log(session);
    if ( session && session.user ) {
      if (session.user.is_admin) {
        if (redirectIfFound && !router.pathname.startsWith("/admin")) {
          router.push("/admin");
        }
      }
      if (session.user.is_admin) {
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
