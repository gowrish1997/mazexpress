import React, { forwardRef, RefObject, useEffect, useState } from "react";
import EachNotification from "./EachNotification";
import useUser from "@/lib/hooks/useUser";
import useNotifications from "@/lib/hooks/useNotifications";
import ClickOutside from "./ClickOutside";
import Cancel from "../../public/cancel_svg.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Notification } from "@/models/notification.model";
import { User } from "@/models/user.model";

interface IProp {
    close: () => void;
    show: boolean;
    trigger: RefObject<HTMLDivElement>;
    handler: () => void;
}

const NotificationView = forwardRef<HTMLDivElement, IProp>((props: IProp, ref) => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;
    const { user, mutateUser } = useUser();
    const { notifications, notificationsIsLoading, mutateNotifications } = useNotifications({
        user_id: user?.id!,
    });

    const [userNotifications, setUserNotifications] = useState<Notification[]>();

    const deleteNotification = (id: string) => {
        // console.log("delete");
        setUserNotifications((prev) => {
            if (prev !== undefined) {
                let newObjs: Notification[] = prev.filter((el) => el.id !== id);

                // console.log(newObjs);
                return newObjs;
            }
        });
        // update db
        // axios.put(`/api/notifications?id=${id}`, {
        //   status: "deleted",
        // });
    };

    useEffect(() => {
        if (notifications !== undefined) {
            setUserNotifications(notifications);
        }
    }, [notificationsIsLoading, notifications]);

    useEffect(() => {
        console.log(userNotifications);
    }, [userNotifications]);

    return (
        <ClickOutside trigger={props.trigger} handler={props.handler}>
            <div
                className={`z-50 fixed ${
                    locale == "en" ? "right-0" : "left-0"
                }  h-[100vh] overflow-y-auto  box-border  border-[1px] border-[#BBC2CF] pt-[30px] pb-[20px] px-[20px] translate-x-[0%] bg-[#FFFFFF] w-[413px]  rounded-[4px] transition-transform duration-500 space-y-[30px] `}
                style={!props.show ? { transform: locale == "en" ? "translateX(100%)" : "translateX(-100%)" } : { transform: "translateX(0%)" }}
                ref={ref}
            >
                {/* <div className=" overflow-x-hidden pt-[30px] pb-[20px] px-[20px]"> */}
                <div className="flex-type3">
                    <p className="text-[#2B2B2B] text-[18px] font-[700] leading-[25px] ">{t("topbar.notificationView.Content")}</p>
                    {/* <Image
              src="/cancel.png"
              height={22}
              width={22}
              alt="cancel"
              className="cursor-pointer"
              onClick={() => props.close()}
            /> */}
                    <div className="h-[35px] w-[35px] rounded-[50%] hover:bg-[#EDF5F9] flex justify-center items-center  ">
                        <Cancel className="cursor-pointer" onClick={() => props.close()} />
                    </div>
                </div>
                <div className="space-y-[20px]">
                    {userNotifications

                        // ?.sort((a,b) => b.created_on - a)
                        // sort in backend

                        ?.map((data) => {
                            return <EachNotification id={data.id!} data={data} key={data.id} delete={deleteNotification} />;
                        })}
                </div>
            </div>
        </ClickOutside>
    );
});
NotificationView.displayName = "NotificationView";
export default NotificationView;
