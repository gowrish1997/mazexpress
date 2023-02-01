import React from "react";
import Image from "next/image";
import EachNotification from "./EachNotification";
import useUser from "@/lib/useUser";
import useNotifications from "@/lib/useNotifications";
interface IProp {
  close: () => void;
  show: boolean;
}

const NotificationView = (props: IProp) => {
  const { user, mutateUser } = useUser();
  const { notifications, notificationsIsLoading } = useNotifications({
    userId: user?.id_users!,
  });

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
          {notifications
            ?.filter((el) => el.status_notifications !== "deleted")
            .map((data) => {
              return (
                <EachNotification id={data.id_notifications} data={data} key={data.id_notifications} />
              );
            })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default NotificationView;
