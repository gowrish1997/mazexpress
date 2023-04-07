//==========================
//     written by: raunak
//==========================

import { useContext, useEffect, useState } from "react";
import { createToast } from "../toasts";
import { useRouter } from "next/router";

// 
import fetchSelf from "../fetchSelf";
import useScript from "./useScript";
import UserContext from "@/components/context/user.context";
import jwt from "jsonwebtoken";
import useUser from "./useUser";



interface IProps {}

export default function useGoogle({}: IProps) {
  const router = useRouter();
  const gsiStatus = useScript({
    src: "https://accounts.google.com/gsi/client",
  });

  const [googleStatus, setGoogleStatus] = useState<any>();
  const user = useContext(UserContext)["user"];
  const { setUser } = useContext(UserContext);
  const { user: sessUser, mutateUser } = useUser();

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
      fetchSelf(`/api/auth/callback/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload }),
      })
        .then(async (response) => {
          console.log(response)
          if (response.ok) {
            // set context to use this user

            setUser(response.data[0]);
            await mutateUser(response.data[0], false);
            // create toast
            createToast({
              type: "success",
              message: "you are now logged in",
              title: "login success",
              timeOut: 1000,
            });
            setTimeout(() => {
              if (response.data[0].is_admin === true) {
                router.push("/admin");
              } else {
                router.push("/");
              }
            }, 1000);
          }
        })
        .catch((err) => {
          if (err) throw err;
          console.log("cred err", err);
          createToast({
            type: "error",
            message: "some error",
            title: "login failed",
            timeOut: 1000,
          });
        });
      // console.log("cred result", credResult);
    } else {
      // console.log(payload);
      createToast({
        type: "error",
        message: "invalid credentials",
        title: "login failed",
        timeOut: 1000,
      });
    }
  }

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

  return { status: googleStatus };
}
