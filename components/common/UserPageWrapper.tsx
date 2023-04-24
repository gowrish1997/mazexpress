import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const UserPageWrapper = (props) => {
    const router = useRouter();
    const { data: session, update }: { data: any; update: any } = useSession();

    useEffect(() => {
        // const { pathname } = ctx.req.url;
        if (!session) {
            router.push(`/auth/gate?mode=1`);
        }
        if (session) {
            if (
                (router.locale == "en" ? "english" : "arabic") !=
                (session?.user as any).lang
            ) {
                router.push(
                    (session?.user as any).lang === "english"
                        ? `${router.pathname}`
                        : `/ar${router.pathname}`
                );
            }
            if ((session?.user as any).is_admin) {
                router.push(`/`);
            }
        }
    }, []);
    return <>{props.children}</>;
};

export default UserPageWrapper;
