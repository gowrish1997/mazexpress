import Bell from "@/public/bell_svg.svg";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { SyntheticEvent, useRef, useState } from "react";

import { SearchKeyContext } from "@/components/common/Frame";
import NotificationView from "@/components/common/NotificationView";
import useNotifications from "@/lib/hooks/useNotifications";
import searchIcon from "@/public/search.png";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Topbar = () => {
    const router = useRouter();

    const { t } = useTranslation("common");
    const { locale } = router;
    const placeholder: string[] = t("topbar.inputField.Placeholder", {
        returnObjects: true,
    });
    // console.log(user)
    const { setSearchKey } = React.useContext(SearchKeyContext) as any;
    const { data: session, update }: { data: any; update: any } = useSession();

    const { notifications, notificationsIsLoading, mutateNotifications } =
        useNotifications({
            username: session?.user?.email,
            status: ["unread"],
            page: 1,
            per_page: 25,
        });
    console.log(notifications);

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

    // useEffect(() => {
    //   console.log("user", user);
    //   console.log("notifications", notifications);

    // }, [user, notificationsIsLoading]);

    // if(!notifications) return <div>notifications loading</div>

    return (
        <>
            <div className="flex w-full min-h-[60px] py-5 items-center justify-between sticky top-0 bg-[#ffffff] z-30">
                <div className="flex-1 h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] p-[5px] pl-[15px] relative px-[5px]">
                    <input
                        className="h-full w-full bg-transparent focus:outline-none searchbar"
                        id="searchbar"
                        type="text"
                        placeholder={
                            router.pathname.includes("users") ||
                            router.pathname.includes("admins")
                                ? placeholder[0]
                                : placeholder[1]
                        }
                        onChange={searchKeyOnchangeHandler}
                    />
                    <div
                        className={`absolute w-[16px] h-[16px] ${
                            locale == "en" ? "right-[10px]" : "left-[10px]"
                        } top-[15px] cursor-pointer`}
                    >
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
                        {notifications && notifications?.length > 0 && (
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
                            session?.user?.avatar_url ||
                            "/user-images/default_user.png"
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
                    {session?.user?.first_name} {session?.user?.last_name}
                </p>
                <div className="w-3 h-3 flex items-center">
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        size="xs"
                        color="#525D72"
                    />
                </div>
            </div>
            {showNotifications && (
                <NotificationView
                    close={toggleNotificationsHandler}
                    show={showNotifications}
                    trigger={trigger}
                    handler={smartToggleNotificationsHandler}
                />
            )}
        </>
    );
};

export default Topbar;
