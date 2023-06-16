import LogoutConfirmModal from "@/components/common/LogoutConfirmModal";
import logoutImage from "@/public/logout.png";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "./Header";
import NavLink from "./NavLink";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { sidebarContentHandler } from "@/lib/selectOrder";

interface IProp {
  logout: () => void;
}

const SidebarModal = (props: IProp) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;
  const userSidebarContent: string[] = t("sidebar.UserSidebarContent", {
    returnObjects: true,
  });
  const adminSidebarContent: string[] = t("sidebar.AdminSidebarContent", {
    returnObjects: true,
  });
  const { data: session, update }: { data: any; update: any } = useSession();

  const transalateSidebarContentHandler = () => {
    // console.log(user?.is_admin);
    if (session?.user?.is_admin) {
      return adminSidebarContent;
    } else {
      return userSidebarContent;
    }
  };

  const [showOptionModal, setShowOptionModal] = useState(false);

  const toggleOptionModalHandler = () => {
    setShowOptionModal((prev) => !prev);
  };

  const logoutHandler = () => {
    try {
      signOut();
    } catch (err) {
      if (err) console.error(err);
    }
  };
  return (
    <div
      className=" xmd:hidden flex flex-row items-center justify-center box-border border-[1px]  rounded-[4px] text-[#121212] w-[35px] h-[35px] -mb-[3px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF] max-[800px]:relative z-[20]"
      style={
        showOptionModal
          ? {
              backgroundColor: "#35C6F4",
              color: "#FFFFFF",
            }
          : {}
      }
      onClick={toggleOptionModalHandler}
    >
      <div
        className="h-[15px] w-[15px] cursor-pointer flex flex-row items-center justify-center  "
        style={{
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {showOptionModal ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </div>
      {showOptionModal && (
        <div
          className={`absolute top-0 md:top-[120px] ${
            locale == "en"
              ? "left-[35px] md:left-[60px]"
              : "right-[35px] md:right-[60px]"
          }  w-[200px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] flex flex-col justify-between items-start p-[5px]`}
          style={{
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          }}
          // ref={ref}
        >
          <ul className=" w-full box-border  flex-col font-semibold pb-2 leading-[140%] flex-1 space-y-[8px]">
            {sidebarContentHandler(session?.user?.is_admin!).map(
              (content, index) => {
                return (
                  <NavLink
                    key={content.id}
                    id={index}
                    content={content}
                    transalateContent={transalateSidebarContentHandler()[index]}
                  />
                );
              }
            )}
            <div
              className="flex w-[100%] box-border rounded self-center  flex-row items-center justify-start bg-[#35C6F4] py-[10px] px-[15px]  cursor-pointer gap-x-[10px] "
              //   onClick={toggleLogoutConfirmModal}
              onClick={props.logout}
            >
              <div className="relative w-[14px] h-[14px] ">
                <Image
                  src={logoutImage}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt="logout"
                  sizes="(max-width: 768px) 100vw,
                                                (max-width: 1200px) 50vw,
                                                33vw"
                />
              </div>
              <p className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500]">
                {t("sidebar.Logout")}
              </p>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarModal;
