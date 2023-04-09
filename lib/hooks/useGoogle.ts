//==========================
//     written by: raunak
//==========================

import { useContext, useEffect, useState } from "react";
import { createToast } from "../toasts";
import { useRouter } from "next/router";
import useScript from "./useScript";
import jwt from "jsonwebtoken";
import AuthCTX from "@/components/context/auth.ctx";
import fetchJson from "../fetchServer";
import { AuthManager, IWhiteListedUser } from "@/controllers/auth-ctr";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import { AxiosResponse } from "axios";

interface IProps {}

export default function useGoogle({}: IProps) {
  const router = useRouter();
  const gsiStatus = useScript({
    src: "https://accounts.google.com/gsi/client",
  });

  const [googleStatus, setGoogleStatus] = useState<any>();

  const user = useContext(AuthCTX)["active_user"];
  const { set_active_user } = useContext(AuthCTX);
  const jet: AuthManager = useContext(AuthCTX)["jet"];
  // const { user: sessUser, mutateUser } = useUser();

  async function handleCredentialResponse(
    response: google.accounts.id.CredentialResponse
  ) {
    // console.log(response.credential)
    const payload = jwt.decode(response.credential, {
      json: true,
    });
    if (payload) {
      // console.log(typeof payload);
      console.log(payload);

      // set up user from payload
      // forward payload to backend
      await fetchJson(`/api/auth/provider/google`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      })
        .then(async (response: AxiosResponse<APIResponse<User>>) => {
          console.log(response.data);

          // login
          jet.google_login(response.data[0], async (err, user) => {
            if (err) {
              console.error(err);
              createToast({
                type: "error",
                message: "unknown error",
                title: "login failed",
                timeOut: 1000,
              });
              return;
            }
            if (user) {
              if ((user as IWhiteListedUser).is_admin) {
                router.push("/admin");
                set_active_user(user as IWhiteListedUser);
              } else {
                router.push("/orders");
                set_active_user(user as IWhiteListedUser);
              }
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      createToast({
        type: "error",
        message: "invalid credentials",
        title: "login failed",
        timeOut: 1000,
      });
    }
  }

  const call_prompt = () => {
    google.accounts.id.prompt();
  };

  // initialize google client id
  useEffect(() => {
    if (gsiStatus === "ready") {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
        callback: handleCredentialResponse,
      });
      setGoogleStatus("initialized");
    }

    return () => {
      setGoogleStatus("closed");
    };
  }, [gsiStatus]);

  return { status: googleStatus, resolver: call_prompt };
}
