import ConfigCard from "@/components/admin/notification-panel/ConfigCard";
import CreateNotificationModal from "@/components/admin/notification-panel/modal/CreateNotificationModal";
import PageHeader from "@/components/common/PageHeader";
import fetchJson from "@/lib/fetchServer";
import useNotificationSettings from "@/lib/hooks/useNotificationSettings";
import { NotificationConfig } from "@/models/entity/NotificationConfig";
import React, { useState } from "react";

const NotificationPanel = () => {
  const [showCreateNotificationModal, setShowCreateNotificationModal] =
    useState<boolean>(false);

  const {
    notificationSettings,
    mutateNotificationSettings,
    notificationSettingsIsLoading,
  } = useNotificationSettings();

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
      let match = facelift.find((el) => el.id === id);
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
          notificationSettings.map((el: NotificationConfig) => {
            return (
              <ConfigCard
                data={el}
                toggle={toggle}
                key={el.id}
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
