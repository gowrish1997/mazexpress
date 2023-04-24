import { getSession } from "@/lib/selectOrder";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const UserPageWrapper = (props) => {
    const router = useRouter();
    const { data: session, update }: { data: any; update: any } = useSession();

    // useEffect(() => {
    //     // if (session) {
    //     //     if (
    //     //         (router.locale == "en" ? "english" : "arabic") !=
    //     //         (session?.user as any).lang
    //     //     ) {
    //     if ((session?.user as any).lang === "english") {
    //         router.push(router.asPath, router.asPath, { locale: "en" });
    //     } else {
    //         router.push(router.asPath, router.asPath, { locale: "ar" });
    //     }
    //     //     }
    //     //     if ((session?.user as any).is_admin) {
    //     //         router.push(`/`);
    //     //     }
    //     // } else {
    //     //     router.push(`/auth/gate?mode=1`);
    //     // }
    // }, []);
    return <>{props.children}</>;
};

export default UserPageWrapper;
