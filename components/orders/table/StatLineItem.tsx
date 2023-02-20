import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LiveOrderOptionModal from "@/components/admin/modal/LiveOrderOptionModal";
import { IOrderResponse } from "@/models/order.interface";
import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import GreyRadioButton from "../../../public/grey_svg.svg";
import useAllUser from "@/lib/useAllUsers";
import useTracking from "@/lib/useTracking";
import { getDateInStringFormat } from "@/lib/helper";
import { IUser } from "@/models/user.interface";
interface IProp {
    row: IOrderResponse;
    type: string;
    onSelect: (e: string, type: string) => void;
}

const StatLineItem = (props: IProp) => {
    const trigger = useRef<any>();

    const { allUser, mutateAllUser, allUserIsLoading } = useAllUser({
        user_id: props.row.user_id,
    });
    const { tracking, mutateTracking, trackingIsLoading } = useTracking({
        order_id: props.row.id_orders,
    });

    const [packageStatus, setPackageStatus] = useState(0);

    useEffect(() => {
        // console.log(tracking);
        if (tracking !== undefined) {
            let sorted = [...tracking];
            sorted.sort((a: any, b: any) => a?.stage_tracking - b?.stage_tracking);
            setPackageStatus(sorted.pop()?.stage_tracking);
        }
    }, [tracking]);

    const warehoueStatusHanlder = () => {
        switch (packageStatus) {
            case 0:
                return "Pending";
            case 1:
                return "Istanbul";
            case 2:
                return "Istanbul";
            case 3:
                return "Libya";
            case 4:
                return "Out for delivery";
            case 5:
                return "Delivered";
            default:
                return "Pending";
        }
    };

    const [gate, setGate] = useState(false);

    const orderStatusColorHandler = (status: string) => {
        switch (status) {
            case "in-transit":
                return <RedRadioButton />;

            case "delivered":
                return <GreenRadioButton />;

            case "at-warehouse":
                return <YellowRadioButton />;
            case "pending":
                return <GreyRadioButton />;
            default:
                return "pending";
        }
    };

    return (
        <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative">
            <td className={`flex flex-row justify-start items-center capitalize`}>
                {allUser && (allUser as IUser)?.avatar_url_users !== undefined ? (
                    <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
                        <Image src={"/user-images/" + (allUser as IUser)?.avatar_url_users} fill style={{ objectFit: "cover" }} alt="profileImage" />
                    </div>
                ) : (
                    <div className="relative h-[30px] w-[30px] rounded-full   bg-slate-500">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                )}
                <div className="ml-[5px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                    <p className=" text-[12px] text-[#18181B] font-[800] leading-[22px] ">{(allUser as IUser)?.first_name_users + "" + (allUser as IUser)?.last_name_users}</p>
                    <p className="text-[12px] text-[#71717A] font-[400] leading-[22px] "> {(allUser as IUser)?.email_users}</p>
                </div>
            </td>
            <td
                className={`td2`}
                style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    width: "100%",
                }}
            >
                {props.row.id_orders}
            </td>

            <td className={`td3 capitalize `}>{warehoueStatusHanlder()}</td>
            <td className={`td4`}>
                <div className="h-full flex flex-row justify-start items-center ">
                    <span>{orderStatusColorHandler(props.row.status_orders)} </span>

                    <span className="ml-[5px] capitalize ">{props.row.status_orders}</span>
                </div>
            </td>
        </tr>
    );
};
export default StatLineItem;
