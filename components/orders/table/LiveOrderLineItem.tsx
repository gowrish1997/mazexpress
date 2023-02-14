import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import LiveOrderOptionModal from "@/components/admin/modal/LiveOrderOptionModal";
import { IOrderResponse } from "@/models/order.interface";
import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import GreyRadioButton from "../../../public/grey_svg.svg";
import useAllUser from "@/lib/useAllUsers";
import useTracking from "@/lib/useTracking";
import { getDateInStringFormat } from "@/lib/helper";
interface IProp {
    row: IOrderResponse;
    type: string;
    onSelect: (e: string, type: string) => void;
    selectedOrder: string[];
}

const LiveOrderLineItem = (props: IProp) => {
    const trigger = useRef<any>();

    const { allUser, mutateAllUser, allUserIsLoading } = useAllUser({
        user_id: props.row.user_id,
    });
    const { tracking, mutateTracking, trackingIsLoading } = useTracking({
        order_id: props.row.id_orders,
    });

    const [packageStatus, setPackageStatus] = useState(0);
    console.log(packageStatus);

    useEffect(() => {
        if (tracking !== undefined) {
            let sorted = [...tracking];
            sorted.sort((a: any, b: any) => a?.stage_tracking - b?.stage_tracking);
            setPackageStatus(sorted.pop()?.stage_tracking);
        }
    }, [tracking]);

    const [gate, setGate] = useState(false);

    function smartToggleGateHandler() {
        setGate(false);
    }
    function toggleGateHandler() {
        setGate((prev) => !prev);
    }

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

    const inputCheckedStateHandler = () => {
        const data = props?.selectedOrder?.find((el) => {
            return el == props.row.id_orders;
        });
        if (data) {
            return true;
        } else {
            false;
        }
    };

    const packageWareHouseHandler = () => {
        switch (packageStatus) {
            case 0:
                return "pending";
            case 1:
                return "Istanbul";
            case 2:
                return "Libya";
            case 3:
                return "Libya";
            case 4:
                return "Out for delivery";
            default:
                "pending";
                break;
        }
    };

    // const inputDisabledStateHandler = () => {
    //     if (props.type == "shipments") {
    //         return false;
    //     } else {
    //         if (props.row.status_orders == "at-warehouse" || props.row.status_orders == "in-transit") {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // };

    return (
        <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative" >
            {(props.type == "pending" || props.type == "shipments" || props.type == "in-transit" || props.type == "user_base") && (
                <td className={`td0`}>
                    <input
                        type="checkbox"
                        // disabled={inputDisabledStateHandler()}
                        value={props.row.id_orders}
                        name={props.row.id_orders}
                        checked={inputCheckedStateHandler()}
                        onChange={(e) => props.onSelect(e.target.value, "selectSingleOrder")}
                        className="h-[10px] w-[10px] cursor-pointer "
                    />
                </td>
            )}

            <td className={`flex flex-row justify-start items-center capitalize`}>
                {allUser && allUser?.[0].avatar_url_users ? (
                    <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
                        <Image src={"/user-images/" + allUser?.[0].avatar_url_users} fill style={{ objectFit: "cover" }} alt="profileImage" />
                    </div>
                ) : (
                    <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden  bg-slate-500">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                )}
                <span className="ml-[5px]">{allUser?.[0].first_name_users + "" + allUser?.[0].last_name_users}</span>
            </td>
            <td className={`td2`} style={{ wordWrap: "break-word", overflowWrap: "break-word", width: "100%" }}>
                {props.row.id_orders}
            </td>
            <td className={`td3 text-[#3672DF]`}>{props.row.store_link_orders}</td>
            <td className={`td4`}>{props.row.reference_id_orders}</td>
            <td className={`td5`}>{getDateInStringFormat(props.row.created_on_orders)}</td>

            <td className={`td6 capitalize `}>{packageWareHouseHandler()}</td>
            <td className={`td7  `}>
                <div className="h-full flex flex-row justify-start items-center ">
                    <span>{orderStatusColorHandler(props.row.status_orders)} </span>

                    <span className="ml-[5px] capitalize">{props.row.status_orders}</span>
                </div>
            </td>
            <td
                className="cursor-pointer"
                style={props.type == "delivered" || props.type == "live_order" ? { visibility: "hidden" } : {}}
                ref={trigger}
                
            >
                <div className="w-full h-full">
                    <div onClick={toggleGateHandler} className="cursor-pointer relative ">
                <Image
                    src="/editicon.png"
                    // ref={trigger}
                    height={13}
                    width={4}
                    alt="editIcon"
                />
                </div>
                   
             </div>
                {gate && <LiveOrderOptionModal type={props.type} row={props.row} handler={smartToggleGateHandler} trigger={trigger} />}
            </td>
        </tr>
    );
};
export default React.memo(LiveOrderLineItem);
