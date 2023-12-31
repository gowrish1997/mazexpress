import fetchJson from "@/lib/fetchServer";
import Address from "@/public/address_svg.svg";
import Notification from "@/public/bell_svg.svg";
import Dashboard from "@/public/dashboard_svg.svg";
import Enquiry from "@/public/enquiry_svg.svg";
import Helpcenter from "@/public/help_svg.svg";
import Location from "@/public/location_svg.svg";
import Order from "@/public/order_svg.svg";
import AddOrder from "@/public/add-new-order_svg.svg";
import Settings from "@/public/settings_svg.svg";
import TodayShip from "@/public/todayship_svg.svg";
import User from "@/public/user_svg.svg";
import Warehosue from "@/public/warehouse_svg.svg";
import LiveOrder from "@/public/new_orders_svg.svg";
import ShipmentSetting from "@/public/shipment_svg.svg";
import Pending from "@/public/pending_svg.svg";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Admin from "../../../public/admin_svg.svg";

const userIcon = (id: number) => {
    switch (id) {
        case 0:
            return <AddOrder />;
        case 1:
            return <Order />;
        case 2:
            return <Location />;
        case 3:
            return <Warehosue />;
        case 4:
            return <Address />;
        case 5:
            return <Settings />;

        case 6:
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
            return <Pending />;
        case 3:
            return <TodayShip />;
        case 4:
            return <TodayShip />;
        case 5:
            return <TodayShip />;

        case 6:
            return <Warehosue />;
        case 7:
            return <User />;
        case 8:
            return <Admin />;
        case 9:
            return <Notification />;

        case 10:
            return <Settings />;
        case 11:
            return <Helpcenter />;
        case 12:
            return <Enquiry />;
        case 13:
            return <ShipmentSetting />;
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
    transalateContent: string;
}

const NavLink = (props: IProp) => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
    const { data: session, update }: { data: any; update: any } = useSession();

    const trackPageRoutingHandler = async () => {
        const orders = await fetchJson(
            `/api/orders?username=${
                session?.user.email
            }&page=${0}&per_page=${1}`,
            {
                method: "GET",
            }
        );

        if (orders.data) {
            router.push(`/track/${orders.data[0].maz_id}`);
        } else {
            if (router.locale == "en") {
                window.alert("Currently you do not have any order track");
            } else {
                window.alert("حاليا ليس لديك أي طلب لتعقبه");
            }
        }
    };

    const isActivePath = (obj: any): boolean => {
        if (router.pathname === "/" && obj.path === "/") return true;
        if (router.pathname === "/admin" && obj.path === "/admin") return true;
        else {
            if (
                router.pathname.includes(obj.path) &&
                obj.path !== "/" &&
                obj.path !== "/admin"
            )
                return true;
        }
        return false;
    };

    if (props.content.path === "/track") {
        return (
            <div onClick={trackPageRoutingHandler}>
                <div
                    className=" box-border w-full flex flex-row justify-between items-center relative cursor-pointer px-[10px] rounded-[4px] py-[5px]   hover:bg-[#EDF5F9]"
                    style={{
                        backgroundColor: isActivePath(props.content)
                            ? "#EDF5F9"
                            : "#fff",
                    }}
                >
                    <div className=" flex flex-row justify-start items-center w-full gap-x-[10px] ">
                        <div
                            className={`${
                                router.pathname.includes(props.content.path)
                                    ? "sidebar_icon_hover"
                                    : "sidebar_icon"
                            } relative`}
                        >
                            {session?.user?.is_admin
                                ? adminIcon(props.id)
                                : userIcon(props.id)}
                            {props.content.title === "Delivered Order" ? (
                                <span className="absolute top-0 bg-green-600 rounded-full h-[12px] w-[12px] flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="font-[600] w-[7px] "
                                        color="white"
                                        // size="xs"
                                        // style={{fontSize: '8px'}}
                                    />
                                </span>
                            ) : null}
                            {props.content.title === "Live Orders" ? (
                                <span
                                    className="absolute left-0 transition duration-300 rounded-full h-[12px] w-[12px] flex items-center justify-center"
                                    style={{
                                        backgroundColor: isActivePath(
                                            props.content
                                        )
                                            ? "#EDF5F9"
                                            : "#fff",
                                    }}
                                ></span>
                            ) : null}
                        </div>
                        <div
                            className=" text-[#525D72] font-[500] text-[14px] leading-[21px] hover:text-[#2B2B2B] hover:font-[600] py-2 transition duration-300 cursor-pointer"
                            style={
                                isActivePath(props.content)
                                    ? {
                                          color: "#2B2B2B",
                                          fontWeight: "600",
                                      }
                                    : {}
                            }
                        >
                            {props.transalateContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Link
            href={{
                pathname: props.content.path,
            }}
            passHref
        >
            <div
                className=" box-border w-full flex flex-row justify-between items-center relative cursor-pointer px-[10px] rounded-[4px] py-[5px]   hover:bg-[#EDF5F9]"
                style={{
                    backgroundColor: isActivePath(props.content)
                        ? "#EDF5F9"
                        : "#fff",
                }}
            >
                <div className=" flex flex-row justify-start items-center w-full gap-x-[10px] ">
                    <div
                        className={`${
                            router.pathname.includes(props.content.path)
                                ? "sidebar_icon_hover"
                                : "sidebar_icon"
                        } relative`}
                    >
                        {session?.user?.is_admin
                            ? adminIcon(props.id)
                            : userIcon(props.id)}
                        {props.content.title === "Delivered Order" ? (
                            <span className="absolute top-0 bg-green-600 rounded-full h-[12px] w-[12px] flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="font-[600] w-[7px] "
                                    color="white"
                                />
                            </span>
                        ) : null}
                        {props.content.title === "Live Orders" ? (
                            <span
                                className="absolute left-0 transition duration-300 rounded-full h-[12px] w-[12px] flex items-center justify-center"
                                style={{
                                    backgroundColor: isActivePath(props.content)
                                        ? "#EDF5F9"
                                        : "#fff",
                                }}
                            ></span>
                        ) : null}
                    </div>
                    <div
                        className=" text-[#525D72] font-[500] text-[14px] leading-[21px] hover:text-[#2B2B2B] hover:font-[600] py-2 transition duration-300 cursor-pointer"
                        style={
                            isActivePath(props.content)
                                ? {
                                      color: "#2B2B2B",
                                      fontWeight: "600",
                                  }
                                : {}
                        }
                    >
                        {props.transalateContent}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NavLink;
