import React, { useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faUserCircle,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useUser from "@/lib/useUser";
import useNotifications from "@/lib/useNotifications";
import { INotification } from "@/models/notification.interface";
import NotificationView from "@/common/NotificationView";
const Topbar = () => {

  const { user, mutateUser } = useUser();
  const { notifications, notificationsIsLoading } = useNotifications({
    userId: user?.id_users!,
  });
  const [showNotification,setShowNotification]=useState(false)

  const togglingNotificationHandler=()=>{
      setShowNotification((prev)=>!prev)
  }

  return (
    <>
    <div className="flex w-full min-h-[60px] py-5 items-center justify-between">
      <div className="flex-1 h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] p-[5px] pl-[15px] relative">
        <input
          className="h-full mr-5 bg-transparent focus:outline-none searchbar"
          id="searchbar"
          type="text"
          placeholder="Search with MAZ ID"
        />
        <div className="absolute w-[16px] h-[16px] right-[10px] top-[15px] cursor-pointer">
          <Image
            src="/search.png"
            layout="fill"
            objectFit="contain"
            alt="search"
          />
        </div>
      </div>
      <div className="flex min-h-[65px] items-center justify-end" onClick={togglingNotificationHandler} >
        <span className="relative top-0.5 px-7 cursor-pointer">
          {notifications && notifications.length > 0 && (
            <span className="rounded-full block -top-[1px] h-[7px] w-[7px] right-[28.5px] bg-[#FF2323] absolute"></span>
          )}
          <Image src={"/bell.png"} height={16} width={17} alt="notification" />
        </span>

        {user && user.avatar_url_users ? (
          <Image
            src={'/user-images/' + user?.avatar_url_users!}
            className="rounded-full"
            width={31}
            height={30}
            alt="profileImage"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
        <p className="font-[600] text-[#525D72] text-[14px] leading-[19px] mx-2">
          {user?.first_name_users} {user?.last_name_users}
        </p>
        <FontAwesomeIcon icon={faAngleDown} size="xs" color="#525D72" />
      </div>
    </div>
    <NotificationView close={togglingNotificationHandler} show={showNotification} />
    </>
  );
};

export default Topbar;
