import React, { useRef, useState } from "react";
import Image from "next/image";
import Bell from "../../../public/bell_svg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import useUser from "@/lib/useUser";
import useNotifications from "@/lib/useNotifications";
import NotificationView from "@/components/common/NotificationView";
import useClickOutside from "@/lib/useClickOutside";
const Topbar = () => {
    const { user, mutateUser } = useUser();

    const { notifications, notificationsIsLoading } = useNotifications({
        userId: user?.id_users!,
    });

    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotificationsHandler = () => {
        setShowNotifications((prev) => !prev);
    };

    const smartToggleNotificationsHandler = () => {
        setShowNotifications(false);
    };

    let trigger = useRef(null);
    return (
        <>
            <div className="flex w-full min-h-[60px] py-5 items-center justify-between sticky top-0 bg-[#ffffff] z-10 ">
                <div className="flex-1 h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] p-[5px] pl-[15px] relative">
                    <input className="h-full mr-5 bg-transparent focus:outline-none searchbar" id="searchbar" type="text" placeholder="Search with MAZ ID" />
                    <div className="absolute w-[16px] h-[16px] right-[10px] top-[15px] cursor-pointer">
                        <Image src="/search.png" layout="fill" objectFit="contain" alt="search" />
                    </div>
                </div>
                <div className="flex min-h-[65px] items-center justify-end">
                    <span className="relative top-0.5 px-7 cursor-pointer" onClick={toggleNotificationsHandler} ref={trigger}>
                        {notifications && notifications.length > 0 && <span className="rounded-full block -top-[1px] h-[7px] w-[7px] right-[28.5px] bg-[#FF2323] absolute"></span>}
                        <div className="h-[30px] w-[30px] rounded-[50%] hover:bg-[#EDF5F9] flex justify-center items-center  ">
                            {/* <Image src={"/bell.png"} height={16} width={17} alt="notification" className="" /> */}
                            <Bell className="bell_svg" />
                        </div>
                    </span>
                </div>

                {user && user.avatar_url_users ? (
                    <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden">
                        <Image src={"/user-images/" + user?.avatar_url_users!} fill style={{ objectFit: "cover" }} alt="profileImage" />
                    </div>
                ) : (
                    <FontAwesomeIcon icon={faUser} />
                )}
                <p className="font-[600] text-[#525D72] text-[14px] leading-[19px] mx-2">
                    {user?.first_name_users} {user?.last_name_users}
                </p>
                <FontAwesomeIcon icon={faAngleDown} size="xs" color="#525D72" />
            </div>

            <NotificationView close={toggleNotificationsHandler} show={showNotifications} trigger={trigger} handler={smartToggleNotificationsHandler} />
        </>
    );
};

export default Topbar;
