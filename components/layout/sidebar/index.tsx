import React, { useState } from "react";
import Image from "next/image";
import Header from "./Header";
import NavLink from "./NavLink";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import useUser from "@/lib/useUser";
import fetchJson from "@/lib/fetchJson";
import LogoutConfirmModal from "@/components/common/LogoutConfirmModal";

const userSidebarContent = [
    {
        id: nanoid(),
        title: "My Orders",
        icon: "/orders.png",
        path: "/",
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
        path: "/",
    },
    {
        id: nanoid(),
        title: "Live Orders",
        icon: "/location.png",
        path: "/track",
    },
    {
        id: nanoid(),
        title: "Today Shipments",
        icon: "/warehouse.png",
        path: "/warehouse",
    },
    {
        id: nanoid(),
        title: "Delivered Order",
        icon: "/address.png",
        path: "/address-book",
    },
    {
        id: nanoid(),
        title: "Warehouse",
        icon: "/settings.png",
        path: "/settings",
    },
    {
        id: nanoid(),
        title: "User Base",
        icon: "/help.png",
        path: "/help-center",
    },
    {
        id: nanoid(),
        title: "Notification Panel",
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
        title: "Settings",
        icon: "/help.png",
        path: "/help-center",
    },
];

const sidebarContentHandler = (user: number) => {
    if (user) {
        return adminSidebarPanel;
    } else {
        return userSidebarContent;
    }
};
const Sidebar = () => {
    const router = useRouter();
    const { user, mutateUser } = useUser();

    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

    const toggleLogoutConfirmModal = () => {
        setShowLogoutConfirmModal((prev) => !prev);
    };

    const logoutHandler = async () => {
        await mutateUser(await fetchJson("/api/auth/logout", { method: "GET" }), false);
        router.push("/auth/gate");
    };
    return (
        <>
            <div className="text-md bg-[#FFFFFF] border-r border-[#F0F0F0] fixed w-[250px]">
                <Header />
                <div className="flex flex-col px-6 pb-6 h-[89vh] overflow-y-auto  box-border overflow-x-hidden slimScrollBar">
                    <ul className="flex flex-col font-semibold pb-2 leading-[140%] flex-1 space-y-[8px]">
                        {sidebarContentHandler(user?.is_admin_users!).map((content, index) => {
                            return <NavLink key={content.id} id={index} content={content} />;
                        })}
                    </ul>

                    <div
                        className="rounded self-center  flex flex-row items-center justify-start  w-[188px] bg-[#3672DF] py-[10px] px-[15px] -ml-[15px] cursor-pointer"
                        onClick={toggleLogoutConfirmModal}
                    >
                        <div className="relative w-[14px] h-[14px] ">
                            <Image src="/logout.png" fill style={{ objectFit: "contain" }} alt="logout" />
                        </div>
                        <p className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] ml-[10px]">Logout</p>
                    </div>
                </div>
            </div>
            <LogoutConfirmModal show={showLogoutConfirmModal} close={toggleLogoutConfirmModal} confirm={logoutHandler} />
        </>
    );
};

export default Sidebar;
