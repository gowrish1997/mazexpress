import AuthCTX from "@/components/context/auth.ctx";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const useAuthorization = () => {
  const [status, set_status] = useState<string | null>(null);
  const active_user = useContext(AuthCTX)["active_user"];
  const [is_loading, set_is_loading] = useState<boolean | null>(true);
  const router = useRouter();

  useEffect(() => {
    const first = localStorage.getItem("is_admin");
    // console.log("from useAuth", first);
    if (first) {
      const authorization = first;
      if (authorization == undefined || authorization == null) {
        // return no rights
        set_is_loading(false);
        set_status(null);
      } else {
        set_is_loading(false);
        if (authorization === "true") {
          set_status("admin");
        } else {
          set_status("user");
        }
      }
    } else {
      // redirect to gate
      router.push("/auth/gate");
    }
  }, [router.pathname, active_user]);
  return { status, is_loading };
};

export default useAuthorization;
