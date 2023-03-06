import Head from "next/head";
import React, { useEffect, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LogInView from "@/components/auth/LogInView";
import ResetPasswordView from "@/components/auth/ResetPasswordView";
import SignUpView from "@/components/auth/SignUpView";
import useUser from "@/lib/useUser";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Gate = () => {
    const [mode, setMode] = useState<number>(1);

    const { user, mutateUser, userIsLoading } = useUser();
    function toggleMode(i: number) {
        setMode(i);
    }

    return (
        <div>
            <Head>
                <title>Sign in | Register</title>
            </Head>
            <AuthLayout>
                {mode === 0 && <SignUpView switch={toggleMode} />}
                {mode === 1 && <LogInView switch={toggleMode} />}
                {mode === 2 && <ResetPasswordView switch={toggleMode} />}
            </AuthLayout>
        </div>
    );
};

export default Gate;

export async function getStaticProps({ locale }: { locale: any }) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
