import React, { useState } from "react";
import Image from "next/image";
import Header from "./Header";
import NavLink from "./NavLink";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import LogoutConfirmModal from "@/components/common/LogoutConfirmModal";
import logoutImage from "@/public/logout.png";
import useUser from "@/lib/hooks/useUser";
import fetchSelf from "@/lib/fetchSelf";

import { useTranslation } from "next-i18next";

const userSidebarPanel = [
  {
    id: nanoid(),
    title: "My Orders",
    icon: "/orders.png",
    path: "/orders",
  },
  {
    id: nanoid(),
    title: "Order Tracking",
    icon: "/location.png",
    path: "/track",
  },
  {
    id: nanoid(),
    title: "Warehouse",
    icon: "/warehouse.png",
    path: "/warehouse",
  },
  {
    id: nanoid(),
    title: "Address Book",
    icon: "/address.png",
    path: "/address-book",
  },
  {
    id: nanoid(),
    title: "Settings",
    icon: "/settings.png",
    path: "/settings",
  },
  {
    id: nanoid(),
    title: "Help center",
    icon: "/help.png",
    path: "/help-center",
  },
];
const adminSidebarPanel = [
  {
    id: nanoid(),
    title: "Dashboard",
    icon: "/orders.png",
    path: "/admin",
  },
  {
    id: nanoid(),
    title: "Live Orders",
    icon: "/location.png",
    path: "/admin/live-orders",
  },
  {
    id: nanoid(),
    title: "Pending Orders",
    icon: "/location.png",
    path: "/admin/pending",
  },
  {
    id: nanoid(),
    title: "Today Shipments",
    icon: "/warehouse.png",
    path: "/admin/shipments",
  },
  {
    id: nanoid(),
    title: "Out From Warehouse",
    icon: "/warehouse.png",
    path: "/admin/in-transit",
  },
  {
    id: nanoid(),
    title: "Delivered Order",
    icon: "/address.png",
    path: "/admin/delivered",
  },
  {
    id: nanoid(),
    title: "Warehouse",
    icon: "/settings.png",
    path: "/admin/warehouse",
  },
  {
    id: nanoid(),
    title: "User Base",
    icon: "/help.png",
    path: "/admin/users",
  },
  {
    id: nanoid(),
    title: "Notification Panel",
    icon: "/address.png",
    path: "/admin/notification-panel",
  },
  {
    id: nanoid(),
    title: "Settings",
    icon: "/settings.png",
    path: "/admin/settings",
  },
  {
    id: nanoid(),
    title: "Help center",
    icon: "/help.png",
    path: "/admin/help-center",
  },
];

const sidebarContentHandler = (user: boolean) => {
  if (user) {
    return adminSidebarPanel;
  } else {
    return userSidebarPanel;
  }
};
const Sidebar = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;
  const userSidebarContent: string[] = t("sidebar.UserSidebarContent", {
    returnObjects: true,
  });
  const adminSidebarContent: string[] = t("sidebar.AdminSidebarContent", {
    returnObjects: true,
  });

  const transalateSidebarContentHandler = () => {
    if (user?.is_admin) {
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
    fetchSelf("/api/auth/logout", { method: "GET" });
    mutateUser();
    router.push("/auth/gate");
    // router.reload()
  };

  return (
    <div className="text-md bg-[#FFFFFF] border-r border-[#F0F0F0] relative w-full">
      <Header />
      <div className="flex flex-col justify-between items-start px-6 pb-6 h-[89vh] overflow-y-auto  box-border overflow-x-hidden slimScrollBar">
        <ul className="w-full box-border flex flex-col font-semibold pb-2 leading-[140%] flex-1 space-y-[8px]">
          {sidebarContentHandler(user?.is_admin!).map((content, index) => {
            return (
              <NavLink
                key={content.id}
                id={index}
                content={content}
                transalateContent={transalateSidebarContentHandler()[index]}
              />
            );
          })}
        </ul>

        <div
          className="w-[100%] box-border rounded self-center flex flex-row items-center justify-start bg-[#3672DF] py-[10px] px-[15px]  cursor-pointer gap-x-[10px] "
        //   onClick={toggleLogoutConfirmModal}
          onClick={logoutHandler}
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
          <p
            className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500]"
          >
            {t("sidebar.Logout")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
