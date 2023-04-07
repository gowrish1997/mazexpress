import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const useAuthorization = () => {
  const [status, set_status] = useState<string | null>(null);
  const [is_loading, set_is_loading] = useState<boolean | null>(true);
  const router = useRouter();

  useEffect(() => {
    const first = document.cookie;
    if (first) {
      const authorization = first
        .split("; ")
        .map((pair) => {
          const sides = pair.split("=");
          const key = sides[0];
          const val = sides[1];
          return { key, val };
        })
        .find((cooki) => cooki.key === "is_admin").val;
      console.log(authorization);
      set_is_loading(false);
      set_status(authorization);
    }

    // set_is_loading(true);
    // set_status(first);
    // set_is_loading(false);
  }, [router.pathname]);
  return { status, is_loading };
};

export default useAuthorization;
