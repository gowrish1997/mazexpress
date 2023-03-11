import ConfigCard from "@/components/admin/notification-panel/ConfigCard";
import CreateNotificationModal from "@/components/admin/notification-panel/modal/CreateNotificationModal";
import PageHeader from "@/components/common/PageHeader";
import fetchJson from "@/lib/fetchJson";
import useNotificationSettings from "@/lib/useNotificationSettings";
import { INotificationConfig } from "@/models/notification.interface";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// let hard_data: INotificationConfig[] = [
//   {
//     title_notification_config: "Shipments Arrival Notification",
//     is_enabled_notification_config: true,
//     desc_notification_config: "Turn this on to notify the subscribed users in list when shipment has reached the Istanbul warehouse.",
//     id_notification_config: 1,
//     is_custom_notification_config: false,
//     is_reusable_notification_config: false

//   },
//   {
//     title_notification_config: "Delivered Notification",
//     is_enabled_notification_config: false,
//     desc_notification_config: "Turn this on to notify the subscribed users in list when shipment has been delivered.",
//     id_notification_config: 2,
//     is_custom_notification_config: false,
//     is_reusable_notification_config: false

//   },
//   {
//     title_notification_config: "Welcome Notifications",
//     is_enabled_notification_config: false,
//     desc_notification_config: "Turn this on to send a welcome message to all users upon account successful creation.",
//     id_notification_config: 3,
//     is_custom_notification_config: false,
//     is_reusable_notification_config: false,

//   },
// ];

const NotificationPanel = () => {

  const router=useRouter();
  const [showCreateNotificationModal, setShowCreateNotificationModal] =
    useState<boolean>(false);

  const {
    notificationSettings,
    mutateNotificationSettings,
    notificationSettingsIsLoading,
  } = useNotificationSettings();

  const { locales, locale: activeLocale } = router;

  useEffect(() => {
      console.log("use efft");
      router.push(router.asPath, router.asPath, { locale: "en" });
  }, []);

  const toggle = async (id: number) => {
    // send put to notification settings
    if (notificationSettings !== undefined) {
      let setTo = notificationSettings?.find(
        (el) => el.id_notification_config === id
      )?.is_enabled_notification_config;
      if (setTo === 1) {
        setTo = 0;
      } else {
        setTo = 1;
      }
      let facelift = [...notificationSettings];
      let match = facelift.find((el) => el.id_notification_config === id);
      console.log("match", match);
      if (match !== undefined) {
        // facelift.find(
        //   (el) => el.id_notification_config === id
        // ).is_enabled_notification_config = setTo;
        // mutateNotificationSettings(facelift, false);
        await fetchJson(`/api/notification-settings`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            setTo: setTo,
          }),
        });
        mutateNotificationSettings();
      }
    }
  };

  const toggleShowCreateNotificationModal = () => {
    setShowCreateNotificationModal((prev) => !prev);
  };

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
          notificationSettings.map((el: INotificationConfig) => {
            return (
              <ConfigCard
                data={el}
                toggle={toggle}
                key={el.id_notification_config}
              />
            );
          })}
      </div>
      <div>
        <button
          className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] mt-[25px]"
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
