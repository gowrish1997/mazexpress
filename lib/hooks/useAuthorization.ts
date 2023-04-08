import AuthCTX from "@/components/context/auth.ctx";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const useAuthorization = () => {
  const [status, set_status] = useState<string | null>(null);
  const active_user = useContext(AuthCTX)["active_user"];
  const [is_loading, set_is_loading] = useState<boolean | null>(true);
  const router = useRouter();

  useEffect(() => {
    const first = document.cookie;
    console.log("from useAuth", document.cookie)
    if (first) {
      // if any cookie is set
      const authorization = first
        .split("; ")
        .map((pair) => {
          const sides = pair.split("=");
          const key = sides[0];
          const val = sides[1];
          return { key, val };
        })
        .find((cooki) => cooki.key === "is_admin");
      if (!authorization) {
        // return no rights
        set_is_loading(false);
        set_status(null);
      } else {
        set_is_loading(false);

        console.log(authorization);
        if (authorization.val === "true") {
          set_status("admin");
        } else {
          set_status("user");
        }
      }
    }

    // set_is_loading(true);
    // set_status(first);
    // set_is_loading(false);
  }, [router.pathname, active_user]);
  return { status, is_loading };
};

export default useAuthorization;
