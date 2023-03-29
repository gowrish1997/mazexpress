import fetchServer from "./fetchServer";
import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import {
    user_orderDelivered,
    user_orderDispatched,
} from "@/lib/emailContent/bodyContent";
import { User } from "@/models/user.model";
import axios from "axios";
export const selectOrder = (
    value: any,
    type: any,
    setSelectedOrder: any,
    allLiveOrders: Order[] | User[],
    selectedOrder: Order[] | User[]
) => {
    if (type == "selectAllOrder") {
        if (value) {
            const order = allLiveOrders?.map((el: any) => {
                if (el.id) {
                    return el;
                } else {
                    return el;
                }
            });
            setSelectedOrder(order);
        } else {
            setSelectedOrder([]);
        }
    } else {
        if (value.id) {
            const order = (selectedOrder as Order[])?.find((el: Order) => {
                return el.id == value.id;
            });

            if (!order) {
                setSelectedOrder((prev: any) => {
                    return [...(prev ? prev : []), value];
                });
            } else {
                const filteredOrder = (selectedOrder as Order[])?.filter(
                    (el: any) => {
                        return el.id != value.id;
                    }
                );
                setSelectedOrder(filteredOrder);
            }
        } else {
            const user = (selectedOrder as User[])?.find((el: any) => {
                return el.email == value.email;
            });

            if (!user) {
                setSelectedOrder((prev: any) => {
                    return [...(prev ? prev : []), value];
                });
            } else {
                const filteredUser = (selectedOrder as User[])?.filter(
                    (el: any) => {
                        return el.email != value.email;
                    }
                );
                setSelectedOrder(filteredUser);
            }
        }
    }
};

export const getUserIdList = (order: any) => {
    const userIdList = order?.map((data: any) => {
        return (data as Order).user?.id;
    });

    let userListString = userIdList?.toString();
    return userListString;
};

