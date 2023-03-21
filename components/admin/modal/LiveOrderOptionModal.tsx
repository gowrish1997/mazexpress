import React, { forwardRef, RefObject } from "react";
import ClickOutside from "@/components/common/ClickOutside";
import fetchServer from "@/lib/fetchServer";
import useUser from "@/lib/hooks/useUser";
import axios from "axios";
import { createToast } from "@/lib/toasts";
import { Order } from "@/models/order.model";
import { User } from "@/models/user.model";
import { APIResponse } from "@/models/api.model";
import useOrders from "@/lib/hooks/useOrders";

import { KeyedMutator } from "swr";
interface IProps {
    ref: React.RefObject<HTMLDivElement>;
    handler: () => void;
    trigger: RefObject<HTMLDivElement>;
    row: Order | User;
    type: string;
    stage?: number;
    click?: () => void;
    mutateOrder?: KeyedMutator<APIResponse<Order>>;
}
export type Ref = HTMLDivElement;

const LiveOrderOptionModal = forwardRef<HTMLDivElement, IProps>(
    (props, ref) => {
        const { user, mutateUser } = useUser();

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
                    let rowFixed: Order = props.row as Order;
                    const result0 = await fetchServer(
                        `/api/orders?id=${rowFixed.id}`,
                        {
                            method: "PUT",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({ status: "at-warehouse" }),
                        }
                    );
                    //   console.log(result0);
                    const result0_2 = await fetchServer(`/api/tracking`, {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            order_id: props.row.id,
                            user_id: user?.id,
                            stage: 1,
                        }),
                    });

                    // check notifications for user and send notification
                    // get notification for user
                    if ((props.row as Order).user.is_notifications_enabled) {
                        // get admin notification on backend
                        // send notification post
                        const deliveredMessage = {
                            title: "Order arrived at Istanbul warehouse!",
                            content: `Your order number ${rowFixed.id} has been received at our Istanbul warehouse and will be shipped soon.`,
                        };

                        const result0_3: APIResponse<Notification> =
                            await fetchServer("/api/notifications", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    data: deliveredMessage,
                                    // files: [],
                                    users: [(props.row as Order).user.id],
                                    // notification_config: 1,
                                }),
                            });
                        // console.log(result0_3);

                        if (result0_3?.count && result0_3?.count > 0) {
                            createToast({
                                type: "success",
                                title: "Notified User",
                                message: `Sent order received notification to userID ${
                                    (props.row as Order).user.id
                                }`,
                                timeOut: 2000,
                            });
                        } else {
                            createToast({
                                type: "error",
                                title: "Failed creating notification",
                                message: `check console for more info`,
                                timeOut: 2000,
                            });
                        }
                    }
                    props.mutateOrder?.();
                    // console.log(result0_2);
                    break;
                case "shipments":
                    let rowFixed2: Order = props.row as Order;

                    // put to order
                    const result1 = await fetchServer(
                        `/api/orders?id=${rowFixed2.id}`,
                        {
                            method: "PUT",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({ status: "in-transit" }),
                        }
                    );
                    // console.log(result1);
                    const result1_2 = await fetchServer("/api/tracking", {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            user_id: rowFixed2?.user.id,
                            order_id: rowFixed2.id,
                            stage: 2,
                        }),
                    });
                    // console.log(result1_2);
                    // check notifications for user and send notification
                    // get notification for user
                    if (rowFixed2.user.is_notifications_enabled) { 
                        // get admin notification on backend
                        // send notification post
                        const deliveredMessage = {
                            title: "Order left Istanbul warehouse!",
                            content: `Your order number ${rowFixed2.id} has left our Istanbul warehouse and will be reach Libya soon.`,
                        };

                        const result0_3: APIResponse<Notification> =
                            await fetchServer("/api/notifications", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    data: deliveredMessage,
                                    // files: [],
                                    users: [rowFixed2.user.id],
                                    // notification_config: 1,
                                }),
                            });
                        // console.log(result0_3);

                        if (result0_3?.count && result0_3?.count > 0) {
                            createToast({
                                type: "success",
                                title: "Notified User",
                                message: `Sent order received notification to userID ${rowFixed2.user.id}`,
                                timeOut: 2000,
                            });
                        } else {
                            createToast({
                                type: "error",
                                title: "Failed creating notification",
                                message: `check console for more info`,
                                timeOut: 2000,
                            });
                        }
                    }
                    props.mutateOrder?.();
                    break;
                case "in-transit":
                    // increment stage for
                    let rowFixed3: Order = props.row as Order;
                    //   console.log(rowFixed3.id_orders, stage);

                    if (props.stage === 2) {
                        // received in libya action
                        const result2_2 = await fetchServer("/api/tracking", {
                            method: "POST",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({
                                order_id: rowFixed3.id,
                                user_id: rowFixed3?.user?.id,
                                stage: 3,
                            }),
                        });
                        // check notifications for user and send notification
                        // get notification for user
                        if (rowFixed3.user.is_notifications_enabled) {
                            // get admin notification on backend
                            // send notification post
                            const deliveredMessage = {
                                title: "Order received in Libya warehouse!",
                                content: `Your order number ${rowFixed3.id} has reached our Libya warehouse and will reach you soon.`,
                            };

                            const result0_3: APIResponse<Notification> =
                                await fetchServer("/api/notifications", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        data: deliveredMessage,
                                        // files: [],
                                        users: [rowFixed3.user.id],
                                        // notification_config: 1,
                                    }),
                                });
                            // console.log(result0_3);

                            if (result0_3?.count && result0_3?.count > 0) {
                                createToast({
                                    type: "success",
                                    title: "Notified User",
                                    message: `Sent order received notification to userID ${rowFixed3.user.id}`,
                                    timeOut: 2000,
                                });
                            } else {
                                createToast({
                                    type: "error",
                                    title: "Failed creating notification",
                                    message: `check console for more info`,
                                    timeOut: 2000,
                                });
                            }
                        }
                        props.mutateOrder?.();
                    }
                    if (props.stage === 3) {
                        // out for delivery action
                        // set order status
                        const result2 = await fetchServer(
                            `/api/orders?id=${rowFixed3.id}`,
                            {
                                method: "PUT",
                                headers: { "Content-type": "application/json" },
                                body: JSON.stringify({
                                    status: "out-for-delivery",
                                }),
                            }
                        );

                        const result2_2 = await fetchServer("/api/tracking", {
                            method: "POST",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({
                                order_id: rowFixed3.id,
                                user_id: rowFixed3?.user?.id,
                                stage: 4,
                            }),
                        });

                        // check notifications for user and send notification
                        // get notification for user
                        if (rowFixed3.user.is_notifications_enabled) {
                            // get admin notification on backend
                            // send notification post
                            const deliveredMessage = {
                                title: "Order out for delivery!",
                                content: `Your order number ${rowFixed3.id} is out for delivery and will reach you soon.`,
                            };

                            const result0_3: APIResponse<Notification> =
                                await fetchServer("/api/notifications", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        data: deliveredMessage,
                                        // files: [],
                                        users: [rowFixed3.user.id],
                                        // notification_config: 1,
                                    }),
                                });
                            // console.log(result0_3);

                            if (result0_3?.count && result0_3?.count > 0) {
                                createToast({
                                    type: "success",
                                    title: "Notified User",
                                    message: `Sent order received notification to userID ${rowFixed3.user.id}`,
                                    timeOut: 2000,
                                });
                            } else {
                                createToast({
                                    type: "error",
                                    title: "Failed creating notification",
                                    message: `check console for more info`,
                                    timeOut: 2000,
                                });
                            }
                        }
                        props.mutateOrder?.();
                    }
                    if (props.stage === 4) {
                        // delivered action

                        // set order status
                        const result2 = await fetchServer(
                            `/api/orders?id=${rowFixed3.id}`,
                            {
                                method: "PUT",
                                headers: { "Content-type": "application/json" },
                                body: JSON.stringify({ status: "delivered" }),
                            }
                        );

                        // enter tracking data
                        const result2_2 = await fetchServer("/api/tracking", {
                            method: "POST",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({
                                order_id: rowFixed3.id,
                                stage: 5,
                                user_id: rowFixed3?.user?.id,
                            }),
                        });

                        // check notifications for user and send notification
                        // get notification for user
                        if (rowFixed3.user.is_notifications_enabled) {
                            // get admin notification on backend
                            // send notification post
                            const deliveredMessage = {
                                title: "Order delivered!",
                                content: `Your order number ${rowFixed3.id} has been marked as delivered.`,
                            };

                            const result0_3: APIResponse<Notification> =
                                await fetchServer("/api/notifications", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        data: deliveredMessage,
                                        // files: [],
                                        users: [rowFixed3.user.id],
                                        // notification_config: 1,
                                    }),
                                });
                            // console.log(result0_3);

                            if (result0_3?.count && result0_3?.count > 0) {
                                createToast({
                                    type: "success",
                                    title: "Notified User",
                                    message: `Sent order received notification to userID ${rowFixed3.user.id}`,
                                    timeOut: 2000,
                                });
                            } else {
                                createToast({
                                    type: "error",
                                    title: "Failed creating notification",
                                    message: `check console for more info`,
                                    timeOut: 2000,
                                });
                            }
                        }
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
                className="z-50 absolute top-0 left-0 w-full"
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
                            onClick={props.click}
                        >
                            <div className="cursor-pointer">
                                <span className="w-full ">View Order</span>
                            </div>
                        </li>
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
