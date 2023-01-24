import React from "react";
import Image from "next/image";
import Header from "./Header";
import NavLink from "./NavLink";
import { nanoid } from "nanoid";
const sidebarContent = [
    {
        id: nanoid(),
        title: "My Orders",
        icon: "/orders.png",
        path:'/myorders'
    },
    {
        id: nanoid(),
        title: "Order Tracking",
        icon: "/location.png",
        path:'/order-tracking'
    },
    {
        id: nanoid(),
        title: "Warehouse",
        icon: "/warehouse.png",
        path:'/warehouse'
    },
    {
        id: nanoid(),
        title: "Address Book",
        icon: "/address.png",
        path:'/address-book'
    },
    {
        id: nanoid(),
        title: "Settings",
        icon: "/settings.png",
        path:'/settings'
    },
    {
        id: nanoid(),
        title: "Help center",
        icon: "/help.png",
        path:'/help-center'
    },
];
const Sidebar = () => {
    return (
        <div className="text-md bg-[#FFFFFF] border-r border-[#F0F0F0] fixed w-[250px]">
            <Header />
            <div className="flex flex-col px-6 pb-6 h-[89vh] overflow-y-auto  box-border overflow-x-hidden slimScrollBar">
                <ul className="flex flex-col font-semibold pb-2 leading-[140%] flex-1 space-y-[8px]">
                    {sidebarContent.map((content) => {
                        return <NavLink key={content.id} content={content} />;
                    })}
                </ul>

                <div className="rounded self-center  flex flex-row items-center justify-start  w-[188px] bg-[#3672DF] py-[10px] px-[15px] -ml-[15px] cursor-pointer ">
                    <div className="relative w-[14px] h-[14px] ">
                        <Image src="/logout.png" layout="fill" objectFit="contain" alt="logout" />
                    </div>
                    <span className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] ml-[10px] ">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
