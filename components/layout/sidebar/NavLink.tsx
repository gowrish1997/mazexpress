import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "@/lib/useUser";
import Order from "../../../public/order_svg.svg";
import Location from "../../../public/location_svg.svg";
import Warehosue from "../../../public/warehouse_svg.svg";
import Address from "../../../public/address_svg.svg";
import Settings from "../../../public/settings_svg.svg";
import Helpcenter from "../../../public/help_svg.svg";
import Dashboard from "../../../public/dashboard_svg.svg";
import LiveOrder from "../../../public/liveorder_svg.svg";
import TodayShip from "../../../public/todayship_svg.svg";
import User from "../../../public/user_svg.svg";
import Notification from "../../../public/bell_svg.svg";

const userIcon = (id: number) => {
    switch (id) {
        case 0:
            return <Order />;
        case 1:
            return <Location />;
        case 2:
            return <Warehosue />;
        case 3:
            return <Address />;
        case 4:
            return <Settings />;

        case 5:
            return <Helpcenter />;

        default:
            return "";
    }
};
const adminIcon = (id: number) => {
    switch (id) {
        case 0:
            return <Dashboard />;
        case 1:
            return <LiveOrder />;
        case 2:
            return <TodayShip />;
        case 3:
            return <TodayShip />;
        case 4:
            return <TodayShip />;
        case 5:
            return <Warehosue />;

        case 6:
            return <User />;
        case 7:
            return <Notification />;
        case 8:
            return <Settings />;

        case 9:
            return <Helpcenter />;

        default:
            return "";
    }
};

interface IProp {
    content: {
        id: string;
        title: string;
        Icon?: string;
        path: string;
    };
    id: number;
}

const NavLink = (props: IProp) => {
    const router = useRouter();
    const { user, mutateUser } = useUser();
    const isActivePath = (obj: any): boolean => {
        if (router.pathname === "/" && obj.path === "/") return true;
        else {
            if (router.pathname.includes(obj.path) && obj.path !== "/") return true;
        }
        return false;
    };

    return (
        <Link
            href={{
                pathname: props.content.path,
            }}
            passHref
            // style={{ ...props.style }}
        >
            <div
                className=" box-border w-full flex flex-row justify-between items-center relative cursor-pointer px-[10px] rounded-[4px] py-[5px]   hover:bg-[#EDF5F9]"
                style={{
                    backgroundColor: isActivePath(props.content) ? "#EDF5F9" : "",
                }}
            >
                <div className=" flex flex-row justify-start items-center w-full">
                    <div className={`${router.pathname.includes(props.content.path) ? "sidebar_icon_hover" : "sidebar_icon"} `}>
                        {user?.is_admin_users ? adminIcon(props.id) : userIcon(props.id)}
                    </div>
                    <div
                        className="ml-3 text-[#525D72] font-[500] text-[14px] leading-[21px] hover:text-[#2B2B2B] hover:font-[600] py-2 transition duration-300 cursor-pointer"
                        style={
                            isActivePath(props.content)
                                ? {
                                      color: "#2B2B2B",
                                      fontWeight: "600",
                                  }
                                : {}
                        }
                    >
                        {props.content.title}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NavLink;
