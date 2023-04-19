import ClickOutside from "@/components/common/ClickOutside";
import { singleOrderAction } from "@/lib/selectOrder";
import { createToast } from "@/lib/toasts";
import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import { User } from "@/models/user.model";
import React, { forwardRef, RefObject } from "react";
import { KeyedMutator } from "swr";
interface IProps {
    ref: React.RefObject<HTMLDivElement>;
    handler: () => void;
    trigger: RefObject<HTMLDivElement>;
    row: Order | User;
    type: string;
    stage?: number;
    orderDetail?: () => void;
    deliveryDetail: () => void;
    billDetail: () => void;
    mutateOrder?: KeyedMutator<APIResponse<Order>>;
}
export type Ref = HTMLDivElement;

const LiveOrderOptionModal = forwardRef<HTMLDivElement, IProps>(
    (props, ref) => {
        const optionHandler = () => {
            switch (props.type) {
                case "pending":
                    return "Arrived at Istanbul";
                case "shipments":
                    return "Left Istanbul Warehouse";
                case "in-transit":
                    return "Mark as delivered";
            }
        };

        const actionHandler = async () => {
            switch (props.type) {
                case "pending":
                    try {
                        const result0_3 = await singleOrderAction(
                            props.row as Order,
                            "at-warehouse",
                            1,
                            "Order arrived at Istanbul warehouse!",
                            "has been received at our Istanbul warehouse and will be shipped soon.",
                            true
                        );

                        createToast({
                            type: "success",
                            title: "success",
                            message: `order with maz ID ${
                                (props.row as Order).maz_id
                            } successfully updated`,
                            timeOut: 2000,
                        });
                    } catch (error) {
                        console.error(error);
                        createToast({
                            type: "error",
                            title: "Failed",
                            message: `check console for more info`,
                            timeOut: 2000,
                        });
                    }

                    props.mutateOrder?.();

                    break;
                case "shipments":
                    try {
                        const result0_3 = await singleOrderAction(
                            props.row as Order,
                            "in-transit",
                            2,
                            "Order left Istanbul warehouse!",
                            "has left our Istanbul warehouse and will be reach Libya soon.",
                            true
                        );

                        createToast({
                            type: "success",
                            title: "success",
                            message: `order with maz ID ${
                                (props.row as Order).maz_id
                            } successfully updated`,
                            timeOut: 2000,
                        });
                    } catch (error) {
                        console.error(error);
                        createToast({
                            type: "error",
                            title: "Failed",
                            message: `check console for more info`,
                            timeOut: 2000,
                        });
                    }

                    props.mutateOrder?.();
                    break;
                case "in-transit":
                    // increment stage for
                    let rowFixed3: Order = props.row as Order;

                    if (props.stage === 2) {
                        // received in libya action

                        try {
                            const result0_3 = await singleOrderAction(
                                props.row as Order,
                                "in-transit",
                                3,
                                "Order received in Libya warehouse!",
                                "has reached our Libya warehouse and will reach you soon.",
                                false
                            );

                            createToast({
                                type: "success",
                                title: "success",
                                message: `order with maz ID ${
                                    (props.row as Order).maz_id
                                } successfully updated`,
                                timeOut: 2000,
                            });
                        } catch (error) {
                            console.error(error);
                            createToast({
                                type: "error",
                                title: "Failed creating notification",
                                message: `check console for more info`,
                                timeOut: 2000,
                            });
                        }

                        // check notifications for user and send notification
                        // get notification for user

                        props.mutateOrder?.();
                    }
                    if (props.stage === 3) {
                        try {
                            const result0_3 = await singleOrderAction(
                                props.row as Order,
                                "out-for-delivery",
                                4,
                                "Order out for delivery!",
                                "is out for delivery and will reach you soon.",
                                true
                            );

                            createToast({
                                type: "success",
                                title: "success",
                                message: `order with maz ID ${
                                    (props.row as Order).maz_id
                                } successfully updated`,
                                timeOut: 2000,
                            });
                        } catch (error) {
                            console.error(error);
                            createToast({
                                type: "error",
                                title: "Failed creating notification",
                                message: `check console for more info`,
                                timeOut: 2000,
                            });
                        }

                        props.mutateOrder?.();
                    }
                    if (props.stage === 4) {
                        try {
                            const result0_3 = await singleOrderAction(
                                props.row as Order,
                                "delivered",
                                5,
                                "Order delivered!",
                                "has been marked as delivered.",
                                true
                            );

                            createToast({
                                type: "success",
                                title: "success",
                                message: `order with maz ID ${
                                    (props.row as Order).maz_id
                                } successfully updated`,
                                timeOut: 2000,
                            });
                        } catch (error) {
                            console.error(error);
                            createToast({
                                type: "error",
                                title: "Failed creating notification",
                                message: `check console for more info`,
                                timeOut: 2000,
                            });
                        }

                        // check notifications for user and send notification

                        props.mutateOrder?.();
                    }
                    break;
                case "user_base":
                    console.log("user_base");
                    break;
                default:
                    console.log("default");
                    break;
            }
        };

        return (
            <ClickOutside
                handler={props.handler}
                trigger={props.trigger}
                className="z-20 absolute -top-[5px] left-[5px] w-full"
            >
                <div
                    className="absolute top-[40px] right-[15px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] flex flex-col justify-between items-start p-[10px]"
                    style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                    // ref={ref}
                >
                    <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px] cursor-pointer  ">
                        {props.type == "in-transit" && props.stage == 2 && (
                            <li
                                className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                                onClick={actionHandler}
                            >
                                <div className="cursor-pointer">
                                    <span className="w-full ">
                                        Received in Libya
                                    </span>
                                </div>
                            </li>
                        )}
                        {props.type == "in-transit" && props.stage == 3 && (
                            <>
                                <li
                                    className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                                    onClick={actionHandler}
                                >
                                    <div className="cursor-pointer">
                                        <span className="w-full ">
                                            Out for delivery
                                        </span>
                                    </div>
                                </li>
                            </>
                        )}
                        {props.type == "in-transit" && props.stage == 4 && (
                            <>
                                <li
                                    className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                                    onClick={() => props.billDetail()}
                                >
                                    <div className="cursor-pointer">
                                        <span className="w-full ">
                                            Update bill
                                        </span>
                                    </div>
                                </li>
                            </>
                        )}
                        <li
                            className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                            onClick={actionHandler}
                        >
                            <div className="cursor-pointer">
                                <span className="w-full ">
                                    {props.type == "in-transit" ? (
                                        props.stage == 4 ? (
                                            optionHandler()
                                        ) : (
                                            <></>
                                        )
                                    ) : (
                                        <>{optionHandler()}</>
                                    )}
                                </span>
                            </div>
                        </li>
                        <li
                            className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                            onClick={props.orderDetail}
                        >
                            <div className="cursor-pointer">
                                <span className="w-full ">View Order</span>
                            </div>
                        </li>
                        {!(props.type == "pending") && (
                            <li
                                className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                                onClick={props.deliveryDetail}
                            >
                                <div className="cursor-pointer">
                                    <span className="w-full ">
                                        Change Delivery date
                                    </span>
                                </div>
                            </li>
                        )}

                        {/* {props.type == "in-transit" && (
              <li
                className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                onClick={commentHandler}
              >
                <div className="cursor-pointer">
                  <span className="w-full ">Add comment</span>
                </div>
              </li>
            )} */}
                    </ul>
                </div>
            </ClickOutside>
        );
    }
);
LiveOrderOptionModal.displayName = "LiveOrderOptionModal";
export default LiveOrderOptionModal;
