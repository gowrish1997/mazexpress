import React, { useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUserCircle, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import useUser from "@/lib/useUser";
import useNotifications from "@/lib/useNotifications";
import { INotification } from "@/models/notification.interface";
import NotificationView from "@/common/NotificationView";
const Topbar = () => {
    const { user, mutateUser } = useUser();
    const { notifications, notificationsIsLoading } = useNotifications({
        userId: user?.id_users!,
    });
    console.log(notifications);

    console.log(notifications);

    const [showNotificatin, setShowNotification] = useState(false);

    const toggleNotificationHandler = () => {
        setShowNotification((prev) => !prev);
    };

    return (
        <>
            <div className="flex w-full min-h-[60px] pb-[30px] items-center justify-between">
                <div className="w-4/5 h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] p-[5px] pl-[15px] relative">
                    <input className="w-full h-full bg-transparent focus:outline-none searchbar" id="searchbar" type="text" placeholder="Search with MAZ ID" />
                    <div className="absolute w-[16px] h-[16px] right-[10px] top-[15px] cursor-pointer ">
                        <Image src="/search.png" layout="fill" objectFit="contain" alt="search" />
                    </div>
                </div>
                <div className="flex min-h-[65px] items-center justify-end" onClick={toggleNotificationHandler}>
                    <span className="relative top-0.5 mr-5">
                        {notifications && notifications.length > 0 && <span className="rounded-full block top-0 h-[7px] w-[7px] -right-[1px] bg-orange-600 absolute"></span>}
                        <Image src={"/bell.png"} height={16} width={17} alt="notification" />
                    </span>

                    {user && user.avatar_url_users ? (
                        <Image src={user.avatar_url_users} className="rounded-full" width={31} height={30} alt="profileImage" />
                    ) : (
                        <FontAwesomeIcon icon={faUser} />
                    )}
                    <p className="font-[500] text-[#525D72] text-[14px] leading-[19px] mx-2">
                        {user?.first_name_users} {user?.last_name_users}
                    </p>
                    <FontAwesomeIcon icon={faAngleDown} size="xs" />
                </div>
            </div>
            <NotificationView show={showNotificatin} close={toggleNotificationHandler} />
        </>
    );
};

export default Topbar;
