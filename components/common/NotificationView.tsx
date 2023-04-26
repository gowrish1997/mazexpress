import { forwardRef, RefObject, useEffect, useState } from "react";
import EachNotification from "./EachNotification";
import fetchServer from "@/lib/fetchServer";
import useNotifications from "@/lib/hooks/useNotifications";
import Cancel from "../../public/cancel_svg.svg";
import ClickOutside from "./ClickOutside";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Notification } from "@/models/notification.model";
import NotificatoinDetailModal from "../admin/modal/NotificatoinDetailModal";
import fetchJson from "@/lib/fetchServer";
import { createToast } from "@/lib/toasts";

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
        const per_page = 5;
        const [page, setPage] = useState(1);
        // const { notifications, notificationsIsLoading, mutateNotifications } =
        //     useNotifications({
        //         username: session?.user?.email,
        //         status: ["unread"],
        //         per_page: per_page,
        //         page: page,
        //     });
        const [showLoadMore, setShowLoadMore] = useState(true);
        const [selectedNotification, setSelectedNotification] =
            useState<string>();
        const [showNotificationDetailModal, setShowNotificationDetailModal] =
            useState(false);

        const [userNotification, setUserNotifications] =
            useState<Notification[]>();

        useEffect(() => {
            const getAllNotificatoin = async () => {
                const response = await fetchJson(
                    `/api/notifications?username=${session?.user?.email}&per_page=${per_page}&page=${page}`
                );

                setUserNotifications((data) => {
                    return [
                        ...(data ? (data as Notification[]) : []),
                        ...(response?.data
                            ? (response?.data as Notification[])
                            : []),
                    ];
                });
                if (response.data?.length == 0) {
                    setShowLoadMore(false);
                }
            };
            getAllNotificatoin();
        }, []);

        const loadMoreNotificationHandler = async () => {
            setPage((data) => data + 1);

            const response = await fetchJson(
                `/api/notifications?username=${
                    session?.user?.email
                }&per_page=${per_page}&page=${page + 1}`
            );
            if (!response?.count) {
                createToast({
                    type: "success",
                    message:
                        router.locale == "en"
                            ? "No more notifications to load"
                            : "لا مزيد من الإخطارات للتحميل",
                    title: router.locale == "en" ? "Success" : "نجاح",
                    timeOut: 1000,
                });
                setShowLoadMore(false);
            }
            setUserNotifications((data) => [
                ...(data ? data : []),
                ...(response?.data ? response?.data : []),
            ]);
        };

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
                const filteredNotification = userNotification.filter((data) => {
                    return data.id != id;
                });
                setUserNotifications(filteredNotification);
            } catch (error) {
                console.error(error);
            }
        };

        const clearAllNotificatons = async () => {
            try {
                const deletedNotification = await fetchServer(
                    `/api/notifications/${session?.user?.email}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        // body: JSON.stringify({
                        //     status: "deleted",
                        // }),
                    }
                );
                setUserNotifications([]);
                setShowLoadMore(false);
            } catch (error) {
                console.error(error);
            }
        };

        const toggleNotificationDetailModal = (id?: string) => {
            setSelectedNotification(id as string);
            setShowNotificationDetailModal((prev) => !prev);
        };
        return (
            <>
                <ClickOutside trigger={props.trigger} handler={props.handler}>
                    <div
                        className={`z-40 fixed ${
                            locale == "en" ? "right-0" : "left-0"
                        }  h-[100vh] overflow-y-auto  box-border  border-[1px] border-[#BBC2CF] pt-[30px] pb-[20px] px-[20px] translate-x-[0%] bg-[#FFFFFF] w-[413px]  rounded-[4px] transition ease-in-out duration-150 space-y-[30px] `}
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
                            {userNotification?.length > 0 ? (
                                userNotification?.map((data) => {
                                    return (
                                        <EachNotification
                                            id={data.id!}
                                            data={data}
                                            key={data.id}
                                            delete={deleteNotification}
                                            onClick={
                                                toggleNotificationDetailModal
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <div className="text-[11px]">
                                    {router.locale == "en"
                                        ? "No notifications yet..."
                                        : "لا توجد إشعارات حتى الآن ..."}
                                </div>
                            )}
                        </div>
                        <div className="w-full flex flex-row justify-between items-center ">
                            {showLoadMore ? (
                                <p
                                    className="text-[#35C6F4] text-[14px] font-[500] leading-[18px] cursor-pointer"
                                    onClick={loadMoreNotificationHandler}
                                >
                                    {router.locale == "en"
                                        ? " load more..."
                                        : "تحميل المزيد"}
                                </p>
                            ) : (
                                ""
                            )}

                            {userNotification?.length > 0 ? (
                                <p
                                    className="text-[#35C6F4] text-[14px] font-[500] leading-[18px] cursor-pointer"
                                    onClick={clearAllNotificatons}
                                >
                                    {router.locale == "en"
                                        ? "Clear all Notifications..."
                                        : "مسح كافة الإخطارات ..."}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </ClickOutside>
                {showNotificationDetailModal && (
                    <NotificatoinDetailModal
                        data={(userNotification as Notification[])?.find(
                            (data) => data.id == selectedNotification
                        )}
                        close={toggleNotificationDetailModal}
                    />
                )}
            </>
        );
    }
);
NotificationView.displayName = "NotificationView";
export default NotificationView;
