import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  let queryString = "/api/users";
  if (session?.user.email) {
    queryString += `?email=${session.user.email}`;
  }
  const {
    data: user,
    mutate: mutateUser,
    isLoading: userIsLoading,
  } = useSWR<any>(queryString, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    // console.log(session);
    if (user && session) {
      if (user.is_admin === 1) {
        if (redirectIfFound && !router.pathname.startsWith("/admin")) {
          router.push("/admin");
        }
      }
      if (user.is_admin === 0) {
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

  return { user, mutateUser, userIsLoading };
}
