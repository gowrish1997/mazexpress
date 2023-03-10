import React, { SyntheticEvent, useRef, useState } from "react";
import Image from "next/image";
import Bell from "@/public/bell_svg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useUser from "@/lib/hooks/useUser";
import useNotifications from "@/lib/hooks/useNotifications";
import NotificationView from "@/components/common/NotificationView";
import searchIcon from "@/public/search.png";
import { SearchKeyContext } from "@/components/common/Frame";
const Topbar = () => {
  const { user, mutateUser } = useUser();

  const { setSearchKey } = React.useContext(SearchKeyContext) as any;

  const { notifications, notificationsIsLoading } = useNotifications({
    user_id: user?.id!,
  });

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotificationsHandler = () => {
    setShowNotifications((prev) => !prev);
  };

  const smartToggleNotificationsHandler = () => {
    setShowNotifications(false);
  };

  let trigger = useRef(null);

  const searchKeyOnchangeHandler = (e: SyntheticEvent) => {
    setSearchKey((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <div className="flex w-full min-h-[60px] py-5 items-center justify-between sticky top-0 bg-[#ffffff] z-10">
        <div className="flex-1 h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] p-[5px] pl-[15px] relative">
          <input
            className="h-full mr-5 bg-transparent focus:outline-none searchbar"
            id="searchbar"
            type="text"
            placeholder="Search with MAZ ID"
            onChange={searchKeyOnchangeHandler}
          />
          <div className="absolute w-[16px] h-[16px] right-[10px] top-[15px] cursor-pointer">
            <Image
              src={searchIcon}
              fill
              style={{ objectFit: "contain" }}
              alt="search"
              sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 100vw,
                  100vw"
            />
          </div>
        </div>
        <div className="flex min-h-[65px] items-center justify-end">
          <span
            className="relative top-0.5 px-7 cursor-pointer"
            onClick={toggleNotificationsHandler}
            ref={trigger}
          >
            {notifications && notifications.length > 0 && (
              <span className="rounded-full block top-[3px] h-[7px] w-[7px] right-[34.5px] bg-[#FF2323] absolute"></span>
            )}
            <div className="h-[30px] w-[30px] rounded-[50%] hover:bg-[#EDF5F9] flex justify-center items-center  ">
              <Bell className="bell_svg" />
            </div>
          </span>
        </div>

        <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden">
          <Image
            src={
              user?.avatar_url?.startsWith("https")
                ? user?.avatar_url!
                : "/user-images/" + user?.avatar_url!
            }
            fill
            style={{ objectFit: "cover" }}
            alt="profileImage"
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 100vw,
                100vw"
            onError={(e: SyntheticEvent) =>
              console.log("error at user image", e)
            }
          />
        </div>
        <p className="font-[600] text-[#525D72] text-[14px] leading-[19px] mx-2">
          {user?.first_name} {user?.last_name}
        </p>
        <div className="w-3 h-3 flex items-center">
          <FontAwesomeIcon icon={faAngleDown} size="xs" color="#525D72" />
        </div>
      </div>

      <NotificationView
        close={toggleNotificationsHandler}
        show={showNotifications}
        trigger={trigger}
        handler={smartToggleNotificationsHandler}
      />
    </>
  );
};

export default Topbar;
