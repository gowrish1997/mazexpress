import React, { useEffect, useState } from "react";
import Image from "next/image";
import EachNotification from "./EachNotification";
import useUser from "@/lib/useUser";
import useNotifications from "@/lib/useNotifications";
import { INotification } from "@/models/notification.interface";
import axios from "axios";
interface IProp {
  close: () => void;
  show: boolean;
}

const NotificationView = (props: IProp) => {
  const { user, mutateUser } = useUser();
  const { notifications, notificationsIsLoading, mutateNotifications } =
    useNotifications({
      userId: user?.id_users!,
    });

  const [userNotifications, setUserNotifications] = useState<INotification[]>();

  const deleteNotification = (id: number) => {
    // console.log("delete");
    setUserNotifications((prev) => {
      if (prev !== undefined) {
        let newObjs: INotification[] = prev.filter(
          (el) => el.id_notifications !== id
        );

        // console.log(newObjs);
        return newObjs;
      }
    });
    // update db
    // axios.put(`/api/notifications?id=${id}`, {
    //   status_notifications: "deleted",
    // });
  };

  useEffect(() => {
    if (notifications !== undefined) {
      setUserNotifications(notifications);
    }
  }, [notificationsIsLoading, notifications]);

  useEffect(() => {
    console.log(userNotifications);
  },[ userNotifications]);

  return (
    <>
      <div
        className="z-50 fixed right-0  h-[100vh] overflow-y-auto  box-border  border-[1px] border-[#BBC2CF] pt-[30px] pb-[20px] px-[20px] translate-x-[0%] bg-[#FFFFFF] w-[413px]  rounded-[4px] transition-transform duration-500 space-y-[30px] "
        style={
          !props.show
            ? { transform: "translateX(100%)" }
            : { transform: "translateX(0%)" }
        }
      >
        {/* <div className=" overflow-x-hidden pt-[30px] pb-[20px] px-[20px]"> */}
        <div className="flex-type3">
          <p className="text-[#2B2B2B] text-[18px] font-[700] leading-[25px] ">
            Notifications
          </p>
          <Image
            src="/cancel.png"
            height={22}
            width={22}
            alt="cancel"
            className="cursor-pointer"
            onClick={() => props.close()}
          />
        </div>
        <div className="space-y-[20px]">
          {userNotifications
            // ?.filter((el) => el.status_notifications !== "deleted")
            ?.map((data) => {
              return (
                <EachNotification
                  id={data.id_notifications}
                  data={data}
                  key={data.id_notifications}
                  delete={deleteNotification}
                />
              );
            })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default NotificationView;
