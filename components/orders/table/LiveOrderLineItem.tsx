import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LiveOrderOptionModal from "@/components/admin/modal/LiveOrderOptionModal";
import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import GreyRadioButton from "../../../public/grey_svg.svg";
import useTracking from "@/lib/hooks/useTracking";
import { getDateInStringFormat } from "@/lib/helper";
import { Tracking } from "@/models/tracking.model";
import { Order } from "@/models/order.model";
import { getUserImageString } from "@/lib/utils";
import OrderDetailModal from "@/components/admin/OrderDetailModal";
import useUser from "@/lib/hooks/useUser";
import { APIResponse } from "@/models/api.model";
import { KeyedMutator } from "swr";
interface IProp {
    row: Order;
    type: string;
    onSelect: (e: Order, type: string) => void;
    selectedOrder: Order[];
    mutateOrder?: KeyedMutator<APIResponse<Order>>;
}

const LiveOrderLineItem = (props: IProp) => {
    const trigger = useRef<any>();

    // const { allUser, mutateAllUser, allUserIsLoading } = useAllUser({
    //   user_id: props.row.user.id as string,
    // });
    const { user, mutateUser } = useUser();

    const { tracking, mutateTracking, trackingIsLoading } = useTracking({
        maz_id: props.row.maz_id,
    });

    const [packageStatus, setPackageStatus] = useState(0);
    const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);

    useEffect(() => {
        // console.log(tracking);
        if (tracking !== undefined && tracking !== null) {
            let sorted = [...tracking];
            sorted.sort((a: any, b: any) => a?.stage - b?.stage);
            setPackageStatus((sorted.pop() as Tracking)?.stage);
        }
    }, [tracking]);

    const toggleOrderDetailModal = () => {
        setShowOrderDetailModal((prev) => !prev);
    };

    const warehouseStatusHandler = () => {
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
                return "Libya";
            case 5:
                return "Complete";
            default:
                return "Pending";
        }
    };

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
            case "out-for-delivery":
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
            return el == props.row;
        });
        if (data) {
            return true;
        } else {
            false;
        }
    };
    return (
        <>
            <tr
                className="h-min  text-[16px] text-[#000000] font-[400] leading-[22.4px] relative  "
                style={
                    inputCheckedStateHandler()
                        ? { backgroundColor: "#EDF5F9" }
                        : {}
                }
            >
                {(props.type == "pending" ||
                    props.type == "shipments" ||
                    props.type == "in-transit" ||
                    props.type == "user_base") && (
                    <td className={`td0`}>
                        <input
                            type="checkbox"
                            value={props.row.id}
                            name={props.row.id}
                            checked={inputCheckedStateHandler()}
                            onChange={(e) =>
                                props.onSelect(props.row, "selectSingleOrder")
                            }
                            className="h-[10px] w-[10px] mb-[15px] cursor-pointer "
                        />
                    </td>
                )}

                <td
                    className={`flex flex-row justify-start items-center capitalize`}
                >
                    <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
                        <Image
                            src={
                                user?.avatar_url ||
                                "/user-images/default_user.png"
                            }
                            fill
                            style={{ objectFit: "cover" }}
                            alt="profileImage"
                        />
                    </div>

                    <span className="ml-[5px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis ">
                        {props.row.user.first_name +
                            " " +
                            props.row.user.last_name}
                    </span>
                </td>
                <td
                    className={`td2`}
                    style={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        width: "100%",
                    }}
                >
                    {props.row.maz_id}
                </td>
                <td className={`td3 text-[#3672DF]`}>{props.row.store_link}</td>
                <td className={`td4`}>{props.row.reference_id}</td>
                <td className={`td5`}>
                    {getDateInStringFormat(props.row.created_on)}
                </td>

                {/* <td className={`td6 capitalize `}>{warehoueStatusHanlder()}</td> */}
                <td className={`td7`}>
                    <div className="h-full flex flex-row justify-start items-center ">
                        <span>
                            {orderStatusColorHandler(props.row.status)}{" "}
                        </span>
                        <span className="ml-3 capitalize text-[13px]">
                            {props.row.status}
                        </span>
                    </div>
                    <div className="ml-7 text-[11px]">
                        {warehouseStatusHandler()}
                    </div>
                </td>
                <td
                    className=""
                    style={
                        props.type == "delivered" || props.type == "live_order"
                            ? { visibility: "hidden" }
                            : {}
                    }
                    ref={trigger}
                >
                    <div className="w-full h-full   ">
                        <div
                            onClick={toggleGateHandler}
                            className="cursor-pointer relative "
                        >
                            <Image
                                src="/editicon.png"
                                // ref={trigger}
                                height={13}
                                width={4}
                                alt="editIcon"
                            />
                        </div>
                        {gate && (
                            <LiveOrderOptionModal
                                type={props.type}
                                row={props.row}
                                handler={smartToggleGateHandler}
                                trigger={trigger}
                                stage={packageStatus}
                                click={toggleOrderDetailModal}
                                mutateOrder={props.mutateOrder}
                            />
                        )}
                    </div>
                </td>
            </tr>
            {showOrderDetailModal && (
                <OrderDetailModal
                    close={toggleOrderDetailModal}
                    row={props.row}
                />
            )}
        </>
    );
};
export default React.memo(LiveOrderLineItem);
