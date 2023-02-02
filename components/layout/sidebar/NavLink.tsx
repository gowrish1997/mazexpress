import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Order from "../../../public/order_svg.svg";
import Location from "../../../public/location_svg.svg";
import Warehosue from "../../../public/warehouse_svg.svg";
import Address from "../../../public/address_svg.svg";
import Settings from "../../../public/settings_svg.svg";
import Helpcenter from "../../../public/help_svg.svg";

const Icon = (id: number) => {
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

interface IProp {
    content: {
        id: string;
        title: string;
        Icon: string;
        path: string;
    };
    id: number;
}

const NavLink = (props: IProp) => {
    const router = useRouter();

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
                style={{ backgroundColor: router.pathname.includes(props.content.path) ? "#EDF5F9" : "" }}
            >
                <div className=" flex flex-row justify-start items-center w-full">
                    <div className={`${router.pathname.includes(props.content.path) ? "sidebar_icon_hover" : "sidebar_icon"} hover:sidebar_icon_hover`}>{Icon(props.id)}</div>

                    <div
                        className="ml-3 text-[#525D72] font-[500] text-[14px] leading-[21px] hover:text-[#2B2B2B] hover:font-[600] py-2 transition duration-300 cursor-pointer"
                        style={
                            router.pathname.includes(props.content.path)
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
