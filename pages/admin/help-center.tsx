import React, { useEffect, useState } from "react";
import HelpCenterView from "@/components/admin/help-center/modal/HelpCenterView";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useHelpCenter from "@/lib/hooks/useHelpCenter";
import LoadingPage from "@/components/common/LoadingPage";
import AddNewHelpCenterModal from "@/components/admin/help-center/AddNewHelpCenterModal";

const HelpCenter = () => {
    const {
        helpCenters,
        mutateHelpCenter,
        helpCenterIsLoading,
        helpCenterError,
    } = useHelpCenter();

    const [showAddNewHelpCenterModal, setShowAddNewAddressModal] =
        useState(false);
    const toggleAddNewHelpCenterModal = () => {
        setShowAddNewAddressModal((prev) => !prev);
    };

    if (helpCenterIsLoading) {
        return <LoadingPage />;
    }
    return (
        <>
            <div>
                {helpCenters?.data.length > 0 && (
                    <HelpCenterView
                        data={helpCenters?.data}
                        mutateHelpCenter={mutateHelpCenter}
                    />
                )}
                <button
                    className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] mt-[25px]"
                    onClick={toggleAddNewHelpCenterModal}
                >
                    + Add new
                </button>
            </div>
            {showAddNewHelpCenterModal && (
                <AddNewHelpCenterModal
                    close={toggleAddNewHelpCenterModal}
                    mutateHelpCenter={mutateHelpCenter}
                />
            )}
        </>
    );
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
