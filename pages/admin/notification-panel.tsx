import ConfigCard from "@/components/admin/notification-panel/ConfigCard";
import CreateNotificationModal from "@/components/admin/notification-panel/modal/CreateNotificationModal";
import PageHeader from "@/components/common/PageHeader";
import { INotificationConfig } from "@/models/notification.interface";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

let hard_data: INotificationConfig[] = [
  {
    title: "Shipments Arrival Notification",
    is_enabled: true,
    desc: "Turn this on to notify the subscribed users in list when shipment has reached the Istanbul warehouse.",
    id: nanoid(),
  },
  {
    title: "Delivered Notification",
    is_enabled: false,
    desc: "Turn this on to notify the subscribed users in list when shipment has been delivered.",
    id: nanoid(),
  },
  {
    title: "Welcome Notifications",
    is_enabled: false,
    desc: "Turn this on to send a welcome message to all users upon account successful creation.",
    id: nanoid(),
  },
];

const NotificationPanel = () => {
  const [data, setData] = useState<INotificationConfig[]>(hard_data);
  const [showCreateNotificationModal, setShowCreateNotificationModal] =
    useState<boolean>(false);

  const toggle = (id: string) => {
    // console.log("called");
    let newData = [...data];
    let checked = newData.find((el) => el.id === id)!.is_enabled;
    if (checked) {
      newData.find((el) => el.id === id)!.is_enabled = false;
    } else {
      newData.find((el) => el.id === id)!.is_enabled = true;
    }

    setData(newData);
  };

  const toggleShowCreateNotificationModal = () => {
    setShowCreateNotificationModal((prev) => !prev);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <PageHeader
        content="Notification Panel"
        title="Notification Panel | MazExpress Admin"
      />
      <div className="grid grid-cols-3 gap-3 py-5">
        {data.map((el) => {
          return <ConfigCard data={el} toggle={toggle} key={el.id} />;
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
      <CreateNotificationModal show={showCreateNotificationModal} close={toggleShowCreateNotificationModal} update={()=>new Promise((resolve, reject)=>{})} />
    </>
  );
};

export default NotificationPanel;
