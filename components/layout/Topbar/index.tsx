import { SearchKeyContext } from "@/components/common/Frame";
import LogoutConfirmModal from "@/components/common/LogoutConfirmModal";
import NotificationView from "@/components/common/NotificationView";
import useNotifications from "@/lib/hooks/useNotifications";
import Bell from "@/public/bell_svg.svg";
import New_logo from "@/public/new_logo_blue.png";
import searchIcon from "@/public/search.png";
import debounce from "lodash.debounce";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useCallback, useRef, useState } from "react";
import SidebarModal from "../sidebar/SidebarModal";
import Cross from "@/public/cross.png";

const Topbar = () => {
  const router = useRouter();

  const { t } = useTranslation("common");
  const { locale } = router;
  const placeholder: string[] = t("topbar.inputField.Placeholder", {
    returnObjects: true,
  });
  const inputRef = useRef<HTMLInputElement>();
  // console.log(user)
  const { searchKey, setSearchKey } = React.useContext(SearchKeyContext) as any;
  const { data: session, update }: { data: any; update: any } = useSession();

  const { notifications, notificationsIsLoading, mutateNotifications } =
    useNotifications({
      username: session?.user?.email,
      status: ["unread"],
      page: 1,
      per_page: 1,
    });

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotificationsHandler = () => {
    setShowNotifications((prev) => !prev);
  };

  const smartToggleNotificationsHandler = () => {
    setShowNotifications(false);
  };

  let trigger = useRef(null);
  const debouncedFilter = useCallback(
    debounce((e) => {
      setSearchKey(e);
    }, 1000),
    []
  );
  const searchKeyOnchangeHandler = (e) => {
    debouncedFilter(e.target.value);
  };

  const deleteSearcgKeyHandler = () => {
    setSearchKey("");
    inputRef.current.value = "";
  };

  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  const toggleLogoutConfirmModal = () => {
    setShowLogoutConfirmModal((prev) => !prev);
  };

  const logoutHandler = async () => {
    try {
      await update(null);
      router.push(
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/auth/gate?mode=1`
          : `https://${process.env.NEXT_PUBLIC_HOST}/auth/gate?mode=1`
      );
    } catch (err) {
      if (err) console.error(err);
    }
  };

  // useEffect(() => {
  //   console.log("user", user);
  //   console.log("notifications", notifications);

  // }, [user, notificationsIsLoading]);

  // if(!notifications) return <div>notifications loading</div>

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row w-full  min-h-[60px] py-5 items-center justify-between sticky top-0 bg-[#ffffff] z-30">
        <div className="w-full flex-1 h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] p-[5px] pl-[15px] relative px-[5px]">
          <input
            className="h-full w-full bg-transparent focus:outline-none searchbar"
            id="searchbar"
            type="text"
            ref={inputRef}
            placeholder={
              router.pathname.includes("users") ||
              router.pathname.includes("admins")
                ? placeholder[0]
                : placeholder[1]
            }
            onChange={(e) => searchKeyOnchangeHandler(e)}
          />
          <div
            className={`absolute w-[16px] h-[16px] ${
              locale == "en" ? "right-[10px]" : "left-[10px]"
            } top-[15px] cursor-pointer`}
          >
            {inputRef?.current?.value ? (
              <Image
                src={Cross}
                fill
                style={{ objectFit: "contain" }}
                alt="search"
                onClick={deleteSearcgKeyHandler}
                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 100vw,
                  100vw"
              />
            ) : (
              <Image
                src={searchIcon}
                fill
                style={{ objectFit: "contain" }}
                alt="search"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 100vw,
                100vw"
              />
            )}
          </div>
        </div>
        <div className="w-full md:flex-1 flex flex-row justify-between items-center ">
          <div className="md:hidden flex flex-row justify-start items-center  gap-x-[10px]">
            <div className="mb-[22px] ">
              <SidebarModal logout={toggleLogoutConfirmModal} />
            </div>
            <Link href={"/"} passHref>
              <div className="flex items-center cursor-pointer mb-[10px] ">
                <div className="flex flex-col justify-start items-start gap-x-[7px] ">
                  <div className="relative h-[47px] w-[70px] ">
                    <Image src={New_logo} fill alt="logo" />
                  </div>
                  <p className="text-[#143055] tracking-[3px] text-[17px] font-[800] ">
                    express
                  </p>
                </div>
                {/* <h3 className="font-semibold ml-4 font-[500] text-[20px]">Management</h3> */}
              </div>
            </Link>
          </div>
          <div className="w-full md:flex-1 flex flex-row-reverse justify-start items-center">
            <div className="flex min-h-[65px] items-center justify-end  ">
              <span
                className="relative top-0.5 px-2 cursor-pointer"
                onClick={toggleNotificationsHandler}
                ref={trigger}
              >
                {notifications?.data && notifications?.data?.length > 0 && (
                  <span className="rounded-full block top-[3px] h-[7px] w-[7px] left-[24px] bg-[#FF2323] absolute"></span>
                )}
                <div className="h-[30px] w-[30px] rounded-[50%] hover:bg-[#EDF5F9] flex justify-center items-center  ">
                  <Bell className="bell_svg" />
                </div>
              </span>
            </div>
            <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden">
              <Image
                src={
                  session?.user?.avatar_url
                    ? "https://api.mazexpress.com.ly/user_uploads/" +
                      session?.user?.avatar_url
                    : "/user-images/default_user.png"
                }
                fill
                style={{ objectFit: "cover" }}
                alt="profileImage"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 100vw,
                100vw"
                onError={(e: SyntheticEvent) => console.log("")}
              />
            </div>
            <p className="hidden md:block font-[600] text-[#525D72] text-[14px] leading-[19px] mx-2">
              {session?.user?.first_name} {session?.user?.last_name}
            </p>
          </div>
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
      {showLogoutConfirmModal && (
        <LogoutConfirmModal
          logout={logoutHandler}
          close={toggleLogoutConfirmModal}
        />
      )}
    </>
  );
};

export default Topbar;
