import { forwardRef, RefObject, useEffect } from "react";
import EachNotification from "./EachNotification";
import fetchServer from "@/lib/fetchServer";
import useNotifications from "@/lib/hooks/useNotifications";
import Cancel from "../../public/cancel_svg.svg";
import ClickOutside from "./ClickOutside";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
interface IProp {
    close: () => void;
    show: boolean;
    trigger: RefObject<HTMLDivElement>;
    handler: () => void;
}

const NotificationView = forwardRef<HTMLDivElement, IProp>(
    (props: IProp, ref) => {
        const router = useRouter();
        const { t } = useTranslation("");
        const { locale } = router;
        const { data: session, update }: { data: any; update: any } =
            useSession();
        const { notifications, notificationsIsLoading, mutateNotifications } =
            useNotifications({
                username: session?.user?.email,
                status: ["unread"],
            });

        const deleteNotification = async (id: string) => {
            try {
                const deletedNotification = await fetchServer(
                    `/api/notifications/id/${id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        // body: JSON.stringify({
                        //     status: "deleted",
                        // }),
                    }
                );
                if (deletedNotification) {
                    mutateNotifications();
                } else {
                    console.log("delete failed");
                }
                mutateNotifications();
            } catch (error) {
                console.error(error);
            }
        };

        const clearAllNotificatons = async () => {
            try {
                for (let i = 0; i < notifications.length; i++) {
                    const deletedNotification = await fetchServer(
                        `/api/notifications/id/${notifications[i].id}`,
                        {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            // body: JSON.stringify({
                            //     status: "deleted",
                            // }),
                        }
                    );
                    if (deletedNotification) {
                        console.log("done delete");

                        mutateNotifications();
                    } else {
                        console.log("delete failed");
                    }
                }
                mutateNotifications();
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <ClickOutside trigger={props.trigger} handler={props.handler}>
                <div
                    className={`z-50 fixed ${
                        locale == "en" ? "right-0" : "left-0"
                    }  h-[100vh] overflow-y-auto  box-border  border-[1px] border-[#BBC2CF] pt-[30px] pb-[20px] px-[20px] translate-x-[0%] bg-[#FFFFFF] w-[413px]  rounded-[4px] transition-transform duration-500 space-y-[30px] `}
                    style={
                        !props.show
                            ? {
                                  transform:
                                      locale == "en"
                                          ? "translateX(100%)"
                                          : "translateX(-100%)",
                              }
                            : { transform: "translateX(0%)" }
                    }
                    ref={ref}
                >
                    <div className="flex-type3">
                        <p className="text-[#2B2B2B] text-[18px] font-[700] leading-[25px] ">
                            {t("topbar.notificationView.Content")}
                        </p>

                        <div className="h-[35px] w-[35px] rounded-[50%] hover:bg-[#EDF5F9] flex justify-center items-center  ">
                            <Cancel
                                className="cursor-pointer"
                                onClick={() => props.close()}
                            />
                        </div>
                    </div>
                    <div className="space-y-[20px]">
                        {notifications?.length > 0 ? (
                            notifications.map((data) => {
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
                        ) : (
                            <div className="text-[11px]">
                                No notifications yet...
                            </div>
                        )}
                    </div>
                    {notifications?.length > 0 ? (
                        <p
                            className="text-[#35C6F4] text-[14px] font-[500] leading-[18px] cursor-pointer"
                            onClick={clearAllNotificatons}
                        >
                            Clear all Notifications...
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </ClickOutside>
        );
    }
);
NotificationView.displayName = "NotificationView";
export default NotificationView;