export const bulkActionHandler = async (
    selectedOrder: Order[],
    status: string,
    trckingStatus: number,
    title: string,
    content: string,
    execute?: boolean
) => {
    let sendNotification = true;

    for (let i = 0; i < selectedOrder?.length!; i++) {
        let rowFixed: Order = selectedOrder?.[i] as Order;
        if (execute) {
            try {
                const result0 = await fetchServer(
                    `/api/orders/${rowFixed.maz_id}`,
                    {
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ status: status }),
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }

        if (status == "out-for-delivery") {
            const toList = [
                {
                    type: "dispatched",
                    toType: "user",
                    header: "Your order has dispatched",
                    toName:
                        selectedOrder[i].user.first_name +
                        " " +
                        selectedOrder[i].user.last_name,
                    toMail: selectedOrder[i].user.email,
                    bodyContent: user_orderDispatched(
                        selectedOrder[i].id,
                        selectedOrder[i].maz_id
                    ),
                    buttonContent: "Let’s Get Started",
                    redirectLink: "",
                },
            ];

            axios
                .post("/api/emailTemplate", toList)
                .then((data) => {
                    console.log(data.data.body[0].html);
                    // console.log(data.data.body.html);
                    // setHtmlCode(data.data.body);
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }

        if (status == "delivered") {
            const toList = [
                {
                    type: "delivered",
                    toType: "user",
                    header: "Your order has delivered",
                    toName:
                        selectedOrder[i].user.first_name +
                        " " +
                        selectedOrder[i].user.last_name,
                    toMail: selectedOrder[i].user.email,
                    bodyContent: user_orderDelivered(selectedOrder[i].id),
                    buttonContent: "Let’s Get Started",
                    redirectLink: "",
                },
            ];

            axios
                .post("/api/emailTemplate", toList)
                .then((data) => {
                    console.log(data.data.body[0].html);
                    // console.log(data.data.body.html);
                    // setHtmlCode(data.data.body);
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }

        try {
            const result0_2 = await fetchServer(
                `/api/tracking/${rowFixed.maz_id}`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        stage: trckingStatus,
                    }),
                }
            );
        } catch (error) {
            console.error(error);
        }

        if (rowFixed.user?.is_notifications_enabled) {
            // get admin notification on backend
            // send notification post

            try {
                const deliveredMessage = {
                    title: title,
                    content: `Your order number ${rowFixed.id} ${content}`,
                };
                const result0_3: APIResponse<Notification> = await fetchServer(
                    "/api/notifications",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            data: deliveredMessage,
                            // files: [],
                            users: [rowFixed.user.email],
                            // notification_config: 1,
                        }),
                    }
                );

                if (result0_3?.count && result0_3?.count > 0) {
                    sendNotification = true;
                } else {
                    sendNotification = false;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    return sendNotification;
};

export const singleOrderAction = async (
    selectedOrder: Order,
    status: string,
    trckingStatus: number,
    title: string,
    content: string,
    execute: boolean
) => {
    let sendNotification = true;
    let rowFixed: Order = selectedOrder as Order;
    let estimateDelivery = rowFixed?.est_delivery
        ? new Date(rowFixed?.est_delivery)
        : null;
    let newDeliveryDate = new Date();
    console.log(newDeliveryDate);
    if (status == "at-warehouse") {
        newDeliveryDate.setDate(newDeliveryDate.getDate() + 7);
    }
    if (execute) {
        try {
            const result0 = await fetchServer(
                `/api/orders/${rowFixed.maz_id}`,
                {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        status: status,
                        est_delivery:
                            status == "at-warehouse"
                                ? newDeliveryDate
                                : estimateDelivery,
                    }),
                }
            );
            console.log(result0);
        } catch (error) {
            console.error(error);
        }
    }

    if (status == "out-for-delivery") {
        const toList = [
            {
                type: "dispatched",
                toType: "user",
                header: "Your order has dispatched",
                toName:
                    selectedOrder.user.first_name +
                    " " +
                    selectedOrder.user.last_name,
                toMail: selectedOrder.user.email,
                bodyContent: user_orderDispatched(
                    selectedOrder.id,
                    selectedOrder.maz_id
                ),
                buttonContent: "Let’s Get Started",
                redirectLink: "",
            },
        ];

        axios
            .post("/api/emailTemplate", toList)
            .then((data) => {
                console.log(data.data.body[0].html);
                // console.log(data.data.body.html);
                // setHtmlCode(data.data.body);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
    if (status == "delivered") {
        const toList = [
            {
                type: "delivered",
                toType: "user",
                header: "Your order has delivered",
                toName:
                    selectedOrder.user.first_name +
                    " " +
                    selectedOrder.user.last_name,
                toMail: selectedOrder.user.email,
                bodyContent: user_orderDelivered(selectedOrder.id),
                buttonContent: "Let’s Get Started",
                redirectLink: "",
            },
        ];

        axios
            .post("/api/emailTemplate", toList)
            .then((data) => {
                console.log(data.data.body[0].html);
                // console.log(data.data.body.html);
                // setHtmlCode(data.data.body);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
    try {
        const result0_2 = await fetchServer(
            `/api/tracking/${rowFixed.maz_id}`,
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    stage: trckingStatus,
                }),
            }
        );
    } catch (error) {
        console.error(error);
    }
    if ((rowFixed as Order).user.is_notifications_enabled) {
        const deliveredMessage = {
            title: title,
            content: `Your order number ${rowFixed.id} ${content}`,
        };
        try {
            let result0_3: APIResponse<Notification> = await fetchServer(
                `/api/notifications`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: deliveredMessage,
                        // files: [],
                        users: [(rowFixed as Order).user.email],
                        // notification_config: 1,
                    }),
                }
            );
            console.log(result0_3);
            if (result0_3?.count && result0_3?.count > 0) {
                sendNotification = true;
            } else {
                sendNotification = false;
            }

            // console.log(result0_3);
        } catch (error) {
            console.error(error);
        }
    }
    return sendNotification;
};
