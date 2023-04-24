import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AdminPageWrapper = (props) => {
    const router = useRouter();
    const { data: session, update }: { data: any; update: any } = useSession();

    useEffect(() => {
        // const { pathname } = ctx.req.url;

        if (!session) {
            router.push(`/auth/gate?mode=1`);
        }
        if (session) {
            if (router.locale == "ar" && (session?.user as any).is_admin) {
                router.push(router.asPath, router.asPath, { locale: "en" });
            }
            if (!(session?.user as any).is_admin) {
                router.push(`/`);
            }
        }
    }, []);
    return <>{props.children}</>;
};

export default AdminPageWrapper;
