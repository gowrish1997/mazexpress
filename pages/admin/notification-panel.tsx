import ConfigCard from "@/components/admin/notification-panel/ConfigCard";
import PageHeader from "@/components/common/PageHeader";
import { INotificationConfig } from "@/models/notification.interface";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

let hard_data: INotificationConfig[] = [
  {
    title: "Shipments Arrival Notification",
    is_enabled: true,
    desc: "Here is a link to some fake information that contains crucial information, link to some fake information that contains crucial information",
    id: nanoid(),
  },
  {
    title: "Delivered Notification",
    is_enabled: false,
    desc: "Here is a link to some fake information that contains crucial information, link to some fake information that contains crucial information",
    id: nanoid(),
  },
  {
    title: "Welcome Notifications",
    is_enabled: false,
    desc: "Here is a link to some fake information that contains crucial information, link to some fake information that contains crucial information",
    id: nanoid(),
  },
];

const NotificationPanel = () => {
  const [data, setData] = useState<INotificationConfig[]>(hard_data);

  const toggle = (id: string) => {
    console.log("called");
    let newData = [...data];
    let checked = newData.find((el) => el.id === id)!.is_enabled;
    if (checked) {
      newData.find((el) => el.id === id)!.is_enabled = false;
    } else {
      newData.find((el) => el.id === id)!.is_enabled = true;
    }

    setData(newData);
  };

  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
    <>
      <PageHeader
        content="Notification Panel"
        title="Notification Panel | MazExpress Admin"
      />
      <div className="grid grid-cols-3 gap-3 py-5">
        {data.map((el) => {
          return <ConfigCard data={el} toggle={toggle} />;
        })}
      </div>
      {/* <EditHelpModal
        show={showEditHelpModal}
        close={toggleEditHelpModal}
        update={() => new Promise((resolve, reject) => {})}
      /> */}
    </>
  );
};

export default NotificationPanel;
