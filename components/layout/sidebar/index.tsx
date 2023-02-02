import React from "react";
import Image from "next/image";
import Header from "./Header";
import NavLink from "./NavLink";
import { nanoid } from "nanoid";
import axios from "axios";
import { useRouter } from "next/router";
import useUser from "@/lib/useUser";
import fetchJson from "@/lib/fetchJson";
import Order from "../../../public/order_svg.svg";
import Location from "../../../public/location_svg.svg";
import Warehosue from "../../../public/warehouse_svg.svg";
import Address from "../../../public/address_svg.svg";
import Settings from "../../../public/settings_svg.svg";
import Helpcenter from "../../../public/help_svg.svg";
const sidebarContent = [
    {
        id: nanoid(),
        title: "My Orders",
        Icon: Order,
        path: "/my-orders",
    },
    {
        id: nanoid(),
        title: "Order Tracking",
        Icon: Location,
        path: "/track",
    },
    {
        id: nanoid(),
        title: "Warehouse",
        Icon: Warehosue,
        path: "/warehouse",
    },
    {
        id: nanoid(),
        title: "Address Book",
        Icon: Address,
        path: "/address-book",
    },
    {
        id: nanoid(),
        title: "Settings",
        Icon: Settings,
        path: "/settings",
    },
    {
        id: nanoid(),
        title: "Help center",
        Icon: Helpcenter,
        path: "/help-center",
    },
];

const Sidebar = () => {
    const router = useRouter();
    const { user, mutateUser } = useUser();

    const logoutHandler = async () => {
        router.push("/auth/gate");
        mutateUser(await fetchJson("/api/auth/logout", { method: "GET" }), false);
    };
    return (
        <div className="text-md bg-[#FFFFFF] border-r border-[#F0F0F0] fixed w-[250px]">
            <Header />
            <div className="flex flex-col px-6 pb-6 h-[89vh] overflow-y-auto  box-border overflow-x-hidden slimScrollBar">
                <ul className="flex flex-col font-semibold pb-2 leading-[140%] flex-1 space-y-[8px]">
                    {sidebarContent.map((content, index) => {
                        return <NavLink key={content.id} content={content} id={index} />;
                    })}
                </ul>

                <div
                    className="rounded self-center  flex flex-row items-center justify-start  w-[188px] bg-[#3672DF] py-[10px] px-[15px] -ml-[15px] cursor-pointer"
                    onClick={logoutHandler}
                >
                    <div className="relative w-[14px] h-[14px] ">
                        <Image src="/logout.png" layout="fill" objectFit="contain" alt="logout" />
                    </div>
                    <p className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] ml-[10px]">Logout</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
