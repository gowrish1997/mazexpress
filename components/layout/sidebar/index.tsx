import LogoutConfirmModal from "@/components/common/LogoutConfirmModal";
import logoutImage from "@/public/logout.png";
import { nanoid } from "nanoid";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "./Header";
import NavLink from "./NavLink";
import SidebarModal from "./SidebarModal";
import { sidebarContentHandler } from "@/lib/selectOrder";

const Sidebar = () => {
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

  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  const toggleLogoutConfirmModal = () => {
    setShowLogoutConfirmModal((prev) => !prev);
  };

  const logoutHandler = async () => {
    try {
      await update(null);
      localStorage.removeItem("nextauth.message");
      router.push(
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/auth/gate?mode=1`
          : `https://${process.env.NEXT_PUBLIC_HOST}/auth/gate?mode=1`
      );
    } catch (err) {
      if (err) console.error(err);
    }
  };

  return (
    <>
      <div className="text-md bg-[#FFFFFF] border-r border-[#F0F0F0] relative w-full">
        <Header />
        <div className="flex flex-col justify-between items-start px-6 pb-[60px] h-[89vh] overflow-y-auto box-border overflow-x-hidden slimScrollBar">
          <div className=" w-full box-border  flex-col font-semibold pb-2 leading-[140%] flex-1 space-y-[8px]">
            <SidebarModal logout={toggleLogoutConfirmModal} />
            <ul className="hidden xmd:flex w-full box-border  flex-col font-semibold pb-2 leading-[140%] flex-1 space-y-[8px]">
              {sidebarContentHandler(session?.user?.is_admin!).map(
                (content, index) => {
                  return (
                    <NavLink
                      key={content.id}
                      id={index}
                      content={content}
                      transalateContent={
                        transalateSidebarContentHandler()[index]
                      }
                    />
                  );
                }
              )}
            </ul>
          </div>

          <div
            className="hidden xmd:flex w-[100%] box-border rounded self-center  flex-row items-center justify-start bg-[#35C6F4] py-[10px] px-[15px]  cursor-pointer gap-x-[10px] "
            //   onClick={toggleLogoutConfirmModal}
            onClick={toggleLogoutConfirmModal}
          >
            <div className="relative w-[14px] h-[14px] ">
              <Image
                src={logoutImage}
                fill
                style={{ objectFit: "contain" }}
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
        </div>
      </div>
      {showLogoutConfirmModal && (
        <LogoutConfirmModal
          logout={logoutHandler}
          close={toggleLogoutConfirmModal}
        />
      )}
    </>
  );
};

export default Sidebar;
