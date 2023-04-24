import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const UserPageWrapper = (props) => {
    const router = useRouter();
    const { data: session, update }: { data: any; update: any } = useSession();

    useEffect(() => {
        if (session) {
            if (
                (router.locale == "en" ? "english" : "arabic") !=
                (session?.user as any).lang
            ) {
                console.log('inside if confroin')
                console.log(router.pathname)
                router.push(
                    (session?.user as any).lang === "english"
                        ? `/en${router.pathname}`
                        : `/ar${router.pathname}`
                );
            }
            if ((session?.user as any).is_admin) {
                router.push(`/`);
            }
        }
        if (!session) {
            router.push(`/auth/gate?mode=1`);
        }
    }, [session]);
    return <>{props.children}</>;
};

export default UserPageWrapper;
