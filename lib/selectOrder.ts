import fetchServer from "./fetchServer";
import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";

import { User } from "@/models/user.model";
export const selectOrder = (
  value: any,
  type: any,
  setSelectedOrder: any,
  filteredLiveOrders: any,
  selectedOrder: any
) => {
  if (type == "selectAllOrder") {
    if (value) {
      const order = filteredLiveOrders?.map((el: any) => {
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
    const order = selectedOrder?.find((el: any) => el == value);

    if (!order) {
      setSelectedOrder((prev: any) => {
        return [...(prev ? prev : []), value];
      });
    } else {
      const filteredOrder = selectedOrder?.filter((el: any) => {
        return el !== value;
      });
      setSelectedOrder(filteredOrder);
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
  content: string
) => {
  let sendNotification = true;

  for (let i = 0; i < selectedOrder?.length!; i++) {
    let rowFixed: Order = selectedOrder?.[i] as Order;

    try {
      const result0 = await fetchServer(`/api/orders?id=${rowFixed.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status: status }),
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const result0_2 = await fetchServer(`/api/tracking/${rowFixed.maz_id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          stage: trckingStatus,
        }),
      });
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
              users: [rowFixed.user.id],
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

  if (execute) {
    try {
      const result0 = await fetchServer(`/api/orders?id=${rowFixed.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          status: status,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const result0_2 = await fetchServer(`/api/tracking/${rowFixed.maz_id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        stage: trckingStatus,
      }),
    });
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
        "/api/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: deliveredMessage,
            // files: [],
            users: [(rowFixed as Order).user.id],
            // notification_config: 1,
          }),
        }
      );
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
