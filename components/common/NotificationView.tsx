import React, { forwardRef, RefObject, useEffect, useState } from "react";
import EachNotification from "./EachNotification";
import useUser from "@/lib/hooks/useUser";
import useNotifications from "@/lib/hooks/useNotifications";
import ClickOutside from "./ClickOutside";
import Cancel from "../../public/cancel_svg.svg";
import { Notification } from "@/models/notification.model";
import { User } from "@/models/user.model";
import fetchServer from "@/lib/fetchServer";
import Image from "next/image";

interface IProp {
  close: () => void;
  show: boolean;
  trigger: RefObject<HTMLDivElement>;
  handler: () => void;
}

const NotificationView = forwardRef<HTMLDivElement, IProp>(
  (props: IProp, ref) => {
    const { user, mutateUser } = useUser();
    const { notifications, notificationsIsLoading, mutateNotifications } =
      useNotifications({
        user_id: user?.id,
        status: ["unread", "read"],
      });

    // const [userNotifications, setUserNotifications] =
    //   useState<Notification[]>();

    const deleteNotification = async (id: string) => {
      const deletedNotification = await fetchServer(
        `/api/notifications?id=${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "deleted",
          }),
        }
      );
      if (deletedNotification) {
        console.log("done delete");
        mutateNotifications();
      } else {
        console.log("delete failed");
      }
    };

    return (
      <ClickOutside trigger={props.trigger} handler={props.handler}>
        <div
          className="z-50 fixed right-0  h-[100vh] overflow-y-auto  box-border  border-[1px] border-[#BBC2CF] pt-[30px] pb-[20px] px-[20px] translate-x-[0%] bg-[#FFFFFF] w-[413px]  rounded-[4px] transition-transform duration-500 space-y-[30px] "
          style={
            !props.show
              ? { transform: "translateX(100%)" }
              : { transform: "translateX(0%)" }
          }
          ref={ref}
        >
          {/* <div className=" overflow-x-hidden pt-[30px] pb-[20px] px-[20px]"> */}
          <div className="flex-type3">
            <p className="text-[#2B2B2B] text-[18px] font-[700] leading-[25px] ">
              Notifications
            </p>

            <div className="h-[35px] w-[35px] rounded-[50%] hover:bg-[#EDF5F9] flex justify-center items-center  ">
              <Cancel
                className="cursor-pointer"
                onClick={() => props.close()}
              />
            </div>
          </div>
          <div className="space-y-[20px]">
            {
              notifications ? 
              notifications?.map((data) => {
                return (
                  <EachNotification
                    id={data.id!}
                    data={data}
                    key={data.id}
                    delete={deleteNotification}
                    update={mutateNotifications}
                  />
                );
              })
              :
              <div className="text-[11px]">No notifications yet...</div>
            }

          </div>
        </div>
      </ClickOutside>
    );
  }
);
NotificationView.displayName = "NotificationView";
export default NotificationView;
