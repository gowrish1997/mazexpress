import ConfigCard from "@/components/admin/notification-panel/ConfigCard";
import CreateNotificationModal from "@/components/admin/notification-panel/modal/CreateNotificationModal";
import PageHeader from "@/components/common/PageHeader";
import fetchServer from "@/lib/fetchServer";
import useNotificationSettings from "@/lib/hooks/useNotificationSettings";
import { NotificationConfig } from "@/models/notification-config.model";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

const NotificationPanel = () => {
    const router = useRouter();
    const [showCreateNotificationModal, setShowCreateNotificationModal] =
        useState<boolean>(false);

    const {
        notificationSettings,
        mutateNotificationSettings,
        notificationSettingsIsLoading,
    } = useNotificationSettings();

    const { locales, locale: activeLocale } = router;

    useEffect(() => {
        // console.log("use efft");
        router.push(router.asPath, router.asPath, { locale: "en" });
    }, []);

    const toggle = async (id: string) => {
        // send put to notification settings
        if (notificationSettings !== undefined) {
            let setTo = notificationSettings?.find(
                (el) => el.id === id
            )?.is_enabled;
            if (setTo) {
                setTo = false;
            } else {
                setTo = true;
            }
            let facelift = [...notificationSettings];
            let match = facelift.find((el: NotificationConfig) => el.id === id);
            // console.log("match", match);
            if (match !== undefined) {
                // facelift.find(
                //   (el) => el.id_notification_config === id
                // ).is_enabled_notification_config = setTo;
                // mutateNotificationSettings(facelift, false);
                await fetchServer(`/api/notification-settings/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        is_enabled: setTo,
                    }),
                });
                await mutateNotificationSettings();
            }
        }
    };

    const toggleShowCreateNotificationModal = () => {
        setShowCreateNotificationModal((prev) => !prev);
    };

    useEffect(() => {
        // console.log(notificationSettings);
    }, [notificationSettings]);

    if (notificationSettingsIsLoading) {
        return <div>Loading</div>;
    }

    return (
        <>
            <PageHeader
                content="Notification Panel"
                title="Notification Panel | MazExpress Admin"
            />
            <div className="grid grid-cols-3 gap-3 py-5">
                {notificationSettings &&
                    notificationSettings.length > 0 &&
                    notificationSettings.map((el: NotificationConfig) => {
                        return (
                            <ConfigCard data={el} toggle={toggle} key={el.id} />
                        );
                    })}
            </div>
            <div>
                <button
                    className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] mt-[25px]"
                    onClick={toggleShowCreateNotificationModal}
                >
                    Create notification
                </button>
            </div>
            <CreateNotificationModal
                show={showCreateNotificationModal}
                close={toggleShowCreateNotificationModal}
                // update={() => new Promise((resolve, reject) => {})}
            />
        </>
    );
};

export default NotificationPanel;

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
