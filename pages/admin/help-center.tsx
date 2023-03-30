import React, { useEffect, useState } from "react";
import HelpCenterView from "@/components/admin/help-center/modal/HelpCenterView";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const HelpCenter = () => {
    return <HelpCenterView />;
};

export default HelpCenter;
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
